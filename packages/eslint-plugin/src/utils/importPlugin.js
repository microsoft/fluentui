// @ts-check
/** @type {import('eslint').ESLint.Plugin & {flatConfigs: Record<string, import('eslint').Linter.Config>}} */
// @ts-expect-error -- eslint-plugin-import does not ship declarations.
const importPlugin = require('eslint-plugin-import');
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
        const resolver = context.settings['import/resolver'] ?? { node: context.settings['import/resolve'] };
        const externalFolders = context.settings['import/external-module-folders'];
        const workspaceFolders = Array.isArray(externalFolders) ? [...externalFolders] : ['node_modules'];
        // A derived context keeps resolver changes confined to this rule.
        const workspaceContext = Object.create(context, {
          settings: {
            value: {
              ...context.settings,
              'import/external-module-folders': workspaceFolders,
              // The resolver validates manifest freshness and classifies newly discovered workspaces.
              'import/cache': { lifetime: 0 },
              'import/resolver': [
                { [require.resolve('./workspaceResolver')]: { externalFolders: workspaceFolders } },
                resolver,
              ],
            },
          },
        });
        return upstreamRule.create(workspaceContext);
      },
    },
  },
};

module.exports = plugin;
