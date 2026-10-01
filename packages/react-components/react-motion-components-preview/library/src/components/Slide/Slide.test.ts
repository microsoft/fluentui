import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, expectPresenceMotionArray, mockAnimation } from '../../testing/testUtils';
import { Slide, SlideSnappy, SlideRelaxed } from './Slide';

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

  it.each([
    [{ toX: '24px' }, '24px 0px'],
    [{ toY: '-8px' }, '0px -8px'],
    [{}, '-24px 12px'],
  ])('supports independent exit poses with neutral omitted axes', (destination, expected) => {
    const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
    const params = {
      fromX: '-24px',
      fromY: '12px',
      inX: '4px',
      inY: '8px',
      ...destination,
      animateOpacity: false,
      children: React.createElement('div'),
    };
    try {
      const { rerender } = render(React.createElement(Slide, { ...params, visible: false }));
      rerender(React.createElement(Slide, { ...params, visible: true }));
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ translate: '-24px 12px' }, { translate: '4px 8px' }],
        expect.any(Object),
      );
      rerender(React.createElement(Slide, { ...params, visible: false }));
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ translate: '4px 8px' }, { translate: expected }],
        expect.any(Object),
      );
    } finally {
      animateSpy.mockRestore();
    }
  });

  describe.each([true, false])('directional playback with animateOpacity=%s', animateOpacity => {
    it.each([
      [Slide.In, 'enter'],
      [Slide.Out, 'exit'],
      [SlideSnappy.In, 'enter'],
      [SlideSnappy.Out, 'exit'],
      [SlideRelaxed.In, 'enter'],
      [SlideRelaxed.Out, 'exit'],
    ] as const)('uses temporal endpoints and selected opacity direction', (Motion, direction) => {
      const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
      try {
        render(
          React.createElement(Motion, {
            fromX: '-24px',
            toY: '-8px',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children: React.createElement('div'),
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
        expect(animateSpy).toHaveBeenCalledWith([{ translate: '-24px 0px' }, { translate: '0px -8px' }], timing);
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith(
            direction === 'enter' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
            timing,
          );
        }
      } finally {
        animateSpy.mockRestore();
      }
    });
  });

  it.each([true, false])('preserves custom poses and exit timing with animateOpacity=%s', animateOpacity => {
    const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
    const params = {
      fromX: '100%',
      fromY: '-24px',
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
