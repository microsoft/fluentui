import * as React from 'react';
import { useControllableValue } from '@fluentui/react-utilities';

export interface CheckedState {
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: React.DOMAttributes<HTMLElement>['onClick'];

  role?: string;
  'aria-checked'?: React.AriaAttributes['aria-pressed'];
  'aria-pressed'?: React.AriaAttributes['aria-pressed'];
}

/**
 * The useToggle hook processes adds the correct toggled state and acccessibility as needed.
 * @param state - state to read and augment.
 */
export const useChecked = <TState extends CheckedState>(state: TState) => {
  const { onClick, checked, defaultChecked, role } = state;
  const [checkedValue, setCheckedValue] = useControllableValue(checked, defaultChecked);

  // Ensure the state is the correct controlled/uncontrolled value.
  state.checked = checkedValue;

  // Ensure the right aria value is set to represent the checked state.
  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  state[isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed'] = !!checkedValue;

  state.onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (onClick) {
        onClick(ev);

        if (ev.defaultPrevented) {
          return;
        }
      }

      setCheckedValue(!checkedValue);
    },
    [checkedValue, setCheckedValue, onClick],
  );
};
