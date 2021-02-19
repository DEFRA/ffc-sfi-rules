const { v4: uuid } = require('uuid')

const baseStandards = require('../../services/standards-v2')
const session = require('./session-handler')
const { updateAgreement } = require('../../messaging/senders')

function hydrateStandards (baseStandards, selectedStandards, landValues, actionValues) {
  const actionValueList = Object.keys(actionValues)
  return Object.entries(landValues).reduce((acc, cur) => {
    const [id, value] = cur
    baseStandards.filter(s => s.landType === id).forEach(s => {
      s.inputValue = value
      // flag to determine which standard(s) are included in total payment calc
      s.selected = selectedStandards.includes(s.id)
      acc[s.id] = s
      // actions are implicitly selected if they contain a value, no need to flag them as such
      s.optionalActions.filter(a => actionValueList.includes(a.id)).forEach(a => {
        a.inputValue = actionValues[a.id]
      })
    })
    return acc
  }, {})
}

module.exports = [{
  method: 'GET',
  path: '/calculating',
  handler: async (request, h) => {
    const landValues = session.getValue(request, session.keys.landValues)
    // actionValues might not have been set if no standards with additional options was selected
    // thus by-passing that page, so default to empty object
    const actionValues = session.getValue(request, session.keys.actionValues) || {}
    const selectedStandards = session.getValue(request, session.keys.selectedStandards)
    const standards = hydrateStandards(baseStandards, selectedStandards, landValues, actionValues)

    const standardsSet = {
      id: 'standardsSet',
      standards
    }

    const correlationId = uuid()
    const msg = { body: standardsSet, correlationId }
    await updateAgreement(msg)

    session.setValue(request, session.keys.correlationId, correlationId)

    return h.view('calculating')
  }
}]
