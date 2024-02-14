import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { getChildElement } from '../utils/getChildElement';
import type { AtomMotion, AtomMotionFn, MotionImperativeRef } from '../types';

export type AtomProps = {
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  iterations?: number;
};

/**
 * Creates a component that will animate the children using the provided motion.
 *
 * @param motion - A motion definition.
 */
export function createMotionComponent(motion: AtomMotion | AtomMotionFn) {
  const Atom: React.FC<AtomProps> = props => {
    const { children, iterations = 1, imperativeRef } = props;

    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const definition = typeof motion === 'function' ? motion(element) : motion;
        const { keyframes, ...options } = definition;

        const animation = element.animate(keyframes, {
          fill: 'forwards',

          ...options,
          iterations,

          ...(isReducedMotion() && { duration: 1 }),
        });

        animationRef.current = animation;

        return () => {
          animation.cancel();
        };
      }
    }, [animationRef, iterations, isReducedMotion]);

    return React.cloneElement(children, { ref: useMergedRefs(elementRef, child.ref) });
  };

  return Atom;
}
