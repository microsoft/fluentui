import * as React from 'react';

import { useValidateNesting } from '../../utils/useValidateNesting';

export const useValidateMenuGridNesting = (): React.RefObject<HTMLElement> => {
  return useValidateNesting('MenuGrid');
};
