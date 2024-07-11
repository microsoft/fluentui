import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/test-utils';
import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectPresenceMotionFunction((Collapse as any).MOTION_DEFINITION);
  });

  it('generates a motion definition from the static function', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const motionObject = (Collapse as any).MOTION_DEFINITION({ element: {} as HTMLElement });
    expectPresenceMotionObject(motionObject);
  });
});
