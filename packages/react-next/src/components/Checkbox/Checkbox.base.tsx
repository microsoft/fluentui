import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { ICheckboxProps, ICheckboxSlots, ICheckboxState, ICheckboxSlotProps } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';

const defaultSlots: Omit<ICheckboxSlots, 'root'> = {
  input: 'input',
  checkmark: 'div',
  container: 'label',
  label: 'span',
  checkbox: 'div',
};

export const CheckboxBase = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(
  (props, forwardedRef, composeOptions) => {
    const { slotProps, slots } = mergeProps<ICheckboxProps, ICheckboxState, ICheckboxSlots, ICheckboxSlotProps>(
      composeOptions.state,
      composeOptions,
    );

    const onRenderLabel = (): JSX.Element => {
      return <slots.label {...slotProps.label} />;
    };

    return (
      <slots.root {...slotProps.root}>
        <slots.input {...slotProps.input} />
        <slots.container {...slotProps.container}>
          <slots.checkbox {...slotProps.checkbox}>
            <slots.checkmark {...slotProps.checkmark} />
          </slots.checkbox>

          {// eslint-disable-next-line deprecation/deprecation
          (props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
        </slots.container>
      </slots.root>
    );
  },
  {
    slots: defaultSlots,
    state: useCheckbox,
    displayName: 'CheckboxBase',
    handledProps: [
      'componentRef',
      'onChange',
      'checked',
      'defaultChecked',
      'boxSide',
      'label',
      'checkmark',
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
      'keytipProps',
      'indeterminate',
      'defaultIndeterminate',
    ],
  },
);

CheckboxBase.defaultProps = {};
