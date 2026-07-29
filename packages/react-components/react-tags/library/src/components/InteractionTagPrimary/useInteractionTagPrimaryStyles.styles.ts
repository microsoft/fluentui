'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import { tagSharedSlotStyles } from '../Tag/useTagStyles.styles';

import styles from './InteractionTagPrimary.module.css';

/**
 * Public identity class for InteractionTagPrimary.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + interactionTagPrimaryClassNames.root` is an INVALID selector — `/` is legal in a
 * class TOKEN but terminates the name in selector position. Use
 * `fuiSelector(interactionTagPrimaryClassNames.root)` from `@fluentui/react-utilities`.
 */
export const interactionTagPrimaryClassNames: { root: string } = {
  root: 'group/fui-interaction-tag-primary',
};

/**
 * Data attributes rendered on the InteractionTagPrimary slots and matched by the shared
 * `@custom-variant` catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants
 * (DECISIONS.md D3). It is stamped on the ROOT and, separately, on the `media`, `icon` and
 * `primaryText` slots: those three blocks are SHARED with Tag (they live in
 * Tag.module.css) and so cannot be selected through a root class that only exists in this
 * component's module.
 *
 * Everything else the Griffel hook selected with a conditional `mergeClasses` argument
 * (`appearance`, `shape`, `selected && !disabled`, `!media && !icon`, `hasSecondaryAction`)
 * stays a conditional CLASS in the composition below.
 */
type InteractionTagPrimarySizeDataAttributes = {
  'data-size': InteractionTagPrimaryState['size'];
};

export const useInteractionTagPrimaryStyles_unstable = (
  state: InteractionTagPrimaryState,
): InteractionTagPrimaryState => {
  const { disabled, shape, size, appearance, selected } = state;

  const root = state.root as InteractionTagPrimaryState['root'] & InteractionTagPrimarySizeDataAttributes;

  root['data-size'] = size;

  // Module class FIRST, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe class; before D16
  // the removed `fui-InteractionTagPrimary` static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM
  // statics, InteractionTagPrimary's SOLE public identity class: it is the only handle by
  // which another module — in this package or any other — can style an element from this
  // component's state, because `styles.root` is hashed and unaddressable from outside this
  // file. `data-size` is already stamped on this very element above (DECISIONS.md D15,
  // Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // InteractionTagPrimary.module.css, not by the order of these arguments — see that file's
  // header for the mapping back to the mergeClasses() argument order this replaces,
  // including why the `.fui-Icon-*` swaps sit in an UNLAYERED block. Those two classes are
  // owned by `@fluentui/react-icons`, not by a converted package, so D16.1 leaves them.
  state.root.className = clsx(
    styles.root,
    'group/fui-interaction-tag-primary',

    styles[shape],

    shape === 'circular' && !state.hasSecondaryAction && styles['circular-without-secondary-action'],

    // `appearance` is one lowercase word (`filled` | `outline` | `brand`), so the module's
    // lowercase-kebab locals are still reachable by interpolation: `filled-disabled` etc.
    disabled ? styles[`${appearance}-disabled`] : styles[appearance],
    selected && !disabled && styles.selected,

    !state.media && !state.icon && styles['without-media'],
    state.hasSecondaryAction && styles['with-secondary-action'],

    state.root.className,
  );

  if (state.media) {
    const media = state.media as NonNullable<InteractionTagPrimaryState['media']> &
      InteractionTagPrimarySizeDataAttributes;
    media['data-size'] = size;

    state.media.className = clsx(tagSharedSlotStyles.media, state.media.className);
  }
  if (state.icon) {
    const icon = state.icon as NonNullable<InteractionTagPrimaryState['icon']> &
      InteractionTagPrimarySizeDataAttributes;
    icon['data-size'] = size;

    state.icon.className = clsx(tagSharedSlotStyles.icon, state.icon.className);
  }
  if (state.primaryText) {
    const primaryText = state.primaryText as NonNullable<InteractionTagPrimaryState['primaryText']> &
      InteractionTagPrimarySizeDataAttributes;
    primaryText['data-size'] = size;

    state.primaryText.className = clsx(
      tagSharedSlotStyles.primaryText,

      state.secondaryText
        ? tagSharedSlotStyles.primaryTextWithSecondaryText
        : tagSharedSlotStyles.primaryTextWithoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(tagSharedSlotStyles.secondaryText, state.secondaryText.className);
  }

  return state;
};
