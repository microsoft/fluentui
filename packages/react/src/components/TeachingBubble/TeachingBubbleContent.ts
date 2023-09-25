import * as React from 'react';
import { styled } from '../../Utilities';
import { TeachingBubbleContentBase } from './TeachingBubbleContent.base';
import { getStyles } from './TeachingBubble.styles';
import type { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';

export const TeachingBubbleContent: React.FunctionComponent<ITeachingBubbleProps> = styled<
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles
>(TeachingBubbleContentBase, getStyles, undefined, { scope: 'TeachingBubbleContent' });
