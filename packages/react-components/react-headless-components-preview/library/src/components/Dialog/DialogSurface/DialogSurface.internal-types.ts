import type * as React from 'react';

import type { DialogSurfaceState } from './DialogSurface.types';

export type DialogSurfaceStateInternal = DialogSurfaceState & {
  fallbackBehavior?: React.ReactElement;
  onFallbackBackdropClick: React.MouseEventHandler<HTMLDivElement>;
};
