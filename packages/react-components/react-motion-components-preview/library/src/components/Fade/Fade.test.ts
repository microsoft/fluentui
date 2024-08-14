import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/testUtils';
import { Fade } from './Fade';

describe('Fade', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Fade);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionObject(Fade);
  });
});
