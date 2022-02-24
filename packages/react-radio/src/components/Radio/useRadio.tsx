import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { CircleFilled } from '@fluentui/react-icons';
import type { RadioProps, RadioState } from './Radio.types';
import { RadioGroupContext } from '../../contexts/RadioGroupContext';

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
    checked = group.value !== undefined ? group.value === props.value : undefined,
    defaultChecked = group.defaultValue !== undefined ? group.defaultValue === props.value : undefined,
    labelPosition = group.layout === 'horizontalStacked' ? 'below' : 'after',
    disabled = group.disabled,
    required,
    size = 'medium',
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'size'],
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
      name: group?.name,
      checked,
      defaultChecked,
      ...nativeProps.primary,
    },
  });

  const label = resolveShorthand(props.label, {
    defaultProps: {
      htmlFor: input.id,
      disabled,
      required,
      size: 'medium', // Even if the radio itself is large
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
    size,
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
