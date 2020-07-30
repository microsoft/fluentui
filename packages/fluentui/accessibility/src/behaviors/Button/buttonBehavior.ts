import { keyboardKey, SpacebarKey } from '@fluentui/keyboard-key';
import { Accessibility, AccessibilityDefinition } from '../../types';

/**
 * @specification
 * Adds role='button' if element type is other than 'button'. This allows screen readers to handle the component as a button.
 * Adds attribute 'tabIndex=0' if element type is other than 'button'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 * Adds attribute 'aria-disabled=true' based on the property 'loading'.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 */
export const buttonBehavior: Accessibility<ButtonBehaviorProps> = props => {
  const definition: AccessibilityDefinition = {
    attributes: {
      root: {
        role: props.as === 'button' ? undefined : 'button',
        tabIndex: props.as === 'button' ? undefined : 0,
        disabled: props.disabled && !props.loading ? (props.as === 'button' ? true : undefined) : undefined,
        'aria-disabled': props.disabled || props.loading,
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

  if (process.env.NODE_ENV !== 'production' && props.loading) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'LoadingButton';
  }

  return definition;
};

export type ButtonBehaviorProps = {
  /** Element type. */
  as: string;
  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean;
  loading?: boolean;
};
