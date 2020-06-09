import * as React from 'react';
import useButtonAria from '../hooks/useButtonAria';
import useButtonClasses from '../hooks/useButtonClasses';
import useButtonTemplate from '../hooks/useButtonTemplate';
import CallingsIcon from './CallingsIcon';
import { ButtonProps, ButtonStylesProps } from '@fluentui/react-northstar';

interface ToggleButtonProps extends ButtonProps {
  as?: string;
}

interface ToggleButtonStylesProps extends ButtonStylesProps {
  toggled?: boolean;
}

const ToggleButton = React.forwardRef((props: ToggleButtonProps, ref) => {
  const [toggled, setToggled] = React.useState(false);
  // const check = useCheckboxState();

  const classes = useButtonClasses<ToggleButtonProps, ToggleButtonStylesProps>({
    props,
    displayName: 'ToggleButton',
    overrides: {
      stylingTokens: {
        toggled,
      },
    },
  });

  const getA11yProps = useButtonAria({
    props: { as: 'button', ...props },
    debugName: 'CircularCallingsButton',
  });

  const element = useButtonTemplate({
    props,
    classes,
    getA11yProps,
    ref,
    slots: { icon: CallingsIcon },
    actionHandlers: {
      performClick: () => setToggled(!toggled),
    },
  });

  return element;
});

export default ToggleButton;
