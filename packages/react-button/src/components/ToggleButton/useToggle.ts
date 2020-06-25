import * as React from 'react';
import { useControllableValue } from '@uifabric/react-hooks';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: React.DOMAttributes<HTMLElement>['onClick'];
}

interface ToggleState extends ToggleProps {}

/**
 * The useToggleButton hook processes the ToggleButton component props and returns state.
 * @param props - ToggleButton props to derive state from.
 */
export const useToggle = <TProps, TState extends TProps = TProps>(
  props: TProps & ToggleProps,
): TState & ToggleState => {
  const { checked: controlledChecked, defaultChecked = false, onClick, ...rest } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked);

  const _onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      setChecked(!checked);
    },
    [checked, onClick],
  );

  return { ...rest, checked, onClick: _onClick } as TState & ToggleState;
};
