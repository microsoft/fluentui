import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverHeader_unstable } from './useTeachingPopoverHeader';
import { renderTeachingPopoverHeader_unstable } from './renderTeachingPopoverHeader';
import { useTeachingPopoverHeaderStyles_unstable } from './useTeachingPopoverHeaderStyles.styles';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';

/**
 * TeachingPopoverHeader component - TODO: add more docs
 */
export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverHeader_unstable(props, ref);

  useTeachingPopoverHeaderStyles_unstable(state);
  useCustomStyleHook_unstable('useTeachingPopoverHeaderStyles_unstable')(state);
  return renderTeachingPopoverHeader_unstable(state);
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
