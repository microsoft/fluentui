import { ComponentState, getSlots } from '@fluentui/react-utilities';
import * as React from 'react';
import { ARIAButtonAsElementProps, ARIAButtonProps, useARIAButton } from './useARIAButton';

type Slots = {
  button: ARIAButtonProps;
};

interface State extends ComponentState<Slots> {}

interface DefaultArgs {
  onClick: (ev: React.MouseEvent) => void;
}

export const Default = (args: DefaultArgs) => {
  const state: State = {
    button: {
      ...useARIAButton({ as: 'button', onClick: args.onClick }),
      children: React.Fragment,
    },
  };
  const { slots, slotProps } = getSlots<Slots>(state, ['button']);
  return (
    <slots.root {...slotProps.root}>
      <slots.button {...(slotProps.button as ARIAButtonAsElementProps)}>this is a button</slots.button>
    </slots.root>
  );
};

export const Anchor = (args: DefaultArgs) => {
  const props = useARIAButton({
    as: 'a',
    onClick: ev => {
      ev.preventDefault();
      args.onClick(ev);
    },
  });
  const { slots, slotProps } = getSlots(props, []);
  return (
    <slots.root href="/" {...slotProps.root}>
      this is an anchor
    </slots.root>
  );
};

export const Span = (args: DefaultArgs) => {
  const props = useARIAButton({ as: 'span', onClick: args.onClick });
  const { slots, slotProps } = getSlots(props, []);
  return <slots.root {...slotProps.root}>this is a span</slots.root>;
};

export const Div = (args: DefaultArgs) => {
  const props = useARIAButton({ as: 'div', onClick: args.onClick });
  const { slots, slotProps } = getSlots(props, []);
  return <slots.root {...slotProps.root}>this is a div</slots.root>;
};

export default {
  title: 'useARIAButton',
  argTypes: { onClick: { action: 'clicked' } },
};
