import { ICheckboxProps } from '@fluentui/react';
import { CheckboxProps } from '@fluentui/react-components';
import { getHTMLAttributes } from '../utils';

// https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-checkbox-migration--page [Link of the fluent v9 migration guide]
// https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/Checkbox/Checkbox.types.ts [Link of the fluent v8 checkbox types definition]
// https://github.com/microsoft/fluentui/blob/103b8977f8d5f8dd8c430bab46ff5308a2c76371/packages/react-components/react-checkbox/src/components/Checkbox/Checkbox.types.ts [Link of the fluent v9 checkbox types definition]

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

export const useCheckboxProps = (props: ICheckboxProps): CheckboxProps => {
  const {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaPositionInSet,
    ariaSetSize,
    boxSide,
    checked,
    defaultChecked,
    defaultIndeterminate,
    disabled,
    indeterminate,
    inputProps,
    name,
    required,
    title,
  } = props;

  const v9Props: Partial<CheckboxProps> = {
    checked: checked || indeterminate,
    defaultChecked: defaultChecked || defaultIndeterminate,
    labelPosition: boxSide === 'end' ? 'before' : 'after',
  };

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
  } as CheckboxProps;
};
