// @ts-check

// Config file for API doc JSON (*.page.json) generation

const fs = require('fs');
const path = require('path');
const { findRepoDeps, findGitRoot } = require('@fluentui/scripts/monorepo');

// note: react-components itself isn't included here because it only re-exports things
const packagePaths = findRepoDeps({ cwd: path.resolve(__dirname, '..'), dev: false }).map(dep => dep.packagePath);
const gitRoot = findGitRoot();

const components = [
  'Accordion',
  'Avatar',
  'Badge',
  'CounterBadge',
  'PresenceBadge',
  'Button',
  'CompoundButton',
  'MenuButton',
  'SplitButton',
  'ToggleButton',
  'Card',
  // 'Checkbox',
  'Divider',
  'Image',
  // 'Input',
  'Label',
  'Link',
  'Menu',
  'Popover',
  'Portal',
  'FluentProvider',
  // 'Slider',
  // 'Switch',
  // 'Tabs',
  'Text',
  'Tooltip',
];

/** @type {import('@fluentui/api-docs').IPageJsonOptions} */
module.exports = {
  apiJsonPaths: packagePaths
    .map(packagePath => path.join(gitRoot, packagePath, 'dist', path.basename(packagePath) + '.api.json'))
    .filter(apiJsonPath => fs.existsSync(apiJsonPath)),
  // TODO: figure out where these should actually go
  outputRoot: path.resolve(__dirname, '../dist/api'),
  inferDocCategoryByPrefix: true,
  // include extra items for utility packages
  includeExtraItemsForPackages: packagePaths
    .map(packagePath => path.basename(packagePath))
    .filter(unscopedPkg => !components.some(comp => unscopedPkg === `react-${comp.toLowerCase()}`)),
  strict: true,
  fallbackGroup: 'references',
  pageGroups: {
    'react-components': components,
  },
};
