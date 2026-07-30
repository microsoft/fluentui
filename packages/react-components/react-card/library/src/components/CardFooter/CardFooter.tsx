'use client';

import * as React from 'react';
import { useCardFooter_unstable } from './useCardFooter';
import { renderCardFooter_unstable } from './renderCardFooter';
import { useCardFooterStyles_unstable } from './useCardFooterStyles.styles';
import type { CardFooterProps } from './CardFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Component to render Button actions in a Card component.
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  let state = useCardFooter_unstable(props, ref);

  state = useCardFooterStyles_unstable(state);

  state = useCustomStyleHook_unstable('useCardFooterStyles_unstable')(state);

  return renderCardFooter_unstable(state);
});

CardFooter.displayName = 'CardFooter';
