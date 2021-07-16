import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useControllableValue,
  useId,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxShorthandProps, CheckboxState } from './Checkbox.types';
import { CheckMarkIcon } from '@fluentui/react-icons-mdl2';
import { Label } from '@fluentui/react-label';

/**
 * Array of all shorthand properties listed in CheckboxShorthandProps
 */
export const checkboxShorthandProps: CheckboxShorthandProps[] = ['label', 'indicator', 'input'];

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
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked);

  const DefaultMixedIcon = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" />
    </svg>
  );

  const onChange = () => {
    if (isChecked === 'mixed') {
      setIsChecked(false);
    } else {
      setIsChecked(!isChecked);
    }
  };

  const state = mergeProps(
    {
      ref,
      id: useId('checkbox-'),
      size: 'medium',
      labelPosition: 'end',
      checked: isChecked ? isChecked : false,
      label: {
        as: Label,
        required: props.required,
        disabled: props.disabled,
      },
      indicator: {
        as: 'div',
        children: isChecked === 'mixed' ? <DefaultMixedIcon /> : <CheckMarkIcon />,
      },
      input: {
        as: 'input',
        ref: React.useRef<HTMLInputElement>(null),
        type: 'checkbox',
        checked: isChecked === true,
        onChange: onChange,
        children: null,
        disabled: !!props.disabled,
        required: !!props.required,
        'aria-disabled': props.disabled,
        'aria-checked': isChecked === undefined ? false : isChecked,
      },
    },
    defaultProps && resolveShorthandProps(defaultProps, checkboxShorthandProps),
    resolveShorthandProps(props, checkboxShorthandProps),
  );

  const inputRef = state.input.ref;

  useComponentRef(ref, isChecked, inputRef);

  if (!state.label.htmlFor) {
    state.label.htmlFor = state.id;
  }

  if (state.input) {
    state.input.id = state.id;
  }
  state.id = state.rootId;

  const isMixed = isChecked === 'mixed';
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isMixed;
    }
  }, [isMixed]);

  return state;
};

const useComponentRef = (
  ref: React.Ref<HTMLElement>,
  isChecked: 'mixed' | boolean | undefined,
  inputRef: React.RefObject<HTMLInputElement>,
) => {
  React.useImperativeHandle(
    () => {
      ref;
    },
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
