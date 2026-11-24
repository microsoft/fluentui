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
      [Blur.In, '0px'],
      [Nested.In, '3px'],
    ] as const)(
      'plays .In from authored fromRadius to component inRadius with runtime timing before variant defaults',
      (Motion, expectedInRadius) => {
        render(
          React.createElement(Motion, {
            fromRadius: '2px',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
        expect(animateSpy).toHaveBeenCalledWith(
          [{ filter: 'blur(2px)' }, { filter: `blur(${expectedInRadius})` }],
          timing,
        );
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], timing);
        }
      },
    );

    it.each([
      [Blur.Out, '0px'],
      [Nested.Out, '3px'],
    ] as const)(
      'plays .Out from component inRadius to authored toRadius with runtime timing before variant defaults',
      (Motion, expectedInRadius) => {
        render(
          React.createElement(Motion, {
            toRadius: '12px',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
        expect(animateSpy).toHaveBeenCalledWith(
          [{ filter: `blur(${expectedInRadius})` }, { filter: 'blur(12px)' }],
          timing,
        );
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 1 }, { opacity: 0 }], timing);
        }
      },
    );
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

  it('enforces Prism-strict directional prop contracts and rejects removed props', () => {
    React.createElement(Blur, { fromRadius: '1rem', inRadius: '2px', toRadius: '8px', children });
    React.createElement(Blur.In, { fromRadius: '1rem', children });
    React.createElement(Blur.Out, { toRadius: '8px', children });
    // @ts-expect-error inRadius is root-only
    React.createElement(Blur.In, { inRadius: '2px', children });
    // @ts-expect-error toRadius is omitted on .In
    React.createElement(Blur.In, { toRadius: '8px', children });
    // @ts-expect-error exitDuration is omitted on .In
    React.createElement(Blur.In, { exitDuration: 100, children });
    // @ts-expect-error exitEasing is omitted on .In
    React.createElement(Blur.In, { exitEasing: 'linear', children });
    // @ts-expect-error exitDelay is omitted on .In
    React.createElement(Blur.In, { exitDelay: 25, children });
    // @ts-expect-error inRadius is root-only on .Out
    React.createElement(Blur.Out, { inRadius: '2px', children });
    // @ts-expect-error fromRadius is omitted on .Out
    React.createElement(Blur.Out, { fromRadius: '1rem', children });
    // @ts-expect-error variants retain Prism-strict .In contract
    React.createElement(Nested.In, { toRadius: '8px', children });
    // @ts-expect-error variants retain Prism-strict .Out contract
    React.createElement(Nested.Out, { inRadius: '2px', children });
    // @ts-expect-error variants omit fromRadius on .Out
    React.createElement(Nested.Out, { fromRadius: '1rem', children });
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
