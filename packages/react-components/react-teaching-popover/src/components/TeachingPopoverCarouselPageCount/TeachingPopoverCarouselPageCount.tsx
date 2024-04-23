import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselPageCount_unstable } from './useTeachingPopoverCarouselPageCount';
import { renderTeachingPopoverCarouselPageCount_unstable } from './renderTeachingPopoverCarouselPageCount';
import { useTeachingPopoverCarouselPageCountStyles_unstable } from './useTeachingPopoverCarouselPageCountStyles.styles';
import type { TeachingPopoverCarouselPageCountProps } from './TeachingPopoverCarouselPageCount.types';

/**
 * TeachingPopoverCarouselPageCount is a simple interface for rendering based on current and total page count
 *
 * The child render function will provide both current and total page numbers for customization.
 */
export const TeachingPopoverCarouselPageCount: ForwardRefComponent<TeachingPopoverCarouselPageCountProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselPageCount_unstable(props, ref);

    useTeachingPopoverCarouselPageCountStyles_unstable(state);

    return renderTeachingPopoverCarouselPageCount_unstable(state);
  });

TeachingPopoverCarouselPageCount.displayName = 'TeachingPopoverCarouselPageCount';
