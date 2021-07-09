import { getSlots } from '@fluentui/react-utilities';
import * as React from 'react';
import { useARIAButton } from './useARIAButton';

interface DefaultArgs {
  onClick: (ev: React.MouseEvent) => void;
}

export const Default = (args: DefaultArgs) => {
  const props = useARIAButton({ as: 'button', onClick: args.onClick });
  const { slots, slotProps } = getSlots(props, []);
  return <slots.root {...slotProps.root}>this is a button</slots.root>;
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
