import { Accessibility } from '../../types';
import { keyboardKey, SpacebarKey } from '../../keyboard-key';

/**
 * @description
 * Adds attribute 'role=region' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-roledescription' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-label' to 'root' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'aria-roledescription' to 'itemsContainer' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-label' to 'itemsContainer' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'role=region' to 'itemsContainer' slot if 'navigation' property is true.  Set 'role=none' otherwise.
 * Adds attribute 'tabIndex=-1' to 'itemsContainer' slot if 'navigation' property is false. Does not set the attribute otherwise.
 * Adds attribute 'data-is-visible=false' to 'paddleNext' slot if 'paddleNextHidden' property is true. Does not set the attribute otherwise.
 * Adds attribute 'data-is-visible=false' to 'paddlePrevious' slot if 'paddlePreviousHidden' property is false. Does not set the attribute otherwise.
 * @specification
 * Adds attribute 'role=region' to 'root' slot.
 * Adds attribute 'aria-live=polite' to 'itemsContainerWrapper' slot if 'ariaLiveOn' property is true. Sets the attribute to 'off' otherwise.
 * Adds attribute 'aria-hidden=true' to 'paddleNext' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-hidden=true' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'tabIndex=-1' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Adds attribute 'tabIndex=-1' to 'paddlePrevious' slot if 'navigation' property is true. Does not set the attribute otherwise.
 * Triggers 'showNextSlideByKeyboardNavigation' action with 'ArrowRight' on 'itemsContainer'.
 * Triggers 'showPreviousSlideByKeyboardNavigation' action with 'ArrowLeft' on 'itemsContainer'.
 * Triggers 'showNextSlideByPaddlePress' action with 'Enter' or 'Spacebar' on 'paddleNext'.
 * Triggers 'showPreviousSlideByPaddlePress' action with 'Enter' or 'Spacebar' on 'paddlePrevious'.
 */
export const carouselBehavior: Accessibility<CarouselBehaviorProps> = props => ({
  attributes: {
    root: {
      ...(!props.navigation && {
        role: 'region',
        'aria-roledescription': props['aria-roledescription'],
        'aria-label': props['aria-label'],
      }),
    },
    itemsContainerWrapper: {
      'aria-live': props.ariaLiveOn ? 'polite' : 'off',
    },
    itemsContainer: {
      ...(props.navigation
        ? { role: 'region', 'aria-roledescription': props['aria-roledescription'], 'aria-label': props['aria-label'] }
        : { tabIndex: -1, role: 'none' }),
    },

    paddleNext: {
      ...(props.navigation && {
        tabIndex: -1,
        'aria-hidden': 'true',
      }),
      ...(props.paddleNextHidden && {
        // we need the attribute when carousel is inside FZ
        'data-is-visible': 'false',
      }),
    },
    paddlePrevious: {
      ...(props.navigation && {
        tabIndex: -1,
        'aria-hidden': 'true',
      }),
      ...(props.paddlePreviousHidden && {
        // we need the attribute when carousel is inside FZ
        'data-is-visible': 'false',
      }),
    },
  },

  keyActions: {
    itemsContainer: {
      showNextSlideByKeyboardNavigation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
      },
      showPreviousSlideByKeyboardNavigation: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
      },
    },
    paddleNext: {
      showNextSlideByPaddlePress: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
    paddlePrevious: {
      showPreviousSlideByPaddlePress: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
});

export type CarouselBehaviorProps = {
  /** Element type. */
  navigation: Object | Object[];
  ariaLiveOn: boolean;
  paddleNextHidden: boolean;
  paddlePreviousHidden: boolean;
  'aria-roledescription'?: string;
  'aria-label'?: string;
};
