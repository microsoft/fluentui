import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { animate } from '../utils/animate';
import { getChildElement } from '../utils/getChildElement';
import type { AtomMotion, AtomMotionFn, MotionImperativeRef } from '../types';

type MotionComponentProps = {
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;
};

/**
 * Creates a component that will animate the children using the provided motion.
 *
 * @param motion - A motion definition.
 */
export function createMotionComponent(motion: AtomMotion | AtomMotionFn) {
  const Atom: React.FC<MotionComponentProps> = props => {
    const { children, imperativeRef } = props;

    const child = getChildElement(children);

    const animationRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const definition = typeof motion === 'function' ? motion(element) : motion;
        const { keyframes, ...options } = definition;

        const animation = animate(element, keyframes, {
          fill: 'forwards',

          ...options,
          ...(isReducedMotion() && { duration: 1 }),
        });

        if (!animation) {
          return;
        }

        animationRef.current = animation;

        return () => {
          animation.cancel();
        };
      }
    }, [animationRef, isReducedMotion]);

    return React.cloneElement(children, { ref: useMergedRefs(elementRef, child.ref) });
  };

  return Atom;
}
