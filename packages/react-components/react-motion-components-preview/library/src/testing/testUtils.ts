import type { PresenceComponent, PresenceMotionFn } from '@fluentui/react-motion';

function getMotionFunction(component: PresenceComponent): PresenceMotionFn | null {
  const symbols = Object.getOwnPropertySymbols(component);

  for (const symbol of symbols) {
    if (symbol.toString() === 'Symbol(MOTION_DEFINITION)') {
      // @ts-expect-error symbol can't be used as an index there, type casting is also not possible
      return component[symbol];
    }
  }

  return null;
}

export function expectPresenceMotionObject(component: PresenceComponent) {
  const presenceMotionFn = getMotionFunction(component);

  // eslint-disable-next-line no-restricted-globals
  expect(presenceMotionFn?.({ element: document.createElement('div') })).toMatchObject({
    enter: expect.objectContaining({
      duration: expect.any(Number),
      easing: expect.any(String),
      keyframes: expect.any(Array),
    }),
    exit: expect.objectContaining({
      duration: expect.any(Number),
      easing: expect.any(String),
      keyframes: expect.any(Array),
    }),
  });
}

export function expectPresenceMotionFunction(PresenceComponent: PresenceComponent) {
  const presenceMotionFn = getMotionFunction(PresenceComponent);

  expect(presenceMotionFn).toBeInstanceOf(Function);
}
