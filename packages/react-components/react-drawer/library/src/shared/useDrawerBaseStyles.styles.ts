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

import type { DrawerBaseState } from './DrawerBase.types';

/**
 * CSS variable names used internally for uniform styling in Drawer.
 *
 * `--fui-Drawer--size` is a runtime knob, not a class: `InlineDrawer.module.css` and
 * `OverlayDrawer.module.css` assign it per `data-size`, their reset rules read it for
 * `width` / `height`, and `drawerMotions.ts` reads it inside the Web-Animations keyframes.
 * The mixed-case name is existing DOM surface and is deliberately unchanged — the
 * all-lowercase rule in DECISIONS.md D15.2 / D15.3 governs CLASS names, not custom
 * properties (cf. `--fui-Card--size`).
 */
export const drawerCSSVars = {
  drawerSizeVar: '--fui-Drawer--size',
};

/**
 * Data attributes rendered on the root slot of InlineDrawer and OverlayDrawer, and matched
 * by `:where([data-…])` selectors in their modules.
 *
 * Both names come from the in-repo headless preview, which stamps exactly these on ITS
 * drawer roots (`react-headless-components-preview/library/src/components/Drawer/
 * InlineDrawer/useInlineDrawer.ts:18` and `OverlayDrawer/useOverlayDrawer.ts:27`), and
 * `data-position` is in the 25-name vocabulary (reports/headless-precedent.md). Neither
 * duplicates a state a native selector already expresses, which is the bar D15.6 sets for
 * adding one at all.
 *
 * Neither is optional — `position` and `size` are both `Required<…>` on `DrawerBaseState`
 * (defaulted in `useDrawerDefaultProps`) — so neither needs the `flag || undefined` form
 * the presence attributes elsewhere use.
 */
type DrawerBaseRootDataAttributes = {
  'data-position': DrawerBaseState['position'];
  'data-size': DrawerBaseState['size'];
};

/**
 * Stamp the shared position/size state onto a drawer root.
 *
 * This is what is left of `useDrawerBaseClassNames`. The Griffel version merged two slice
 * tables (`useDrawerStyles[position]` plus `useDrawerStyles[size]` or
 * `useDrawerBottomBaseStyles[size]`) into a class string that InlineDrawer and OverlayDrawer
 * both consumed. Those slices are now `:where([data-position=…])` / `@variant size-…` rules
 * duplicated into each component's own module — see the "Why the shared slices are
 * DUPLICATED" note in `InlineDrawer.module.css` — so the only thing that still has to be
 * shared is the pair of attributes those rules match.
 *
 * Kept as one helper rather than four inlined lines per hook so the two roots cannot drift:
 * every position/size rule in both modules keys off exactly these two names.
 */
export function setDrawerBaseDataAttributes(
  state: Pick<DrawerBaseState, 'position' | 'size'> & { root: object },
): void {
  const root = state.root as DrawerBaseRootDataAttributes;

  root['data-position'] = state.position;
  root['data-size'] = state.size;
}
