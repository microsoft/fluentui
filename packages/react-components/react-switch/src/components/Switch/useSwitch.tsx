import * as React from 'react';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, resolveShorthand, useId, useMergedEventCallbacks } from '@fluentui/react-utilities';
import type { SwitchProps, SwitchState } from './Switch.types';

/**
 * Create the state required to render Switch.
 *
 * The returned state can be modified with hooks such as useSwitchStyles_unstable,
 * before being passed to renderSwitch_unstable.
 *
 * @param props - props from this instance of Switch
 * @param ref - reference to `<input>` element of Switch
 */
export const useSwitch_unstable = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const { checked, defaultChecked, disabled, labelPosition = 'after', onChange, required } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const id = useId('switch-', nativeProps.primary.id);

  const root = resolveShorthand(props.root, {
    defaultProps: nativeProps.root,
    required: true,
  });

  const indicator = resolveShorthand(props.indicator, {
    defaultProps: {
      'aria-hidden': true,
      children: <CircleFilled />,
    },
    required: true,
  });

  const input = resolveShorthand(props.input, {
    defaultProps: {
      checked,
      defaultChecked,
      id,
      ref,
      role: 'switch',
      type: 'checkbox',
      ...nativeProps.primary,
    },
    required: true,
  });
  input.onChange = useMergedEventCallbacks(input.onChange, ev => onChange?.(ev, { checked: ev.currentTarget.checked }));

  const label = resolveShorthand(props.label, {
    defaultProps: {
      disabled,
      htmlFor: id,
      required,
      size: 'medium',
    },
  });

  return {
    labelPosition,

    //Slots definition
    components: {
      root: 'div',
      indicator: 'div',
      input: 'input',
      label: Label,
    },

    root,
    indicator,
    input,
    label,
  };
};
