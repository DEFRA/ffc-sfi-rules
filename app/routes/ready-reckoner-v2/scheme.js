// FIXME: remove label from landFeatures and landFeatyreCategories

const landFeatures = {
  'improved-grassland': {
    label: 'Improved grassland',
    unit: 'ha',
    standards: ['improved-grassland', 'improved-grassland-soils']
  },
  'unimproved-grassland': {
    label: 'Semi-improved and unimproved grassland',
    unit: 'ha',
    standards: ['unimproved-grassland']
  },
  arable: {
    label: 'Arable and horticultural land',
    unit: 'ha',
    standards: ['arable', 'arable-soils']
  },
  hedgerows: {
    label: 'Hedgerows',
    unit: 'ha',
    standards: ['hedgerows']
  },
  'waterbody-buffers': {
    label: 'Waterbody buffers',
    unit: 'ha',
    standards: ['waterbody-buffers']
  },
  woodland: {
    label: 'Farm woodland over 15 years old',
    unit: 'ha',
    standards: ['woodland']
  }
}

const landFeatureCategories = {
  grassland: {
    label: 'Grassland',
    features: ['improved-grassland', 'unimproved-grassland']
  },
  arable: {
    label: 'Arable/horticultural land',
    features: ['arable']
  },
  boundary: {
    label: 'Boundary features',
    features: ['hedgerows', 'waterbody-buffers']
  },
  woodland: {
    label: 'On farm woodland',
    features: ['woodland']
  }
}

const standardsRates = {
  arable: {
    mandatory: 28,
    optional: [13]
  },
  'arable-soils': {
    mandatory: 30,
    optional: [114]
  },
  'improved-grassland': {
    mandatory: 27,
    optional: [3]
  },
  'improved-grassland-soils': {
    mandatory: 6,
    optional: [88, 56]
  },
  'unimproved-grassland': {
    mandatory: 22,
    optional: []
  },
  hedgerows: {
    mandatory: 200,
    optional: []
  },
  'waterbody-buffers': {
    mandatory: 200,
    optional: [0.05]
  },
  woodland: {
    mandatory: 49,
    optional: [200, 25, 100]
  }
}

const standards = {
  arable: {
    title: 'Arable and horticultural land',
    optionalActions: ['arable0']
  },
  'arable-soils': {
    title: 'Arable and horticultural soils',
    optionalActions: ['arable-soils0']
  },
  'improved-grassland': {
    landRate: 27,
    optionalActions: ['improved-grassland0']
  },
  'improved-grassland-soils': {
    landRate: 6,
    optionalActions: ['improved-grassland-soils0', 'improved-grassland-soils1']
  },
  'unimproved-grassland': {
    landRate: 22,
    optionalActions: []
  },
  hedgerows: {
    landRate: 200,
    optionalActions: []
  },
  'waterbody-buffers': {
    landRate: 200,
    optionalActions: ['waterbody-buffers0']
  },
  woodland: {
    landRate: 49,
    optionalActions: ['woodland0']
  }
}

const optionalActions = {
  'improved-grassland0': {
    landRate: 3,
    additionalPayments: {}
  },
  'improved-grassland-soils0': {
    landRate: 88,
    additionalPayments: {}
  },
  'improved-grassland-soils1': {
    landRate: 56,
    additionalPayments: {}
  },
  arable0: {
    landRate: 13,
    additionalPayments: {}
  },
  'arable-soils0': {
    landRate: 114,
    additionalPayments: {}
  },
  'waterbody-buffers0': {
    landRate: 0.05,
    additionalPayments: {}
  },
  woodland0: {
    landRate: 200,
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
      landRate: standard.landRate,
      optionalActions: standard.optionalActions.map(actionId => optionalActions[actionId])
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
