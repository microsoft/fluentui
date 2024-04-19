import * as React from 'react';
import { useTeachingPopoverCarouselFooter_unstable } from './useTeachingPopoverCarouselFooter';
import { renderTeachingPopoverCarouselFooter_unstable } from './renderTeachingPopoverCarouselFooter';
import { useTeachingPopoverCarouselFooterStyles_unstable } from './useTeachingPopoverCarouselFooterStyles.styles';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverCarouselFooter, using the `useTeachingPopoverCarouselFooter_unstable` and `useTeachingPopoverCarouselFooterStyles_unstable`
 * hooks.
 */
export const TeachingPopoverCarouselFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselFooter_unstable(props, ref);

    useTeachingPopoverCarouselFooterStyles_unstable(state);

    return renderTeachingPopoverCarouselFooter_unstable(state);
  },
);

TeachingPopoverCarouselFooter.displayName = 'TeachingPopoverCarouselFooter';
