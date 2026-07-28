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
import type { TagSlots, TagState } from './Tag.types';

import styles from './Tag.module.css';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  media: 'fui-Tag__media',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissIcon: 'fui-Tag__dismissIcon',
};

/**
 * Data attributes rendered on the Tag slots and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants
 * (DECISIONS.md D3). It is stamped on the ROOT (for its own height/padding rules) and,
 * separately, on every slot that has size-dependent rules of its own — `media`, `icon`,
 * `primaryText` and `dismissIcon`. The slots carry their own stamp rather than being
 * selected through the root because the first three blocks are SHARED with
 * InteractionTagPrimary, whose root is a different CSS-module class; see the "SHARED
 * SLOTS" note in Tag.module.css.
 *
 * Everything else the Griffel hook selected with a conditional `mergeClasses` argument
 * (`appearance`, `shape`, `selected && !disabled`, `!media && !icon`, `!dismissIcon`)
 * stays a conditional CLASS in the composition below — see Tag.module.css for why
 * `selected` in particular must NOT ride the catalog's `selected` variant.
 */
type TagSizeDataAttributes = {
  'data-size': TagState['size'];
};

/**
 * Class names for the four slots Tag SHARES with InteractionTagPrimary, whose rules are
 * defined once in Tag.module.css (see the "SHARED SLOTS" note there).
 *
 * This object is what InteractionTagPrimary consumes. It replaces the four Griffel hooks
 * below as the live mechanism: those were hooks only because `makeStyles` had to be, and
 * calling them from another styles hook now makes ESLint classify the caller as a React
 * hook — which re-enables `react-hooks/immutability` on the state-mutation pattern every
 * other converted package has shed (the pattern itself is removed repo-wide in Phase 3,
 * DECISIONS.md D14, not per conversion).
 *
 * Each slot needs exactly ONE class now: the size steps ride the slot's own `data-size`
 * attribute instead of a class per step. `primaryText` is the exception — its
 * `with`/`withoutSecondaryText` slices are genuinely separate rules.
 */
export const tagSharedSlotStyles = {
  media: styles.media,
  icon: styles.icon,
  primaryText: styles.primaryText,
  primaryTextWithSecondaryText: styles.primaryTextWithSecondaryText,
  primaryTextWithoutSecondaryText: styles.primaryTextWithoutSecondaryText,
  secondaryText: styles.secondaryText,
};

/**
 * The four Griffel hooks these replace are re-exported from `components/Tag/index.ts` and
 * `src/Tag.ts`, so they are kept with their names and their `useX()` call shape — the
 * cookbook's "delete no exports" rule. They now read from `tagSharedSlotStyles` above;
 * `usePrimaryTextStyles` keeps returning a map because its slices really are separate.
 */
const primaryTextStyles = {
  base: tagSharedSlotStyles.primaryText,
  withSecondaryText: tagSharedSlotStyles.primaryTextWithSecondaryText,
  withoutSecondaryText: tagSharedSlotStyles.primaryTextWithoutSecondaryText,
};

export const useIconStyles = (): string => tagSharedSlotStyles.icon;

export const useMediaStyles = (): string => tagSharedSlotStyles.media;

export const usePrimaryTextStyles = (): typeof primaryTextStyles => primaryTextStyles;

export const useSecondaryTextBaseClassName = (): string => tagSharedSlotStyles.secondaryText;

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const { disabled, shape, size, appearance, selected } = state;

  const root = state.root as TagState['root'] & TagSizeDataAttributes;

  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Tag.module.css, not by the
  // order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    tagClassNames.root,

    styles.root,
    styles[shape],

    disabled ? styles[`${appearance}Disabled`] : styles[appearance],
    selected && !disabled && styles.selected,

    !state.media && !state.icon && styles.withoutMedia,
    !state.dismissIcon && styles.withoutDismiss,

    state.root.className,
  );

  if (state.media) {
    const media = state.media as NonNullable<TagState['media']> & TagSizeDataAttributes;
    media['data-size'] = size;

    state.media.className = clsx(tagClassNames.media, styles.media, state.media.className);
  }
  if (state.icon) {
    const icon = state.icon as NonNullable<TagState['icon']> & TagSizeDataAttributes;
    icon['data-size'] = size;

    state.icon.className = clsx(tagClassNames.icon, styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    const primaryText = state.primaryText as NonNullable<TagState['primaryText']> & TagSizeDataAttributes;
    primaryText['data-size'] = size;

    state.primaryText.className = clsx(
      tagClassNames.primaryText,

      styles.primaryText,

      state.secondaryText ? styles.primaryTextWithSecondaryText : styles.primaryTextWithoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      tagClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissIcon) {
    const dismissIcon = state.dismissIcon as NonNullable<TagState['dismissIcon']> & TagSizeDataAttributes;
    dismissIcon['data-size'] = size;

    state.dismissIcon.className = clsx(
      tagClassNames.dismissIcon,
      styles.dismissIcon,
      !disabled && styles.dismissIconInteractive,
      selected && !disabled && styles.dismissIconSelected,
      state.dismissIcon.className,
    );
  }

  return state;
};
