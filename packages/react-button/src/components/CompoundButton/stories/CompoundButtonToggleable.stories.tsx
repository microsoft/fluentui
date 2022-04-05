import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { useMergedEventCallbacks } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { useToggleState } from '../../../utils';
import {
  renderCompoundButton_unstable,
  useCompoundButton_unstable,
  useCompoundButtonStyles_unstable,
} from '../../../CompoundButton';
import {
  useCheckedStyles as useToggleButtonCheckedStyles,
  useDisabledStyles as useToggleButtonDisabledStyles,
} from '../../ToggleButton/useToggleButtonStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CompoundButtonProps, CompoundButtonState } from '../../../CompoundButton';
import type { ToggleButtonProps, ToggleButtonState } from '../../../ToggleButton';

type ToggleCompoundButtonProps = CompoundButtonProps & ToggleButtonProps;
type ToggleCompoundButtonState = CompoundButtonState & ToggleButtonState;

const useToggleCompoundButton = (
  props: ToggleCompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleCompoundButtonState => {
  const compoundButtonState = useCompoundButton_unstable(props, ref);
  const { onClick, role } = compoundButtonState.root;

  const { 'aria-checked': ariaChecked, 'aria-pressed': ariaPressed, checked, onClick: onToggleClick } = useToggleState({
    ...props,
    role,
  });

  return {
    ...compoundButtonState,

    // State calculated from a set of props
    checked,

    // Slots definition
    root: {
      ...compoundButtonState.root,
      'aria-checked': ariaChecked,
      'aria-pressed': ariaPressed,
      onClick: useMergedEventCallbacks(
        onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>,
        onToggleClick,
      ),
    },
  };
};

const useToggleCompoundButtonStyles = (state: ToggleCompoundButtonState): ToggleCompoundButtonState => {
  const checkedStyles = useToggleButtonCheckedStyles();
  const disabledStyles = useToggleButtonDisabledStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    // Checked styles
    checked && checkedStyles.base,
    appearance && checked && checkedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && disabledStyles.base,
    appearance && (disabled || disabledFocusable) && disabledStyles[appearance],

    // User provided class name
    state.root.className,
  );

  useCompoundButtonStyles_unstable(state);

  return state;
};

const ToggleCompoundButton: ForwardRefComponent<ToggleCompoundButtonProps> = React.forwardRef((props, ref) => {
  const state = useToggleCompoundButton(props, ref);

  useToggleCompoundButtonStyles(state);

  return renderCompoundButton_unstable(state);
}) as ForwardRefComponent<ToggleCompoundButtonProps>;

export const Toggleable = () => (
  <ToggleCompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
    Example
  </ToggleCompoundButton>
);

Toggleable.parameters = {
  docs: {
    description: {
      story: 'A compound button can be recomposed via its hooks to be toggleable',
    },
  },
};
