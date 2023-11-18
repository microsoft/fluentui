import { makeStyles } from '@griffel/react';
import { DATA_OVERFLOWING, DATA_OVERFLOW_MENU } from '../constants';

export const useOverflowStyles = makeStyles({
  overflowMenu: {
    [`& [${DATA_OVERFLOW_MENU}]`]: {
      flexShrink: 0,
    },
  },

  overflowingItems: {
    [`& [${DATA_OVERFLOWING}]`]: {
      display: 'none',
    },
  },
});
