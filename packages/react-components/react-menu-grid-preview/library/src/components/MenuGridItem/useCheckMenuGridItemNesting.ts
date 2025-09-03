import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridItemNesting = (): React.RefObject<HTMLElement> => {
  return useCheckNesting('MenuGridItem');
};
