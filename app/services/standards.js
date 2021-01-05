module.exports = {
  arable: {
    id: 'arable',
    paymentRate: 123,
    percentage: 5,
    ui: {
      hint: 'A minimum of 5% of all arable land will need to be set aside. Payment rate is £123 per hectare of total arable land area.',
      text: 'Enter the amount of arable land you have'
    },
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 999
      },
      text: 'Area of arable land must be between 0 and 999'
    },
    validationRules: [{
      operator: 'lessThanInclusive',
      priority: 10,
      text: 'Area of arable land must be less than or equal to 999',
      value: 999
    }, {
      operator: 'greaterThan',
      priority: 1,
      text: 'Area of arable land must be greater than 0',
      value: 0
    }]
  },
  grassland: {
    id: 'grassland',
    paymentRate: 456,
    percentage: 5,
    ui: {
      hint: 'A minimum of 5% of all grassland will need to be set aside. Payment rate is £456 per hectare of total grassland area.',
      text: 'Enter the amount of grassland you have'
    },
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 999
      },
      text: 'Area of grassland land must be between 0 and 999'
    },
    validationRules: [{
      operator: 'lessThanInclusive',
      priority: 10,
      text: 'Area of grassland land must be less than or equal to 999',
      value: 999
    }, {
      operator: 'greaterThan',
      priority: 1,
      text: 'Area of grassland land must be greater than 0',
      value: 0
    }]
  },
  hedgerow: {
    id: 'hedgerow',
    paymentRate: 111,
    percentage: 5,
    ui: {
      hint: 'Need to think about this for hedgerows. Payment rate is £111 per meter of hedgerow.',
      text: 'Enter the length of hedgerow you have'
    },
    units: {
      name: 'meters',
      symbol: 'm'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 500
      },
      text: 'Length of hedgerow must be between 0 and 500'
    },
    validationRules: [{
      operator: 'lessThanInclusive',
      priority: 10,
      text: 'Length of hedgerow must be less than or equal to 500',
      value: 500
    }, {
      operator: 'greaterThan',
      priority: 1,
      text: 'Length of hedgerow must be greater than 0',
      value: 0
    }]
  }
}
