import { clsx } from 'clsx';
import type { NavItemState as NavItemHeadlessState } from '@fluentui/react-headless-components-preview/nav';

import { componentMarkers } from '../../utils/groupMarker';
import type { NavDensity } from '../Nav/Nav.types';
import type { NavItemState } from './NavItem.types';

import styles from './NavItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const navItemClassNames: { root: string } = {
  root: componentMarkers('nav-item'),
};

/**
 * The shape the shared row decoration needs. NavItem, NavCategoryItem and NavSubItem all
 * satisfy it. The icon slot is taken from the headless state rather than restated as
 * Slot<'span'>: the shorthand union is not spreadable.
 */
export type NavRowState = {
  root: { className?: string } & { 'data-density'?: NavDensity };
  icon?: NavItemHeadlessState['icon'];
  selected: boolean;
  density: NavDensity;
};

/**
 * The look the three nav rows share, applied once. NavItem's module owns the row classes; the
 * other two rows call this and author their deltas one layer up, carrying `fui-nav-item`
 * alongside their own marker pair. That marker is load-bearing, not decorative: the icon's
 * selected block is reached through the group variant on it.
 *
 * Not a hook and deliberately not `use`-named — it holds no state and calls nothing. The name
 * matters beyond style: enforce-use-client flags any call whose callee matches /^use.{1,}/ by
 * name alone, so a `use`-named helper would force `'use client';` onto every caller.
 */
export const navRowClasses = <S extends NavRowState>(state: S): S => ({
  ...state,
  root: {
    ...state.root,
    'data-density': state.density,
    className: clsx(navItemClassNames.root, styles.root, state.root.className),
  },
  icon: state.icon && { ...state.icon, className: clsx(styles.icon, state.icon.className) },
});

/** Applies the visual contract, returning new state. */
export const useNavItemStyles = (state: NavItemState): NavItemState => navRowClasses(state);
