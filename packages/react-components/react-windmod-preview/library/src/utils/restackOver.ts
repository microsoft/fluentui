import { clsx } from 'clsx';

import { slotClasses } from './slotClasses';

/** The two slots a composing styles hook re-stacks: the base's root, and the icon it may carry. */
export type RestackableState = {
  root: { className?: string };
  icon?: { className?: string };
};

/**
 * Stacks a composing component's own layer over the base styles hook it composes.
 *
 * The class order is the constraint this owns: the composer's marker pair first (see
 * `componentMarkers` for why the slash-free class must lead `classList`), then its own module
 * class, then the base's whole class list last. The base's marker therefore survives on the root,
 * which is load-bearing rather than decorative — the base's icon and spacing rules are reached
 * through the group variant on it.
 *
 * `rootAttributes` lands after the base's root spread, so a composer overrides a base stamp by
 * naming the same key.
 *
 * Not a hook and deliberately not `use`-named — see `useNavItemStyles`.
 */
export const restackOver = <S extends RestackableState, A extends object>(
  state: S,
  base: Pick<S, 'root' | 'icon'>,
  layer: { marker: string; root: string; icon?: string; rootAttributes?: A },
): S => ({
  ...state,
  root: {
    ...base.root,
    ...layer.rootAttributes,
    className: clsx(layer.marker, layer.root, base.root.className),
  },
  icon: slotClasses(base.icon, layer.icon),
});
