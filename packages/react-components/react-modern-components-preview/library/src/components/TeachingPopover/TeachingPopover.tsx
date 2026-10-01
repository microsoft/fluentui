'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverProps } from './TeachingPopover.types';
import { renderTeachingPopover } from './renderTeachingPopover';
import { useTeachingPopover } from './useTeachingPopover';
import { useTeachingPopoverContextValues } from './useTeachingPopoverContextValues';

/** A focus-trapping popover for onboarding and instructional content. */
export const TeachingPopover = (props: TeachingPopoverProps): JSXElement => {
  const state = useTeachingPopover(props);
  const contextValues = useTeachingPopoverContextValues(state);
  return renderTeachingPopover(state, contextValues);
};

TeachingPopover.displayName = 'TeachingPopover';
