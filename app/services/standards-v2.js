module.exports = [{
  id: 'arable',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'arable',
  optionalActions: [{
    id: 'arable0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 13,
    units: {
      name: 'Number of trees',
      symbol: 'trees'
    }
  }],
  paymentRate: 28,
  title: 'Arable and horticultural land',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'arable-soils',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'arable',
  optionalActions: [{
    id: 'arable-soils0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 114,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }],
  paymentRate: 30,
  title: 'Arable and horticultural soils',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'improved-grassland',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'improved-grassland',
  optionalActions: [{
    id: 'improved-grassland0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 3,
    units: {
      name: 'Number of trees',
      symbol: 'trees'
    }
  }],
  paymentRate: 27,
  title: 'Improved grassland',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'improved-grassland-soils',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'improved-grassland',
  optionalActions: [{
    id: 'improved-grassland-soils0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 88,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }, {
    id: 'improved-grassland-soils1',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 56,
    units: {
      name: 'hectares',
      symbol: 'ha'
    }
  }],
  paymentRate: 6,
  title: 'Improved grassland soils',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'unimproved-grassland',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'unimproved-grassland',
  optionalActions: [],
  paymentRate: 22,
  title: 'Semi-improved and unimproved grassland',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'hedgerows',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'hedgerows',
  optionalActions: [],
  paymentRate: 200,
  title: 'Hedgerows',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'waterbody-buffers',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'waterbody-buffers',
  optionalActions: [{
    id: 'waterbody-buffers0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 0.05,
    units: {
      name: 'Number of square meters',
      symbol: 'm^2'
    }
  }],
  paymentRate: 200,
  title: 'Waterbody buffering',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}, {
  id: 'woodland',
  calculations: [{
    condition: 'true',
    expression: 'inputValue * paymentRate'
  }],
  landType: 'woodland',
  optionalActions: [{
    id: 'woodland0',
    calculations: [{
      condition: 'true',
      expression: 'inputValue * paymentRate'
    }],
    paymentRate: 200,
    units: {
      name: 'Number of square meters',
      symbol: 'm^2'
    }
  }],
  paymentRate: 49,
  title: 'Farm woodland',
  units: {
    name: 'hectares',
    symbol: 'ha'
  }
}]
