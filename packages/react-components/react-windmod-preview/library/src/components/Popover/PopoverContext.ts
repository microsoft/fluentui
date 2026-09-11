'use client';

import * as React from 'react';

import type { PopoverAppearance, PopoverSize } from './Popover.types';

/** Look values a Popover publishes to the surface below it. */
export type PopoverLookValue = {
  appearance?: PopoverAppearance;
  size: PopoverSize;
};

const PopoverLookContext = React.createContext<PopoverLookValue | undefined>(undefined);
const popoverLookDefaultValue: PopoverLookValue = { size: 'medium' };

export const PopoverLookProvider = PopoverLookContext.Provider;

/**
 * Both look props are declared on Popover while the surface they style is a separate child, so
 * they travel by context — the headless context is look-free and carries neither. Internal: no
 * barrel re-exports it.
 */
export const usePopoverLook = (): PopoverLookValue => React.useContext(PopoverLookContext) ?? popoverLookDefaultValue;
