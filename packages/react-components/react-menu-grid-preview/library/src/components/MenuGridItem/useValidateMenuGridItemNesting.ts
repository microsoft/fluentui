import * as React from 'react';

import { useValidateNesting } from '../../utils/useValidateNesting';

export const useValidateMenuGridItemNesting = (): React.RefObject<HTMLElement> => {
  return useValidateNesting('MenuGridItem');
};
