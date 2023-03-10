import * as React from 'react';
import { useARIAButtonShorthand } from '../../src/button';
import type { ARIAButtonSlotProps } from '../../src/button';
import { getSlots } from '@fluentui/react-components';
import type { ComponentState, Slot } from '@fluentui/react-components';

type Slots = {
  root: Slot<'div'>;
  button: Slot<ARIAButtonSlotProps>;
};

interface State extends ComponentState<Slots> {}

interface DefaultArgs {
  onClick: (ev: React.MouseEvent) => void;
}

export const Default = (args: DefaultArgs) => {
  const state: State = {
    components: { root: 'div', button: 'button' },
    root: {},
    button: {
      ...useARIAButtonShorthand({ as: 'button', onClick: args.onClick }, { required: true }),
      children: React.Fragment,
    },
  };
  const { slots, slotProps } = getSlots<Slots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button}>this is a button</slots.button>
    </slots.root>
  );
};

export const Anchor = (args: DefaultArgs) => {
  type AnchorSlots = {
    root: ARIAButtonSlotProps;
  };
  const props = useARIAButtonShorthand(
    {
      as: 'a',
      href: '/',
      onClick: ev => {
        ev.preventDefault();
        args.onClick(ev);
      },
    },
    { required: true },
  );
  const { slots, slotProps } = getSlots<AnchorSlots>({
    components: { root: 'a' },
    root: props,
  });
  return <slots.root {...slotProps.root}>this is an anchor</slots.root>;
};

export default {
  title: 'useARIAButton',
  argTypes: { onClick: { action: 'clicked' } },
};
