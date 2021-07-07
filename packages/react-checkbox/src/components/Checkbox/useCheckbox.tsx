import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useControllableValue, useId } from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxShorthandProps, CheckboxState } from './Checkbox.types';
import { CheckMarkIcon, CheckboxIndeterminateIcon } from '@fluentui/react-icons-mdl2';
import { Label } from '@fluentui/react-label';

/**
 * Array of all shorthand properties listed in CheckboxShorthandProps
 */
export const checkboxShorthandProps: CheckboxShorthandProps[] = ['children'];

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
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked);

  const onChange = () => {
    if (isChecked === 'mixed') {
      setIsChecked(false);
    } else {
      setIsChecked(!isChecked);
    }
  };

  useComponentRef(ref, isChecked, inputRef);

  const state = mergeProps(
    {
      ref,
      id: useId('checkbox-'),
      children: {
        as: Label,
        required: props.required,
        disabled: props.disabled,
      },
      size: 'medium',
      labelPosition: 'end',
      checked: isChecked ? isChecked : false,
      checkmarkIcon: <CheckMarkIcon />,
      mixedIcon: <CheckboxIndeterminateIcon />,
      inputProps: {
        ref: inputRef,
        type: 'checkbox',
        onChange: onChange,
        disabled: props.disabled,
        required: props.required,
        'aria-label': props['aria-label'], // todo
        'aria-labelledby': props['aria-labelledby'], // todo
        'aria-describedby': props['aria-describedby'],
        'aria-posinset': props['aria-posinset'],
        'aria-setsize': props['aria-setsize'],
        'aria-disabled': props.disabled,
        'aria-checked': isChecked,
      },
    },
    defaultProps && resolveShorthandProps(defaultProps, checkboxShorthandProps),
    resolveShorthandProps(props, checkboxShorthandProps),
  );

  if (!state.children.htmlFor) {
    state.children.htmlFor = state.id;
  }

  if (state.inputProps) {
    state.inputProps.id = state.id;
  }
  state.id = state.rootId;

  // TODO: set indetereminate
  if (inputRef.current) {
    inputRef.current.indeterminate = isChecked === 'mixed' ? true : false;
  }

  return state;
};

const useComponentRef = (
  ref: React.Ref<Partial<HTMLElement>>,
  isChecked: 'mixed' | boolean | undefined,
  inputRef: React.RefObject<HTMLInputElement>,
) => {
  React.useImperativeHandle(
    ref,
    () => ({
      get checked() {
        return isChecked;
      },
      get indeterminate() {
        return isChecked === 'mixed';
      },
      focus() {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }),
    [inputRef, isChecked],
  );
};
