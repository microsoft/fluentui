'use client';

import * as React from 'react';
import type { MenuSplitGroupContextValues, MenuSplitGroupState } from './MenuSplitGroup.types';

export const useMenuSplitGroupContextValues = (state: MenuSplitGroupState): MenuSplitGroupContextValues => {
  'use no memo'; // justified: compiler would optimize useMenuSplitGroupContextValues — manual opt-out to preserve runtime behavior

  return React.useMemo(() => {
    return {
      menuSplitGroup: {
        setMultiline: state.setMultiline,
      },
    };
  }, [state.setMultiline]);
};
