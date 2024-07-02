import { Fade } from './Fade';
import { expectPresenceMotionObject, expectPresenceMotionFunction } from '../../testing/test-utils';

describe('Fade', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Fade.motionDefinition);
  });

  it('generates a motion definition from the static function', () => {
    const motionObject = Fade.motionDefinition({ element: {} as HTMLElement });
    expectPresenceMotionObject(motionObject);
  });
});
