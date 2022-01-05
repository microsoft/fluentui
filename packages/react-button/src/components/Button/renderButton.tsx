import * as React from 'react';

import { getSlots } from '@fluentui/react-utilities';
import { fluentButton, provideFluentDesignSystem } from '../../../../web-components/src';
import type { ButtonSlots, ButtonState } from './Button.types';

provideFluentDesignSystem().register(fluentButton());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomElement<T> = Partial<T & React.DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['fluent-button']: CustomElement<any>;
    }
  }
}

/**
 * Renders a Button component by passing the state defined props to the appropriate slots.
 */
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots<ButtonSlots>(state, ['root', 'icon']);
  const { iconOnly, iconPosition } = state;

  return (
    <fluent-button {...slotProps.root}>
      {iconPosition !== 'after' && <slots.icon slot="start" {...slotProps.icon} />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && <slots.icon slot="end" {...slotProps.icon} />}
    </fluent-button>
  );
};
