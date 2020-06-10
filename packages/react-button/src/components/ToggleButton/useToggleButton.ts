import * as React from 'react';
import { ComposeOptions } from '@fluentui/react-compose';
import { useControllableValue } from '@uifabric/react-hooks';
import { ButtonProps } from '../Button/Button.types';
import { ToggleButtonProps } from './ToggleButton.types';

/**
 * The useToggleButton hook processes the Button component props and returns state.
 * @param props
 */
export const useToggleButton: ComposeOptions<
  ToggleButtonProps,
  ToggleButtonProps,
  ButtonProps,
  ButtonProps
  // tslint:disable-next-line:no-any
>['state'] = (props): any => {
  const { checked: controlledChecked, defaultChecked = false, onClick: onButtonClick } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onButtonClick) {
      onButtonClick(ev);
    }

    setChecked(!checked);
  };

  return { ...props, checked, onClick };
};
