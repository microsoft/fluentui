'use client';

import { useTeachingPopover } from './useTeachingPopover';
import { useTeachingPopoverContextValues } from './useTeachingPopoverContextValues';
import { renderTeachingPopover } from './renderTeachingPopover';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Headless TeachingPopover component.
 *
 * Wraps the headless `Popover` and additionally bridges the v9
 * `PopoverContext` so sub-components built on `useTeachingPopover*Base_unstable`
 * hooks from `@fluentui/react-teaching-popover` resolve their context reads.
 */
export const TeachingPopover = /*#__PURE__*/ composeComponentWithoutRef(
  'TeachingPopover',
  useTeachingPopover,
  useTeachingPopoverContextValues,
  renderTeachingPopover,
);
