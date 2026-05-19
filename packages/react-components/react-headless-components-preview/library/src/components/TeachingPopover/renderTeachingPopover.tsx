import * as React from 'react';
import {
  PopoverProvider as BasePopoverProvider,
  type PopoverContextValue as BasePopoverContextValue,
} from '@fluentui/react-popover';
import { PopoverProvider } from '../Popover/popoverContext';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Renders TeachingPopover by providing both the headless `PopoverContext`
 * (consumed by headless sub-components) and the `@fluentui/react-popover`
 * `PopoverContext` (consumed by `@fluentui/react-teaching-popover` base
 * hooks). The bridged value is cast to `BasePopoverContextValue` — the
 * omitted fields (`size`, `inline`, etc.) are styling concerns that no base
 * hook reads.
 */
export const renderTeachingPopover = (
  state: TeachingPopoverState,
  contextValues: TeachingPopoverContextValues,
): React.ReactElement => (
  <PopoverProvider value={contextValues.popover}>
    <BasePopoverProvider value={contextValues.basePopover as BasePopoverContextValue}>
      {state.popoverTrigger}
      {state.open ? state.popoverSurface : null}
    </BasePopoverProvider>
  </PopoverProvider>
);
