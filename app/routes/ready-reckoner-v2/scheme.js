const standardsV2 = require('../../services/standards-v2')

// FIXME:
// 2. put unit with rates and use that unit in content e.g. m2

const landFeatures = {
  'improved-grassland': {
    unit: 'ha',
    standards: ['improved-grassland', 'improved-grassland-soils']
  },
  'unimproved-grassland': {
    unit: 'ha',
    standards: ['unimproved-grassland']
  },
  arable: {
    unit: 'ha',
    standards: ['arable', 'arable-soils']
  },
  hedgerows: {
    unit: 'ha',
    standards: ['hedgerows']
  },
  'waterbody-buffers': {
    unit: 'ha',
    standards: ['waterbody-buffers']
  },
  woodland: {
    unit: 'ha',
    standards: ['woodland']
  }
}

const landFeatureCategories = {
  grassland: {
    features: ['improved-grassland', 'unimproved-grassland']
  },
  arable: {
    features: ['arable']
  },
  boundary: {
    features: ['hedgerows', 'waterbody-buffers']
  },
  woodland: {
    features: ['woodland']
  }
}

const standards = {
  arable: {
    optionalActions: ['arable0']
  },
  'arable-soils': {
    optionalActions: ['arable-soils0']
  },
  'improved-grassland': {
    optionalActions: ['improved-grassland0']
  },
  'improved-grassland-soils': {
    optionalActions: ['improved-grassland-soils0', 'improved-grassland-soils1']
  },
  'unimproved-grassland': {
    optionalActions: []
  },
  hedgerows: {
    optionalActions: []
  },
  'waterbody-buffers': {
    optionalActions: ['waterbody-buffers0']
  },
  woodland: {
    optionalActions: ['woodland0']
  }
}

const optionalActions = {
  'improved-grassland0': {
    additionalPayments: {}
  },
  'improved-grassland-soils0': {
    additionalPayments: {}
  },
  'improved-grassland-soils1': {
    additionalPayments: {}
  },
  arable0: {
    additionalPayments: {}
  },
  'arable-soils0': {
    additionalPayments: {}
  },
  'waterbody-buffers0': {
    additionalPayments: {}
  },
  woodland0: {
    additionalPayments: {
      webinar: 25,
      assessment: 100
    }
  }
}

function getOptionalActions () {
  return null
}

function getStandards () {
  return null
}

function getLandFeatures () {
  return null
}

function getLandCategories () {
  return null
}

function getRates () {
  // Return the standard and action rates
  return Object.entries(standards).reduce((acc, [standardId, standard]) => {
    acc[standardId] = {
      landRate: standardsV2.find(s => s.id === standardId).paymentRate,
      optionalActions: standard.optionalActions.map(actionId => ({
        landRate: standardsV2.find(s => s.id === standardId).optionalActions.find(a => a.id === actionId).paymentRate,
        additionalPayments: optionalActions[actionId].additionalPayments
      }))
    }

    return acc
  }, {})
}

module.exports = {
  landFeatures,
  landFeatureCategories,
  standards,
  optionalActions,
  getOptionalActions,
  getStandards,
  getLandFeatures,
  getLandCategories,
  getRates
}
