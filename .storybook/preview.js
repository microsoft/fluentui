// Emits the shared Tailwind theme layer once per document (see the file's header).
// Required by windmod-preview `*.module.css`. Package/app previews import this module,
// so the side effect reaches all of them.
import '../scripts/storybook/src/tailwind-theme.css';
import '../packages/react-components/react-storybook-addon/src/styles.css';
import '../packages/react-components/react-storybook-addon-export-to-sandbox/src/styles.css';
import { webLightThemeClassName } from '@fluentui/react-tailwind-theme-preview/theme-class-names';
import { withLinks } from '@storybook/addon-links';

/*
 * Stands in for the theme class a real application applies at its root.
 *
 * The theme stylesheet bakes no default (operator ruling 2026-08-28, "Theme delivery"):
 * importing a theme file makes its class AVAILABLE, and the class still has to be applied —
 * the same two steps Griffel asks for with `import { webLightTheme }` +
 * `<FluentProvider theme={webLightTheme}>`. Web light is the storybook's document theme, so
 * this is where it gets set. A story that wants another theme wraps its subtree in a
 * FluentProvider with that theme's class, which overrides this one locally.
 *
 * On `documentElement`, and `add` rather than assignment, so it composes with anything else
 * that classes the root and reaches shadow-DOM-free subtrees the same way `:root` did before
 * the split. The class name is imported rather than written out so it stays in lockstep with
 * the generated stylesheet.
 */
document.documentElement.classList.add(webLightThemeClassName);

/** @typedef {import('../packages/react-components/react-storybook-addon-export-to-sandbox/src/index').Parameters & import('@storybook/react').Parameters} Parameters */

/** @type {import('@storybook/react').Decorator[]} */
export const decorators = [withLinks];

/** @type {Parameters} */
export const parameters = {
  viewMode: 'docs',
  controls: {
    disable: true,
    expanded: true,
  },
  docs: {
    source: {
      excludeDecorators: true,
      type: 'code',
    },
  },
  exportToSandbox: {
    provider: 'stackblitz-cloud',
    bundler: 'vite',
    requiredDependencies: {
      // for React
      react: '^18',
      'react-dom': '^18',
      // necessary for FluentProvider:
      '@fluentui/react-components': '^9.0.0',
    },
    optionalDependencies: {
      '@fluentui/react-icons': 'latest',
    },
  },
};
