import {
  expectPresenceMotionFunction,
  expectPresenceMotionArray,
  getPresenceMotionFunction,
} from '../../testing/testUtils';
import { Slide } from './Slide';

describe('Slide', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Slide);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Slide);
  });

  it('maps presence states to directed slide endpoints', () => {
    const slidePresenceFn = getPresenceMotionFunction(Slide);

    // eslint-disable-next-line @nx/workspace-no-restricted-globals
    const motion = slidePresenceFn?.({
      element: document.createElement('div'),
      animateOpacity: false,
      outX: '-20px',
      outY: '10px',
      inX: '5px',
      inY: '0px',
    });

    expect(motion).toMatchObject({
      enter: [
        {
          keyframes: [{ translate: '-20px 10px' }, { translate: '5px 0px' }],
          fill: 'both',
        },
      ],
      exit: [
        {
          keyframes: [{ translate: '5px 0px' }, { translate: '-20px 10px' }],
          fill: 'both',
        },
      ],
    });
  });
});
