'use client';

import type * as React from 'react';
import type { TeachingPopoverProps } from './TeachingPopover.types';
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
export const TeachingPopover: React.FC<TeachingPopoverProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'TeachingPopover',
  useTeachingPopover,
  useTeachingPopoverContextValues,
  renderTeachingPopover,
);
