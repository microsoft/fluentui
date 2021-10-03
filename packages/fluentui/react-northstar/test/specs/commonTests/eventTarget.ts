import { ReactWrapper } from 'enzyme';

export const EVENT_TARGET_ATTRIBUTE = 'data-simulate-event-here';

export const getEventTargetComponent = (wrapper: ReactWrapper, listenerName: string, eventTargets: object = {}) => {
  const eventTarget = eventTargets[listenerName]
    ? wrapper.find(eventTargets[listenerName]).hostNodes().first()
    : wrapper.find(`[${EVENT_TARGET_ATTRIBUTE}]`).hostNodes().first();

  // if (eventTarget.length === 0) {
  //   throw new Error(
  //     'The event prop was not delegated to the children. You probably ' +
  //     'forgot to use `getUnhandledProps` util to spread the `unhandledProps` props.',
  //   )
  // }

  return eventTarget;
};
