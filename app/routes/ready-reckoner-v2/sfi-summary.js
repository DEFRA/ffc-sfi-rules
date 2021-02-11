const Wreck = require('@hapi/wreck')

const { agreementServiceBaseUrl } = require('../../config/general')
const content = require('./content')
const { log } = require('../../services/logger')
const scheme = require('./scheme')
const session = require('./session-handler')
const standards = require('./standards')
const standardsV2 = require('../../services/standards-v2')

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [
    { text: col1Text },
    { text: `${col2Text.toLocaleString('en-GB', { currency: 'GBP', style: 'currency' })}` },
    { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }]
}

const pageDetails = {
  path: '/sfi-summary',
  nextPath: '/',
  template: 'sfi-summary'
}

function pageContent (data) {
  const { actionValues, categoryAmounts, paymentAmounts: { payments, standards: payStandards }, selectedStandards } = data
  return {
    title: 'Summary',
    hint: 'How much you will get in 2022.',
    backPath: pageDetails.backPath,
    components: {
      insetText: {
        html: content.getTotalFunding(
          payments.sfiTotal,
          payments.sfiMonthly,
          payments.bpsPayment,
          payments.grandTotal
        )
      },
      summaryTitle: 'Funding breakdown',
      summaryList: content.getFundingBreakdown().map(details => ({
        visible: categoryAmounts[details.id].visible,
        label: details.label,
        htmlBlurb: details.descriptionHtml(categoryAmounts[details.id]),
        standardsTable: {
          exists: categoryAmounts[details.id].payment > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.filter(standard => selectedStandards.includes(standard.id)).map(standard =>
            tableRowContent(standard.title, payStandards[standard.id].base, '/select-std')
          )
        },
        actionsTable: {
          exists: categoryAmounts[details.id].paymentOptional > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.filter(action => payStandards[action.standard].optional[action.id] > 0).map(
            action => tableRowContent(
              action.label(actionValues?.[action.id] ?? 0),
              payStandards[action.standard].optional[action.id],
              '/extra-actions'
            )
          )
        }
      })),
      radios: {
        classes: 'govuk-radios--inline',
        name: 'start-application',
        fieldset: {
          legend: {
            text: 'Are you ready to start your application?',
            classes: 'govuk-fieldset__legend--m'
          }
        },
        items: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }
        ]
      }
    }
  }
}

function doPaymentCalculations (payload, bpsPayment) {
  let bps = 0
  let bpsRemainder = bpsPayment

  switch (true) {
    case (bpsRemainder > 150000):
      // 25% reduction over 150000
      bps += (bpsRemainder - 150000) * 0.75
      bpsRemainder = 150000
    case (bpsRemainder > 50000):
      // 20% reduction between 50000 and 150000
      bps += (bpsRemainder - 50000) * 0.8
      bpsRemainder = 50000
    case (bpsRemainder > 30000):
      // 10% reduction between 30000 and 50000
      bps += (bpsRemainder - 30000) * 0.9
      bpsRemainder = 30000
    default:
      // 5% reduction up to 30000
      bps += bpsRemainder * 0.95
  }

  const totalPayment = payload.payments.totalPayment

  const standardsPayments = Object.values(standardsV2).reduce((acc, cur) => {
    const id = cur.id
    const payments = {
      base: payload.standards[id].payment,
      optional: { }
    }
    cur.optionalActions.forEach(oa => {
      payments.optional[oa.id] = payload.standards[id].optionalActions.find(poa => poa.id === oa.id)?.payment ?? 0
      if (oa.id === 'woodland0') {
        payments.optional[oa.id] /= 10000
      }
    })
    acc[id] = payments
    return acc
  }, {})

  return {
    payments: {
      bpsPayment: bps,
      grandTotal: totalPayment + bps,
      sfiMonthly: totalPayment / 12,
      sfiTotal: totalPayment
    },
    standards: standardsPayments
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: async (request, h) => {
      // FIXME: is there a nicer way of doing this?
      pageDetails.backPath = 'javascript:history.go(-1)'

      const correlationId = session.getValue(request, session.keys.correlationId)
      const url = `${agreementServiceBaseUrl}/value?correlationId=${correlationId}`
      const { payload } = await Wreck.get(url, { json: true })
      log('msg response', payload)

      // TODO: potentially replace with the data from the msg
      const landValues = session.getValue(request, session.keys.landValues)
      const actionValues = session.getValue(request, session.keys.actionValues)
      const selectedStandards = session.getValue(request, session.keys.selectedStandards)

      const bpsPayment = session.getValue(request, session.keys.bpsPayment)
      const paymentAmounts = doPaymentCalculations(payload.body, bpsPayment)

      const landFeatures = scheme.landFeatures
      const landFeatureCategories = scheme.landFeatureCategories
      const categoryAmounts = {}

      Object.entries(landFeatureCategories).forEach(([id, category]) => {
        categoryAmounts[id] = {
          visible: false,
          payment: 0,
          paymentOptional: 0
        }

        category.features.forEach(feature => {
          categoryAmounts[id][feature] = landValues[feature]
          landFeatures[feature].standards.forEach(standard => {
            if (selectedStandards.includes(standard)) {
              categoryAmounts[id].visible = true
              categoryAmounts[id].payment += paymentAmounts.standards[standard].base
            }

            standards.standards[standard].optionalActions.forEach(
              action => (categoryAmounts[id].paymentOptional += paymentAmounts.standards[standard].optional[action])
            )
          })
        })

        categoryAmounts[id].payment += categoryAmounts[id].paymentOptional
      })

      const pageData = {
        actionValues,
        categoryAmounts,
        paymentAmounts,
        selectedStandards
      }
      return h.view(pageDetails.template, pageContent(pageData))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (_, h) => {
      return h.redirect(pageDetails.nextPath)
    }
  }
]
