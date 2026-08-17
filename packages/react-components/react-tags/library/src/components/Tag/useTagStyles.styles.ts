import { clsx } from 'clsx';
import type { TagState } from './Tag.types';

import styles from './Tag.module.css';

/**
 * Public identity class for Tag.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + tagClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(tagClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const tagClassNames: { root: string } = {
  root: 'group/fui-tag',
};

/**
 * Data attributes rendered on the Tag slots and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Everything else the Griffel hook selected with a conditional `mergeClasses` argument
 * (`appearance`, `shape`, `selected && !disabled`, `!media && !icon`, `!dismissIcon`) stays a
 * conditional CLASS in the composition below — see Tag.module.css for why `selected` in particular
 * must NOT ride the catalog's `selected` variant.
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
  // KEYS stay camelCase — this is a TypeScript API consumed by InteractionTagPrimary, not a
  // set of CSS class names. Only the VALUES follow the module's lowercase-kebab locals.
  primaryText: styles['primary-text'],
  primaryTextWithSecondaryText: styles['primary-text-with-secondary-text'],
  primaryTextWithoutSecondaryText: styles['primary-text-without-secondary-text'],
  secondaryText: styles['secondary-text'],
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tagClassNames.root,

    styles[shape],

    // `appearance` is one lowercase word (`filled` | `outline` | `brand`), so the module's
    // lowercase-kebab locals are still reachable by interpolation: `filled-disabled` etc.
    disabled ? styles[`${appearance}-disabled`] : styles[appearance],
    selected && !disabled && styles.selected,

    !state.media && !state.icon && styles['without-media'],
    !state.dismissIcon && styles['without-dismiss'],

    state.root.className,
  );

  if (state.media) {
    const media = state.media as NonNullable<TagState['media']> & TagSizeDataAttributes;
    media['data-size'] = size;

    state.media.className = clsx(styles.media, state.media.className);
  }
  if (state.icon) {
    const icon = state.icon as NonNullable<TagState['icon']> & TagSizeDataAttributes;
    icon['data-size'] = size;

    state.icon.className = clsx(styles.icon, state.icon.className);
  }
  if (state.primaryText) {
    const primaryText = state.primaryText as NonNullable<TagState['primaryText']> & TagSizeDataAttributes;
    primaryText['data-size'] = size;

    state.primaryText.className = clsx(
      styles['primary-text'],

      state.secondaryText ? styles['primary-text-with-secondary-text'] : styles['primary-text-without-secondary-text'],

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(styles['secondary-text'], state.secondaryText.className);
  }
  if (state.dismissIcon) {
    const dismissIcon = state.dismissIcon as NonNullable<TagState['dismissIcon']> & TagSizeDataAttributes;
    dismissIcon['data-size'] = size;

    state.dismissIcon.className = clsx(
      styles['dismiss-icon'],
      !disabled && styles['dismiss-icon-interactive'],
      selected && !disabled && styles['dismiss-icon-selected'],
      state.dismissIcon.className,
    );
  }

  return state;
};
