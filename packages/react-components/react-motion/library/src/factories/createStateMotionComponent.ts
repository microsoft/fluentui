'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { useMotionBehaviourContext } from '../contexts/MotionBehaviourContext';
import { useAnimateAtoms } from '../hooks/useAnimateAtoms';
import { useIsReducedMotion } from '../hooks/useIsReducedMotion';
import { useMotionImperativeRef } from '../hooks/useMotionImperativeRef';
import { useStateMotion } from '../hooks/useStateMotion';
import type {
  AnimationHandle,
  AtomMotion,
  MotionImperativeRef,
  StateMotionAnimation,
  StateMotionAnimationSnapshot,
  StateMotionController,
  StateMotionDefinition,
  StateMotionEvent,
  StateMotionKeyframe,
  StateMotionMachineDefinition,
  StateMotionSkin,
  StateMotionStateKeyframe,
  StateMotionStateName,
  StateMotionTransition,
} from '../types';
import { useChildElement } from '../utils/useChildElement';

/** Props for a component created by createStateMotionComponent. */
export type StateMotionComponentProps<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Context = undefined,
> = {
  /** A React element that will receive the motion effects. */
  children: JSXElement;

  /** The event-driven controller that selects graph transitions. */
  controller: StateMotionController<State, Event>;

  /** Provides imperative playback controls for the active animation. */
  imperativeRef?: React.Ref<MotionImperativeRef | undefined>;

  /** Whether this component commits the target when an animation finishes. @default true */
  completeAnimation?: boolean;

  /** Called when an animation starts. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionStart?: (ev: null, data: StateMotionAnimationSnapshot<State, Event>) => void;

  /** Called when an animation finishes. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionFinish?: (ev: null, data: StateMotionAnimationSnapshot<State, Event>) => void;

  /** Called when an animation is cancelled. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionCancel?: (ev: null, data: StateMotionAnimationSnapshot<State, Event>) => void;
} & ([Context] extends [undefined]
  ? { context?: never }
  : {
      /** Values used to resolve context-aware state keyframes. */
      context: Context;
    });

/** A React component that animates one target element along a state motion graph. */
export type StateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Context = undefined,
> = ForwardRefComponent<StateMotionComponentProps<State, Event, Context>>;

function resolveStateKeyframe<Context>(keyframe: StateMotionStateKeyframe<Context>, context: Context): Keyframe {
  return typeof keyframe === 'function' ? keyframe({ context }) : keyframe;
}

function resolveKeyframes(keyframes: readonly StateMotionKeyframe[], target: Keyframe): Keyframe[] {
  return keyframes.map(keyframe => {
    if ('state' in keyframe) {
      return keyframe.state === 'target' ? target : {};
    }

    return keyframe;
  });
}

function resolveAnimation(motion: StateMotionAnimation, target: Keyframe): AtomMotion {
  return {
    ...motion,
    keyframes: resolveKeyframes(motion.keyframes, target),
    reducedMotion: motion.reducedMotion
      ? {
          ...motion.reducedMotion,
          keyframes: motion.reducedMotion.keyframes
            ? resolveKeyframes(motion.reducedMotion.keyframes, target)
            : undefined,
        }
      : undefined,
  };
}

/** Creates a React component that animates one target element along a flat, event-driven state graph. */
export function createStateMotionComponent<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionDefinition<State, Event>,
): StateMotionComponent<State, Event>;
/** Creates a React component that renders a state motion machine with a presentation skin. */
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
>(
  definition: StateMotionMachineDefinition<State, Event, Animation>,
  skin: StateMotionSkin<State, Animation>,
): StateMotionComponent<State, Event>;
/** Creates a React component that renders a state motion machine with a context-aware presentation skin. */
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
  Context,
>(
  definition: StateMotionMachineDefinition<State, Event, Animation>,
  skin: StateMotionSkin<State, Animation, Context>,
): StateMotionComponent<State, Event, Context>;
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
  Context,
>(
  definition: StateMotionDefinition<State, Event> | StateMotionMachineDefinition<State, Event, Animation>,
  skin?: StateMotionSkin<State, Animation, Context>,
): StateMotionComponent<State, Event, Context> {
  const getStateKeyframe = (state: StateMotionStateName<State>, context: Context): Keyframe =>
    skin
      ? resolveStateKeyframe(skin.states[state], context)
      : (definition as StateMotionDefinition<State, Event>).states[state].keyframe;

  return React.forwardRef<HTMLElement, StateMotionComponentProps<State, Event, Context>>((props, ref) => {
    const {
      children,
      completeAnimation = true,
      context,
      controller,
      imperativeRef,
      onMotionStart,
      onMotionFinish,
      onMotionCancel,
    } = props;
    const snapshot = useStateMotion(controller);
    const playbackRef = React.useRef({ controller, animationId: snapshot.animation?.id });
    const [child, childRef] = useChildElement(children, true, ref);
    const animateAtoms = useAnimateAtoms();
    const isReducedMotion = useIsReducedMotion();
    const handleRef = useMotionImperativeRef(imperativeRef);
    const skipMotions = useMotionBehaviourContext() === 'skip';
    const contextRef = React.useRef(context);

    const handleMotionStart = useEventCallback((animation: StateMotionAnimationSnapshot<State, Event>) => {
      onMotionStart?.(null, animation);
    });
    const handleMotionFinish = useEventCallback((animation: StateMotionAnimationSnapshot<State, Event>) => {
      onMotionFinish?.(null, animation);
    });
    const handleMotionCancel = useEventCallback((animation: StateMotionAnimationSnapshot<State, Event>) => {
      onMotionCancel?.(null, animation);
    });

    useIsomorphicLayoutEffect(() => {
      contextRef.current = context;
    });

    useIsomorphicLayoutEffect(() => {
      const element = childRef.current;
      if (!element) {
        return;
      }

      if (controller.definition !== definition) {
        throw new Error('createStateMotionComponent: The controller must be created from the same definition.');
      }

      const animation = snapshot.animation;
      const isHistoricalAnimation =
        playbackRef.current.controller !== controller || playbackRef.current.animationId === animation?.id;
      if (!animation || isHistoricalAnimation) {
        playbackRef.current = { controller, animationId: animation?.id };
        Object.assign(element.style, getStateKeyframe(snapshot.state, contextRef.current as Context));
        return;
      }

      playbackRef.current = { controller, animationId: animation.id };

      const source = definition.states[skin ? snapshot.state : animation.source];
      const targetKeyframe = getStateKeyframe(animation.target, contextRef.current as Context);
      const requiresCompletion = snapshot.state !== animation.target;

      let motion: AtomMotion | AtomMotion[];
      if (skin) {
        const animationDefinition = (
          source as StateMotionMachineDefinition<State, Event, Animation>['states'][StateMotionStateName<State>]
        ).animation;
        const animationMotion = animationDefinition && skin.animations?.[animationDefinition.id];
        motion = animationMotion
          ? Array.isArray(animationMotion)
            ? animationMotion.map(value => resolveAnimation(value, targetKeyframe))
            : resolveAnimation(animationMotion as StateMotionAnimation, targetKeyframe)
          : { keyframes: [targetKeyframe] };
      } else {
        const transitions = source.on as
          | Partial<Record<Event['type'], StateMotionTransition<State, Event>>>
          | undefined;
        const stateTransition = transitions?.[animation.event.type as Event['type']];
        if (!stateTransition) {
          return;
        }
        const target = (definition as StateMotionDefinition<State, Event>).states[animation.target];
        motion =
          typeof stateTransition.motion === 'function'
            ? stateTransition.motion({
                element,
                event: animation.event,
                source: source as StateMotionDefinition<State, Event>['states'][StateMotionStateName<State>],
                target,
              })
            : stateTransition.motion ?? { keyframes: [targetKeyframe] };
      }

      handleMotionStart(animation);
      const handle: AnimationHandle = animateAtoms(element, motion, { isReducedMotion: isReducedMotion() });
      handleRef.current = handle;
      handle.setMotionEndCallbacks(
        () => {
          const currentSnapshot = controller.getSnapshot();
          const isCurrentAnimation = currentSnapshot.animation?.id === animation.id;
          const wasCompleted = !currentSnapshot.animation && currentSnapshot.state === animation.target;
          if (!isCurrentAnimation && !wasCompleted) {
            return;
          }
          if (requiresCompletion && completeAnimation && !controller.completeAnimation(animation.id)) {
            return;
          }

          Object.assign(element.style, targetKeyframe);
          handleMotionFinish(animation);
        },
        () => handleMotionCancel(animation),
      );

      if (skipMotions) {
        handle.finish();
      }

      return () => {
        handle.commitStyles();
        handle.cancel();
        handle.dispose();
        if (handleRef.current === handle) {
          handleRef.current = undefined;
        }
      };
    }, [
      animateAtoms,
      childRef,
      completeAnimation,
      controller,
      handleMotionCancel,
      handleMotionFinish,
      handleMotionStart,
      handleRef,
      isReducedMotion,
      skipMotions,
      snapshot,
    ]);

    return child;
  }) as StateMotionComponent<State, Event, Context>;
}
