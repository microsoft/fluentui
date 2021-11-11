import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import { ToggleButtonProps, ToggleButtonState } from '@fluentui/react-button';
import { useButtonState } from '../Button/useButtonState';

/**
 * Takes props and returns state for eventually rendering a ToggleButton.
 * @param props - User provided props to the ToggleButton component.
 */
export const useToggleButtonState = ({
  checked,
  defaultChecked,
  ...buttonProps
}: ToggleButtonProps): ToggleButtonState => {
  const buttonState = useButtonState(buttonProps);
  const { role, onClick } = buttonState.root;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';
  const ariaCheckedProp = isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed';

  const handleRootClick = React.useCallback(
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
  );

  return {
    ...buttonState,

    // State calculated from a set of props
    checked: checkedValue,

    // Slots definition
    root: {
      ...buttonState.root,
      [ariaCheckedProp]: checkedValue,
      onClick: handleRootClick,
    },
  };
};
