import * as React from 'react';
import { useControllableValue } from '@uifabric/react-hooks';
import { ToggleButtonProps } from './ToggleButton.types';

/**
 * The useToggleButton hook processes the Button component props and returns state.
 * @param props
 */
export const useToggleButton = (props: ToggleButtonProps) => {
  const { checked: controlledChecked, defaultChecked = false, onClick: onButtonClick } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onButtonClick) {
      onButtonClick(ev);
    }

    setChecked(!checked);
  };

  return { ...props, checked, setChecked, onClick };
};
