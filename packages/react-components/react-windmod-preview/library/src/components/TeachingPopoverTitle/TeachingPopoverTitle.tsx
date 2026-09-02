'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverTitle,
  useTeachingPopoverTitle,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { DismissFilled, DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { usePopoverLook } from '../Popover/PopoverContext';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import { useTeachingPopoverTitleStyles } from './useTeachingPopoverTitleStyles';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

/**
 * The heading of a TeachingPopover, with an optional dismiss button of its own. Windmod
 * TeachingPopoverTitle: the headless title decorated with the Fluent visual contract.
 */
export const TeachingPopoverTitle: ForwardRefComponent<TeachingPopoverTitleProps> = React.forwardRef((props, ref) => {
  const base = useTeachingPopoverTitle(props, ref);
  const { appearance } = usePopoverLook();

  // The slot exists only when the consumer asks for it, so the glyph is restored exactly where
  // Griffel restores it. Consumer children always win.
  const state: TeachingPopoverTitleState = {
    ...base,
    dismissButton: base.dismissButton && {
      ...base.dismissButton,
      children: base.dismissButton.children ?? <DismissIcon />,
    },
    appearance,
  };

  const styled = useTeachingPopoverTitleStyles(state);

  return renderTeachingPopoverTitle(styled);
});

TeachingPopoverTitle.displayName = 'TeachingPopoverTitle';
