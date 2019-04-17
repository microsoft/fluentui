import { styled } from '../../Utilities';
import { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import { TeachingBubbleBase } from './TeachingBubble.base';
import { getStyles } from './TeachingBubble.styles';

export const TeachingBubble: React.StatelessComponent<ITeachingBubbleProps> = styled<
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles
>(TeachingBubbleBase, getStyles, undefined, { scope: 'TeachingBubble' });
