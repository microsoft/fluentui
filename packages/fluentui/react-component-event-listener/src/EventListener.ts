import { useEventListener } from './useEventListener';
import { EventListenerOptions, EventTypes } from './types';

export function EventListener<T extends EventTypes>(props: EventListenerOptions<T>) {
  useEventListener(props);

  return null;
}

EventListener.defaultProps = {
  capture: false,
};
