import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';
import { useButton_unstable } from '../Button/useButton';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';

/**
 * Given user props, defines default props for the ToggleButton, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton_unstable = (
  { checked, defaultChecked, ...props }: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  const { disabled, disabledFocusable } = props;
  const buttonState = useButton_unstable(props, ref);
  const { role, onClick } = buttonState.root;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  return {
    // Button state
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
  };
};
