// @ts-check

const { readFileSync } = require('node:fs');

module.exports = main;

/**
 *
 * @param {{filePath:string}} options
 * @returns {number}
 */
function main(options) {
  return validatePrNumber(options.filePath);
}

/**
 *
 * @param {string} filePath
 * @returns {number}
 */
function validatePrNumber(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8').trim();
    const prNumber = Number(content);

    if (isNaN(prNumber) || !Number.isInteger(prNumber)) {
      throw new Error('The ID in pr.txt is not a valid PR number.');
    }

    console.info('✅ PR ID valid');
    return prNumber;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
