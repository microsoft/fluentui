import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { MenuItemState } from './MenuItem.types';

import styles from './MenuItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const menuItemClassNames: { root: string } = {
  root: componentMarkers('menu-item'),
};

type MenuItemRootDataAttributes = {
  'data-multiline'?: true;
};

type StyledSlot = { className?: string } | undefined;

/** Returns a NEW slot carrying its own class, or the slot untouched when it does not exist. */
const withClass = <TSlot extends StyledSlot>(slot: TSlot, className: string): TSlot =>
  slot ? ({ ...slot, className: clsx(className, slot.className) } as TSlot) : slot;

/**
 * Applies the visual contract, returning new state. Every state the stylesheet selects on is
 * already stamped by the headless hook except multiline, which is Griffel's JS-gated subText
 * layout expressed as a CSS channel. Each slot carries its own class and reaches the root's
 * state through group variants, so no slot is styled by descendant selector.
 */
export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  const root: MenuItemState['root'] & MenuItemRootDataAttributes = {
    ...state.root,
    'data-multiline': state.subText ? true : undefined,
    className: clsx(menuItemClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    checkmark: withClass(state.checkmark, styles.checkmark),
    icon: withClass(state.icon, styles.icon),
    content: withClass(state.content, styles.content),
    secondaryContent: withClass(state.secondaryContent, styles.secondaryContent),
    subText: withClass(state.subText, styles.subText),
    submenuIndicator: withClass(state.submenuIndicator, styles.submenuIndicator),
  };
};
