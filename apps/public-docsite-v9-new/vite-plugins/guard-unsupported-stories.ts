import type { Plugin } from 'vite';

const STORY_FILE = /\.stories\.(?:jsx?|tsx?)$/;

/**
 * Authoring capabilities the documentation site does not implement.
 *
 * The corpus currently uses none of these (0 `play` functions, 0 `render` in meta,
 * 0 `useGlobals`, 0 `parameters.docs.source` overrides), so this guard exists to catch a
 * story that starts using one — rather than letting it silently render blank or wrong.
 */
const UNSUPPORTED = [
  {
    pattern: /\bplay\s*[:=]\s*(?:async\s*)?\(/,
    capability: 'play functions',
    reason: 'interaction tests belong in Storybook; the docs site renders examples statically',
  },
  {
    pattern: /\buseGlobals\b/,
    capability: 'Storybook globals (useGlobals)',
    reason: 'the docs site supplies theme and direction through its own React context',
  },
  {
    pattern: /parameters\s*\.\s*docs\s*\.\s*source\b|docs\s*:\s*\{[^}]*\bsource\s*:/,
    capability: 'parameters.docs.source overrides',
    reason: 'displayed source comes from the build-injected fullSource (design D2)',
  },
  {
    pattern: /from\s+['"]@storybook\/test['"]|from\s+['"]storybook\/test['"]/,
    capability: '@storybook/test imports',
    reason: 'test-only helpers cannot be bundled into the documentation site',
  },
] as const;

/**
 * Fails the build, naming the module and the capability, when a story uses something the
 * site does not support (`docsite/story-integration`: "Story modules unsupported by the
 * site fail the build").
 */
export function guardUnsupportedStories(): Plugin {
  return {
    name: 'fluentui:guard-unsupported-stories',
    enforce: 'pre',

    transform(code, id) {
      const [filename] = id.split('?');

      if (!STORY_FILE.test(filename)) {
        return null;
      }

      for (const { pattern, capability, reason } of UNSUPPORTED) {
        if (pattern.test(code)) {
          this.error(
            `Unsupported story capability: ${capability}\n` +
              `  module: ${filename}\n` +
              `  reason: ${reason}\n` +
              `If this example should ship, implement support first — do not silently drop it.`,
          );
        }
      }

      return null;
    },
  };
}
