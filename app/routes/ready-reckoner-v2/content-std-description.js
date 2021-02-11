function improvedGrassland (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} for each hectare of land</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Graze pastures to retain an average sward height of at least 5cm</li>
      <li>Leave at least 33% of hay and silage field margins uncut</li>
      <li>Maintain a buffer around in-field trees</li>
      <li>Maintain permanent grassland in areas of historic interest</li>
      <li>Use a nutrient management plan</li>
      <li>Take field corners or small areas out of grazing and cutting management</li>
    </ol>
    <p class="govuk-body">You’ll get an extra <strong>£${rates.optionalActions[0].landRate} for each tree</strong> you maintain a buffer around.</p>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">improved grassland standard (opens in a new tab)</a></p>`
}

function improvedGrasslandSoils (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} for each hectare of land</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Do a soil assessment to help manage carbon storage and flood risk</li>
      <li>Maintain good soil structure</li>
      <li>Establish or sow grassland seed on fields at high risk of flood runoff or soil erosion</li>
      <li>Avoid poaching of grazed, permanent grassland</li>
      <li>Reduce soil compaction risk by avoiding machinery traffic</li>
      <li>Re-seed grassland at risk of flooding, runoff and erosion by direct drilling or over-sowing</li>
    </ol>
    <h3 class="govuk-heading-m">Additional actions and payments</h3>
    <ul class="govuk-list govuk-list--bullet">
      <li><strong>£${rates.optionalActions[0].landRate} a hectare</strong> for reducing or removing livestock from wet soils</li>
      <li><strong>£${rates.optionalActions[1].landRate} a hectare</strong> for maintaining permanent grassland that you only re-seed by direct drilling or over-sowing.</li>
    </ul>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">improved grassland soils standard (opens in a new tab)</a></p>`
}

function unimprovedGrassland (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} for each hectare of land</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Maintain a buffer around in-field trees</li>
      <li>Manage weeds and invasive or competitive species</li>
      <li>Use organic fertiliser on fields cut for forage</li>
      <li>Use supplementary feeding that does not cause poaching or overgrazing</li>
      <li>Carry in-channel ditch management rotation at least every 3 years</li>
      <li>Graze pastures to retain an average sward height of at least 5cm, <strong>or</strong> graze rotationally, with rest periods</li>
    </ol>
    <p class="govuk-body">If you use this standard on <a href="https://www.gov.uk/guidance/protected-areas-sites-of-special-scientific-interest">Site of Special Scientific Interest (SSSI)</a> land and priority habitats, you need to graze and/or cut to maintain <a href="">the appropriate sward height for the grassland type</a>.</p>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">semi-improved and unimproved grassland standard (opens in a new tab)</a></p>`
}

function arableLand (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} for each hectare of land</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Provide food and shelter for farmland wildlife</li>
      <li>Maintain a nutrient management plan</li>
      <li>Maintain a buffer around in-field trees</li>
      <li>Mix organic manures and slurry into land you’ll cultivate</li>
    </ol>
    <p class="govuk-body">You’ll get an extra <strong>£${rates.optionalActions[0].landRate} for each tree</strong> you maintain a buffer around.</p>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">arable land standard (opens in a new tab)</a></p>`
}

function arableSoils (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} for each hectare of land</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Carry out a soil structure assessment</li>
      <li>Maintain good soil structure</li>
      <li>Minimise bare soil and maintain winter soil cover on cultivated land</li>
      <li>Establish green cover on fields at risk of flooding, runoff and erosion</li>
      <li>Provide organic matter on at least 25% of your arable land</li>
    </ol>
    <p class="govuk-body">You’ll get an extra <strong>£${rates.optionalActions[0].landRate} a hectare</strong> to establish green cover on land at high risk of surface runoff, soil erosion or regular floods.</p>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">arable and horticultural soils standard (opens in a new tab)</a></p>`
}

function hedgerows (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} a hectare</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Make a 4 metre buffer strip along both sides of all hedgerows</li>
      <li>Cut a maximum of 50% of total hedgerow length each year on rotation</li>
      <li>Maintain at least 25 trees within the hedgerows</li>
    </ol>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">hedgerows standard (opens in a new tab)</a></p>`
}

function waterbody (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} a hectare</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Carry out a runoff and soil erosion risk assessment</li>
      <li>Establish or maintain 6m waterbody grass buffer strips adjacent to waterbodies</li>
      <li>Keep livestock off buffer strips</li>
    </ol>
    <div class="govuk-inset-text">
      You’ll also get a nominal payment if you choose to establish in-field grass strips to intercept runoff water.
    </div>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">waterbody buffering standard (opens in a new tab)</a></p>`
}

function woodland (rates) {
  return `
    <p class="govuk-body">We’ll pay you <strong>£${rates.landRate} a hectare</strong>.</p>
    <ol class="govuk-list govuk-list--number">
      <li>Carry out a woodland condition assessment</li>
      <li>Attend an online woodland threats awareness webinar</li>
      <li>Create and manage temporary open spaces and rides</li>
      <li>Create and manage deadwood in woodland</li>
    </ol>
    <p class="govuk-body">You’ll get an extra <strong>£${rates.optionalActions[0].landRate} a hectare</strong> to maintain new trees (less than 15 years old). You will also get one-off extra payments by:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>attending the webinar - £${rates.optionalActions[0].additionalPayments.webinar}</li>
      <li>completing the woodland condition assessment - £${rates.optionalActions[0].additionalPayments.assessment}</li>
    </ul>
    <div class="govuk-inset-text">
      If you need to fell trees to create open space in non-ancient woodland, check if you need to <a href="https://www.gov.uk/guidance/tree-felling-licence-when-you-need-to-apply">apply for a felling licence</a>.
    </div>
    <p class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-6">Find out more about the <a href="" target="_blank">farm woodland standard (opens in a new tab)</a></p>`
}

module.exports = (standardId, rates) => {
  switch (standardId) {
    case 'arable':
      return arableLand(rates)
    case 'arable-soils':
      return arableSoils(rates)
    case 'hedgerows':
      return hedgerows(rates)
    case 'improved-grassland':
      return improvedGrassland(rates)
    case 'improved-grassland-soils':
      return improvedGrasslandSoils(rates)
    case 'unimproved-grassland':
      return unimprovedGrassland(rates)
    case 'waterbody-buffers':
      return waterbody(rates)
    case 'woodland':
      return woodland(rates)
  }
}
