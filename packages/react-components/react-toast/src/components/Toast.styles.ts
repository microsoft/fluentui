/**
 * ⚠️ This is temporary and WILL be removed
 */

import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useToastStyles = makeStyles({
  toast: {
    pointerEvents: 'all',
    boxSizing: 'border-box',
    marginTop: '16px',
    minHeight: '44px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    '--fui-toast-height': '44px',
  },
  enter: {
    animationDuration: '200ms, 400ms',
    animationDelay: '0ms, 200ms',
    animationName: [
      {
        from: {
          maxHeight: 0,
          opacity: 0,
          marginTop: 0,
        },
        to: {
          marginTop: '16px',
          opacity: 0,
          maxHeight: 'var(--fui-toast-height)',
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

  exit: {
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
          marginTop: 0,
          maxHeight: 0,
        },
      },
    ],
  },
});
