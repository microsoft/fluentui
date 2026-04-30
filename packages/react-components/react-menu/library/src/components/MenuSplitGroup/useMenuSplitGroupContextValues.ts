'use client';

import * as React from 'react';
import type { MenuSplitGroupContextValues, MenuSplitGroupState } from './MenuSplitGroup.types';

export const useMenuSplitGroupContextValues = (state: MenuSplitGroupState): MenuSplitGroupContextValues => {
  'use no memo';

  return React.useMemo(() => {
    return {
      menuSplitGroup: {
        setMultiline: state.setMultiline,
      },
    };
  }, [state.setMultiline]);
};
