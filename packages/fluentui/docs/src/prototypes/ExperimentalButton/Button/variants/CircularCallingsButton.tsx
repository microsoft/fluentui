import * as React from 'react';
import useButtonAria from '../hooks/useButtonAria';
import { CallingsButtonProps, useCallingsButtonClasses } from './CallingsButton';
import useButtonTemplate from '../hooks/useButtonTemplate';
import CallingsIcon from './CallingsIcon';
// import CallingsContent from "./CallingsContent";

interface CircularCallingsButton extends CallingsButtonProps {}

const CircularCallingsButton = React.forwardRef((props: CallingsButtonProps, ref) => {
  const classes = useCallingsButtonClasses({
    props,
    displayName: 'CircularCallingsButton',
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
    slots: {
      icon: CallingsIcon,
      // content: CallingsContent
    },
  });

  return element;
});

export default CircularCallingsButton;
