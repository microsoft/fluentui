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
import type { InfoLabelState } from './InfoLabel.types';

import styles from './InfoLabel.module.css';

/**
 * Public identity class for InfoLabel.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The per-slot keys were removed together with the BEM
 * statics (D16.1): there is no public class-name handle on component internals any more.
 *
 * `'.' + infoLabelClassNames.root` is an INVALID selector — `/` is legal in a class TOKEN but
 * terminates the name in selector position. Use `fuiSelector(infoLabelClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const infoLabelClassNames: { root: string } = {
  root: 'group/fui-info-label',
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

  // Module class FIRST, then the named group marker — the marker must never be `classList[0]`
  // (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md D15.1 / D16.2) — with
  // the consumer className last. `styles.root` is unconditional and clsx never drops it, so
  // index 0 is always the hashed, selector-safe class; before D16 the removed `fui-InfoLabel`
  // static was what held that position.
  //
  // The marker is a literal, unhashed, GLOBAL token and, since D16.1 retired the BEM statics,
  // InfoLabel's SOLE public identity class: it is the only handle by which another module —
  // in this package or any other — can style an element from this InfoLabel's state, because
  // `styles.root` is hashed and unaddressable from outside this file (DECISIONS.md D15).
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
  state.root.className = clsx(styles.root, 'group/fui-info-label', state.root.className);

  state.label.className = clsx(styles.label, state.label.className);

  if (state.infoButton) {
    state.infoButton.className = clsx(styles['info-button'], state.infoButton.className);
  }

  return state;
};
