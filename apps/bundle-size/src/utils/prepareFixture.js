// @ts-check

const { default: Ajv } = require('ajv');
const Babel = require('@babel/core');
const fs = require('fs-extra');
const path = require('path');

const ajv = new Ajv();

/**
 * A schema to validate metadata for bundle size stories.
 */
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    // TODO: add support for "threshold"
    // threshold: { type: ['number', 'null'] },
  },

  required: ['name' /* 'threshold' */],
  additionalProperties: false,
};

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
  const sourceFixtureCode = (await fs.promises.readFile(sourceFixturePath)).toString();

  const result = await Babel.transformAsync(sourceFixtureCode.toString(), {
    ast: false,
    code: true,

    babelrc: false,
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

            const valid = ajv.validate(schema, evaluationResult.value);

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

  if (!result || !result.metadata) {
    // TODO: proper error reporting
    throw new Error();
  }

  const outputFixturePath = path.resolve(process.cwd(), 'dist', fixture);
  await fs.outputFile(outputFixturePath, result.code);

  const metadata = /** @type {unknown} */ (result.metadata);
  const { name } = /** @type {FixtureMetadata} */ (metadata);

  return {
    absolutePath: outputFixturePath,
    relativePath: fixture,

    name,
  };
};
