import * as React from 'react';
import { renderTeachingPopoverButton_unstable } from './renderTeachingPopoverButton';
import { useTeachingPopoverButton_unstable } from './useTeachingPopoverButton';
import { useTeachingPopoverButtonStyles_unstable } from './useTeachingPopoverButtonStyles.styles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverButtonProps } from './TeachingPopoverButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TeachingPopoverButtons override style and functionality based on carousel/popover state.
 * @deprecated and replaced with TeachingPopoverCarousel internal functionality and TeachingPopoverFooter
 */
export const TeachingPopoverButton: ForwardRefComponent<TeachingPopoverButtonProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverButton_unstable(props, ref);

  useTeachingPopoverButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverButtonStyles_unstable')(state);

  return renderTeachingPopoverButton_unstable(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<TeachingPopoverButtonProps>;

TeachingPopoverButton.displayName = 'TeachingPopoverButton';
