import { StyleBucketName } from '../types';

/**
 * Maps the long pseudo name to the short pseudo name. Pseudos that match here will be ordered, everything else will
 * make their way to default style bucket. We reduce the pseudo name to save bundlesize.
 * Thankfully there aren't any overlaps, see: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes.
 */
const pseudosMap: Record<string, StyleBucketName | undefined> = {
  // :focus-within
  'us-w': 'w',
  // :focus-visible
  'us-v': 'i',

  // :link
  nk: 'l',
  // :visited
  si: 'v',
  // :focus
  cu: 'f',
  // :hover
  ve: 'h',
  // :active
  ti: 'a',
};

/**
 * Gets the bucket depending on the pseudo.
 *
 * Input:
 *
 * ```
 * ":hover"
 * ":focus:hover"
 * ```
 *
 * Output:
 *
 * ```
 * "h"
 * "f"
 * ```
 */
export function getStyleBucketName(pseudo: string, media: string, support: string): StyleBucketName {
  // We are grouping all the at-rules like @media, @supports etc under `t` bucket.
  if (media || support) {
    return 't';
  }

  const normalizedPseudo = pseudo.trim();

  if (normalizedPseudo.charCodeAt(0) === 58 /* ":" */) {
    // We send through a subset of the string instead of the full pseudo name.
    // For example:
    // - `"focus-visible"` name would instead of `"us-v"`.
    // - `"focus"` name would instead of `"us"`.
    // Return a mapped pseudo else default bucket.

    return (
      pseudosMap[normalizedPseudo.slice(4, 8)] /* allows to avoid collisions between "focus-visible" & "focus" */ ||
      pseudosMap[normalizedPseudo.slice(3, 5)] ||
      ''
    );
  }

  // Return default bucket
  return '';
}
