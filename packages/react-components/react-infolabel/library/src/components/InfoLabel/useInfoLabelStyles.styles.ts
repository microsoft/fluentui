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
 *
 * (The sibling useInfoButtonStyles.styles.ts keeps its directive unsuppressed: it still
 * calls a Griffel hook for the PopoverSurface slot — see that file's header.)
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';

import styles from './InfoLabel.module.css';

export const infoLabelClassNames: SlotClassNames<InfoLabelSlots> = {
  root: 'fui-InfoLabel',
  label: 'fui-InfoLabel__label',
  infoButton: 'fui-InfoLabel__infoButton',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * It carries InfoLabel's OWN `size`, which is what the Griffel hook branched on
 * (`state.size === 'large' && infoButtonStyles.large`). It cannot live on the infoButton
 * slot: `useInfoButtonStyles_unstable` stamps `data-size` on that same element from
 * InfoButton's own `size` prop and would overwrite it — see InfoLabel.module.css.
 *
 * `size` is optional on InfoLabel (it is forwarded to Label, which applies its own
 * default), so the attribute is absent when the prop is — React omits an attribute whose
 * value is `undefined`, and no rule below matches a missing `data-size`.
 */
type InfoLabelRootDataAttributes = {
  'data-size'?: InfoLabelState['size'];
};

/**
 * Apply styling to the InfoLabel slots based on the state
 */
export const useInfoLabelStyles_unstable = (state: InfoLabelState): InfoLabelState => {
  const root = state.root as InfoLabelState['root'] & InfoLabelRootDataAttributes;

  root['data-size'] = state.size;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this InfoLabel's state, because `styles.root` is hashed and unaddressable from
  // outside this file (DECISIONS.md D15).
  //
  // InfoLabel needs no state mirrors: `data-size` is stamped on this very element above, so
  // `@variant group-size-large/fui-info-label` works as-is (D15.6, Tier 0). It is also the
  // group whose state the nested InfoButton could read WITHOUT the `data-size`-on-the-root
  // workaround described in InfoLabel.module.css's header — kept as-is here, because this
  // rollout adds the marker and changes nothing else.
  //
  // Cascade priority is decided by the `@layer fui.*` order in InfoLabel.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, and for why every rule is `fui.components.l2`.
  state.root.className = clsx('group/fui-info-label', infoLabelClassNames.root, styles.root, state.root.className);

  state.label.className = clsx(infoLabelClassNames.label, styles.label, state.label.className);

  if (state.infoButton) {
    state.infoButton.className = clsx(
      infoLabelClassNames.infoButton,
      styles['info-button'],
      state.infoButton.className,
    );
  }

  return state;
};
