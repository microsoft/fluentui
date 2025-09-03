import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridNesting = (): React.RefObject<HTMLElement> => {
  return useCheckNesting('MenuGrid');
};
