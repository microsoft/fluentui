import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import {
  mergeClasses,
  renderCompoundButton_unstable,
  useCompoundButton_unstable,
  useCompoundButtonStyles_unstable,
} from '@fluentui/react-components';
import { useToggleState } from '../../utils/useToggleState';

import {
  useCheckedStyles as useToggleButtonCheckedStyles,
  useDisabledStyles as useToggleButtonDisabledStyles,
} from '../../components/ToggleButton/useToggleButtonStyles';
import type {
  CompoundButtonProps,
  CompoundButtonState,
  ForwardRefComponent,
  ToggleButtonProps,
  ToggleButtonState,
} from '@fluentui/react-components';

type ToggleCompoundButtonProps = CompoundButtonProps & ToggleButtonProps;
type ToggleCompoundButtonState = CompoundButtonState & ToggleButtonState;

const useToggleCompoundButton = (
  props: ToggleCompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleCompoundButtonState => {
  const compoundButtonState = useCompoundButton_unstable(props, ref);

  return useToggleState(props, compoundButtonState);
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

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const AsToggleButton = () => (
  <ToggleCompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content">
    Compound button that can be toggled
  </ToggleCompoundButton>
);

AsToggleButton.parameters = {
  docs: {
    description: {
      story: 'A compound button can be recomposed via its hooks to be toggleable',
    },
  },
};
