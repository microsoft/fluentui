'use client';

import * as React from 'react';
import { useCardHeader_unstable } from './useCardHeader';
import { renderCardHeader_unstable } from './renderCardHeader';
import { useCardHeaderStyles_unstable } from './useCardHeaderStyles.styles';
import type { CardHeaderProps } from './CardHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  let state = useCardHeader_unstable(props, ref);

  state = useCardHeaderStyles_unstable(state);

  state = useCustomStyleHook_unstable('useCardHeaderStyles_unstable')(state);

  return renderCardHeader_unstable(state);
});

CardHeader.displayName = 'CardHeader';
