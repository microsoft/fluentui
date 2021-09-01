import * as React from 'react';
import {
  resolveShorthandProps,
  makeMergeProps,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useEventCallback,
} from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxState } from './Checkbox.types';
import { Mixed12Regular, Mixed16Regular, Checkmark12Regular, Checkmark16Regular } from './DefaultIcons';
import { Label } from '@fluentui/react-label';

/**
 * Array of all shorthand properties listed as the keys of CheckboxSlots
 */
export const checkboxShorthandProps = ['indicator', 'input'] as const;

const mergeProps = makeMergeProps<CheckboxState>({ deepMerge: checkboxShorthandProps });

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles,
 * before being passed to renderCheckbox.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to root HTMLElement of Checkbox
 */
export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLElement>): CheckboxState => {
  const state: CheckboxState = mergeProps(
    {
      ref,
      as: props.children !== undefined ? Label : 'span',
      id: useId('checkbox-'),
      size: 'medium',
      labelPosition: 'after',
      input: {
        as: 'input',
        type: 'checkbox',
        children: null,
      },
      indicator: {
        as: 'div',
      },
    },
    resolveShorthandProps(props, checkboxShorthandProps),
  );

  const [checked, setCheckedInternal] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const setChecked = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, val: boolean | 'mixed') => {
      const onChange = state.onChange;
      onChange?.(ev, { checked: val });
      setCheckedInternal(val);
    },
    [state.onChange, setCheckedInternal],
  );

  state.input.checked = checked === true;
  state.checked = checked ? checked : false;

  if (!state.indicator.children) {
    if (state.size === 'medium') {
      state.indicator.children = checked === 'mixed' ? <Mixed12Regular /> : <Checkmark12Regular />;
    } else {
      state.indicator.children = checked === 'mixed' ? <Mixed16Regular /> : <Checkmark16Regular />;
    }
  }

  const userOnChange = state.input.onChange;
  state.input.onChange = useEventCallback(ev => {
    ev.stopPropagation();
    userOnChange?.(ev);
    setChecked(ev, ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked);
  });

  if (state.disabled !== undefined) {
    state.input.disabled = state.disabled;
  }

  if (state.required !== undefined) {
    state.input.required = state.required;
  }

  state.input.id = state.id;
  state.id = state.rootId;

  const inputRef = useMergedRefs(state.input.ref);
  state.input.ref = inputRef;
  const isMixed = checked === 'mixed';
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isMixed;
    }
  }, [inputRef, isMixed]);

  return state;
};
