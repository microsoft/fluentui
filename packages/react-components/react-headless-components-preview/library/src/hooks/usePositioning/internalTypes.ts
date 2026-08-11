import type * as React from 'react';

import type { PositioningReturn } from './types';

export type PositioningReturnInternal = PositioningReturn & {
  arrowRef: React.RefCallback<HTMLElement>;
};
