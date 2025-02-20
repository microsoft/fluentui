import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/testUtils';
import { Slide } from './Slide';

describe('Slide', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Slide);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionObject(Slide);
  });
});
