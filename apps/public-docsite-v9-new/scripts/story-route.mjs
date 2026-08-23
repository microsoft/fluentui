/**
 * A story's page path, derived in one place.
 *
 * Two callers need it: `generate-pages.mjs`, which creates the pages, and `migrate-mdx.mjs`,
 * which rewrites conceptual pages' links to point at them. They derived it separately and
 * disagreed — the codemod used the story's directory, so `Components/Accordion` was linked as
 * `/react/accordion` while the page was generated at `/react/components/accordion`. Every such
 * link 404'd.
 */

/** `TeachingPopover` -> `teaching-popover`. */
export function toKebab(name) {
  return (
    name
      .trim()
      // `TeachingPopover` -> `Teaching-Popover`
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // `ARIALive` -> `ARIA-Live`, but leave `APIs` intact (one trailing lowercase is a plural)
      .replace(/([A-Z]+)([A-Z][a-z]{2,})/g, '$1-$2')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

/** The `title` a story's `meta` declares, if it has one. */
export function storyTitle(source) {
  const match = source.match(/title:\s*'([^']+)'|title:\s*"([^"]+)"/);
  return match?.[1] ?? match?.[2];
}

/**
 * The page path for a story, relative to its tree.
 *
 * The path comes from `meta.title` rather than the directory, because the title is what
 * carries the information architecture Storybook presents (`Components/Badge/CounterBadge`,
 * `Utilities/...`, `Compat Components/...`). Directories alone flatten every component to
 * the root and lose it.
 *
 * @param source Contents of the story entry point.
 * @param fallbackName Used when the story declares no title.
 */
export function storySlug(source, fallbackName) {
  const segments = (storyTitle(source) ?? fallbackName).split('/').map(segment => segment.trim());

  // `Components/Button/Button` presents as Components > Button; keep the path that shape.
  if (segments.length > 1 && segments.at(-1) === segments.at(-2)) {
    segments.pop();
  }

  return segments.map(toKebab).join('/');
}
