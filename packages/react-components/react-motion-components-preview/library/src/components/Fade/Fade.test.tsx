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
      outOpacity: 0.2,
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
