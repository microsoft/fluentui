import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Blur } from './Blur';

describe('Blur', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Blur);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Blur);
  });
});
