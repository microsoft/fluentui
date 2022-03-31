import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { mergeClasses } from '@griffel/react';
import { useToggleable } from '../../../utils';
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

const useToggleCompoundButtonStyles = (
  state: CompoundButtonState & ToggleButtonState,
): CompoundButtonState & ToggleButtonState => {
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

const ToggleCompoundButton: ForwardRefComponent<CompoundButtonProps & ToggleButtonProps> = React.forwardRef(
  (props, ref) => {
    const compoundButtonState = useCompoundButton_unstable(props, ref);

    const toggleCompoundButtonState = useToggleable(props, compoundButtonState);

    useToggleCompoundButtonStyles(toggleCompoundButtonState);

    return renderCompoundButton_unstable(toggleCompoundButtonState);
  },
) as ForwardRefComponent<CompoundButtonProps & ToggleButtonProps>;

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
