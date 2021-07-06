import * as React from 'react';
import { styled } from '../../Utilities';
import { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import { TeachingBubbleContentBase } from './TeachingBubbleContent.base';
import { getStyles } from './TeachingBubble.styles';

export const TeachingBubbleContent: React.FunctionComponent<ITeachingBubbleProps> = styled<
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles
>(TeachingBubbleContentBase, getStyles, undefined, { scope: 'TeachingBubbleContent' });
