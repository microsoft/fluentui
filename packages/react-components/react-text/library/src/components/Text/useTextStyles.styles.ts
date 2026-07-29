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
import type { TextState } from './Text.types';

import styles from './Text.module.css';

/**
 * Public identity class for Text — and, deliberately, for all 17 typography presets, which
 * share it because a `<Body1>` IS a `<Text>` (DECISIONS.md D16.7).
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM static it used to hold is gone (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * The per-preset constants (`body1ClassNames` … `title3ClassNames`) were REMOVED rather than
 * re-pointed. Presets stamp no marker of their own, so there was nothing to re-point `root`
 * to, and D16.7 accepts the loss of preset-level public identity explicitly: presets are a
 * shorthand for `<Text font size weight>` and hold no state a descendant could read.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + textClassNames.root` is an invalid selector. Use `fuiSelector(textClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const textClassNames: { root: string } = {
  root: 'group/fui-text',
};

/**
 * Data attributes rendered on the root slot.
 *
 * `size` is a dense NUMERIC scale (100…1000), so per the cookbook's scale-prop rule it
 * rides `data-size` and is targeted by attribute selectors written directly in
 * `Text.module.css` — no variant definitions are added to the shared catalog for it.
 * The attribute is stamped for every value, including the rule-free default `300`.
 *
 * The remaining props stay module classes rather than attributes: `wrap`/`truncate`/
 * `block`/`italic`/`underline`/`strikethrough` are standalone look modifiers whose rules
 * never nest inside another selector (react-image precedent), and `font`/`weight`/`align`
 * are enums whose default value carries no Griffel slice at all, which a class lookup
 * expresses for free (react-label precedent). Neither would have a name in the
 * nyt-games catalog or the headless preview's vocabulary, and the cookbook ranks
 * inventing catalog entries last.
 */
type TextRootDataAttributes = {
  'data-size': TextState['size'];
};

/**
 * Apply styling to the Text slots based on the state
 */
export const useTextStyles_unstable = (state: TextState): TextState => {
  const { align, block, font, italic, size, strikethrough, truncate, underline, weight, wrap } = state;

  const root = state.root as TextState['root'] & TextRootDataAttributes;

  root['data-size'] = size;

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this Text's state, because `styles.root` is hashed and
  // unaddressable from outside this file. No state mirror is needed: `data-size` is already
  // stamped on this very element above (DECISIONS.md D15, Tier 0).
  //
  // The 17 typography presets get NO marker of their own: `createPreset` runs THIS hook and
  // then prepends its own hashed preset class to the same root, so every preset root already
  // carries `group/fui-text` — which is correct, since a `<Body1>` IS a `<Text>`. With the
  // `fui-Body1` … `fui-Title3` statics removed that marker is ALSO all a preset has: D16.7
  // accepts that loss of preset-level public identity deliberately rather than mint 17 new
  // markers into Tailwind's flat global group namespace.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Text.module.css and by
  // block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces.
  //
  // `font === 'base'`, `weight === 'regular'` and `align === 'start'` are the defaults and
  // have no Griffel slice, so they are guarded out rather than looked up: the module
  // declares no class for them.
  //
  // The state mutation below (and the `data-size` assignment above) is preserved
  // deliberately — DECISIONS.md D14 defers the pure-builder rewrite to a single Phase 3
  // sweep. The Griffel original's `eslint-disable-next-line react-hooks/immutability` is
  // dropped only because the rule no longer reports here, same as the react-divider /
  // react-button / react-image conversions.
  state.root.className = clsx(
    styles.root,
    'group/fui-text',
    wrap === false && styles.nowrap,
    truncate && styles.truncate,
    block && styles.block,
    italic && styles.italic,
    underline && styles.underline,
    strikethrough && styles.strikethrough,
    underline && strikethrough && styles['strikethrough-underline'],
    font !== 'base' && styles[font],
    weight !== 'regular' && styles[weight],
    align !== 'start' && styles[align],
    state.root.className,
  );

  return state;
};
