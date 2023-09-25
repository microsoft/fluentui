import { Accessibility, AccessibilityDefinition } from '../../types';
import { buttonBehavior, ButtonBehaviorProps } from '../Button/buttonBehavior';

/**
 * @specification
 *  Adds role='radio'. This allows screen readers to handle the component as a radio button.
 *  Adds attribute 'aria-checked=true' based on the property 'active'.
 *  Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 *  Adds attribute 'disabled=true' based on the property 'disabled'.
 *  Adds attribute 'aria-disabled=true' based on the property 'disabledFocusable'.
 */
export const toolbarRadioGroupItemBehavior: Accessibility<ToolbarRadioGroupItemBehaviorProps> = props => {
  const definition: AccessibilityDefinition = {
    attributes: {
      root: {
        role: 'radio',
        'aria-checked': props.active,
        disabled: props.disabled,
        'aria-disabled': props.disabledFocusable,
      },
    },
    keyActions: buttonBehavior(props).keyActions,
  };

  if (process.env.NODE_ENV !== 'production') {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'RadioGroupItem';
  }

  return definition;
};

type ToolbarRadioGroupItemBehaviorProps = {
  /** Indicates if radio item is selected. */
  active?: boolean;
  /** Indicates if radio item is disabled. */
  disabled?: boolean;
} & ButtonBehaviorProps;
