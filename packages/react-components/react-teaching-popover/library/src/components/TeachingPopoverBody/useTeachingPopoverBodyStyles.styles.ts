import { clsx } from 'clsx';
import type { TeachingPopoverBodyState } from './TeachingPopoverBody.types';

import styles from './TeachingPopoverBody.module.css';

/**
 * TeachingPopoverBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverBody` / `fui-TeachingPopoverBody__media` BEM statics are gone (D16.1),
 * and the type has narrowed from `SlotClassNames<TeachingPopoverBodySlots>` to
 * `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverBodyClassNames.root` is invalid CSS. Use
 * `fuiSelector(teachingPopoverBodyClassNames.root)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would throw on its `/` under jsdom (D15.1). The `fui-TeachingPopoverBody`
  // BEM static that used to lead this call is gone (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TeachingPopoverBody.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-teaching-popover-body', state.root.className);

  if (state.media) {
    // No marker here: D15.1 puts exactly one marker on the component's OUTERMOST slot.
    // `mediaLength` selects a module class rather than a `data-*` attribute — this hook holds
    // the slot object and applies the class to the very element it styles, so there is no
    // state a selector cannot otherwise reach (D15.6, resolved).
    state.media.className = clsx(mediaStyles.base, mediaStyles[mediaLength], state.media.className);
  }

  return state;
};
