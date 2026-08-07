import type * as React from 'react';

import type { WithFallbackBehavior } from '../../overlayRuntime/types';
import type { PopoverContextValue, PopoverState } from './Popover.types';
import type { PopoverSurfaceState } from './PopoverSurface/PopoverSurface.types';

export type PopoverStateInternal = WithFallbackBehavior<PopoverState> & {
  positioningArrowRef: React.RefCallback<HTMLElement>;
};

export type PopoverContextValueInternal = PopoverContextValue & {
  positioning: PopoverContextValue['positioning'] & {
    arrowRef: React.RefCallback<HTMLElement>;
  };
};

export type PopoverSurfaceStateInternal = PopoverSurfaceState & {
  renderArrowRef: React.Ref<HTMLDivElement>;
};
