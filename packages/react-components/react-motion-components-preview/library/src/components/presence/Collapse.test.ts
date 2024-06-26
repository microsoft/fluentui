import { PresenceMotionFn } from '@fluentui/react-motion';
import { Collapse } from './Collapse';
import { expectPresenceMotionFunction, expectPresenceMotionObject } from '../../testing/test-utils';

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse.motionDefinition);
  });

  it('generates a motion definition from the static function', () => {
    // TODO: fix type flow through createPresenceComponentVariant
    const motionDefinition = Collapse.motionDefinition({ element: {} as HTMLElement });
    expectPresenceMotionObject(motionDefinition);
  });
});
