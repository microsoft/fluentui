import { motionTokens, PresenceComponent } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, getMotionFunction } from '../../testing/testUtils';
import { Collapse } from './Collapse';

function expectPresenceMotionArray(component: PresenceComponent) {
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
      expect.objectContaining({
        duration: motionTokens.durationNormal,
        easing: motionTokens.curveEasyEaseMax,
        keyframes: expect.arrayContaining([
          expect.objectContaining({ maxHeight: '0px' }),
          expect.objectContaining({ maxHeight: '0' }),
        ]),
      }),
      expect.objectContaining({
        duration: motionTokens.durationNormal,
        easing: motionTokens.curveEasyEaseMax,
        keyframes: expect.arrayContaining([expect.objectContaining({ paddingBottom: '0', paddingTop: '0' })]),
      }),
    ]),
  });
}

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Collapse);
  });
});
