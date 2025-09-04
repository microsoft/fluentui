import * as React from 'react';

import { useValidateNesting } from '../../utils/useValidateNesting';

export const useValidateMenuGridRowNesting = (): React.RefObject<HTMLElement> => {
  return useValidateNesting('MenuGridRow');
};
