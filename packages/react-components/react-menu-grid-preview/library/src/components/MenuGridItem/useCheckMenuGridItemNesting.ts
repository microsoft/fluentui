import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridItemNesting = (ref: React.RefObject<HTMLElement>): void => {
  useCheckNesting(ref, 'MenuGridItem');
};
