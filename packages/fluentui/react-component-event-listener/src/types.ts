import * as React from 'react';

export interface EventListenerOptions<T extends EventTypes = 'click'> {
  /** Indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. */
  capture?: boolean;

  /** A function which receives a notification when an event of the specified type occurs. */
  listener: EventHandler<T>;

  /** A target node. Use `target` or `targetRef` prop. */
  target?: Target;

  /** A ref object with a target node. */
  targetRef?: TargetRef;

  /** A case-sensitive string representing the event type to listen for. */
  type: T;
}

export type EventHandler<T extends EventTypes> = (e: DocumentEventMap[T]) => void;
export type EventTypes = keyof DocumentEventMap;

export type Target = Node | Window;
export type TargetRef = React.RefObject<Target>;
