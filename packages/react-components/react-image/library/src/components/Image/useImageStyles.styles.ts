import { clsx } from 'clsx';
import type { ImageState } from './Image.types';

import styles from './Image.module.css';

/**
 * Public identity class for Image.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM statics it used to hold are gone (DECISIONS.md D16.1 /
 * D16.5): there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + imageClassNames.root` is an invalid selector. Use `fuiSelector(imageClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (DECISIONS.md D16.5).
 */
export const imageClassNames: { root: string } = {
  root: 'group/fui-image',
};

export const useImageStyles_unstable = (state: ImageState): ImageState => {
  const { block, bordered, fit, shadow, shape } = state;

  const { height, width } = state.root;
  // eslint-disable-next-line eqeqeq
  const hasExplicitSize = height != null || width != null;
  const shouldApplyFitFill = fit !== 'default' && !hasExplicitSize;

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom
  // (DECISIONS.md D15.1) — and `styles.root` is the token that guarantees it, since clsx
  // never drops an unconditional argument. The BEM static that used to hold that position
  // is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now the component's SOLE public
  // identity class: it is the only handle by which another module — in this package or any
  // other — can style an element from this Image, because `styles.root` is hashed and
  // unaddressable from outside this file. Image stamps NO data attributes by design
  // (every prop it styles is a look prop expressed as a module class — see
  // Image.module.css's header), so the marker is inert until a descendant reads a
  // pseudo-class state such as `@variant group-hover/fui-image`. It is added anyway:
  // markers are per-component identity, not per-state (DECISIONS.md D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Image.module.css and by
  // block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces.
  //
  // `styles[fit]` is undefined for fit="default" and `styles[shape]` is undefined for
  // shape="square": both are empty `{}` slices in the Griffel original, so the module
  // deliberately declares no rule for them and clsx drops the undefined entries.
  //
  // The state mutation below is preserved deliberately (DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep). The Griffel original's
  // `eslint-disable-next-line react-hooks/immutability` is dropped because the rule no
  // longer reports here — same as the react-divider and react-button conversions.
  state.root.className = clsx(
    styles.root,
    'group/fui-image',
    block && styles.block,
    bordered && styles.bordered,
    shadow && styles.shadow,
    styles[fit],
    shouldApplyFitFill && styles['fit-fill'],
    styles[shape],
    state.root.className,
  );

  return state;
};
