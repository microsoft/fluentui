import * as React from 'react';
import { useControllableValue } from '@uifabric/react-hooks';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: React.DOMAttributes<HTMLElement>['onClick'];
}

interface ToggleState extends ToggleProps {}

/**
 * The useToggleButton hook processes the Button component props and returns state.
 * @param props - ToggleButton props to derive state from.
 */
export const useToggle = <TProps, TState extends TProps = TProps>(
  props: TProps & ToggleProps,
): TState & ToggleState => {
  const { checked: controlledChecked, defaultChecked = false, onClick: onButtonClick } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onButtonClick) {
      onButtonClick(ev);
    }

    setChecked(!checked);
  };

  return { ...props, checked, onClick } as TState & ToggleState;
};
