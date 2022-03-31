import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import type { ButtonState } from '../components/Button/Button.types';
import type { ToggleButtonProps, ToggleButtonState } from '../components/ToggleButton/ToggleButton.types';

export function useToggleable<
  TToggleButtonProps extends ToggleButtonProps,
  TButtonState extends ButtonState,
  TToggleButtonState extends ToggleButtonState & TButtonState
>(props: TToggleButtonProps, buttonState: TButtonState): TToggleButtonState {
  const { checked, defaultChecked, disabled, disabledFocusable } = props;
  const { role, onClick } = buttonState.root;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  return {
    ...buttonState,

    // State calculated from a set of props
    checked: checkedValue,

    // Slots definition
    root: {
      ...buttonState.root,
      [isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed']: checkedValue,
      onClick: React.useCallback(
        ev => {
          if (!disabled && !disabledFocusable) {
            onClick?.(ev);

            if (ev.defaultPrevented) {
              return;
            }

            setCheckedValue(!checkedValue);
          }
        },
        [checkedValue, disabled, disabledFocusable, setCheckedValue, onClick],
      ),
    },
  } as TToggleButtonState;
}
