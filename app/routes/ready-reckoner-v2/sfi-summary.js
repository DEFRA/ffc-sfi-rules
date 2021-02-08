const content = require('./content-scratch')
const session = require('./session-handler')

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

function pageContent (categoryAmounts, actionValues, paymentAmounts) {
  return {
    title: 'Summary',
    hint: 'How much you will get in 2022.',
    backPath: pageDetails.backPath,
    components: {
      insetText: {
        html: content.getTotalFunding(
          paymentAmounts.sfiTotal,
          paymentAmounts.sfiMonthly,
          paymentAmounts.bpsPayment,
          paymentAmounts.grandTotal)
      },
      summaryTitle: 'Funding breakdown',
      summaryList: content.getFundingBreakdown().map(details => ({
        visible: categoryAmounts[details.id].visible,
        label: details.label,
        htmlBlurb: details.descriptionHtml(categoryAmounts[details.id]),
        standardsTable: {
          exists: details.standards.length > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.filter(standard => paymentAmounts[standard.id].base > 0).map(standard =>
            tableRowContent(standard.title, paymentAmounts[standard.id].base, '/select-std')
          )
        },
        actionsTable: {
          exists: details.extraActions.length > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.filter(action => paymentAmounts[action.standard].optional[action.id] > 0).map(
            action => tableRowContent(
              action.label(actionValues?.[action.id] ?? 0),
              paymentAmounts[action.standard].optional[action.id],
              '/extra-actions')
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

function doCalculations(landValues, actionValues, bpsPayment) {
  const standardsRates = content.standardsRates
  const landFeatures = content.landFeatures
  const standards = content.standards

  const paymentTotals = {
    sfiTotal: 0,
    bpsPayment: bpsPayment * 0.8 // FIXME
  }

  Object.entries(landFeatures).forEach(([featureId, feature]) => {
    feature.standards.forEach(standardId => {
      paymentTotals[standardId] = {
        base: landValues[featureId] * standardsRates[standardId].mandatory,
        optional: {}
      }

      paymentTotals.sfiTotal += paymentTotals[standardId].base

      standards[standardId].optionalActions.forEach((actionId, i) => {
        paymentTotals[standardId].optional[actionId] = (actionValues?.[actionId] ?? 0) * standardsRates[standardId].optional[i]

        // Payment rates for this is in hectares, but user input is in meters square
        if (actionId === 'woodland0') {
          paymentTotals[standardId].optional[actionId] /= 10000
        }

        paymentTotals.sfiTotal += paymentTotals[standardId].optional[actionId]
      })
    })
  })

  paymentTotals['sfiMonthly'] = paymentTotals.sfiTotal / 12
  paymentTotals['grandTotal'] = paymentTotals.sfiTotal + paymentTotals.bpsPayment

  return paymentTotals
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      // FIXME: is there a nicer way of doing this?
      pageDetails.backPath = '/' + request.info.referrer.split('/').slice(-1)[0]

      // Do payment calculation
      const landValues = session.getValue(request, session.keys.landValues)
      const actionValues = session.getValue(request, session.keys.actionValues)
      const bpsPayment = session.getValue(request, session.keys.bpsPayment)
      const paymentAmounts = doCalculations(landValues, actionValues, bpsPayment)

      const selectedStandards = session.getValue(request, session.keys.selectedStandards)
      const landFeatures = content.landFeatures
      const landFeatureCategories = content.landFeatureCategories
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
            }

            categoryAmounts[id].payment += paymentAmounts[standard].base
            content.standards[standard].optionalActions.forEach(
              action => (categoryAmounts[id].paymentOptional += paymentAmounts[standard].optional[action])
            )
          })
        })
      })

      return h.view(pageDetails.template, pageContent(categoryAmounts, actionValues, paymentAmounts))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      return h.redirect(pageDetails.nextPath)
    }
  }
]