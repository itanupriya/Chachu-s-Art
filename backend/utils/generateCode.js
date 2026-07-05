const Design = require("../models/Design");

// generates something like BIKE-001, CAR-014, GLASS-007
async function generateCode(category) {
  const prefix = category.toUpperCase();

  const countInCategory = await Design.countDocuments({ category });
  const nextNumber = countInCategory + 1;

  // pad with zeros, e.g. 1 -> 001
  const padded = String(nextNumber).padStart(3, "0");

  return `${prefix}-${padded}`;
}

module.exports = generateCode;
