/**
 * Normalize a story file's raw source for display in the docs page's
 * "Show code" panel:
 *
 *   - Strip any leftover `withStorySource` plumbing (kept idempotent in case a
 *     few stories haven't been migrated yet).
 *   - Rewrite colocated `*.module.css` import paths to `./styles/<basename>`,
 *     matching the layout used by the generated Stackblitz sandbox so the
 *     snippet is paste-ready.
 *   - Collapse blank-line runs left behind by removed lines.
 */
export function cleanStorySource(source: string): string {
  return source
    .replace(/^import\s+\w+\s+from\s+['"]\..*?\.stories\?raw['"];\s*\r?\n/m, '')
    .replace(/^import\s*\{\s*withStorySource\s*\}\s*from\s+['"][^'"]+['"];\s*\r?\n/m, '')
    .replace(/^\w+\.parameters\s*=\s*withStorySource\([\s\S]*?\);\s*\r?\n?/m, '')
    .replace(
      /(['"])(?:\.{1,2}\/)+(?:[^'"\/]+\/)*([^'"\/]+\.module\.css)\1/g,
      (_match, quote, basename) => `${quote}./styles/${basename}${quote}`,
    )
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()
    .concat('\n');
}
