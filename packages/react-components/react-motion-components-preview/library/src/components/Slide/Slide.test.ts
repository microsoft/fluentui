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
    it.each([Slide.In, SlideSnappy.In, SlideRelaxed.In])(
      'plays .In from authored fromX with neutral omitted axis to default present pose',
      Motion => {
        const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
        try {
          render(
            React.createElement(Motion, {
              fromX: '-24px',
              duration: 123,
              easing: 'linear',
              delay: 25,
              animateOpacity,
              children: React.createElement('div'),
            }),
          );
          const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
          expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
          expect(animateSpy).toHaveBeenCalledWith([{ translate: '-24px 0px' }, { translate: '0px 0px' }], timing);
          if (animateOpacity) {
            expect(animateSpy).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], timing);
          }
        } finally {
          animateSpy.mockRestore();
        }
      },
    );

    it.each([Slide.Out, SlideSnappy.Out, SlideRelaxed.Out])(
      'plays .Out from default present pose to authored toY with neutral omitted axis',
      Motion => {
        const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
        try {
          render(
            React.createElement(Motion, {
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
          expect(animateSpy).toHaveBeenCalledWith([{ translate: '0px 0px' }, { translate: '0px -8px' }], timing);
          if (animateOpacity) {
            expect(animateSpy).toHaveBeenCalledWith([{ opacity: 1 }, { opacity: 0 }], timing);
          }
        } finally {
          animateSpy.mockRestore();
        }
      },
    );
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

  it('preserves directional defaults and explicit zero exit timing', () => {
    const animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
    const children = React.createElement('div');
    try {
      const { unmount } = render(React.createElement(Slide.In, { animateOpacity: false, children }));
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ translate: '0px 0px' }, { translate: '0px 0px' }],
        expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMid }),
      );
      unmount();
      const { unmount: unmountOut } = render(React.createElement(Slide.Out, { animateOpacity: false, children }));
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ translate: '0px 0px' }, { translate: '0px 0px' }],
        expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMid }),
      );
      unmountOut();
      render(
        React.createElement(Slide.Out, {
          duration: 123,
          easing: 'linear',
          delay: 25,
          exitDuration: 0,
          exitEasing: 'ease-in',
          exitDelay: 0,
          animateOpacity: false,
          children,
        }),
      );
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ translate: '0px 0px' }, { translate: '0px 0px' }],
        expect.objectContaining({ duration: 0, easing: 'ease-in', delay: 0 }),
      );
    } finally {
      animateSpy.mockRestore();
    }
  });

  it('enforces Prism-strict directional prop contracts and rejects removed props', () => {
    const children = React.createElement('div');
    React.createElement(Slide, { fromX: '-8px', inX: '4px', inY: '8px', toY: '12px', children });
    React.createElement(Slide.In, { fromX: '-8px', fromY: '4px', children });
    React.createElement(Slide.Out, { toX: '8px', toY: '-4px', children });
    // @ts-expect-error inX is root-only
    React.createElement(Slide.In, { inX: '4px', children });
    // @ts-expect-error inY is root-only
    React.createElement(Slide.In, { inY: '8px', children });
    // @ts-expect-error toX is omitted on .In
    React.createElement(Slide.In, { toX: '8px', children });
    // @ts-expect-error toY is omitted on .In
    React.createElement(Slide.In, { toY: '8px', children });
    // @ts-expect-error exitDuration is omitted on .In
    React.createElement(Slide.In, { exitDuration: 100, children });
    // @ts-expect-error exitEasing is omitted on .In
    React.createElement(Slide.In, { exitEasing: 'linear', children });
    // @ts-expect-error exitDelay is omitted on .In
    React.createElement(Slide.In, { exitDelay: 25, children });
    // @ts-expect-error inX is root-only on .Out
    React.createElement(Slide.Out, { inX: '4px', children });
    // @ts-expect-error inY is root-only on .Out
    React.createElement(Slide.Out, { inY: '8px', children });
    // @ts-expect-error fromX is omitted on .Out
    React.createElement(Slide.Out, { fromX: '-8px', children });
    // @ts-expect-error fromY is omitted on .Out
    React.createElement(Slide.Out, { fromY: '-8px', children });
    // @ts-expect-error variants retain Prism-strict .In contract
    React.createElement(SlideSnappy.In, { toX: '8px', children });
    // @ts-expect-error variants retain Prism-strict .Out contract
    React.createElement(SlideRelaxed.Out, { inY: '8px', children });
    // @ts-expect-error variants omit fromY on .Out
    React.createElement(SlideRelaxed.Out, { fromY: '-8px', children });
    // @ts-expect-error fromX replaces outX
    React.createElement(Slide, { outX: '10px', children });
    // @ts-expect-error fromY replaces outY
    React.createElement(Slide, { outY: '10px', children });
  });
});
