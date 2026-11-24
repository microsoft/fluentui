import * as React from 'react';
import { render } from '@testing-library/react';
import { createPresenceComponentVariant, motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Rotate } from './Rotate';

describe('Rotate', () => {
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

  it('preserves directional defaults and rotation-only playback', () => {
    const { unmount } = render(React.createElement(Rotate.In, { animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ rotate: 'z -90deg' }, { rotate: 'z 0deg' }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveDecelerateMax }),
    );
    unmount();
    render(React.createElement(Rotate.Out, { animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ rotate: 'z 0deg' }, { rotate: 'z -90deg' }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveAccelerateMax }),
    );
  });

  it('mirrors the entrance pose when the presence exit is omitted', () => {
    const params = { fromAngle: -45, inAngle: 30, animateOpacity: false, children };
    const { rerender } = render(React.createElement(Rotate, { ...params, visible: true }));
    rerender(React.createElement(Rotate, { ...params, visible: false }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ rotate: 'z 30deg' }, { rotate: 'z -45deg' }], expect.any(Object));
  });

  const Variant = createPresenceComponentVariant(Rotate, {
    fromAngle: -60,
    inAngle: 15,
    toAngle: 75,
    exitDuration: 150,
  });
  const Nested = createPresenceComponentVariant(Variant, { axis: 'y', easing: 'ease-in' });
  describe.each([true, false])('directional opacity=%s', animateOpacity => {
    it.each([
      [Rotate.In, 0],
      [Nested.In, 15],
    ] as const)(
      'plays .In from authored fromAngle to component inAngle with runtime timing before variant defaults',
      (Motion, expectedInAngle) => {
        render(
          React.createElement(Motion, {
            fromAngle: 30,
            axis: 'y',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
        expect(animateSpy).toHaveBeenCalledWith([{ rotate: 'y 30deg' }, { rotate: `y ${expectedInAngle}deg` }], timing);
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], timing);
        }
      },
    );

    it.each([
      [Rotate.Out, 0],
      [Nested.Out, 15],
    ] as const)(
      'plays .Out from component inAngle to authored toAngle with runtime timing before variant defaults',
      (Motion, expectedInAngle) => {
        render(
          React.createElement(Motion, {
            toAngle: 45,
            axis: 'y',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 2 : 1);
        expect(animateSpy).toHaveBeenCalledWith([{ rotate: `y ${expectedInAngle}deg` }, { rotate: 'y 45deg' }], timing);
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 1 }, { opacity: 0 }], timing);
        }
      },
    );
  });

  it('preserves explicit zero exit timing over ordinary timing', () => {
    render(
      React.createElement(Rotate.Out, {
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
    React.createElement(Rotate, { fromAngle: -45, inAngle: 30, toAngle: 90, children });
    React.createElement(Rotate.In, { fromAngle: -45, children });
    React.createElement(Rotate.Out, { toAngle: 90, children });
    // @ts-expect-error inAngle is root-only
    React.createElement(Rotate.In, { inAngle: 30, children });
    // @ts-expect-error toAngle is omitted on .In
    React.createElement(Rotate.In, { toAngle: 90, children });
    // @ts-expect-error exitDuration is omitted on .In
    React.createElement(Rotate.In, { exitDuration: 100, children });
    // @ts-expect-error exitEasing is omitted on .In
    React.createElement(Rotate.In, { exitEasing: 'linear', children });
    // @ts-expect-error exitDelay is omitted on .In
    React.createElement(Rotate.In, { exitDelay: 25, children });
    // @ts-expect-error inAngle is root-only on .Out
    React.createElement(Rotate.Out, { inAngle: 30, children });
    // @ts-expect-error fromAngle is omitted on .Out
    React.createElement(Rotate.Out, { fromAngle: -45, children });
    // @ts-expect-error variants retain Prism-strict .In contract
    React.createElement(Nested.In, { toAngle: 90, children });
    // @ts-expect-error variants retain Prism-strict .Out contract
    React.createElement(Nested.Out, { inAngle: 30, children });
    // @ts-expect-error variants omit fromAngle on .Out
    React.createElement(Nested.Out, { fromAngle: -45, children });
    // @ts-expect-error fromAngle replaces outAngle
    React.createElement(Rotate, { outAngle: -45, children });
  });

  it('supports asymmetric presence with a zero exit angle', () => {
    const params = { fromAngle: -45, inAngle: 30, toAngle: 0, axis: 'y' as const, animateOpacity: false, children };
    const { rerender } = render(React.createElement(Rotate, { ...params, visible: false }));
    rerender(React.createElement(Rotate, { ...params, visible: true }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ rotate: 'y -45deg' }, { rotate: 'y 30deg' }], expect.any(Object));
    rerender(React.createElement(Rotate, { ...params, visible: false }));
    expect(animateSpy).toHaveBeenLastCalledWith([{ rotate: 'y 30deg' }, { rotate: 'y 0deg' }], expect.any(Object));
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Rotate);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Rotate);
  });
});
