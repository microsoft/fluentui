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
 * Data attributes rendered on the root slot of InlineDrawer and OverlayDrawer, and matched by
 * `:where([data-…])` selectors in their modules.
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
