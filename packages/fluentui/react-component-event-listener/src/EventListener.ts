import { useEventListener } from './useEventListener';
import { EventListenerOptions, EventTypes } from './types';

export function EventListener<T extends EventTypes>({
  listener,
  type,
  capture = false,
  targetRef,
  target,
}: EventListenerOptions<T>) {
  useEventListener({ listener, type, capture, targetRef, target });

  return null;
}
