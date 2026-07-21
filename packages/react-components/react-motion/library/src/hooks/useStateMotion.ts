'use client';

import { useSyncExternalStore } from 'use-sync-external-store/shim';

import type { StateMotionController, StateMotionEvent, StateMotionSnapshot } from '../types';

/** Subscribes a React component to a state motion controller. */
export function useStateMotion<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  controller: StateMotionController<State, Event>,
): StateMotionSnapshot<State, Event> {
  return useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
}
