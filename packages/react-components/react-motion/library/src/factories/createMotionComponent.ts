import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import * as React from 'react';

import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { animateAtoms } from '../utils/animateAtoms';
import { getChildElement } from '../utils/getChildElement';
import type { AtomMotion, AtomMotionFn, MotionParam, MotionImperativeRef } from '../types';

export type MotionComponentProps = {
  children: React.ReactElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;
};

/**
 * Creates a component that will animate the children using the provided motion.
 *
 * @param value - A motion definition.
 */
export function createMotionComponent<MotionParams extends Record<string, MotionParam> = {}>(
  value: AtomMotion | AtomMotion[] | AtomMotionFn<MotionParams>,
) {
  const Atom: React.FC<MotionComponentProps & MotionParams> = props => {
    const { children, imperativeRef, ..._rest } = props;
    const params = _rest as unknown as MotionParams;
    const child = getChildElement(children);

    const handleRef = useMotionImperativeRef(imperativeRef);
    const elementRef = React.useRef<HTMLElement>();
    const paramsRef = React.useRef<MotionParams>(params);

    const isReducedMotion = useIsReducedMotion();

    useIsomorphicLayoutEffect(() => {
      paramsRef.current = params;
    });

    useIsomorphicLayoutEffect(() => {
      const element = elementRef.current;

      if (element) {
        const atoms = typeof value === 'function' ? value({ element, ...paramsRef.current }) : value;
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
