import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/testUtils';
import { Scale } from './Scale';

describe('Scale', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Scale);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionObject(Scale);
  });
});
