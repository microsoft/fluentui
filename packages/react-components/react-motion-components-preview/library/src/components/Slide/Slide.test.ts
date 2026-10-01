import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, expectPresenceMotionArray, mockAnimation } from '../../testing/testUtils';
import { Slide } from './Slide';

describe('Slide', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;

  beforeAll(() => {
    originalAnimate = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = mockAnimation;
  });

  afterAll(() => {
    HTMLElement.prototype.animate = originalAnimate;
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Slide);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Slide);
  });

  it.each([true, false])('preserves custom poses and exit timing with animateOpacity=%s', animateOpacity => {
    const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
    const params = {
      outX: '100%',
      outY: '-24px',
      inX: '10%',
      inY: '12px',
      duration: 300,
      delay: 50,
      exitDuration: 150,
      exitDelay: 25,
      animateOpacity,
    };
    const child = React.createElement('div');
    try {
      const { rerender } = render(React.createElement(Slide, { ...params, visible: false, children: child }));
      animateSpy.mockClear();
      rerender(React.createElement(Slide, { ...params, visible: true, children: child }));
      expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
      expect(animateSpy).toHaveBeenCalledWith(
        [{ translate: '100% -24px' }, { translate: '10% 12px' }],
        expect.objectContaining({
          duration: 300,
          easing: motionTokens.curveDecelerateMid,
          delay: 50,
          fill: 'forwards',
        }),
      );
      if (animateOpacity) {
        expect(animateSpy).toHaveBeenCalledWith(
          [{ opacity: 0 }, { opacity: 1 }],
          expect.objectContaining({ duration: 300, easing: motionTokens.curveDecelerateMid, delay: 50, fill: 'both' }),
        );
      }
      animateSpy.mockClear();
      rerender(React.createElement(Slide, { ...params, visible: false, children: child }));
      expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
      expect(animateSpy).toHaveBeenCalledWith(
        [{ translate: '10% 12px' }, { translate: '100% -24px' }],
        expect.objectContaining({ duration: 150, easing: motionTokens.curveAccelerateMid, delay: 25 }),
      );
      if (animateOpacity) {
        expect(animateSpy).toHaveBeenCalledWith(
          [{ opacity: 1 }, { opacity: 0 }],
          expect.objectContaining({ duration: 150, easing: motionTokens.curveAccelerateMid, delay: 25, fill: 'both' }),
        );
      }
    } finally {
      animateSpy.mockRestore();
    }
  });
});
