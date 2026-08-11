import type * as React from 'react';

import type { MenuState } from './Menu.types';

export type MenuStateInternal = MenuState & {
  fallbackBehavior?: React.ReactElement;
};
