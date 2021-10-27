import * as React from 'react';
import { styled } from '../../Utilities';
import { TeachingBubbleBase } from './TeachingBubble.base';
import { getStyles } from './TeachingBubble.styles';
import type { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';

export const TeachingBubble: React.FunctionComponent<ITeachingBubbleProps> = styled<
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles
>(TeachingBubbleBase, getStyles, undefined, { scope: 'TeachingBubble' });
