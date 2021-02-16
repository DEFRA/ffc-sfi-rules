const stdDescription = require('./content-std-description')
const fundingSummary = require('./content-funding-summary')
const { landFeatureCategories, landFeatures, standards, optionalActions } = require('./scheme') // FIXME replace this
const scheme = require('./scheme')

const schemeRates = scheme.getRates()

const optionalActionsDetails = {
  'improved-grassland0': {
    label: (amount) => `${amount} trees with a buffer around`
  },
  'improved-grassland-soils0': {
    label: (amount) => `${amount} hectares with reduced or removed livestock`
  },
  'improved-grassland-soils1': {
    label: (amount) => `${amount} hectares of permanent grassland`
  },
  arable0: {
    label: (amount) => `${amount} trees with a buffer around`
  },
  'arable-soils0': {
    label: (amount) => `${amount} hectares of green cover`
  },
  woodland0: {
    label: (amount) => `${amount} square metres of newly planted woodland`
  },
  'waterbody-buffers0': {
    label: (amount) => `${amount} square metres of in-field grass strips or blocks`
  }
}

const landFeaturesContent = {
  'improved-grassland': {
    label: 'Improved grassland'
  },
  'unimproved-grassland': {
    label: 'Semi-improved and unimproved grassland'
  },
  arable: {
    label: 'Arable and horticultural land'
  },
  hedgerows: {
    label: 'Hedgerows'
  },
  'waterbody-buffers': {
    label: 'Waterbody buffers'
  },
  woodland: {
    label: 'Farm woodland over 15 years old'
  }
}

const landFeatureCategoriesContent = {
  grassland: {
    label: 'Grassland'
  },
  arable: {
    label: 'Arable/horticultural land'
  },
  boundary: {
    label: 'Boundary features'
  },
  woodland: {
    label: 'On farm woodland'
  }
}

const standardsContent = {
  'improved-grassland': {
    title: 'Improved grassland',
    checkboxLabel: 'Add the improved grassland standard to my calculation'
  },
  'improved-grassland-soils': {
    title: 'Improved grassland soils',
    checkboxLabel: 'Add the improved grassland soils standard to my calculation'
  },
  'unimproved-grassland': {
    title: 'Semi-improved and unimproved grassland',
    checkboxLabel: 'Add the semi-improved or unimproved grassland standard to my calculation'
  },
  arable: {
    title: 'Arable and horticultural land',
    checkboxLabel: 'Add the arable land standard to my calculation'
  },
  'arable-soils': {
    title: 'Arable and horticultural soils',
    checkboxLabel: 'Add the arable and horticultural soils standard to my calculation'
  },
  hedgerows: {
    title: 'Hedgerows',
    checkboxLabel: 'Add the hedgerows standard to my calculation'
  },
  'waterbody-buffers': {
    title: 'Waterbody buffering',
    checkboxLabel: 'Add the waterbody buffering standard to my calculation'
  },
  woodland: {
    title: 'Farm woodland',
    checkboxLabel: 'Add the farm woodland standard to my calculation'
  }
}

const extraActions = {
  'improved-grassland': {
    hint: 'Add the number of trees on your improved grassland you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions['improved-grassland0'].landRate} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'improved-grassland-soils': {
    hint: 'Add how many hectares you want to use for each action. You can leave fields blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland-soils0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions['improved-grassland-soils0'].landRate} a hectare</strong> to reduce stocking density or remove livestock from wet soils.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    },
    {
      id: 'improved-grassland-soils1',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions['improved-grassland-soils1'].landRate} a hectare</strong> to maintain permanent grassland that you only re-seed by direct drilling or over-sowing.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  arable: {
    hint: 'Add the number of trees on your arable land you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions.arable0.landRate} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'arable-soils': {
    hint: 'Add the number of hectares of arable land at risk of surface runoff, soil erosion or flooding you want to establish green cover on. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable-soils0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions['arable-soils0'].landRate} a hectare</strong> to establish green cover.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  'waterbody-buffers': {
    hint: 'Add the number of square meters of cultivated land you want to establish in-field grass strips or blocks on to intercept runoff water. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'waterbody-buffers0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions['waterbody-buffers0'].landRate} a square meter</strong> to establish in-field grass strips or blocks.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  },
  woodland: {
    hint: 'Add the number of square meters of newly planted woodland under 15 years old you want to maintain. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'woodland0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${optionalActions.woodland0.landRate} a hectare</strong> to maintain newly planted woodland.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  }
}

module.exports = {
  // Used by land-calc.js
  getLandFeatureCategories: () => Object.entries(landFeatureCategories).map(([id, category]) => ({
    id,
    label: landFeatureCategoriesContent[id].label,
    features: category.features.map(categoryId => ({
      id: categoryId,
      label: landFeaturesContent[categoryId].label,
      unit: landFeatures[categoryId].unit
    }))
  })),
  // Used by select-std.js
  getStandards: () => Object.entries(standardsContent).map(([id, standard]) => ({
    id,
    descriptionHtml: stdDescription(id, schemeRates[id]),
    landFeature: Object.entries(landFeatures).find(([k, v]) => v.standards.includes(id))[0],
    ...standard
  })),
  // Used by extra-actions.js
  getExtraActions: () => Object.entries(extraActions).map(([id, standard]) => ({
    id,
    title: standardsContent[id].title,
    ...standard
  })),
  // Used by sfi-summary.js
  getTotalFunding: fundingSummary.getTotalFunding,
  // Used by sfi-summary.js
  getFundingBreakdown: () => Object.entries(landFeatureCategories).map(([id, category]) => ({
    id,
    label: landFeatureCategoriesContent[id].label,
    descriptionHtml: (values) => fundingSummary.getFundingBreakdown(id, values),
    standards: category.features.map(f => landFeatures[f].standards.map(s => ({
      id: s,
      title: standardsContent[s].title,
      ...standards[s]
    }))).flat(),
    extraActions: category.features.map(f => landFeatures[f].standards.map(s => standards[s].optionalActions.map(a => ({
      id: a,
      label: optionalActionsDetails[a].label,
      standard: scheme.getStandardIdFromOptionId(a)
    })))).flat(2)
  }))
}
