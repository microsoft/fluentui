import * as React from 'react';
import { Fade, FadeRelaxed, FadeSnappy } from './Fade';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';

describe('Fade motion component', () => {
  let originalAnimate: typeof HTMLElement.prototype.animate;
  let animateSpy: jest.SpyInstance;
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
