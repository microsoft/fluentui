/**
 * Storybook docs helper: attaches a story file's own source as
 * `parameters.docs.source.originalSource` so the Show-code panel renders the
 * actual TSX (not just the meta-level CSS appended by `withCssModuleSource`).
 *
 * Storybook's CSF source loader (`enrichCsf`) doesn't follow re-exports — when
 * `index.stories.tsx` only does `export { Default } from './XDefault.stories'`,
 * the loader emits no `originalSource` for `Default`, and the meta-level
 * `parameters.docs.source.transform` ends up running on an empty string. This
 * helper closes that gap by importing the file's own contents via webpack's
 * `?raw` query and pinning them to the story.
 *
 * Usage in an `<Component>Default.stories.tsx`:
 *
 *   import storySource from './ButtonDefault.stories?raw';
 *   import { withStorySource } from '../_helpers/withStorySource';
 *
 *   export const Default = (): React.ReactNode => …;
 *   Default.parameters = withStorySource(storySource);
 *
 * Pass `extra` to merge additional `parameters` (e.g. existing
 * `parameters.docs.description`):
 *
 *   Default.parameters = withStorySource(storySource, {
 *     docs: { description: { story: '…' } },
 *   });
 */

type Parameters = Record<string, unknown> & {
  docs?: Record<string, unknown> & {
    source?: Record<string, unknown>;
  };
};

/**
 * Strip the internal `withStorySource` plumbing so the displayed code is
 * exactly what a consumer would paste into their own project. We remove:
 *  - the `import storySource from './*.stories?raw';` line
 *  - the `import { withStorySource } from '...';` line
 *  - the trailing `<StoryName>.parameters = withStorySource(storySource…);`
 *  - the now-blank line(s) those leave behind
 */
function cleanStorySource(source: string): string {
  return (
    source
      .replace(/^import\s+\w+\s+from\s+['"]\..*?\.stories\?raw['"];\s*\r?\n/m, '')
      .replace(/^import\s*\{\s*withStorySource\s*\}\s*from\s+['"][^'"]+['"];\s*\r?\n/m, '')
      .replace(/^\w+\.parameters\s*=\s*withStorySource\([\s\S]*?\);\s*\r?\n?/m, '')
      // Rewrite the deeply-relative `theme/components/<file>.module.css` paths
      // to a colocated `./styles/<file>.module.css` so the snippet matches what
      // the user actually gets in the Stackblitz sandbox (and is paste-ready
      // into a project that follows the same colocation convention).
      .replace(
        /(['"])(?:\.\.\/)+theme\/components\/([^'"]+\.module\.css)\1/g,
        (_match, quote, basename) => `${quote}./styles/${basename}${quote}`,
      )
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd()
      .concat('\n')
  );
}

export function withStorySource(storySource: string, extra: Parameters = {}): Parameters {
  const cleaned = cleanStorySource(storySource);
  const extraDocs = (extra.docs ?? {}) as Record<string, unknown> & {
    source?: Record<string, unknown>;
  };
  const params: Parameters = {
    ...extra,
    docs: {
      ...extraDocs,
      source: {
        ...(extraDocs.source ?? {}),
        // `code` takes precedence in Storybook's Source block — we set it
        // explicitly so the panel shows the full file (imports included)
        // rather than the bare JSX body that the CSF source loader extracts
        // from the right-hand side of the `export const Default = ...`.
        code: cleaned,
        originalSource: cleaned,
      },
    },
  };

  // The `@fluentui/babel-preset-storybook-full-source` plugin appends a
  // `Default.parameters.fullSource = '<post-babel source>';` statement at the
  // end of the compiled story file. That post-babel source has had every
  // relative import stripped — including our `import styles from
  // '../../../../../../theme/components/<file>.module.css';` line — which
  // breaks the "Open in Stackblitz" sandbox (the example references `styles`
  // but never imports it).
  //
  // Defining `fullSource` as a non-writable getter swallows the babel
  // assignment so our cleaned source (with imports preserved) wins.
  Object.defineProperty(params, 'fullSource', {
    get: () => cleaned,
    set: () => {
      /* swallow the babel preset's overwrite */
    },
    configurable: true,
    enumerable: true,
  });

  return params;
}
