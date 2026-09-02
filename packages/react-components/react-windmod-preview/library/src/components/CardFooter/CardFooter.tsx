'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCardFooter, useCardFooter } from '@fluentui/react-headless-components-preview/card';

import type { CardFooterProps } from './CardFooter.types';
import { useCardFooterStyles } from './useCardFooterStyles';

/**
 * CardFooter is used to display actions for a Card. Windmod CardFooter: the headless card
 * footer decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  return renderCardFooter(useCardFooterStyles(useCardFooter(props, ref)));
});

CardFooter.displayName = 'CardFooter';
