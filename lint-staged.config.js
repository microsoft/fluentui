// @ts-check

// https://www.npmjs.com/package/lint-staged
module.exports = {
  // Run eslint in fix mode for applicable files followed by prettier.
  // - The eslint wrapper handles filtering which files should be linted, since we need to both:
  //   - respect ignore files (which eslint doesn't do by default when passed a specific file path)
  //   - match the set of files that are linted by the package's normal `lint` command
  // - Prettier must be run in sequence after eslint since both of them can modify files
  // TODO: Once web-components prettier is updated, revert the config to this single line:
  // '*': ['node ./scripts/lint-staged/eslint', 'prettier --write'],
  '{apps,scripts,tools,packages/!(web-components)}/**/*': ['node ./scripts/lint-staged/eslint', 'prettier --write'],
};
