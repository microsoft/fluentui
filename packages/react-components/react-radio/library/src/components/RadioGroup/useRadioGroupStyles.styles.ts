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
import type { RadioGroupSlots, RadioGroupState } from './RadioGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './RadioGroup.module.css';

export const radioGroupClassNames: SlotClassNames<RadioGroupSlots> = {
  root: 'fui-RadioGroup',
};

/**
 * Data attribute rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-layout` is one of the headless preview's 25 attribute names
 * (reports/headless-precedent.md) and carries the public prop verbatim, including the
 * `horizontal-stacked` value that has no CSS rule of its own — the Griffel source styled
 * `layout === 'vertical'` alone, leaving both horizontal modes on the base
 * `flex-direction: row`. Stamping the full union keeps the attribute a faithful mirror of
 * the prop (and a usable hook for consumer CSS) rather than a boolean in disguise.
 *
 * It is deliberately NOT `data-orientation`: `horizontal-stacked` is a layout mode rather
 * than an axis. `layout` also feeds the child Radios' default `labelPosition` through React
 * context (useRadioBase_unstable), which is a JS concern, not a CSS one.
 */
type RadioGroupRootDataAttributes = {
  'data-layout': RadioGroupState['layout'];
};

/**
 * Apply styling to the RadioGroup slots based on the state
 */
export const useRadioGroupStyles_unstable = (state: RadioGroupState): RadioGroupState => {
  const root = state.root as RadioGroupState['root'] & RadioGroupRootDataAttributes;

  root['data-layout'] = state.layout;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in RadioGroup.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(radioGroupClassNames.root, styles.root, state.root.className);

  return state;
};
