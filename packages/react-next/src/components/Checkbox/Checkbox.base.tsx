import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { mergeAriaAttributeValues } from '../../Utilities';
import { ICheckboxProps, ICheckboxSlots, ICheckboxState, ICheckboxSlotProps } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';
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
    const { slotProps, slots, state } = mergeProps<ICheckboxProps, ICheckboxState, ICheckboxSlots, ICheckboxSlotProps>(
      composeOptions.state,
      composeOptions,
    );

    const { disabled, keytipProps } = state;

    const onRenderLabel = (): JSX.Element => {
      return <slots.label {...slotProps.label} />;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderContent = (keytipAttributes: any = {}) => (
      <slots.root {...slotProps.root}>
        <slots.input
          {...slotProps.input}
          data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
          aria-describedby={mergeAriaAttributeValues(
            slotProps.input['aria-describedby'],
            keytipAttributes['aria-describedby'],
          )}
        />
        <slots.container {...slotProps.container}>
          <slots.checkbox {...slotProps.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
            <slots.checkmark {...slotProps.checkmark} />
          </slots.checkbox>

          {// eslint-disable-next-line deprecation/deprecation
          (props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
        </slots.container>
      </slots.root>
    );

    if (keytipProps) {
      return (
        <KeytipData keytipProps={keytipProps} disabled={disabled}>
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          (keytipAttributes: any): JSX.Element => renderContent(keytipAttributes)}
        </KeytipData>
      );
    }

    return renderContent();
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
