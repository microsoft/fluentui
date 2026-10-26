'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { PopoverSurfaceProps } from './PopoverSurface.types';
import { usePopoverSurface } from './usePopoverSurface';
import { renderPopoverSurface } from './renderPopoverSurface';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless PopoverSurface component.
 *
 * Renders the popover content area as a native `<dialog>` by default. Consumers
 * can render a `<div>` for non-modal surfaces with `as="div"`. A `<dialog>` is
 * required when the parent `Popover` has `trapFocus` enabled.
 */
export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> = /*#__PURE__*/ composeComponent(
  'PopoverSurface',
  usePopoverSurface,
  renderPopoverSurface,
);
