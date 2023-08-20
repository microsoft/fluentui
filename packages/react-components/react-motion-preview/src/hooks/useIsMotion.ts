import * as React from 'react';
import { usePrevious } from '@fluentui/react-utilities';
import type { MotionState, MotionShorthand } from './useMotion';

/**
 * @internal
 *
 * This method emits a warning if the hook is called with
 * a different typeof of shorthand on subsequent renders,
 * since this can lead breaking the rules of hooks.
 *
 * It also return a boolean indicating whether the shorthand is a motion object.
 */
export function useIsMotion<Element extends HTMLElement>(
  shorthand: MotionShorthand<Element>,
): shorthand is MotionState<Element> {
  const previousShorthand = usePrevious(shorthand);

  /**
   * Heads up!
   * We don't want these warnings in production even though it is against native behavior
   */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (previousShorthand !== null && typeof previousShorthand !== typeof shorthand) {
        // eslint-disable-next-line no-console
        console.error(
          [
            'useMotion: The hook needs to be called with the same typeof of shorthand on every render.',
            'This is to ensure the internal state of the hook is stable and can be used to accurately detect the motion state.',
            'Please make sure to not change the shorthand on subsequent renders or to use the hook conditionally.',
            '\nCurrent shorthand:',
            JSON.stringify(shorthand, null, 2),
            '\nPrevious shorthand:',
            JSON.stringify(previousShorthand, null, 2),
          ].join(' '),
        );
      }
    }, [shorthand, previousShorthand]);
  }
  return typeof shorthand === 'object';
}
