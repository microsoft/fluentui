import type * as React from 'react';

import type { DropdownState } from './Dropdown.types';

export type DropdownStateInternal = DropdownState & {
  fallbackBehavior?: React.ReactElement;
};
