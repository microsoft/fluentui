import * as React from 'react';

import { useCheckNesting } from '../../utils/useCheckNesting';

export const useCheckMenuGridNesting = (ref: React.RefObject<HTMLElement>): void => {
  useCheckNesting(ref, 'MenuGrid');
};
