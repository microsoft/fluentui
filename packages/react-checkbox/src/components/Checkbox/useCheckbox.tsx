import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxShorthandProps, CheckboxState } from './Checkbox.types';
import { Label } from '@fluentui/react-label';
import { DefaultCheckmarkIcon, DefaultMixedIcon } from './DefaultIcons';

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
  const state = mergeProps(
    {
      ref,
      id: useId('checkbox-'),
      size: 'medium',
      labelPosition: 'after',
      label: {
        as: Label,
      },
      indicator: {
        as: 'div',
      },
      input: {
        as: 'input',
        type: 'checkbox',
        children: null,
      },
    },
    defaultProps && resolveShorthandProps(defaultProps, checkboxShorthandProps),
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
  state.indicator.children = checked === 'mixed' ? <DefaultMixedIcon /> : <DefaultCheckmarkIcon />;

  const userOnChange = state.input.onChange;
  state.input.onChange = React.useCallback(
    ev => {
      userOnChange?.(ev);
      setChecked(ev, ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked);
    },
    [userOnChange, setChecked],
  );

  if (state.disabled !== undefined) {
    state.label.disabled = state.disabled;
    state.input.disabled = state.disabled;
  }

  if (state.required !== undefined) {
    state.label.required = state.required;
    state.input.required = state.required;
  }

  if (!state.label.htmlFor) {
    state.label.htmlFor = state.id;
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
  }, [isMixed]);

  return state;
};
