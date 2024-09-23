import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/testUtils';
import { Collapse } from './Collapse';

describe('Collapse', () => {
  xit('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse);
  });

  xit('generates a motion definition from the static function', () => {
    expectPresenceMotionObject(Collapse);
  });
});
