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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InteractionTagPrimarySlots, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import { tagSharedSlotStyles } from '../Tag/useTagStyles.styles';

import styles from './InteractionTagPrimary.module.css';

export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> = {
  root: 'fui-InteractionTagPrimary',
  media: 'fui-InteractionTagPrimary__media',
  icon: 'fui-InteractionTagPrimary__icon',
  primaryText: 'fui-InteractionTagPrimary__primaryText',
  secondaryText: 'fui-InteractionTagPrimary__secondaryText',
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

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this InteractionTagPrimary's state, because `styles.root` is hashed and
  // unaddressable from outside this file. `data-size` is already stamped on this very
  // element above (DECISIONS.md D15, Tier 0 — no state mirrors needed).
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // InteractionTagPrimary.module.css, not by the order of these arguments — see that file's
  // header for the mapping back to the mergeClasses() argument order this replaces,
  // including why the `.fui-Icon-*` swaps sit in an UNLAYERED block.
  state.root.className = clsx(
    'group/fui-interaction-tag-primary',
    interactionTagPrimaryClassNames.root,

    styles.root,
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

    state.media.className = clsx(
      interactionTagPrimaryClassNames.media,
      tagSharedSlotStyles.media,
      state.media.className,
    );
  }
  if (state.icon) {
    const icon = state.icon as NonNullable<InteractionTagPrimaryState['icon']> &
      InteractionTagPrimarySizeDataAttributes;
    icon['data-size'] = size;

    state.icon.className = clsx(interactionTagPrimaryClassNames.icon, tagSharedSlotStyles.icon, state.icon.className);
  }
  if (state.primaryText) {
    const primaryText = state.primaryText as NonNullable<InteractionTagPrimaryState['primaryText']> &
      InteractionTagPrimarySizeDataAttributes;
    primaryText['data-size'] = size;

    state.primaryText.className = clsx(
      interactionTagPrimaryClassNames.primaryText,

      tagSharedSlotStyles.primaryText,

      state.secondaryText
        ? tagSharedSlotStyles.primaryTextWithSecondaryText
        : tagSharedSlotStyles.primaryTextWithoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      interactionTagPrimaryClassNames.secondaryText,
      tagSharedSlotStyles.secondaryText,
      state.secondaryText.className,
    );
  }

  return state;
};
