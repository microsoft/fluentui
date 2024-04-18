import * as React from 'react';
import { mergeClasses } from '@griffel/react';

import { MotionState, MotionType } from './useMotion';
import { useReducedMotionStyles } from '../styles/useReducedMotionStyles.styles';

export type MotionStylesKeys = 'default' | 'enter' | 'exit' | MotionType;
export type MotionClassNames = {
  [key in MotionStylesKeys]?: string;
};

function assertMotionStyles(styles: MotionClassNames): asserts styles is MotionClassNames {
  /**
   * This verification is not necessary in production
   * as we're verifying static properties that will not change between environments
   */
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(styles).forEach(key => {
      const allowedTypes = [
        'default',
        'enter',
        'exit',
        'entering',
        'entered',
        'idle',
        'exiting',
        'exited',
        'unmounted',
      ];

      /* This means the style provided has a prop that is not allowed as a motion style */
      if (!allowedTypes.includes(key)) {
        // eslint-disable-next-line no-console
        console.warn(
          [
            `@fluentui/react-motion-preview [${assertMotionStyles.name}]:`,
            `The property "${key}" is not a valid motion style key!`,
            `The valid keys are: "${allowedTypes.join(', ')}".`,
            'Be sure to create motion styles properly.',
          ].join('\n'),
        );
      }
    });
  }
}

export const useMotionClassNames = (motion: MotionState, motionStyles: MotionClassNames) => {
  const { reduced: reducedMotionStyles } = useReducedMotionStyles();

  const motionClassNames = React.useMemo(() => {
    if (!motionStyles.enter && !motionStyles.exit) {
      return '';
    }

    if (motion.active || motion.type === 'idle') {
      return motionStyles.enter;
    }

    if (!motion.active) {
      return motionStyles.exit;
    }

    return '';
  }, [motion.active, motion.type, motionStyles.enter, motionStyles.exit]);

  React.useEffect(() => assertMotionStyles(motionStyles), [motionStyles]);

  return mergeClasses(motionStyles.default, motionClassNames, motionStyles[motion.type], reducedMotionStyles);
};
