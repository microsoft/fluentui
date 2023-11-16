import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverPageCount_unstable } from './useTeachingPopoverPageCount';
import { renderTeachingPopoverPageCount_unstable } from './renderTeachingPopoverPageCount';
import { useTeachingPopoverPageCountStyles_unstable } from './useTeachingPopoverPageCountStyles.styles';
import type { TeachingPopoverPageCountProps } from './TeachingPopoverPageCount.types';

/**
 * TeachingPopoverPageCount component - TODO: add more docs
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
