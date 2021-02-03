import { keyboardKey, SpacebarKey } from '../../keyboard-key';
import { Accessibility, AccessibilityDefinition } from '../../types';

export const buttonBehavior: Accessibility<ButtonBehaviorProps> = props => {
  const definition: AccessibilityDefinition = {
    attributes: {
      root: {
        role: props.as === 'button' ? undefined : 'button',
        tabIndex: props.as === 'button' || props.disabled ? undefined : 0,
        disabled: props.as === 'button' ? props.disabled : undefined,
        'aria-disabled': props.disabledFocusable,
      },
    },

    keyActions: {
      root: {
        ...(props.as !== 'button' &&
          props.as !== 'a' && {
            performClick: {
              keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
            },
          }),
      },
    },
  };

  return definition;
};

export type ButtonBehaviorProps = {
  /** Element type. */
  as: string;
  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean;
  disabledFocusable?: boolean;
};
