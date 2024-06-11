import * as React from 'react';
import { useTeachingPopoverCarouselFooter_unstable } from './useTeachingPopoverCarouselFooter';
import { renderTeachingPopoverCarouselFooter_unstable } from './renderTeachingPopoverCarouselFooter';
import { useTeachingPopoverCarouselFooterStyles_unstable } from './useTeachingPopoverCarouselFooterStyles.styles';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverCarouselFooter, using the `useTeachingPopoverCarouselFooter_unstable` and `useTeachingPopoverCarouselFooterStyles_unstable`
 * hooks.
 *
 * TeachingPopoverCarouselFooter contains previous/next buttons configured for carousel navigation, and a root slot for page count and/or page index navigation.
 */
export const TeachingPopoverCarouselFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselFooter_unstable(props, ref);

    useTeachingPopoverCarouselFooterStyles_unstable(state);

    return renderTeachingPopoverCarouselFooter_unstable(state);
  },
);

TeachingPopoverCarouselFooter.displayName = 'TeachingPopoverCarouselFooter';
