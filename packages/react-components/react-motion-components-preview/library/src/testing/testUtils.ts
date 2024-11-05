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

  expect(
    presenceMotionFn?.({
      element:
        // eslint-disable-next-line @nx/workspace-no-restricted-globals
        document.createElement('div'),
    }),
  ).toMatchObject({
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

export function expectPresenceMotionArray(component: PresenceComponent) {
  const presenceMotionFn = getMotionFunction(component);

  // eslint-disable-next-line @nx/workspace-no-restricted-globals
  expect(presenceMotionFn?.({ element: document.createElement('div') })).toMatchObject({
    enter: expect.arrayContaining([
      {
        duration: expect.any(Number),
        easing: expect.any(String),
        keyframes: expect.any(Array),
      },
    ]),
    exit: expect.arrayContaining([
      {
        duration: expect.any(Number),
        easing: expect.any(String),
        keyframes: expect.any(Array),
      },
    ]),
  });
}

export function expectPresenceMotionFunction(PresenceComponent: PresenceComponent) {
  const presenceMotionFn = getMotionFunction(PresenceComponent);

  expect(presenceMotionFn).toBeInstanceOf(Function);
}

export const mockAnimation: () => Animation = () => ({
  finish: jest.fn(),
  cancel: jest.fn(),
  persist: jest.fn(),
  currentTime: null,
  effect: null,
  finished: Promise.resolve({} as Animation),
  id: '',
  play: jest.fn(),
  pause: jest.fn(),
  updatePlaybackRate: jest.fn(),
  reverse: jest.fn(),
  playState: 'running',
  playbackRate: 1,
  startTime: null,
  timeline: null,
  oncancel: null,
  onfinish: null,
  ready: Promise.resolve({} as Animation),
  removeEventListener: jest.fn(),
  addEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  onremove: null,
  pending: false,
  replaceState: 'active',
  commitStyles: jest.fn(),
});
