'use client';

import * as React from 'react';
import { renderButton_unstable } from './renderButton';
import type { ButtonState } from './Button.types';
import { useButtonBase_unstable } from './useButtonBase';
type ButtonBaseProps = Parameters<typeof useButtonBase_unstable>[0];

/**
 * ButtonUnstyled - an unstyled version of the Button component, has no default Fluent styles applied but provides
 * the necessary structure and behavior.
 *
 * @param props - Button props
 * @param ref - Ref to the button element
 */
export const ButtonUnstyled = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonBaseProps>((props, ref) => {
  const state = useButtonBase_unstable(props, ref);

  return renderButton_unstable(state as ButtonState);
});

ButtonUnstyled.displayName = 'ButtonUnstyled';
