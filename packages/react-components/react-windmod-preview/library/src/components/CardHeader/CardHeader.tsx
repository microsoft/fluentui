'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCardHeader, useCardHeader } from '@fluentui/react-headless-components-preview/card';

import type { CardHeaderProps } from './CardHeader.types';
import { useCardHeaderStyles } from './useCardHeaderStyles';

/**
 * CardHeader is used to display a header and description for a Card. Windmod CardHeader: the
 * headless card header decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  return renderCardHeader(useCardHeaderStyles(useCardHeader(props, ref)));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<CardHeaderProps>;

CardHeader.displayName = 'CardHeader';
