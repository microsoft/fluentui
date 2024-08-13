import * as React from 'react';

import { ICheckboxProps } from '@fluentui/react';
import { CheckboxProps, CheckboxOnChangeData } from '@fluentui/react-components';
import { useControllableValue } from '@fluentui/react-hooks';
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
    checked: checkedV8,
    indeterminate,
    defaultChecked,
    defaultIndeterminate,
    disabled,
    inputProps,
    name,
    required,
    title,
    onChange: onChangeV8,
  } = props;

  const [checked, setChecked] = useControllableValue(checkedV8, defaultChecked);
  const [mixed, setMixed] = React.useState(indeterminate || defaultIndeterminate);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLElement>, data: CheckboxOnChangeData): void => {
      let val: boolean | undefined = checked !== undefined ? (data.checked as boolean) : undefined;
      // Ensure the checkbox is controlled
      if (checked !== undefined) {
        if (mixed) {
          val = checkedV8 !== undefined ? checkedV8 : defaultChecked !== undefined ? defaultChecked : val;
        }
      }

      if (mixed) {
        setMixed(mixed && !indeterminate ? false : mixed);
      }

      setChecked(val);
      onChangeV8?.(event, data.checked as boolean);
    },
    [setChecked, checked, onChangeV8, mixed, indeterminate, checkedV8, defaultChecked],
  );

  const v9Props: Partial<CheckboxProps> = {
    checked: mixed ? 'mixed' : checked,
    defaultChecked: mixed ? 'mixed' : defaultChecked,
    labelPosition: boxSide === 'end' ? 'before' : 'after',
    disabled,
    required,
    title,
    name,
    onChange,
  };

  return {
    ...inputProps, // This inputProps is specific for the input element, and the html attributes are also used here instead of props.
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-posinset': ariaPositionInSet,
    'aria-setsize': ariaSetSize,
    ...v9Props,
    ...getHTMLAttributes(props, CHECKBOX_PROPS_V8),
  } as CheckboxProps;
};
