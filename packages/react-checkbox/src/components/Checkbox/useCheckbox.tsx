import * as React from 'react';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { CheckboxProps, CheckboxState } from './Checkbox.types';
import { Mixed12Regular, Mixed16Regular, Checkmark12Regular, Checkmark16Regular } from './DefaultIcons';
import { Label, LabelProps } from '@fluentui/react-label';

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles,
 * before being passed to renderCheckbox.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to <input> element of Checkbox
 */
export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { children, circular, size = 'medium', labelPosition = 'after' } = props;

  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  // Create a ref object for the input element so we can use it later.
  // Use useMergedRefs, since the passed `ref` might be undefined or a function-ref (no .current)
  const inputRef = useMergedRefs(ref);

  const nativeProps = getPartitionedNativeProps({
    props,
    tagName: 'input',
    // Exclude checked/defaultChecked/children from the input slot; they have custom handling in useCheckbox
    excludedPropNames: ['checked', 'defaultChecked', 'children'],
  });

  const state: CheckboxState = {
    children,
    circular,
    checked,
    size,
    labelPosition,
    components: {
      root: props.children !== undefined ? (Label as React.ComponentType<LabelProps>) : 'span',
      indicator: 'div',
      input: 'input',
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        type: 'checkbox',
        id: useId('checkbox-', props.id),
        ref: inputRef,
        checked: checked === true,
        ...nativeProps.primary,
      },
    }),
    indicator: resolveShorthand(props.indicator, {
      required: true,
    }),
  };

  if (!state.indicator.children) {
    if (state.size === 'medium') {
      state.indicator.children = checked === 'mixed' ? <Mixed12Regular /> : <Checkmark12Regular />;
    } else {
      state.indicator.children = checked === 'mixed' ? <Mixed16Regular /> : <Checkmark16Regular />;
    }
  }

  const onChange = state.input.onChange as CheckboxProps['onChange'];
  state.input.onChange = useEventCallback(ev => {
    ev.stopPropagation();
    const val = ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked;
    onChange?.(ev, { checked: val });
    setChecked(val);
  });

  // Set the <input> element's checked and indeterminate properties based on our tri-state property.
  // Since indeterminate can only be set via javascript, it has to be done in a layout effect.
  const indeterminate = checked === 'mixed';
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [inputRef, indeterminate]);

  return state;
};
