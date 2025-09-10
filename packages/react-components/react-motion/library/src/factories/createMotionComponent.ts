import type { JSXElement } from '@fluentui/react-utilities';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useAnimateAtoms } from '../hooks/useAnimateAtoms';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useChildElement } from '../utils/useChildElement';
import type { AtomMotion, AtomMotionFn, MotionParam, MotionImperativeRef } from '../types';
import { useMotionBehaviourContext } from '../contexts/MotionBehaviourContext';

/**
 * @internal A private symbol to store the motion definition on the component for variants.
 */
export const MOTION_DEFINITION = Symbol('MOTION_DEFINITION');

export type MotionComponentProps = {
  children: JSXElement;

  /** Provides imperative controls for the animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  /**
   * Callback that is called when the whole motion finishes.
   *
   * A motion definition can contain multiple animations and therefore multiple "finish" events. The callback is
   * triggered once all animations have finished with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionFinish?: (ev: null) => void;

  /**
   * Callback that is called when the whole motion is cancelled.
   *
   * A motion definition can contain multiple animations and therefore multiple "cancel" events. The callback is
   * triggered once all animations have been cancelled with "null" instead of an event object to avoid ambiguity.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionCancel?: (ev: null) => void;

  /**
   * Callback that is called when the whole motion starts.
   *
   * A motion definition can contain multiple animations and therefore multiple "start" events. The callback is
   * triggered when the first animation is started. There is no official "start" event with the Web Animations API.
   * so the callback is triggered with "null".
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionStart?: (ev: null) => void;
};

export type MotionComponent<MotionParams extends Record<string, MotionParam> = {}> = React.FC<
  MotionComponentProps & MotionParams
> & {
  [MOTION_DEFINITION]: AtomMotionFn<MotionParams>;
};

/**
 * Creates a component that will animate the children using the provided motion.
 *
 * @param value - A motion definition.
 */
export function createMotionComponent<MotionParams extends Record<string, MotionParam> = {}>(
  value: AtomMotion | AtomMotion[] | AtomMotionFn<MotionParams>,
): MotionComponent<MotionParams> {
  const Atom: React.FC<MotionComponentProps & MotionParams> = props => {
    'use no memo';

    const {
      children,
      imperativeRef,
      onMotionFinish: onMotionFinishProp,
      onMotionStart: onMotionStartProp,
      onMotionCancel: onMotionCancelProp,
      ..._rest
    } = props;
    const params = _rest as Exclude<typeof props, MotionComponentProps>;
    const [child, childRef] = useChildElement(children);

    const handleRef = useMotionImperativeRef(imperativeRef);
    const skipMotions = useMotionBehaviourContext() === 'skip';
    const optionsRef = React.useRef<{ skipMotions: boolean; params: MotionParams }>({
      skipMotions,
      params,
    });

    const animateAtoms = useAnimateAtoms();
    const isReducedMotion = useIsReducedMotion();

    const onMotionStart = useEventCallback(() => {
      onMotionStartProp?.(null);
    });

    const onMotionFinish = useEventCallback(() => {
      onMotionFinishProp?.(null);
    });

    const onMotionCancel = useEventCallback(() => {
      onMotionCancelProp?.(null);
    });

    useIsomorphicLayoutEffect(() => {
      // Heads up!
      // We store the params in a ref to avoid re-rendering the component when the params change.
      optionsRef.current = { skipMotions, params };
    });

    useIsomorphicLayoutEffect(() => {
      const element = childRef.current;

      if (element) {
        const atoms = typeof value === 'function' ? value({ element, ...optionsRef.current.params }) : value;

        onMotionStart();
        const handle = animateAtoms(element, atoms, { isReducedMotion: isReducedMotion() });
        handleRef.current = handle;
        handle.setMotionEndCallbacks(onMotionFinish, onMotionCancel);

        if (optionsRef.current.skipMotions) {
          handle.finish();
        }

        return () => {
          handle.cancel();
        };
      }
    }, [animateAtoms, childRef, handleRef, isReducedMotion, onMotionFinish, onMotionStart, onMotionCancel]);

    return child;
  };

  return Object.assign(Atom, {
    // Heads up!
    // Always normalize it to a function to simplify types
    [MOTION_DEFINITION]: typeof value === 'function' ? value : () => value,
  });
}
