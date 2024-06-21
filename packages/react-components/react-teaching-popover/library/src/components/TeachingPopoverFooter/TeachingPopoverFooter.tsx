import * as React from 'react';
import { useTeachingPopoverFooter_unstable } from './useTeachingPopoverFooter';
import { renderTeachingPopoverFooter_unstable } from './renderTeachingPopoverFooter';
import { useTeachingPopoverFooterStyles_unstable } from './useTeachingPopoverFooterStyles.styles';
import type { TeachingPopoverFooterProps } from './TeachingPopoverFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverFooter, using the `useTeachingPopoverFooter_unstable` and `useTeachingPopoverFooterStyles_unstable`
 * hooks.
 *
 * TeachingPopoverFooter will provide both a secondary and primary button for the TeachingPopover,
 * and handle Popover functionality such as closing the popup.
 *
 * Users must provide the localized text for each button within the footer via slots.
 */
export const TeachingPopoverFooter: ForwardRefComponent<TeachingPopoverFooterProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverFooter_unstable(props, ref);

  useTeachingPopoverFooterStyles_unstable(state);

  return renderTeachingPopoverFooter_unstable(state);
});

TeachingPopoverFooter.displayName = 'TeachingPopoverFooter';
