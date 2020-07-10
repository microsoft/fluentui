import * as React from 'react';
import { useControllableValue } from '@uifabric/react-hooks';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: React.DOMAttributes<HTMLElement>['onClick'];
}

export interface ToggleState extends ToggleProps {}

/**
 * The useToggle hook processes adds the correct toggled state needed.
 * @param props - props to derive state from.
 */
export const useToggle = <TProps, TState extends TProps = TProps>(
  props: TProps & ToggleProps,
): TState & ToggleState => {
  const { checked: controlledChecked, defaultChecked = false, onClick, ...rest } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const _onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }

    setChecked(!checked);
  };

  return { ...rest, checked, onClick: _onClick } as TState & ToggleState;
};
