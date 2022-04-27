import * as React from 'react';
import { useControllableState, useMergedEventCallbacks } from '@fluentui/react-utilities';
import type { ButtonState } from '../Button';
import type { ToggleButtonProps, ToggleButtonState } from '../ToggleButton';

export function useToggleState<
  TToggleButtonProps extends Pick<ToggleButtonProps, 'checked' | 'defaultChecked' | 'disabled' | 'disabledFocusable'>,
  TButtonState extends Pick<ButtonState, 'root'>,
  TToggleButtonState extends Pick<ToggleButtonState, 'checked' | 'root'>
>(props: TToggleButtonProps, state: TButtonState): TToggleButtonState {
  const { checked, defaultChecked, disabled, disabledFocusable } = props;
  const { onClick, role } = state.root;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  const onToggleClick = React.useCallback(
    ev => {
      if (!disabled && !disabledFocusable) {
        if (ev.defaultPrevented) {
          return;
        }

        setCheckedValue(!checkedValue);
      }
    },
    [checkedValue, disabled, disabledFocusable, setCheckedValue],
  );

  return {
    ...state,

    checked: checkedValue,

    root: {
      ...state.root,
      [isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed']: checkedValue,
      onClick: useMergedEventCallbacks(
        onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
        onToggleClick,
      ),
    },
  } as TToggleButtonState;
}
