import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { mergeAriaAttributeValues } from '../../Utilities';
import { Icon } from '../../Icon';
import { ICheckboxProps, ICheckboxSlots } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';
import { useCheckbox } from './useCheckbox';

const defaultSlots: Omit<ICheckboxSlots, 'root'> = {
  input: 'input',
  // TODO: add checkmark slot in parent component instead
  checkmark: Icon,
  container: 'label',
  text: 'span',
  checkbox: 'div',
};

export const CheckboxBase = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(
  (props, forwardedRef, composeOptions) => {
    const { slotProps, slots, state } = useCheckbox(props, composeOptions, forwardedRef);
    const { disabled, keytipProps, label } = state;

    const onRenderLabel = (): JSX.Element | null => {
      return label ? <slots.text {...slotProps.text}>{label}</slots.text> : null;
    };

    return (
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {// tslint:disable-next-line:no-any
        (keytipAttributes: any): JSX.Element => (
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
              {(props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
            </slots.container>
          </slots.root>
        )}
      </KeytipData>
    );
  },
  {
    slots: defaultSlots,
    displayName: 'CheckboxBase',
    handledProps: [
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

CheckboxBase.defaultProps = {};
