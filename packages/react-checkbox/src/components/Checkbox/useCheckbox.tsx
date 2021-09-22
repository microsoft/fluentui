import * as React from 'react';
import {
  useControllableState,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useEventCallback,
  resolveShorthand,
  getNativeElementProps,
} from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxSlots, CheckboxState } from './Checkbox.types';
import { Mixed12Regular, Mixed16Regular, Checkmark12Regular, Checkmark16Regular } from './DefaultIcons';
import { Label } from '@fluentui/react-label';

/**
 * Array of all shorthand properties listed as the keys of CheckboxSlots
 */
export const checkboxShorthandProps: Array<keyof CheckboxSlots> = ['root', 'indicator', 'input'];

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
  {
    disabled = false,
    circular = false,
    required = false,
    id,
    defaultChecked,
    checked: propsChecked,
    ...props
  }: CheckboxProps,
  ref: React.Ref<HTMLElement>,
): CheckboxState => {
  const [checked, setCheckedInternal] = useControllableState({
    defaultState: defaultChecked,
    state: propsChecked,
    initialState: false,
  });

  const state: CheckboxState = {
    circular,
    checked: checked,
    size: 'medium',
    labelPosition: 'after',
    components: { root: props.children !== undefined ? Label : 'span', indicator: 'div', input: 'input' },
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        disabled,
        type: 'checkbox',
        required,
      },
    }),
    indicator: resolveShorthand(props.indicator, {
      required: true,
    }),
    root: getNativeElementProps('div', { ref, ...props }),
  };

  const setChecked = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, val: boolean | 'mixed') => {
      const onChange = props.onChange;
      onChange?.(ev, { checked: val });
      setCheckedInternal(val);
    },
    [props.onChange, setCheckedInternal],
  );

  state.input.checked = checked === true;
  state.checked = checked ? checked : false;

  if (state.indicator && !state.indicator.children) {
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

  state.input.id = useId('checkbox-', id);
  state.root.id = state.rootId;

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
