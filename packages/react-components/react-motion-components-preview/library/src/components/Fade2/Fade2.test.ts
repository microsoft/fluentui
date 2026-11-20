import { getMotionFunction, getPresenceMotionFunction } from '../../testing/testUtils';
import { Fade2 } from './Fade2';

describe('Fade2', () => {
  it('maps presence from, rest, and to states to directed opacity endpoints', () => {
    const fade2PresenceFn = getPresenceMotionFunction(Fade2);
    const motion = fade2PresenceFn?.({
      element: document.createElement('div'),
      fromOpacity: 0.2,
      restOpacity: 0.8,
      toOpacity: 0.1,
    });

    expect(motion).toMatchObject({
      enter: {
        keyframes: [{ opacity: 0.2 }, { opacity: 0.8 }],
        fill: 'both',
      },
      exit: {
        keyframes: [{ opacity: 0.8 }, { opacity: 0.1 }],
        fill: 'both',
      },
    });
  });

  it('defaults the presence exit destination to its entrance origin', () => {
    const fade2PresenceFn = getPresenceMotionFunction(Fade2);
    const motion = fade2PresenceFn?.({
      element: document.createElement('div'),
      fromOpacity: 0.2,
    });

    expect(motion).toMatchObject({
      enter: { keyframes: [{ opacity: 0.2 }, { opacity: 1 }] },
      exit: { keyframes: [{ opacity: 1 }, { opacity: 0.2 }] },
    });
  });

  it('maps Fade2.In from its origin to its resting opacity', () => {
    const fade2InMotionFn = getMotionFunction(Fade2.In);
    const atom = fade2InMotionFn?.({
      element: document.createElement('div'),
      fromOpacity: 0.2,
      restOpacity: 0.8,
    });

    expect(atom).toEqual(
      expect.objectContaining({
        keyframes: [{ opacity: 0.2 }, { opacity: 0.8 }],
      }),
    );
  });

  it('maps Fade2.Out from its resting opacity to its destination', () => {
    const fade2OutMotionFn = getMotionFunction(Fade2.Out);
    const atom = fade2OutMotionFn?.({
      element: document.createElement('div'),
      restOpacity: 0.8,
      toOpacity: 0.1,
    });

    expect(atom).toEqual(
      expect.objectContaining({
        keyframes: [{ opacity: 0.8 }, { opacity: 0.1 }],
      }),
    );
  });
});
