import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridRowNesting = (): React.RefObject<HTMLElement> => {
  return useCheckNesting('MenuGridRow');
};
