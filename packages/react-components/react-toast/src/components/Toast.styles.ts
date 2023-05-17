/**
 * ⚠️ This is temporary and WILL be removed
 */

import { makeStyles, shorthands } from '@griffel/react';

export const useToastStyles = makeStyles({
  toast: {
    ...shorthands.border('2px', 'dashed', 'red'),
    ...shorthands.padding('4px'),
    display: 'flex',
    minHeight: '40px',
    maxHeight: '40px',
    minWidth: '200px',
    maxWidth: '200px',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  slide: {
    animationDuration: '200ms, 400ms',
    animationDelay: '0ms, 200ms',
    animationName: [
      {
        from: {
          height: '0',
          minHeight: '0',
          maxHeight: '0',
          opacity: 0,
        },
        to: {
          opacity: 0,
        },
      },
      {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    ],
  },

  fadeOut: {
    animationDuration: '400ms, 200ms',
    animationDelay: '0ms, 400ms',
    animationName: [
      {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
      {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 0,
          height: 0,
          maxHeight: 0,
          minHeight: 0,
        },
      },
    ],
  },
});
