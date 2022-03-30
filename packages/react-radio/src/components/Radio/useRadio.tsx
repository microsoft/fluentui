import * as React from 'react';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, resolveShorthand, useId, useMergedEventCallbacks } from '@fluentui/react-utilities';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';
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
  const group = React.useContext(RadioGroupContext);

  const {
    name = group.name,
    checked = group.value !== undefined ? group.value === props.value : undefined,
    defaultChecked = group.defaultValue !== undefined ? group.defaultValue === props.value : undefined,
    labelPosition = group.layout === 'horizontalStacked' ? 'below' : 'after',
    disabled = group.disabled,
    required,
    onChange,
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const root = resolveShorthand(props.root, {
    required: true,
    defaultProps: nativeProps.root,
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
      ...nativeProps.primary,
    },
  });

  input.onChange = useMergedEventCallbacks(input.onChange, ev => onChange?.(ev, { value: ev.currentTarget.value }));

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor: input.id,
      disabled,
      required,
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
