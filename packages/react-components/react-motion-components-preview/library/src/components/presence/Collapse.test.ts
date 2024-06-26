import { Collapse } from './Collapse';
import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/test-utils';

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse.motionDefinition);
  });

  it('generates a motion definition from the static function', () => {
    // TODO: fix type flow through createPresenceComponentVariant
    const motionObject = Collapse.motionDefinition({ element: {} as HTMLElement });
    expectPresenceMotionObject(motionObject);
  });
});
