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
export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLElement>): CheckboxState => {
  const { disabled = false, circular = false, required = false, id, rootId, onChange: userOnChange } = props;
  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const inputInternalRef = React.useRef<HTMLInputElement>(null);
  const inputShorthand = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      disabled,
      type: 'checkbox',
      required,
    },
  });

  const state: CheckboxState = {
    circular,
    checked,
    size: 'medium',
    labelPosition: 'after',
    rootId,
    components: {
      root: props.children !== undefined ? Label : 'span',
      indicator: 'div',
      input: 'input',
    },
    input: {
      ...inputShorthand,
      ref: useMergedRefs(inputShorthand.ref, inputInternalRef),
    },
    indicator: resolveShorthand(props.indicator, {
      required: true,
    }),
    root: getNativeElementProps('div', { ref, ...props }),
  };

  state.input.checked = checked === true;
  state.checked = checked ? checked : false;

  if (state.indicator && !state.indicator.children) {
    if (state.size === 'medium') {
      state.indicator.children = checked === 'mixed' ? <Mixed12Regular /> : <Checkmark12Regular />;
    } else {
      state.indicator.children = checked === 'mixed' ? <Mixed16Regular /> : <Checkmark16Regular />;
    }
  }

  const inputOnChange = state.input.onChange;
  state.input.onChange = useEventCallback(ev => {
    ev.stopPropagation();
    inputOnChange?.(ev);

    const val = ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked;

    userOnChange?.(ev, { checked: val });
    setChecked(val);
  });

  state.input.id = useId('checkbox-', id);
  state.root.id = state.rootId;

  const isMixed = checked === 'mixed';
  useIsomorphicLayoutEffect(() => {
    if (inputInternalRef.current) {
      inputInternalRef.current.indeterminate = isMixed;
    }
  }, [isMixed]);

  return state;
};
