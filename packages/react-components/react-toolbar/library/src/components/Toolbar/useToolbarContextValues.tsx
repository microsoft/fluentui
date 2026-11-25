'use client';

import * as React from 'react';
import type { ToolbarContextValue, ToolbarContextValues, ToolbarState } from './Toolbar.types';

export function useToolbarContextValues_unstable(state: ToolbarState): ToolbarContextValues {
  const { size, handleToggleButton, vertical, checkedValues, handleRadio } = state;

  const toolbar = React.useMemo<ToolbarContextValue>(
    () => ({
      size,
      vertical,
      handleToggleButton,
      handleRadio,
      checkedValues,
    }),
    [size, vertical, handleToggleButton, handleRadio, checkedValues],
  );

  return { toolbar };
}
