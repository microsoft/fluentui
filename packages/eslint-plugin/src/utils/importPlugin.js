// @ts-check
/** @type {import('eslint').ESLint.Plugin & {flatConfigs: Record<string, import('eslint').Linter.Config>}} */
// @ts-expect-error -- eslint-plugin-import does not ship declarations.
const importPlugin = require('eslint-plugin-import');
const path = require('node:path');
const { getWorkspacePackages } = require('./workspaceResolver');
const upstreamRule = importPlugin.rules?.['no-extraneous-dependencies'];
if (!upstreamRule) {
  throw new Error('eslint-plugin-import must provide no-extraneous-dependencies.');
}

const plugin = {
  ...importPlugin,
  rules: {
    ...importPlugin.rules,
    'no-extraneous-dependencies': {
      ...upstreamRule,
      /** @param {import('eslint').Rule.RuleContext} context */
      create(context) {
        const packages = getWorkspacePackages(context.physicalFilename);
        const resolver = context.settings['import/resolver'] ?? { node: context.settings['import/resolve'] };
        const externalFolders = context.settings['import/external-module-folders'];
        // A derived context keeps resolver changes confined to this rule.
        const workspaceContext = Object.create(context, {
          settings: {
            value: {
              ...context.settings,
              'import/external-module-folders': [
                ...(Array.isArray(externalFolders) ? externalFolders : ['node_modules']),
                ...Object.values(packages).filter(
                  manifest => !context.physicalFilename.startsWith(`${path.dirname(manifest)}${path.sep}`),
                ),
              ],
              'import/resolver': [{ [require.resolve('./workspaceResolver')]: { packages } }, resolver],
            },
          },
        });
        return upstreamRule.create(workspaceContext);
      },
    },
  },
};

module.exports = plugin;
