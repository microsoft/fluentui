import * as React from 'react';
import { useTeachingPopoverActions_unstable } from './useTeachingPopoverActions';
import { renderTeachingPopoverActions_unstable } from './renderTeachingPopoverActions';
import { useTeachingPopoverActionsStyles_unstable } from './useTeachingPopoverActionsStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverActionsProps } from './TeachingPopoverActions.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverActions, using the `useTeachingPopoverActions_unstable` and `useTeachingPopoverActionsStyles_unstable`
 * hooks.
 * @deprecated and replaced with TeachingPopoverCarousel internal functionality and TeachingPopoverFooter
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
