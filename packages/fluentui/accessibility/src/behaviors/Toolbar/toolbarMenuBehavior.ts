import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { toolbarMenuItemBehavior } from './toolbarMenuItemBehavior';
import { keyboardKey, SpacebarKey } from '../../keyboard-key';

/**
 * @description
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Provides arrow key navigation in vertical direction.
 * Keyboard navigation is circular.
 * Component will get focus when mounted.
 */
export const toolbarMenuBehavior: Accessibility<ToolbarMenuBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },

  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
  focusZone: {
    props: {
      isCircularNavigation: true,
      shouldFocusOnMount: true,
      direction: FocusZoneDirection.vertical,
    },
  },
  childBehaviors: { item: toolbarMenuItemBehavior },
});

export type ToolbarMenuBehaviorProps = never;
