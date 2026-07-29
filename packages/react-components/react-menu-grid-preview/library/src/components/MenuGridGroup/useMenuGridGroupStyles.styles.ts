'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * this file never carried `'use client'` before the conversion — it had no `makeStyles`
 * call to require it. It is added now for the same reason every other converted styles
 * file keeps its own: the CSS-Modules import is a side-effecting client asset, and the
 * directive placement is the repo-wide convention for `*.styles.ts`. `enforce-use-client`
 * flags it as unnecessary (correctly — nothing here is RSC-unsafe), hence the trailing
 * suppression; dropping directives is a Phase 3 sweep across all 180 style hooks.
 */

import { clsx } from 'clsx';
import type { MenuGridGroupState } from './MenuGridGroup.types';

import styles from './MenuGridGroup.module.css';

/**
 * Public identity class for MenuGridGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target.
 *
 * `'.' + menuGridGroupClassNames.root` is an invalid *selector* — the `/` terminates the
 * class name. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridGroupClassNames: { root: string } = {
  root: 'group/fui-menu-grid-group',
};

export const useMenuGridGroupStyles_unstable = (state: MenuGridGroupState): MenuGridGroupState => {
  // `styles.root` is the identity-only local minted in MenuGridGroup.module.css: this
  // component has no styles of its own and nothing else prepends a class here, so without it
  // the marker would be `classList[0]` and nwsapi's jsdom `:scope` polyfill would throw
  // (DECISIONS.md D15.1 / D16.2). Consumer className stays last.
  state.root.className = clsx(styles.root, 'group/fui-menu-grid-group', state.root.className);

  return state;
};
