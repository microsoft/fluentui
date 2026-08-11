import type * as React from 'react';

import type { ComboboxState } from './Combobox.types';

export type ComboboxStateInternal = ComboboxState & {
  fallbackBehavior?: React.ReactElement;
};
