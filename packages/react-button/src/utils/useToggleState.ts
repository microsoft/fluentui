import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  role?: React.AriaRole;
};

type ToggleState = {
  'aria-checked'?: React.AriaAttributes['aria-checked'];
  'aria-pressed'?: React.AriaAttributes['aria-pressed'];
  checked: boolean;
  onClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function useToggleState<TToggleButtonProps extends ToggleProps>(props: TToggleButtonProps): ToggleState {
  const { checked, defaultChecked, disabled, disabledFocusable, role } = props;

  const [checkedValue, setCheckedValue] = useControllableState({
    state: checked,
    defaultState: defaultChecked,
    initialState: false,
  });

  const isCheckboxTypeRole = role === 'menuitemcheckbox' || role === 'checkbox';

  const onClick = React.useCallback(
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
    checked: checkedValue,
    [isCheckboxTypeRole ? 'aria-checked' : 'aria-pressed']: checkedValue,
    onClick,
  };
}
