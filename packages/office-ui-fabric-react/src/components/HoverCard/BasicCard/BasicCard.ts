import { styled } from '../../../Utilities';
import { IBasicCardProps, IBasicCardStyles, IBasicCardStyleProps } from './BasicCard.types';
import { getStyles } from './BasicCard.styles';
import { BasicCardBase } from './BasicCard.base';

export const BasicCard = styled<IBasicCardProps, IBasicCardStyleProps, IBasicCardStyles>(BasicCardBase, getStyles, undefined, {
  scope: 'BasicCard'
});
