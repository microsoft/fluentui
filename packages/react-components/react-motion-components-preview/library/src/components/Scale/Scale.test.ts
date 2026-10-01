import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Scale, ScaleSnappy, ScaleRelaxed } from './Scale';

describe('Scale', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;
  let animateSpy: jest.Spied<typeof HTMLElement.prototype.animate>;
  const testElement = React.createElement('div', { 'data-testid': 'scale-content' }, 'Test');

  beforeAll(() => {
    originalAnimate = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = () => mockAnimation();
  });

  beforeEach(() => {
    animateSpy = jest.spyOn(HTMLElement.prototype, 'animate');
  });

  afterEach(() => {
    animateSpy.mockRestore();
  });

  afterAll(() => {
    HTMLElement.prototype.animate = originalAnimate;
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Scale);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Scale);
  });

  it('preserves the default scale poses and direction-specific timing', () => {
    const { rerender } = render(React.createElement(Scale, { visible: false, children: testElement }));

    rerender(React.createElement(Scale, { visible: true, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.9 }, { scale: 1 }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveDecelerateMax }),
    );

    rerender(React.createElement(Scale, { visible: false, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 1 }, { scale: 0.9 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMax }),
    );
  });

  it('preserves custom scale poses and independent exit timing', () => {
    const params = {
      fromScale: 0.5,
      inScale: 1.2,
      duration: 300,
      easing: 'ease-out',
      delay: 50,
      exitDuration: 150,
      exitEasing: 'ease-in',
      exitDelay: 25,
    };
    const { rerender } = render(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    rerender(React.createElement(Scale, { ...params, visible: true, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 0.5 }, { scale: 1.2 }],
      expect.objectContaining({ duration: 300, easing: 'ease-out', delay: 50 }),
    );

    rerender(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    expect(animateSpy).toHaveBeenCalledWith(
      [{ scale: 1.2 }, { scale: 0.5 }],
      expect.objectContaining({ duration: 150, easing: 'ease-in', delay: 25 }),
    );
  });

  it('supports asymmetric presence with an explicit zero exit scale', () => {
    const params = { fromScale: 0.5, inScale: 1.2, toScale: 0, animateOpacity: false };
    const { rerender } = render(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    rerender(React.createElement(Scale, { ...params, visible: true, children: testElement }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ scale: 0.5 }, { scale: 1.2 }], expect.any(Object));
    rerender(React.createElement(Scale, { ...params, visible: false, children: testElement }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ scale: 1.2 }, { scale: 0 }], expect.any(Object));
  });

  describe.each([true, false])('directional playback with animateOpacity=%s', animateOpacity => {
    it.each([
      [Scale.In, 'enter'],
      [Scale.Out, 'exit'],
      [ScaleSnappy.In, 'enter'],
      [ScaleSnappy.Out, 'exit'],
      [ScaleRelaxed.In, 'enter'],
      [ScaleRelaxed.Out, 'exit'],
    ] as const)('uses authored endpoints and selected opacity direction', (Motion, direction) => {
      render(
        React.createElement(Motion, {
          fromScale: 1.2,
          toScale: 0,
          duration: 123,
          easing: 'linear',
          delay: 25,
          animateOpacity,
          children: testElement,
        }),
      );
      expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
      const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
      expect(animateSpy).toHaveBeenCalledWith([{ scale: 1.2 }, { scale: 0 }], timing);
      if (animateOpacity) {
        expect(animateSpy).toHaveBeenCalledWith(
          direction === 'enter' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
          timing,
        );
      }
    });
  });
});
