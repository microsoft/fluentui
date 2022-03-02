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
import {
  Checkmark12Filled,
  Checkmark16Filled,
  Square12Filled,
  Square16Filled,
  CircleFilled,
} from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';

/**
 * Create the state required to render Checkbox.
 *
 * The returned state can be modified with hooks such as useCheckboxStyles_unstable,
 * before being passed to renderCheckbox_unstable.
 *
 * @param props - props from this instance of Checkbox
 * @param ref - reference to `<input>` element of Checkbox
 */
export const useCheckbox_unstable = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>): CheckboxState => {
  const { disabled, required, shape = 'square', size = 'medium', labelPosition = 'after', onChange } = props;

  const [checked, setChecked] = useControllableState({
    defaultState: props.defaultChecked,
    state: props.checked,
    initialState: false,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'size', 'onChange'],
  });

  const mixed = checked === 'mixed';
  const id = useId('checkbox-', nativeProps.primary.id);

  let checkmarkIcon;
  if (mixed) {
    if (shape === 'circular') {
      checkmarkIcon = <CircleFilled />;
    } else {
      checkmarkIcon = size === 'large' ? <Square16Filled /> : <Square12Filled />;
    }
  } else {
    checkmarkIcon = size === 'large' ? <Checkmark16Filled /> : <Checkmark12Filled />;
  }

  const state: CheckboxState = {
    shape,
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
        children: checkmarkIcon,
      },
    }),
  };

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
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = mixed;
    }
  }, [inputRef, mixed]);

  return state;
};
