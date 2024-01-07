import * as React from 'react';
import { useTeachingPopoverPageCount_unstable } from './useTeachingPopoverPageCount';
import { renderTeachingPopoverPageCount_unstable } from './renderTeachingPopoverPageCount';
import { useTeachingPopoverPageCountStyles_unstable } from './useTeachingPopoverPageCountStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverPageCountProps } from './TeachingPopoverPageCount.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverPageCount, using the `useTeachingPopoverPageCount_unstable` and `useTeachingPopoverPageCountStyles_unstable`
 * hooks.
 */
export const TeachingPopoverPageCount: ForwardRefComponent<TeachingPopoverPageCountProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverPageCount_unstable(props, ref);

    useTeachingPopoverPageCountStyles_unstable(state);

    useCustomStyleHook_unstable('useTeachingPopoverPageCountStyles_unstable')(state);

    return renderTeachingPopoverPageCount_unstable(state);
  },
);

TeachingPopoverPageCount.displayName = 'TeachingPopoverPageCount';
