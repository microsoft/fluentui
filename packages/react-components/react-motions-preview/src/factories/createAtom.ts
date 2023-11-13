import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import type { MotionAtom } from '../types';

export type AtomProps = {
  children: React.ReactElement;

  iterations?: number;
  playState?: 'running' | 'paused';
};

/**
 * Creates a component that will animate the children using the provided motion.
 *
 * @param motion - A motion definition.
 */
export function createAtom(motion: MotionAtom) {
  // Return a component that will animate the children
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return function AtomMotion(props: AtomProps) {
    const { children, iterations = 1, playState = 'running' } = props;

    const child = React.Children.only(children) as React.ReactElement & { ref: React.Ref<HTMLElement> };

    const animationRef = React.useRef<Animation | undefined>();
    const elementRef = React.useRef<HTMLElement>();

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      if (animationRef.current) {
        if (playState === 'running') {
          animationRef.current.play();
        }

        if (playState === 'paused') {
          animationRef.current.pause();
        }
      }
    }, [playState]);

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const animation = element.animate(motion.keyframes, {
          ...motion.options,
          iterations,

          ...(isReducedMotion() && { duration: 1 }),
        });

        animationRef.current = animation;

        return () => {
          animation.cancel();
        };
      }
    }, [iterations, isReducedMotion]);

    return React.cloneElement(children, { ref: useMergedRefs(elementRef, child.ref) });
  };
}
