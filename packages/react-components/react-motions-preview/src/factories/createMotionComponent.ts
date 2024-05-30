import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { animateAtoms } from '../utils/animateAtoms';
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
 * @param value - A motion definition.
 */
export function createMotionComponent(value: AtomMotion | AtomMotion[] | AtomMotionFn) {
  const Atom: React.FC<MotionComponentProps> = props => {
    const { children, imperativeRef } = props;
    const child = getChildElement(children);

    const handleRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const atoms = typeof value === 'function' ? value(element) : value;
        const handle = animateAtoms(element, atoms, { isReducedMotion: isReducedMotion() });

        handleRef.current = handle;

        return () => {
          handle.cancel();
        };
      }
    }, [handleRef, isReducedMotion]);

    return React.cloneElement(children, { ref: useMergedRefs(elementRef, child.ref) });
  };

  return Atom;
}
