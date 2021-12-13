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
import { Label } from '@fluentui/react-label';

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles,
 * before being passed to renderCheckbox.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to `<input>` element of Checkbox
 */
export const useCheckbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { disabled, required, circular = false, size = 'medium', labelPosition = 'after' } = props;

  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'size'],
  });

  const id = useId('checkbox-', nativeProps.primary.id);

  const state: CheckboxState = {
    circular,
    checked,
    size,
    labelPosition,
    components: {
      root: 'span',
      input: 'input',
      indicator: 'div',
      label: Label,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        type: 'checkbox',
        id,
        ref,
        checked: checked === true,
        ...nativeProps.primary,
      },
    }),
    label: resolveShorthand(props.label, {
      required: false,
      defaultProps: {
        htmlFor: id,
        disabled,
        required,
        size: 'medium', // Even if the checkbox itself is large
      },
    }),
    indicator: resolveShorthand(props.indicator, {
      required: true,
      defaultProps: {
        'aria-hidden': true,
        children:
          size === 'large' ? (
            checked === 'mixed' ? (
              <Mixed16Regular />
            ) : (
              <Checkmark16Regular />
            )
          ) : checked === 'mixed' ? (
            <Mixed12Regular />
          ) : (
            <Checkmark12Regular />
          ),
      },
    }),
  };

  const onChange = state.input.onChange as CheckboxProps['onChange'];
  state.input.onChange = useEventCallback(ev => {
    const val = ev.currentTarget.indeterminate ? 'mixed' : ev.currentTarget.checked;
    onChange?.(ev, { checked: val });
    setChecked(val);
  });

  // Create a ref object for the input element so we can use it to set the indeterminate prop.
  // Use useMergedRefs, since the ref might be undefined or a function-ref (no .current)
  const inputRef = useMergedRefs(state.input.ref);
  state.input.ref = inputRef;

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
