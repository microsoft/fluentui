const { default: Ajv } = require('ajv');
const Babel = require('@babel/core');
const fs = require('fs').promises;
const path = require('path');

const fixtureSchema = require('../schema.json');
const ajv = new Ajv();

/** @typedef {{ name: string }} FixtureMetadata */
/** @typedef {{ absolutePath: string, relativePath: string, name: string }} PreparedFixture */

/**
 * Prepares a fixture file to be compiled with Webpack, grabs data from a default export and removes it.
 *
 * @param {string} fixture
 *
 * @return {Promise<PreparedFixture>}
 */
module.exports = async function prepareFixture(fixture) {
  const sourceFixturePath = path.resolve(process.cwd(), fixture);
  const sourceFixtureCode = await fs.readFile(sourceFixturePath, 'utf8');

  const result = await Babel.transformAsync(sourceFixtureCode, {
    ast: false,
    code: true,

    // This instance of Babel should ignore all user's configs and apply only our plugin
    configFile: false, // https://babeljs.io/docs/en/options#configfile
    babelrc: false, // https://babeljs.io/docs/en/options#babelrc

    plugins: [
      // A Babel plugin that:
      // - reads metadata (name, threshold, etc.)
      // - removes a default export with metadata
      {
        visitor: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ExportDefaultDeclaration(exportPath, state) {
            const evaluationResult = exportPath.get('declaration').evaluate();

            if (!evaluationResult.confident) {
              // TODO: proper error reporting
              throw new Error();
            }

            const valid = ajv.validate(fixtureSchema, evaluationResult.value);

            if (!valid) {
              throw new Error(`Validation failed for a schema in a component: ${ajv.errorsText(ajv.errors)}`);
            }

            state.file.metadata = evaluationResult.value;
            exportPath.remove();
          },
        },
      },
    ],
  });

  /**
   * @param {typeof result} value
   * @return {value is Required<NonNullable<typeof result>> & {metadata: FixtureMetadata}}
   */
  function isTransformedFixtureResultHasMetadata(value) {
    return Boolean(value && value.metadata && Object.keys(value.metadata).length);
  }

  if (!isTransformedFixtureResultHasMetadata(result)) {
    throw new Error(
      [
        'A fixture file should contain a default export with metadata.',
        "For example: export default { name: 'Test fixture' }",
      ].join('\n'),
    );
  }

  const outputFixturePath = path.resolve(process.cwd(), 'dist', fixture);

  await fs.mkdir(path.dirname(outputFixturePath), { recursive: true });
  await fs.writeFile(outputFixturePath, result.code);

  return {
    absolutePath: outputFixturePath,
    relativePath: fixture,

    name: result.metadata.name,
  };
};
