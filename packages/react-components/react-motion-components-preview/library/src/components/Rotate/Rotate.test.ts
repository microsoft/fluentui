import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Rotate } from './Rotate';

describe('Rotate', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Rotate);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Rotate);
  });
});
