import { PresenceComponent } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, getMotionFunction } from '../../testing/testUtils';
import { Scale } from './Scale';

export function expectPresenceMotionObject(component: PresenceComponent) {
  const presenceMotionFn = getMotionFunction(component);

  // eslint-disable-next-line @nx/workspace-no-restricted-globals
  expect(presenceMotionFn?.({ element: document.createElement('div') })).toMatchObject({
    enter: expect.arrayContaining([
      expect.objectContaining({
        duration: expect.any(Number),
        easing: expect.any(String),
        keyframes: expect.any(Array),
      }),
    ]),
    exit: expect.arrayContaining([
      expect.objectContaining({
        duration: expect.any(Number),
        easing: expect.any(String),
        keyframes: expect.any(Array),
      }),
    ]),
  });
}

describe('Scale', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Scale);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionObject(Scale);
  });
});
