/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import { useARIAButtonShorthand } from '../../src/button';
import type { ARIAButtonSlotProps } from '../../src/button';
import { ComponentState, Slot, assertSlots } from '@fluentui/react-components';

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
  assertSlots<Slots>(state);
  return (
    <state.root>
      <state.button>this is a button</state.button>
    </state.root>
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
  const state = {
    root: props,
  };
  assertSlots<AnchorSlots>(state);
  return <state.root>this is an anchor</state.root>;
};

export default {
  title: 'useARIAButton',
  argTypes: { onClick: { action: 'clicked' } },
};
