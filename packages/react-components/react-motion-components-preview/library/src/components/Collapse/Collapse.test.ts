import * as React from 'react';
import { render } from '@testing-library/react';
import { createPresenceComponentVariant, motionTokens } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, expectPresenceMotionArray, mockAnimation } from '../../testing/testUtils';
import { Collapse, CollapseSnappy, CollapseRelaxed, CollapseDelayed } from './Collapse';

describe('Collapse', () => {
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

  afterEach(() => {
    animateSpy.mockRestore();
  });

  afterAll(() => {
    HTMLElement.prototype.animate = originalAnimate;
  });

  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Collapse);
  });

  it('mirrors fromSize on exit when toSize is omitted and supports asymmetric toSize', () => {
    const { rerender } = render(
      React.createElement(Collapse, { visible: false, fromSize: '12px', animateOpacity: false, children }),
    );
    rerender(React.createElement(Collapse, { visible: true, fromSize: '12px', animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenCalledWith(
      [
        { maxHeight: '12px', overflowY: 'hidden' },
        { maxHeight: '0px', offset: 0.9999, overflowY: 'hidden' },
        { maxHeight: 'unset', overflowY: 'unset' },
      ],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax }),
    );

    animateSpy.mockClear();
    rerender(React.createElement(Collapse, { visible: false, fromSize: '12px', animateOpacity: false, children }));
    expect(animateSpy).toHaveBeenCalledWith(
      [
        { maxHeight: '0px', overflowY: 'hidden' },
        { maxHeight: '12px', overflowY: 'hidden' },
      ],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax }),
    );

    animateSpy.mockClear();
    rerender(
      React.createElement(Collapse, {
        visible: true,
        fromSize: '12px',
        toSize: '24px',
        animateOpacity: false,
        children,
      }),
    );
    animateSpy.mockClear();
    rerender(
      React.createElement(Collapse, {
        visible: false,
        fromSize: '12px',
        toSize: '24px',
        animateOpacity: false,
        children,
      }),
    );
    expect(animateSpy).toHaveBeenCalledWith(
      [
        { maxHeight: '0px', overflowY: 'hidden' },
        { maxHeight: '24px', overflowY: 'hidden' },
      ],
      expect.any(Object),
    );
  });

  const CustomVariant = createPresenceComponentVariant(Collapse, { fromSize: '8px', toSize: '16px' });

  describe.each([true, false])('directional playback with animateOpacity=%s', animateOpacity => {
    it.each([Collapse.In, CollapseSnappy.In, CollapseRelaxed.In, CustomVariant.In])(
      'plays .In from authored fromSize with ordinary timing',
      Motion => {
        render(
          React.createElement(Motion, {
            fromSize: '10px',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 3 : 2);
        expect(animateSpy).toHaveBeenCalledWith(
          [
            { maxHeight: '10px', overflowY: 'hidden' },
            { maxHeight: '0px', offset: 0.9999, overflowY: 'hidden' },
            { maxHeight: 'unset', overflowY: 'unset' },
          ],
          timing,
        );
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 0 }, { opacity: 1 }], timing);
        }
      },
    );

    it.each([Collapse.Out, CollapseSnappy.Out, CollapseRelaxed.Out, CustomVariant.Out])(
      'plays .Out to authored toSize with ordinary timing',
      Motion => {
        render(
          React.createElement(Motion, {
            toSize: '24px',
            duration: 123,
            easing: 'linear',
            delay: 25,
            animateOpacity,
            children,
          }),
        );
        const timing = expect.objectContaining({ duration: 123, easing: 'linear', delay: 25 });
        expect(animateSpy).toHaveBeenCalledTimes(animateOpacity ? 3 : 2);
        expect(animateSpy).toHaveBeenCalledWith(
          [
            { maxHeight: '0px', overflowY: 'hidden' },
            { maxHeight: '24px', overflowY: 'hidden' },
          ],
          timing,
        );
        if (animateOpacity) {
          expect(animateSpy).toHaveBeenCalledWith([{ opacity: 1 }, { opacity: 0 }], timing);
        }
      },
    );
  });

  it('preserves explicit zero exit timing over ordinary timing on .Out', () => {
    render(
      React.createElement(Collapse.Out, {
        toSize: '16px',
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
    expect(animateSpy).toHaveBeenCalledWith(
      [
        { maxHeight: '0px', overflowY: 'hidden' },
        { maxHeight: '16px', overflowY: 'hidden' },
      ],
      expect.objectContaining({ duration: 0, easing: 'ease-in', delay: 0 }),
    );
  });

  it('enforces Prism-strict directional prop contracts and rejects removed props', () => {
    React.createElement(Collapse, { fromSize: '10px', toSize: '24px', children });
    React.createElement(Collapse.In, { fromSize: '10px', children });
    React.createElement(Collapse.Out, { toSize: '24px', children });
    // @ts-expect-error toSize is omitted on .In
    React.createElement(Collapse.In, { toSize: '24px', children });
    // @ts-expect-error exitDuration is omitted on .In
    React.createElement(Collapse.In, { exitDuration: 100, children });
    // @ts-expect-error exitEasing is omitted on .In
    React.createElement(Collapse.In, { exitEasing: 'linear', children });
    // @ts-expect-error exitDelay is omitted on .In
    React.createElement(Collapse.In, { exitDelay: 25, children });
    // @ts-expect-error fromSize is omitted on .Out
    React.createElement(Collapse.Out, { fromSize: '10px', children });
    // @ts-expect-error variants retain Prism-strict .In contract
    React.createElement(CollapseSnappy.In, { toSize: '24px', children });
    // @ts-expect-error variants retain Prism-strict .Out contract
    React.createElement(CollapseDelayed.Out, { fromSize: '10px', children });
    // @ts-expect-error custom variants retain Prism-strict .In contract
    React.createElement(CustomVariant.In, { exitDuration: 100, children });
    // @ts-expect-error fromSize/toSize replace outSize
    React.createElement(Collapse, { outSize: '10px', children });
  });
});
