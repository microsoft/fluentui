import type * as React from 'react';

import type { TooltipState } from './Tooltip.types';

export type TooltipStateInternal = TooltipState & {
  fallbackBehavior?: React.ReactElement;
};
