'use client';

import * as React from 'react';
import type { PopoverState } from './Popover.types';

export type PopoverAppearanceContextValue = Pick<PopoverState, 'appearance' | 'size'>;

export const PopoverAppearanceContext = React.createContext<PopoverAppearanceContextValue | undefined>(undefined);

export const usePopoverAppearanceContext = (): PopoverAppearanceContextValue =>
  React.useContext(PopoverAppearanceContext) ?? { appearance: undefined, size: 'medium' };
