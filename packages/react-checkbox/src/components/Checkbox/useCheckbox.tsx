/* eslint-disable no-console */
/* eslint-disable no-alert */
import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useControllableValue, useId } from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxShorthandProps, CheckboxState } from './Checkbox.types';
import { CheckMarkIcon } from '@fluentui/react-icons-mdl2';
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);

  const onChange = (ev: React.ChangeEvent<HTMLElement>): void => {
    if (isChecked === 'indeterminate') {
      setIsChecked(false, ev);
    } else {
      setIsChecked(!isChecked, ev);
    }
  };

  useComponentRef(ref, isChecked, inputRef);

  const state = mergeProps(
    {
      ref,
      label: {
        as: Label,
        required: props.required,
        disabled: props.disabled,
      },
      size: 'medium',
      labelPosition: 'end',
      checked: isChecked === 'indeterminate' ? isChecked : !!isChecked,
      checkmarkIcon: <CheckMarkIcon />,
      inputRef: inputRef,
      id: useId('checkbox-'),
      inputOnChange: onChange,
    },
    defaultProps && resolveShorthandProps(defaultProps, checkboxShorthandProps),
    resolveShorthandProps(props, checkboxShorthandProps),
  );

  if (!state.label.htmlFor) {
    state.label.htmlFor = state.id;
  }

  state.inputId = state.id;
  state.id = state.rootId;

  return state;
};

const useComponentRef = (
  ref: React.Ref<Partial<HTMLElement>>,
  isChecked: 'indeterminate' | boolean | undefined,
  checkboxRef: React.RefObject<HTMLInputElement>,
) => {
  React.useImperativeHandle(
    ref,
    () => ({
      get checked() {
        return isChecked === 'indeterminate' ? isChecked : !!isChecked;
      },
      focus() {
        if (checkboxRef.current) {
          checkboxRef.current.focus();
        }
      },
    }),
    [checkboxRef, isChecked],
  );
};
