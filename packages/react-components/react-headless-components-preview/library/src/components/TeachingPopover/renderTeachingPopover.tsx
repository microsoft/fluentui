import * as React from 'react';
import {
  PopoverProvider as V9PopoverProvider,
  type PopoverContextValue as V9PopoverContextValue,
} from '@fluentui/react-popover';
import { PopoverProvider } from '../Popover/popoverContext';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Renders TeachingPopover by providing both the headless `PopoverContext`
 * (consumed by headless sub-components) and the v9 `PopoverContext`
 * (consumed by v9 teaching-popover base hooks). The bridged value is cast
 * to `V9PopoverContextValue` — the omitted fields (`size`, `inline`, etc.)
 * are styling concerns that no base hook reads.
 */
export const renderTeachingPopover = (
  state: TeachingPopoverState,
  contextValues: TeachingPopoverContextValues,
): React.ReactElement => (
  <PopoverProvider value={contextValues.popover}>
    <V9PopoverProvider value={contextValues.v9Popover as V9PopoverContextValue}>
      {state.popoverTrigger}
      {state.open ? state.popoverSurface : null}
    </V9PopoverProvider>
  </PopoverProvider>
);
