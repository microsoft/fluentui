import * as React from 'react';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, mergeCallbacks, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useRadioGroupContext_unstable } from '../../contexts/RadioGroupContext';
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
  const nameGroup = useRadioGroupContext_unstable(ctx => ctx.name);
  const value = useRadioGroupContext_unstable(ctx => ctx.value);
  const defaultValue = useRadioGroupContext_unstable(ctx => ctx.defaultValue);
  const disabledGroup = useRadioGroupContext_unstable(ctx => ctx.disabled);
  const layout = useRadioGroupContext_unstable(ctx => ctx.layout);
  const requiredGroup = useRadioGroupContext_unstable(ctx => ctx.required);

  const {
    name = nameGroup,
    checked = value !== undefined ? value === props.value : undefined,
    defaultChecked = defaultValue !== undefined ? defaultValue === props.value : undefined,
    labelPosition = layout === 'horizontal-stacked' ? 'below' : 'after',
    disabled = disabledGroup,
    required = requiredGroup,
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
      ...nativeProps.primary,
    },
  });

  input.onChange = mergeCallbacks(input.onChange, ev => onChange?.(ev, { value: ev.currentTarget.value }));

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor: input.id,
      disabled,
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
