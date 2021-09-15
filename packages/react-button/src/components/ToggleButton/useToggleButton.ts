import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import { useButton } from '../Button/useButton';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

/**
 * Given user props, returns the final state for a ToggleButton.
 */
export const useToggleButton = (
  { checked, defaultChecked, ...props }: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): ToggleButtonState => {
  const buttonState = useButton(props, ref);
  const { role, onClick } = buttonState.root;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  return {
    ...buttonState,
    checked: checkedValue,
    root: {
      ...buttonState.root,
      [isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed']: !!checkedValue,
      onClick: React.useCallback(
        ev => {
          if (onClick) {
            onClick(ev);

            if (ev.defaultPrevented) {
              return;
            }
          }

          setCheckedValue(!checkedValue);
        },
        [checkedValue, setCheckedValue, onClick],
      ),
    },
  };
};
