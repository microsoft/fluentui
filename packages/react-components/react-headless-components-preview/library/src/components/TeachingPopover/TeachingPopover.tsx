'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverProps } from './TeachingPopover.types';
import { useTeachingPopover } from './useTeachingPopover';
import { useTeachingPopoverContextValues } from './useTeachingPopoverContextValues';
import { renderTeachingPopover } from './renderTeachingPopover';

/**
 * Headless TeachingPopover component.
 *
 * Wraps the headless `Popover` and additionally bridges the v9
 * `PopoverContext` so sub-components built on `useTeachingPopover*Base_unstable`
 * hooks from `@fluentui/react-teaching-popover` resolve their context reads.
 */
export const TeachingPopover = (props: TeachingPopoverProps): JSXElement => {
  const state = useTeachingPopover(props);
  const contextValues = useTeachingPopoverContextValues(state);

  return renderTeachingPopover(state, contextValues);
};

TeachingPopover.displayName = 'TeachingPopover';
