'use client';

import { useTeachingPopover } from './useTeachingPopover';
import { useTeachingPopoverContextValues } from './useTeachingPopoverContextValues';
import { renderTeachingPopover } from './renderTeachingPopover';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { TeachingPopoverProps } from './TeachingPopover.types';

/**
 * Headless TeachingPopover component.
 *
 * Wraps the headless `Popover` and additionally bridges the v9
 * `PopoverContext` so sub-components built on `useTeachingPopover*Base_unstable`
 * hooks from `@fluentui/react-teaching-popover` resolve their context reads.
 */
export const TeachingPopover: ComponentWithoutRef<TeachingPopoverProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'TeachingPopover',
  useTeachingPopover,
  useTeachingPopoverContextValues,
  renderTeachingPopover,
);
