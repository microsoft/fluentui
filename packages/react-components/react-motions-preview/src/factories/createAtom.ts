import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { getChildElement } from '../utils/getChildElement';
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
  const Atom: React.FC<AtomProps> = props => {
    const { children, iterations = 1, playState = 'running' } = props;

    const child = getChildElement(children);

    const animationRef = React.useRef<Animation | undefined>();
    const elementRef = React.useRef<HTMLElement>();

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const animation = element.animate(motion.keyframes, {
          fill: 'forwards',

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

    // TODO: Find a way to avoid this effect/refactor as currently it will call .play() on initial render
    useIsomorphicLayoutEffect(() => {
      const animation = animationRef.current;

      if (animation) {
        if (playState === 'running') {
          animation.play();
        }

        if (playState === 'paused') {
          animation.pause();
        }
      }
    }, [playState]);

    return React.cloneElement(children, { ref: useMergedRefs(elementRef, child.ref) });
  };

  return Atom;
}
