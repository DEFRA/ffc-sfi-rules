const stdDescription = require('./content-std-description')
const fundingSummary = require('./content-funding-summary')
const { landFeatureCategories, landFeatures, standardsRates, standards } = require('./standards')

const optionalActions = {
  'improved-grassland0': {
    label: (amount) => `${amount} trees with a buffer around`,
    standard: 'improved-grassland'
  },
  'improved-grassland-soils0': {
    label: (amount) => `${amount} hectares with reduced or removed livestock`,
    standard: 'improved-grassland-soils'
  },
  'improved-grassland-soils1': {
    label: (amount) => `${amount} hectares of permanent grassland`,
    standard: 'improved-grassland-soils'
  },
  arable0: {
    label: (amount) => `${amount} trees with a buffer around`,
    standard: 'arable'
  },
  'arable-soils0': {
    label: (amount) => `${amount} hectares of green cover`,
    standard: 'arable-soils'
  },
  woodland0: {
    label: (amount) => `${amount} square metres of newly planted woodland`,
    standard: 'woodland'
  },
  'waterbody-buffers0': {
    label: (amount) => `${amount} square metres of in-field grass strips or blocks`,
    standard: 'waterbody-buffers'
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
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland'].optional[0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'improved-grassland-soils': {
    hint: 'Add how many hectares you want to use for each action. You can leave fields blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland-soils0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland-soils'].optional[0]} a hectare</strong> to reduce stocking density or remove livestock from wet soils.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    },
    {
      id: 'improved-grassland-soils1',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland-soils'].optional[1]} a hectare</strong> to maintain permanent grassland that you only re-seed by direct drilling or over-sowing.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  arable: {
    hint: 'Add the number of trees on your arable land you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates.arable.optional[0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'arable-soils': {
    hint: 'Add the number of hectares of arable land at risk of surface runoff, soil erosion or flooding you want to establish green cover on. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable-soils0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['arable-soils'].optional[0]} a hectare</strong> to establish green cover.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  'waterbody-buffers': {
    hint: 'Add the number of square meters of cultivated land you want to establish in-field grass strips or blocks on to intercept runoff water. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'waterbody-buffers0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['waterbody-buffers'].optional[0]} a square meter</strong> to establish in-field grass strips or blocks.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  },
  woodland: {
    hint: 'Add the number of square meters of newly planted woodland under 15 years old you want to maintain. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'woodland0',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates.woodland.optional[0]} a hectare</strong> to maintain newly planted woodland.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  }
}

module.exports = {
  // Used by land-calc.js
  getLandFeatureCategories: () => Object.entries(landFeatureCategories).map(([id, category]) => ({
    id,
    label: category.label,
    features: category.features.map(categoryId => ({
      id: categoryId,
      ...landFeatures[categoryId]
    }))
  })),
  // Used by select-std.js
  getStandards: () => Object.entries(standardsContent).map(([id, standard]) => ({
    id,
    descriptionHtml: stdDescription(id, [standardsRates[id].mandatory, standardsRates[id].optional].flat()),
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
    label: category.label,
    descriptionHtml: (values) => fundingSummary.getFundingBreakdown(id, values),
    standards: category.features.map(f => landFeatures[f].standards.map(s => ({
      id: s,
      ...standards[s]
    }))).flat(),
    extraActions: category.features.map(f => landFeatures[f].standards.map(s => standards[s].optionalActions.map(a => ({
      id: a,
      ...optionalActions[a]
    })))).flat(2)
  }))
}
