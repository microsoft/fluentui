import { clsx } from 'clsx';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';

import styles from './TeachingPopoverBody.module.css';

/**
 * TeachingPopoverBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverBodyClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-body',
};

/**
 * The four `media` classes, keyed exactly as the `makeStyles` slice map this replaces
 * (`base` plus the three `mediaLength` steps), so `mediaStyles[mediaLength]` still indexes.
 */
const mediaStyles = {
  base: styles.media,
  short: styles['media-short'],
  medium: styles['media-medium'],
  tall: styles['media-tall'],
};

/**
 * Retained with its name and its `useX()` call shape — the cookbook's "delete no exports"
 * rule. It is re-exported from `components/TeachingPopoverBody/index.ts`, though not from the
 * package's public `src/index.ts` (it is absent from `etc/react-teaching-popover.api.md`).
 * It is no longer a React hook: it reads a static class map and calls nothing.
 */
export const useMediaStyles = (): typeof mediaStyles => mediaStyles;

/** Applies style classnames to slots */
export const useTeachingPopoverBodyStyles_unstable = (state: TeachingPopoverBodyState): TeachingPopoverBodyState => {
  const { mediaLength } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, teachingPopoverBodyClassNames.root, state.root.className);

  if (state.media) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    state.media.className = clsx(mediaStyles.base, mediaStyles[mediaLength], state.media.className);
  }

  return state;
};
