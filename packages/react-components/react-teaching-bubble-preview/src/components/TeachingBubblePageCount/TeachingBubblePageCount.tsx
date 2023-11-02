import * as React from 'react';
import { useTeachingBubblePageCount_unstable } from './useTeachingBubblePageCount';
import { renderTeachingBubblePageCount_unstable } from './renderTeachingBubblePageCount';
import { useTeachingBubblePageCountStyles_unstable } from './useTeachingBubblePageCountStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubblePageCountProps } from './TeachingBubblePageCount.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubblePageCount, using the `useTeachingBubblePageCount_unstable` and `useTeachingBubblePageCountStyles_unstable`
 * hooks.
 */
export const TeachingBubblePageCount: ForwardRefComponent<TeachingBubblePageCountProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingBubblePageCount_unstable(props, ref);

    useTeachingBubblePageCountStyles_unstable(state);

    useCustomStyleHook_unstable('useTeachingBubblePageCountStyles_unstable')(state);

    return renderTeachingBubblePageCount_unstable(state);
  },
);

TeachingBubblePageCount.displayName = 'TeachingBubblePageCount';
