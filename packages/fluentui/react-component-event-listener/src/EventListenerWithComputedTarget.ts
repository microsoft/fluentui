import * as React from 'react';

import useEventListener from './useEventListener';
import { EventListenerOptions, EventTypes, Target } from './types';

type EventListenerWithComputedTargetProps<T extends EventTypes> = Omit<EventListenerOptions<T>, 'target' | 'targetRef'> & {
  resolveTarget: () => Target;
};

function EventListenerWithComputedTarget<T extends EventTypes>(props: EventListenerWithComputedTargetProps<T>) {
  const { resolveTarget, ...rest } = props;
  const targetRef = React.useRef<Target | null>(null);

  React.useEffect(() => {
    targetRef.current = resolveTarget();
  }, [resolveTarget]);
  useEventListener({ ...rest, targetRef });

  return null;
}

EventListenerWithComputedTarget.defaultProps = {
  capture: false
};

export default EventListenerWithComputedTarget;
