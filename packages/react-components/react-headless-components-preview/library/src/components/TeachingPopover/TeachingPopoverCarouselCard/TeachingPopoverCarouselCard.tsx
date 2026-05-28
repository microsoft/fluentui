'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselCardProps } from './TeachingPopoverCarouselCard.types';
import { useTeachingPopoverCarouselCard } from './useTeachingPopoverCarouselCard';
import { renderTeachingPopoverCarouselCard } from './renderTeachingPopoverCarouselCard';

export const TeachingPopoverCarouselCard: ForwardRefComponent<TeachingPopoverCarouselCardProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselCard(props, ref);
    return renderTeachingPopoverCarouselCard(state);
  },
);

TeachingPopoverCarouselCard.displayName = 'TeachingPopoverCarouselCard';
