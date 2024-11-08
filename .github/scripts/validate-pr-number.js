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

// function validateAndSetOutput() {
//   try {
//     // Read the ID from pr.txt in the results directory
//     const filePath = path.join(__dirname, 'results', 'pr.txt');
//     const fileContent = fs.readFileSync(filePath, 'utf-8').trim();

//     // Validate the ID as a number
//     const prNumber = Number(fileContent);
//     if (isNaN(prNumber) || !Number.isInteger(prNumber)) {
//       throw new Error('The ID in pr.txt is not a valid integer.');
//     }

//     // Write the validated ID to GitHub Actions output
//     console.log(`id=${prNumber}`);
//     fs.appendFileSync(process.env.GITHUB_OUTPUT, `id=${prNumber}\n`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit with an error code to signal failure
//   }
// }
