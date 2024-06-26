import { Fade } from './Fade';
import { expectPresenceMotionObject } from '../../testing/test-utils';

describe('Fade', () => {
  it('stores its motion definition as a static object', () => {
    expectPresenceMotionObject(Fade.motionDefinition);
  });
});
