import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridRowNesting = (ref: React.RefObject<HTMLElement>): void => {
  useCheckNesting(ref, 'MenuGridRow');
};
