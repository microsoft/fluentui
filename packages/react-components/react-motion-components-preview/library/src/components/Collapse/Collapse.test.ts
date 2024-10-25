import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Collapse);
  });
});
