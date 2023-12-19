import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverActions_unstable } from './useTeachingPopoverActions';
import { renderTeachingPopoverActions_unstable } from './renderTeachingPopoverActions';
import { useTeachingPopoverActionsStyles_unstable } from './useTeachingPopoverActionsStyles.styles';
import type { TeachingPopoverActionsProps } from './TeachingPopoverActions.types';

/**
 * TeachingPopoverActions component - TODO: add more docs
 */
export const TeachingPopoverActions: ForwardRefComponent<TeachingPopoverActionsProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverActions_unstable(props, ref);

    useTeachingPopoverActionsStyles_unstable(state);
    useCustomStyleHook_unstable('useTeachingPopoverActionsStyles_unstable')(state);
    return renderTeachingPopoverActions_unstable(state);
  },
);

TeachingPopoverActions.displayName = 'TeachingPopoverActions';
