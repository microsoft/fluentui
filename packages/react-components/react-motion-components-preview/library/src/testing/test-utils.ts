import { PresenceMotion, PresenceMotionFn } from '@fluentui/react-motion';

export function expectPresenceMotionObject(presenceObj: PresenceMotion) {
  expect(presenceObj).toMatchObject({
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

export function expectPresenceMotionFunction(presenceFn: PresenceMotionFn) {
  expect(presenceFn).toBeInstanceOf(Function);
}
