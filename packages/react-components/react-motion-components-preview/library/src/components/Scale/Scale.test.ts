import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Scale } from './Scale';

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
      outScale: 0.5,
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
});
