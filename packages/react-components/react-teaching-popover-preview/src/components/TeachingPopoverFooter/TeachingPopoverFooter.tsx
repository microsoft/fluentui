import * as React from 'react';
import { useTeachingPopoverFooter_unstable } from './useTeachingPopoverFooter';
import { renderTeachingPopoverFooter_unstable } from './renderTeachingPopoverFooter';
import { useTeachingPopoverFooterStyles_unstable } from './useTeachingPopoverFooterStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverFooter, using the `useTeachingPopoverFooter_unstable` and `useTeachingPopoverFooterStyles_unstable`
 * hooks.
 */
export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverFooter_unstable(props, ref);

  useTeachingPopoverFooterStyles_unstable(state);

  useCustomStyleHook_unstable('useTeachingPopoverFooterStyles_unstable')(state);

  return renderTeachingPopoverFooter_unstable(state);
});

TeachingPopoverFooter.displayName = 'TeachingPopoverFooter';
