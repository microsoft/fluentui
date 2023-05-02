import * as React from 'react';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, mergeCallbacks, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useRadioGroupContextValue_unstable } from '../../contexts/RadioGroupContext';
import { useFocusWithin } from '@fluentui/react-tabster';
import type { RadioProps, RadioState } from './Radio.types';

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles_unstable,
 * before being passed to renderRadio_unstable.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to `<input>` element of Radio
 */
export const useRadio_unstable = (props: RadioProps, ref: React.Ref<HTMLInputElement>): RadioState => {
  const group = useRadioGroupContextValue_unstable();

  const {
    name = group.name,
    checked = group.value !== undefined ? group.value === props.value : undefined,
    defaultChecked = group.defaultValue !== undefined ? group.defaultValue === props.value : undefined,
    labelPosition = group.layout === 'horizontal-stacked' ? 'below' : 'after',
    disabled = group.disabled,
    required = group.required,
    'aria-describedby': ariaDescribedBy = group['aria-describedby'],
    onChange,
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const root = resolveShorthand(props.root, {
    required: true,
    defaultProps: {
      ref: useFocusWithin<HTMLSpanElement>(),
      ...nativeProps.root,
    },
  });

  const input = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      ref,
      type: 'radio',
      id: useId('radio-', nativeProps.primary.id),
      name,
      checked,
      defaultChecked,
      disabled,
      required,
      'aria-describedby': ariaDescribedBy,
      ...nativeProps.primary,
    },
  });

  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { value: ev.currentTarget.value }));

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor: input.id,
      disabled: input.disabled,
    },
  });

  const indicator = resolveShorthand(props.indicator, {
    required: true,
    defaultProps: {
      'aria-hidden': true,
      children: <CircleFilled />,
    },
  });

  return {
    labelPosition,
    components: {
      root: 'span',
      input: 'input',
      label: Label,
      indicator: 'div',
    },
    root,
    input,
    label,
    indicator,
  };
};
