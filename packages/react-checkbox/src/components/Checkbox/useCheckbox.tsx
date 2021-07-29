import * as React from 'react';
import {
  resolveShorthand,
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { CheckboxProps, CheckboxState, CheckboxSlots } from './Checkbox.types';
import { DefaultCheckmarkIcon, DefaultMixedIcon } from './DefaultIcons';

/**
 * Array of all shorthand properties listed as the keys of InputSlots
 */
export const checkboxShorthandProps: (keyof CheckboxSlots)[] = ['label', 'indicator', 'input'];

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles,
 * before being passed to renderCheckbox.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to root HTMLElement of Checkbox
 */
export const useCheckbox = (
  props: CheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CheckboxProps,
): CheckboxState => {
  const state: CheckboxState = {
    ...props,

    components: {
      label: Label,
      indicator: 'div',
      input: 'input',
    },

    ref,
    as: 'div',
    id: useId('checkbox-'),
    size: 'medium',
    labelPosition: 'after',

    label: resolveShorthand(props.label),
    input: resolveShorthand(props.input, {
      type: 'checkbox',
      children: null,
    }),
    indicator: resolveShorthand(props.indicator),
  };

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
