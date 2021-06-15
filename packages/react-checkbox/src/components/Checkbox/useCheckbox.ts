/* eslint-disable no-console */
/* eslint-disable no-alert */
import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useControllableValue, useId } from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxShorthandProps, CheckboxState } from './Checkbox.types';
import { Label } from '@fluentui/react-label';

/**
 * Array of all shorthand properties listed in CheckboxShorthandProps
 */
export const checkboxShorthandProps: CheckboxShorthandProps[] = ['label'];

const mergeProps = makeMergeProps<CheckboxState>({ deepMerge: checkboxShorthandProps });

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles,
 * before being passed to renderCheckbox.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to root HTMLElement of Checkbox
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useCheckbox = (
  props: CheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CheckboxProps,
): CheckboxState => {
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultIndeterminate, props.onChange);
  const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const id = useId('checkbox-', props.id);

  const onChange = (ev: React.ChangeEvent<HTMLElement>): void => {
    if (isIndeterminate) {
      setIsChecked(!!isChecked, ev);
      setIsIndeterminate(false);
    } else {
      setIsChecked(!isChecked, ev);
    }
  };

  useComponentRef(ref, isChecked, isIndeterminate, inputRef);

  const state = mergeProps(
    {
      ref,
      label: {
        as: Label,
        htmlFor: id,
      },
      size: 'medium',
      labelPosition: 'end',
      checked: isChecked,
      indeterminate: isIndeterminate,
      inputRef: inputRef,
      inputId: id,
      inputOnChange: onChange,
    },
    defaultProps && resolveShorthandProps(defaultProps, checkboxShorthandProps),
    resolveShorthandProps(props, checkboxShorthandProps),
  );

  return state;
};

const useComponentRef = (
  ref: React.Ref<Partial<HTMLElement>>,
  isChecked: boolean | undefined,
  isIndeterminate: boolean | undefined,
  checkboxRef: React.RefObject<HTMLInputElement>,
) => {
  React.useImperativeHandle(
    ref,
    () => ({
      get checked() {
        return !!isChecked;
      },
      get indeterminate() {
        return !!isIndeterminate;
      },
      focus() {
        if (checkboxRef.current) {
          checkboxRef.current.focus();
        }
      },
    }),
    [checkboxRef, isChecked, isIndeterminate],
  );
};
