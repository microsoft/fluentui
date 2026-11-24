import * as React from 'react';
import { render } from '@testing-library/react';
import { createPresenceComponentVariant, motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Blur } from './Blur';

describe('Blur', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;
  let animateSpy: jest.Spied<typeof HTMLElement.prototype.animate>;
  const children = React.createElement('div', {}, 'Test');

  beforeAll(() => {
    originalAnimate = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = () => mockAnimation();
  });
  beforeEach(() => {
    animateSpy = jest.spyOn(HTMLElement.prototype, 'animate');
  });
  afterEach(() => animateSpy.mockRestore());
  afterAll(() => {
    HTMLElement.prototype.animate = originalAnimate;
  });

  it('preserves directional defaults and blur-only playback', () => {
    const { unmount } = render(React.createElement(Blur.In, { animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ filter: 'blur(10px)' }, { filter: 'blur(0px)' }],
      expect.objectContaining({ duration: motionTokens.durationSlow, easing: motionTokens.curveDecelerateMin }),
    );
    unmount();
    render(React.createElement(Blur.Out, { animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ filter: 'blur(0px)' }, { filter: 'blur(10px)' }],
      expect.objectContaining({ duration: motionTokens.durationSlow, easing: motionTokens.curveAccelerateMin }),
    );
  });

  it('mirrors the entrance pose when the presence exit is omitted', () => {
    const params = { fromRadius: '1rem', inRadius: '2px', animateOpacity: false, children };
    const { rerender } = render(React.createElement(Blur, { ...params, visible: true }));
    rerender(React.createElement(Blur, { ...params, visible: false }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ filter: 'blur(2px)' }, { filter: 'blur(1rem)' }],
      expect.any(Object),
    );
  });

  const Variant = createPresenceComponentVariant(Blur, {
    fromRadius: '2rem',
    inRadius: '3px',
    toRadius: '8px',
    exitDuration: 150,
  });
  const Nested = createPresenceComponentVariant(Variant, { easing: 'ease-in' });
  describe.each([true, false])('directional opacity=%s', animateOpacity => {
    it.each([
      [Blur.In, 'enter'],
      [Blur.Out, 'exit'],
      [Nested.In, 'enter'],
      [Nested.Out, 'exit'],
    ] as const)('uses temporal endpoints and runtime timing before variant defaults', (Motion, direction) => {
      render(
        React.createElement(Motion, {
          fromRadius: '2px',
          toRadius: '0px',
          duration: 123,
          easing: 'linear',
          delay: 25,
          animateOpacity,
          children,
        }),
      );
      const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
      expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
      expect(animateSpy).toHaveBeenCalledWith([{ filter: 'blur(2px)' }, { filter: 'blur(0px)' }], timing);
      if (animateOpacity) {
        expect(animateSpy).toHaveBeenCalledWith(
          direction === 'enter' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }],
          timing,
        );
      }
    });
  });

  it('preserves explicit zero exit timing over ordinary timing', () => {
    render(
      React.createElement(Blur.Out, {
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
      expect.any(Array),
      expect.objectContaining({ duration: 0, easing: 'ease-in', delay: 0 }),
    );
  });

  it('keeps present-pose props on the root and rejects removed props', () => {
    React.createElement(Blur, { inRadius: '2px', children });
    // @ts-expect-error present-pose props are root-only
    React.createElement(Blur.In, { inRadius: '2px', children });
    // @ts-expect-error variants retain the root-only present-pose contract
    React.createElement(Nested.Out, { inRadius: '2px', children });
    // @ts-expect-error fromRadius replaces outRadius
    React.createElement(Blur, { outRadius: '1rem', children });
  });

  it('supports asymmetric presence with a zero exit radius', () => {
    const params = { fromRadius: '1rem', inRadius: '2px', toRadius: '0px', animateOpacity: false, children };
    const { rerender } = render(React.createElement(Blur, { ...params, visible: false }));
    rerender(React.createElement(Blur, { ...params, visible: true }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ filter: 'blur(1rem)' }, { filter: 'blur(2px)' }],
      expect.any(Object),
    );
    rerender(React.createElement(Blur, { ...params, visible: false }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ filter: 'blur(2px)' }, { filter: 'blur(0px)' }], expect.any(Object));
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Blur);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Blur);
  });
});
