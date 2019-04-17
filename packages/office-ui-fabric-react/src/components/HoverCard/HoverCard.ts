import { styled } from '../../Utilities';
import { IHoverCardProps, IHoverCardStyles, IHoverCardStyleProps } from './HoverCard.types';
import { getStyles } from './HoverCard.styles';
import { HoverCardBase } from './HoverCard.base';

export const HoverCard: React.StatelessComponent<IHoverCardProps> = styled<IHoverCardProps, IHoverCardStyleProps, IHoverCardStyles>(
  HoverCardBase,
  getStyles,
  undefined,
  {
    scope: 'HoverCard'
  }
);
