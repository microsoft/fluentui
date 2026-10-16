'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselCardProps } from './TeachingPopoverCarouselCard.types';
import { renderTeachingPopoverCarouselCard } from './renderTeachingPopoverCarouselCard';
import { useTeachingPopoverCarouselCard } from './useTeachingPopoverCarouselCard';
import { useTeachingPopoverCarouselCardStyles } from './useTeachingPopoverCarouselCardStyles.styles';

export const TeachingPopoverCarouselCard: ForwardRefComponent<TeachingPopoverCarouselCardProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselCard(props, ref);
    useTeachingPopoverCarouselCardStyles(state);
    return renderTeachingPopoverCarouselCard(state);
  },
);

TeachingPopoverCarouselCard.displayName = 'TeachingPopoverCarouselCard';
