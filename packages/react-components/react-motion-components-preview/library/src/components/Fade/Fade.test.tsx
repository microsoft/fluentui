import * as React from 'react';
import { Fade, FadeRelaxed, FadeSnappy } from './Fade';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';

describe('Fade motion component', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;
  let animateSpy: jest.Spied<typeof HTMLElement.prototype.animate>;
  const testElement = <div data-testid="fade-content">Test</div>;

  // JSDOM does not support the Web Animations API, so create a mock animate() before spying on it
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

  it('should render Fade with correct opacity keyframes, duration and easing (visible=false -> true -> false)', () => {
    const { rerender } = render(<Fade visible={false}>{testElement}</Fade>);

    // Testing fade in motion
    rerender(<Fade visible={true}>{testElement}</Fade>);
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );

    // Testing fade out motion
    rerender(<Fade visible={false}>{testElement}</Fade>);
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
  });

  it('preserves custom opacity poses and independent exit timing', () => {
    const params = {
      fromOpacity: 0.2,
      inOpacity: 0.7,
      duration: 300,
      easing: 'ease-out',
      delay: 50,
      exitDuration: 150,
      exitEasing: 'ease-in',
      exitDelay: 25,
    };
    const { rerender } = render(
      <Fade {...params} visible={false}>
        {testElement}
      </Fade>,
    );
    rerender(
      <Fade {...params} visible>
        {testElement}
      </Fade>,
    );
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ opacity: 0.2 }, { opacity: 0.7 }],
      expect.objectContaining({ duration: 300, easing: 'ease-out', delay: 50, fill: 'both' }),
    );
    rerender(
      <Fade {...params} visible={false}>
        {testElement}
      </Fade>,
    );
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ opacity: 0.7 }, { opacity: 0.2 }],
      expect.objectContaining({ duration: 150, easing: 'ease-in', delay: 25, fill: 'both' }),
    );
  });

  it('enters from the source pose and exits toward an independent destination', () => {
    const params = { fromOpacity: 0.2, inOpacity: 0.7, toOpacity: 0.4 };
    const { rerender } = render(
      <Fade {...params} visible={false}>
        {testElement}
      </Fade>,
    );
    rerender(
      <Fade {...params} visible>
        {testElement}
      </Fade>,
    );
    expect(animateSpy).toHaveBeenLastCalledWith([{ opacity: 0.2 }, { opacity: 0.7 }], expect.any(Object));
    rerender(
      <Fade {...params} visible={false}>
        {testElement}
      </Fade>,
    );
    expect(animateSpy).toHaveBeenLastCalledWith([{ opacity: 0.7 }, { opacity: 0.4 }], expect.any(Object));
  });

  it.each([Fade.In, FadeSnappy.In, FadeRelaxed.In])(
    'plays .In from authored fromOpacity to default present opacity with ordinary timing',
    Motion => {
      render(
        <Motion fromOpacity={0.2} duration={123} easing="ease-in" delay={25}>
          {testElement}
        </Motion>,
      );
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ opacity: 0.2 }, { opacity: 1 }],
        expect.objectContaining({ duration: 123, easing: 'ease-in', delay: 25 }),
      );
    },
  );

  it.each([Fade.Out, FadeSnappy.Out, FadeRelaxed.Out])(
    'plays .Out from default present opacity to authored toOpacity with ordinary timing',
    Motion => {
      render(
        <Motion toOpacity={0.2} duration={123} easing="ease-in" delay={25}>
          {testElement}
        </Motion>,
      );
      expect(animateSpy).toHaveBeenLastCalledWith(
        [{ opacity: 1 }, { opacity: 0.2 }],
        expect.objectContaining({ duration: 123, easing: 'ease-in', delay: 25 }),
      );
    },
  );

  it('preserves directional defaults and explicit zero exit timing', () => {
    const { unmount } = render(<Fade.In>{testElement}</Fade.In>);
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
    unmount();
    const { unmount: unmountOut } = render(<Fade.Out>{testElement}</Fade.Out>);
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
    unmountOut();
    render(
      <Fade.Out duration={123} easing="linear" delay={25} exitDuration={0} exitEasing="ease-in" exitDelay={0}>
        {testElement}
      </Fade.Out>,
    );
    expect(animateSpy).toHaveBeenLastCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: 0, easing: 'ease-in', delay: 0 }),
    );
  });

  it('enforces Prism-strict directional prop contracts and rejects removed props', () => {
    <Fade fromOpacity={0.2} inOpacity={0.8} toOpacity={0.1}>
      {testElement}
    </Fade>;
    <Fade.In fromOpacity={0.2}>{testElement}</Fade.In>;
    <Fade.Out toOpacity={0.2}>{testElement}</Fade.Out>;
    // @ts-expect-error inOpacity is root-only
    <Fade.In inOpacity={0.8}>{testElement}</Fade.In>;
    // @ts-expect-error toOpacity is omitted on .In
    <Fade.In toOpacity={0.8}>{testElement}</Fade.In>;
    // @ts-expect-error exitDuration is omitted on .In
    <Fade.In exitDuration={100}>{testElement}</Fade.In>;
    // @ts-expect-error exitEasing is omitted on .In
    <Fade.In exitEasing="linear">{testElement}</Fade.In>;
    // @ts-expect-error exitDelay is omitted on .In
    <Fade.In exitDelay={50}>{testElement}</Fade.In>;
    // @ts-expect-error inOpacity is root-only on .Out
    <Fade.Out inOpacity={0.8}>{testElement}</Fade.Out>;
    // @ts-expect-error fromOpacity is omitted on .Out
    <Fade.Out fromOpacity={0.2}>{testElement}</Fade.Out>;
    // @ts-expect-error variants retain Prism-strict .In contract
    <FadeSnappy.In toOpacity={0.8}>{testElement}</FadeSnappy.In>;
    // @ts-expect-error variants retain Prism-strict .Out contract
    <FadeSnappy.Out inOpacity={0.8}>{testElement}</FadeSnappy.Out>;
    // @ts-expect-error variants omit fromOpacity on .Out
    <FadeRelaxed.Out fromOpacity={0.2}>{testElement}</FadeRelaxed.Out>;
    // @ts-expect-error fromOpacity replaces outOpacity
    <Fade outOpacity={0.2}>{testElement}</Fade>;
  });

  it('should render Snappy variant of Fade component with correct opacity keyframes, duration and easing', () => {
    const { rerender } = render(<FadeSnappy visible={false}>{testElement}</FadeSnappy>);

    rerender(<FadeSnappy visible={true}>{testElement}</FadeSnappy>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationFast, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render Relaxed variant of Fade component with correct opacity keyframes, duration and easing', () => {
    const { rerender } = render(<FadeRelaxed visible={false}>{testElement}</FadeRelaxed>);

    rerender(<FadeRelaxed visible={true}>{testElement}</FadeRelaxed>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveEasyEase }),
    );
  });
});
