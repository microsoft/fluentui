import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './HoverCard.styles';
import { HoverCardBase } from './HoverCard.base';
import type { IHoverCardProps, IHoverCardStyles, IHoverCardStyleProps } from './HoverCard.types';

export const HoverCard: React.FunctionComponent<IHoverCardProps> = styled<
  IHoverCardProps,
  IHoverCardStyleProps,
  IHoverCardStyles
>(HoverCardBase, getStyles, undefined, {
  scope: 'HoverCard',
});
