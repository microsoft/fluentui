import * as React from 'react';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getPartitionedNativeProps, resolveShorthand, useId } from '@fluentui/react-utilities';
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
  const {
    checked,
    defaultChecked,
    disabled,
    input,
    label,
    labelPosition = 'after',
    onChange,
    required,
    root,
    track,
  } = props;

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const id = useId('switch-', nativeProps.primary.id);

  const rootShorthand = resolveShorthand(root, {
    defaultProps: nativeProps.root,
    required: true,
  });
  const inputShorthand = resolveShorthand(input, {
    defaultProps: {
      checked,
      defaultChecked,
      id,
      onChange: React.useCallback(
        ev => {
          onChange?.(ev, { checked: ev.currentTarget.checked });
        },
        [onChange],
      ),
      ref,
      role: 'switch',
      type: 'checkbox',
      ...nativeProps.primary,
    },
    required: true,
  });
  const labelShorthand = resolveShorthand(label, {
    defaultProps: {
      disabled,
      htmlFor: id,
      required,
      size: 'medium',
    },
  });
  const trackShorthand = resolveShorthand(track, {
    defaultProps: {
      'aria-hidden': true,
      children: <CircleFilled />,
    },
    required: true,
  });

  return {
    labelPosition,

    //Slots definition
    components: {
      root: 'div',
      input: 'input',
      label: Label,
      track: 'div',
    },

    root: rootShorthand,
    input: inputShorthand,
    label: labelShorthand,
    track: trackShorthand,
  };
};
