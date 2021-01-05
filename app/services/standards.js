module.exports = {
  arable: {
    bounds: {
      lower: 0,
      upper: 999
    },
    hint: 'A minimum of 5% of all arable land will need to be set aside. Payment rate is £123 per hectare of total arable land area.',
    id: 'arable',
    paymentRate: 123,
    percentage: 5,
    text: 'Enter the amount of arable land you have',
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      text: 'Please fix this generic error for the arable field'
    }
  },
  grassland: {
    bounds: {
      lower: 0,
      upper: 999
    },
    hint: 'A minimum of 5% of all grassland will need to be set aside. Payment rate is £456 per hectare of total grassland area.',
    id: 'grassland',
    paymentRate: 456,
    percentage: 5,
    text: 'Enter the amount of grassland you have',
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      text: 'Please fix this generic error for the grassland field'
    }
  }
}