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
  StateMotionController,
  StateMotionDefinition,
  StateMotionEvent,
  StateMotionKeyframe,
  StateMotionMachineDefinition,
  StateMotionSkin,
  StateMotionStateKeyframe,
  StateMotionStateName,
  StateMotionTransition,
  StateMotionTransitionMotion,
  StateMotionTransitionSnapshot,
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

  /** Called when a selected edge starts animating. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionStart?: (ev: null, data: StateMotionTransitionSnapshot<State, Event>) => void;

  /** Called when a selected edge finishes animating. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionFinish?: (ev: null, data: StateMotionTransitionSnapshot<State, Event>) => void;

  /** Called when a selected edge is cancelled. */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- EventHandler<T> does not support "null"
  onMotionCancel?: (ev: null, data: StateMotionTransitionSnapshot<State, Event>) => void;
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

function resolveTransitionMotion(motion: StateMotionTransitionMotion, target: Keyframe): AtomMotion {
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
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
>(
  definition: StateMotionMachineDefinition<State, Event, Transition>,
  skin: StateMotionSkin<State, Transition>,
): StateMotionComponent<State, Event>;
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
  Context,
>(
  definition: StateMotionMachineDefinition<State, Event, Transition>,
  skin: StateMotionSkin<State, Transition, Context>,
): StateMotionComponent<State, Event, Context>;
export function createStateMotionComponent<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
  Context,
>(
  definition: StateMotionDefinition<State, Event> | StateMotionMachineDefinition<State, Event, Transition>,
  skin?: StateMotionSkin<State, Transition, Context>,
): StateMotionComponent<State, Event, Context> {
  const getStateKeyframe = (state: StateMotionStateName<State>, context: Context): Keyframe =>
    skin
      ? resolveStateKeyframe(skin.states[state], context)
      : (definition as StateMotionDefinition<State, Event>).states[state].keyframe;

  return React.forwardRef<HTMLElement, StateMotionComponentProps<State, Event, Context>>((props, ref) => {
    const { children, context, controller, imperativeRef, onMotionStart, onMotionFinish, onMotionCancel } = props;
    const snapshot = useStateMotion(controller);
    const playbackRef = React.useRef({ controller, transitionId: snapshot.transition?.id });
    const [child, childRef] = useChildElement(children, true, ref);
    const animateAtoms = useAnimateAtoms();
    const isReducedMotion = useIsReducedMotion();
    const handleRef = useMotionImperativeRef(imperativeRef);
    const skipMotions = useMotionBehaviourContext() === 'skip';

    const handleMotionStart = useEventCallback((transition: StateMotionTransitionSnapshot<State, Event>) => {
      onMotionStart?.(null, transition);
    });
    const handleMotionFinish = useEventCallback((transition: StateMotionTransitionSnapshot<State, Event>) => {
      onMotionFinish?.(null, transition);
    });
    const handleMotionCancel = useEventCallback((transition: StateMotionTransitionSnapshot<State, Event>) => {
      onMotionCancel?.(null, transition);
    });

    useIsomorphicLayoutEffect(() => {
      const element = childRef.current;
      if (!element) {
        return;
      }

      if (controller.definition !== definition) {
        throw new Error('createStateMotionComponent: The controller must be created from the same definition.');
      }

      const selected = snapshot.transition;
      const isHistoricalTransition =
        playbackRef.current.controller !== controller || playbackRef.current.transitionId === selected?.id;
      if (!selected || isHistoricalTransition) {
        playbackRef.current = { controller, transitionId: selected?.id };
        Object.assign(element.style, getStateKeyframe(snapshot.state, context as Context));
        return;
      }

      playbackRef.current = { controller, transitionId: selected.id };

      const source = definition.states[selected.source];
      const targetKeyframe = getStateKeyframe(selected.target, context as Context);
      const transitions = source.on as
        | Partial<Record<Event['type'], StateMotionTransition<State, Event> | { id: Transition; target: State }>>
        | undefined;
      const edge = transitions?.[selected.event.type as Event['type']];
      if (!edge) {
        return;
      }

      let motion: AtomMotion | AtomMotion[];
      if (skin && 'id' in edge) {
        const transitionMotion = skin.transitions?.[edge.id];
        motion = transitionMotion
          ? Array.isArray(transitionMotion)
            ? transitionMotion.map(value => resolveTransitionMotion(value, targetKeyframe))
            : resolveTransitionMotion(transitionMotion as StateMotionTransitionMotion, targetKeyframe)
          : { keyframes: [targetKeyframe] };
      } else {
        const stateEdge = edge as StateMotionTransition<State, Event>;
        const target = (definition as StateMotionDefinition<State, Event>).states[selected.target];
        motion =
          typeof stateEdge.motion === 'function'
            ? stateEdge.motion({
                element,
                event: selected.event,
                source: source as StateMotionDefinition<State, Event>['states'][StateMotionStateName<State>],
                target,
              })
            : stateEdge.motion ?? { keyframes: [targetKeyframe] };
      }

      handleMotionStart(selected);
      const handle: AnimationHandle = animateAtoms(element, motion, { isReducedMotion: isReducedMotion() });
      handleRef.current = handle;
      handle.setMotionEndCallbacks(
        () => {
          Object.assign(element.style, targetKeyframe);
          handleMotionFinish(selected);
        },
        () => handleMotionCancel(selected),
      );

      if (skipMotions) {
        handle.finish();
      }

      return () => {
        handle.commitStyles();
        handle.cancel();
        if (handleRef.current === handle) {
          handleRef.current = undefined;
        }
      };
    }, [
      animateAtoms,
      childRef,
      context,
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
