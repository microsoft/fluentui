import * as React from 'react';
import { ICheckboxProps } from '@fluentui/react';
import { CheckboxOnChangeData, CheckboxProps } from '@fluentui/react-components';
import { getHTMLAttributes } from '../utils';

// https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-checkbox-migration--page
// https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/Checkbox/Checkbox.types.ts
// https://github.com/microsoft/fluentui/blob/103b8977f8d5f8dd8c430bab46ff5308a2c76371/packages/react-components/react-checkbox/src/components/Checkbox/Checkbox.types.ts

const CHECKBOX_PROPS_V8: Set<string> = new Set([
  'ariaDescribedBy',
  'ariaLabel',
  'ariaLabelledBy',
  'ariaPositionInSet',
  'ariaSetSize',
  'boxSide',
  'checked',
  'checkmarkIconProps', // one case used this
  'className',
  'componentRef',
  'defaultChecked',
  'defaultIndeterminate',
  'disabled',
  'indeterminate',
  'inputProps',
  'label',
  'name',
  'onChange',
  'onRenderLabel',
  'required',
  'styles',
  'theme',
  'title',
]);

export const shimCheckboxProps = (props: ICheckboxProps): CheckboxProps => {
  const {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaPositionInSet,
    ariaSetSize,
    boxSide,
    checked,
    componentRef,
    defaultChecked,
    defaultIndeterminate,
    disabled,
    indeterminate,
    inputProps,
    name,
    onChange: onChangeV8,
    required,
    title,
  } = props;

  const onChange =
    onChangeV8 &&
    ((ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
      return onChangeV8(ev, data.checked as boolean);
    });

  const v9Props: Partial<CheckboxProps> = {
    ref: componentRef,
    checked: checked || indeterminate,
    defaultChecked: defaultChecked || defaultIndeterminate,

    labelPosition: boxSide === 'end' ? 'before' : 'after',
    onChange,
  } as Partial<CheckboxProps>;

  return {
    ...inputProps, // This inputProps is specific for the input element, and the html attributes are also used here instead of props.
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-posinset': ariaPositionInSet,
    'aria-setsize': ariaSetSize,
    disabled,
    required,
    title,
    name,
    ...v9Props,
    ...getHTMLAttributes(props, CHECKBOX_PROPS_V8),
  };
};
