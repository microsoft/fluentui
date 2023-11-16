import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverBody_unstable } from './useTeachingPopoverBody';
import { renderTeachingPopoverBody_unstable } from './renderTeachingPopoverBody';
import { useTeachingPopoverBodyStyles_unstable } from './useTeachingPopoverBodyStyles.styles';
import type { TeachingPopoverBodyProps } from './TeachingPopoverBody.types';

/**
 * TeachingPopoverBody component - TODO: add more docs
 */
export const TeachingPopoverBody: ForwardRefComponent<TeachingPopoverBodyProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverBody_unstable(props, ref);

  useTeachingPopoverBodyStyles_unstable(state);
  useCustomStyleHook_unstable('useTeachingPopoverBodyStyles_unstable')(state);
  return renderTeachingPopoverBody_unstable(state);
});

TeachingPopoverBody.displayName = 'TeachingPopoverBody';
