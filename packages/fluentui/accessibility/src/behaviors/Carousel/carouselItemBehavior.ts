import { Accessibility } from '../../types';
import { keyboardKey } from '../../keyboard-key';

/**
 * @description
 * Adds attribute 'tabIndex=0' to 'root' slot if 'active' property and 'navigation' property is true. Sets the attribute to '-1' otherwise.
 * @specification
 * Adds attribute 'role=tabpanel' based on the property 'navigation' to 'root' slot.
 * Adds attribute 'aria-hidden=false' to 'root' slot if 'active' property is true. Sets the attribute to 'true' otherwise.
 * Triggers 'arrowKeysNavigationStopPropagation' action with 'ArrowRight' or 'ArrowLeft' on 'root'.
 */
export const carouselItemBehavior: Accessibility<CarouselItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: props.navigation ? 'tabpanel' : undefined,
      'aria-hidden': props.active ? 'false' : 'true',
      tabIndex: props.navigation ? (props.active ? 0 : -1) : undefined,
    },
  },

  keyActions: {
    root: {
      arrowKeysNavigationStopPropagation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }, { keyCode: keyboardKey.ArrowLeft }],
      },
    },
  },
});

export type CarouselItemBehaviorProps = {
  /** If item is visible in the carousel. */
  active?: boolean;
  navigation?: boolean;
};
