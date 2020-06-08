import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { CheckMarkIcon } from '@fluentui/react-icons';
import { ICheckboxProps, ICheckboxSlots } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';

const defaultSlots: Omit<ICheckboxSlots, 'root'> = {
  input: 'input',
  checkmark: CheckMarkIcon,
  container: 'label',
  text: 'span',
  checkbox: 'div',
};

export const CheckboxBase = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(
  (props, forwardedRef, composeOptions) => {
    const { slotProps, slots, state } = useCheckbox(props, composeOptions, forwardedRef);
    const { label } = state;

    const onRenderLabel = (): JSX.Element | null => {
      return label ? <slots.text {...slotProps.text}>{label}</slots.text> : null;
    };

    return (
      <slots.root {...slotProps.root}>
        <slots.input {...slotProps.input} />
        <slots.container {...slotProps.container}>
          <slots.checkbox {...slotProps.checkbox}>
            <slots.checkmark {...slotProps.checkmark} />
          </slots.checkbox>
          {(props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
        </slots.container>
      </slots.root>
    );
  },
  {
    slots: defaultSlots,
    displayName: 'CheckboxBase',
    handledProps: [
      'id',
      'componentRef',
      'onChange',
      'checked',
      'defaultChecked',
      'boxSide',
      'label',
      'disabled',
      'inputProps',
      'boxSide',
      'ariaLabel',
      'ariaLabelledBy',
      'ariaDescribedBy',
      'ariaPositionInSet',
      'ariaSetSize',
      'styles',
      'onRenderLabel',
      'checkmarkIconProps',
      'keytipProps',
      'indeterminate',
      'defaultIndeterminate',
    ],
  },
);

CheckboxBase.defaultProps = {
  as: 'div',
};
