import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverButton_unstable } from './useTeachingPopoverButton';
import { renderTeachingPopoverButton_unstable } from './renderTeachingPopoverButton';
import { useTeachingPopoverButtonStyles_unstable } from './useTeachingPopoverButtonStyles.styles';
import type { TeachingPopoverButtonProps } from './TeachingPopoverButton.types';

/**
 * TeachingPopoverButton component - TODO: add more docs
 */
export const TeachingPopoverButton: ForwardRefComponent<TeachingPopoverButtonProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverButton_unstable(props, ref);

  useTeachingPopoverButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useTeachingPopoverButtonStyles_unstable')(state);
  return renderTeachingPopoverButton_unstable(state);
});

TeachingPopoverButton.displayName = 'TeachingPopoverButton';
