// @ts-check

const { prettierSupportedFileExtensionsByContext } = require('@fluentui/scripts-prettier');

const commands = {
  format: 'prettier --write',
  /**
   * Run eslint in fix mode for applicable files followed by prettier.
   * The eslint wrapper handles filtering which files should be linted, since we need to both:
   * - respect ignore files (which eslint doesn't do by default when passed a specific file path)
   * - match the set of files that are linted by the package's normal `lint` command
   */
  lint: 'node ./scripts/lint-staged/src/eslint',
};

const nonJsExtensions = [
  prettierSupportedFileExtensionsByContext.stylesheets,
  prettierSupportedFileExtensionsByContext.markdown,
  prettierSupportedFileExtensionsByContext.others,
].flat();

// https://www.npmjs.com/package/lint-staged
module.exports = {
  [`**/*.{${nonJsExtensions}}`]: [commands.format],
  [`**/*.{${prettierSupportedFileExtensionsByContext.js}}`]: [/* commands.format, */ commands.lint],
};
