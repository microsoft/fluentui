import * as React from 'react';
import { mergeProps, ComposePreparedOptions } from '@fluentui/react-compose';
import { useControllableValue } from '@uifabric/react-hooks';
import { ToggleButtonProps } from './ToggleButton.types';

/**
 * The useToggleButton hook processes the ToggleButton component props and returns
 * state, slots, and slotProps for consumption by the component.
 * @param props
 */
export const useToggleButton = (
  props: ToggleButtonProps,
  options: ComposePreparedOptions,
  parentState?: ComposePreparedOptions['state'],
) => {
  const { checked: controlledChecked, defaultChecked = false, onClick: onButtonClick } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onButtonClick) {
      onButtonClick(ev);
    }

    setChecked(!checked);
  };

  const state = { ...props, checked, setChecked, onClick };

  if (parentState) {
    return parentState(state, options);
  }

  return mergeProps<ToggleButtonProps>(state, options);
};
