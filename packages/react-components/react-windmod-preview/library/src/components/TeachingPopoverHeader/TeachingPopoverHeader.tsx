'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverHeader,
  useTeachingPopoverHeader,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import { Dismiss12Regular } from '@fluentui/react-icons/headless/svg/dismiss';
import { Lightbulb16Regular } from '@fluentui/react-icons/headless/svg/lightbulb';

import { usePopoverLook } from '../Popover/PopoverContext';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import { useTeachingPopoverHeaderStyles } from './useTeachingPopoverHeaderStyles';

/**
 * The lead row of a TeachingPopover: a glyph, a line of context, and a dismiss button. Windmod
 * TeachingPopoverHeader: the headless header decorated with the Fluent visual contract.
 */
export const TeachingPopoverHeader: ForwardRefComponent<TeachingPopoverHeaderProps> = React.forwardRef((props, ref) => {
  const base = useTeachingPopoverHeader(props, ref);
  const { appearance } = usePopoverLook();

  // Both slots render by default but the headless hook injects no children, so an unrestored
  // header is an empty glyph box beside an empty dismiss button. Consumer children always win;
  // a `null` slot is already gone by the time this runs.
  const state: TeachingPopoverHeaderState = {
    ...base,
    icon: base.icon && { ...base.icon, children: base.icon.children ?? <Lightbulb16Regular /> },
    dismissButton: base.dismissButton && {
      ...base.dismissButton,
      children: base.dismissButton.children ?? <Dismiss12Regular />,
    },
    appearance,
  };

  return renderTeachingPopoverHeader(useTeachingPopoverHeaderStyles(state));
});

TeachingPopoverHeader.displayName = 'TeachingPopoverHeader';
