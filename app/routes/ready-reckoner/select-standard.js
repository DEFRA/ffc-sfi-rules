const session = require('./session-handler')
const htmlContent = require('./select-standard-content')
const Wreck = require('@hapi/wreck')
const { agreementServiceBaseUrl } = require('../../config/general')

const pageDetails = {
  path: '/select-standard',
  nextPath: '/selected-summary',
  template: 'select-standard'
}

function getContentDetails (payload, selected, errorText = null) {
  return {
    title: 'Funding options you qualify for',
    components: {
      standards: {
        idPrefix: 'standards',
        name: 'standards',
        hint: {
          text: "Choose the options you want funding for. We'll pay you in monthly instalments so that work can begin without delay."
        },
        items: [
          {
            value: 'arable',
            text: `Arable land, £${payload.arable.paymentRate} a hectare, plus £13 per tree`,
            checked: selected ? selected.includes('arable') : false,
            conditional: {
              html: htmlContent.arable(payload.arable.userInput, payload.arable.payment)
            }
          },
          {
            value: 'grassland',
            text: `Grassland, £${payload.grassland.paymentRate} a hectare, plus £3 per tree`,
            checked: selected ? selected.includes('grassland') : false,
            conditional: {
              html: htmlContent.grassland(payload.grassland.userInput, payload.grassland.payment)
            }
          },
          {
            value: 'hedgerow',
            text: `Hedgrows, £${payload.hedgerow.paymentRate} for every 100 meters`,
            checked: selected ? selected.includes('hedgerow') : false,
            conditional: {
              html: htmlContent.hedgerow(payload.hedgerow.userInput, payload.hedgerow.payment)
            }
          }
        ],
        errorMessage: errorText
      },
      message: 'If you take part in another environmental scheme, for example Countryside Stewardship, you cannot apply for the same activity through SFI.'
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: async (request, h) => {
      const correlationId = session.getCorrelationId(request)
      const url = `${agreementServiceBaseUrl}/value?correlationId=${correlationId}`
      const { payload } = await Wreck.get(url, { json: true })

      session.setCalculationResult(request, payload.body)

      return h.view(pageDetails.template, getContentDetails(payload.body, session.getSelectedStandards(request)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: (request, h) => {
      session.setSelectedStandards(request, request.payload.standards)

      if (!request.payload.standards) {
        return h.view(
          pageDetails.template,
          getContentDetails(
            session.getCalculationResult(request),
            session.getSelectedStandards(request),
            { text: 'Select at least one option.' }
          )
        )
      }

      return h.redirect(pageDetails.nextPath)
    }
  }
]