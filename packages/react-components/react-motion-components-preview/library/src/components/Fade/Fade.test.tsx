import * as React from 'react';
import { Fade, FadeExaggerated, FadeSnappy } from './Fade';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimation } from '../../testing/testUtils';

describe('Fade motion component', () => {
  let animateSpy: jest.SpyInstance;
  const testElement = <div className="testContainer">Test</div>;

  beforeAll(() => {
    HTMLElement.prototype.animate = jest.fn().mockImplementation(() => ({
      finish: jest.fn(),
      cancel: jest.fn(),
    }));
  });

  afterAll(() => {
    delete (HTMLElement.prototype as unknown as { animate?: Function }).animate;
  });

  beforeEach(() => {
    animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(() => mockAnimation);
  });

  afterEach(() => {
    animateSpy.mockRestore();
  });

  it('should render Fade with correct opacity keyframes, duration and easing', () => {
    const { rerender } = render(<Fade visible={false}>{testElement}</Fade>);

    rerender(<Fade visible={true}>{testElement}</Fade>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render Snappy variant of Fade componentwith correct opacity keyframes, duration and easing', () => {
    const { rerender } = render(<FadeSnappy visible={false}>{testElement}</FadeSnappy>);

    rerender(<FadeSnappy visible={true}>{testElement}</FadeSnappy>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationFast, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render Exaggerated variant of Fade componentwith correct opacity keyframes, duration and easing', () => {
    const { rerender } = render(<FadeExaggerated visible={false}>{testElement}</FadeExaggerated>);

    rerender(<FadeExaggerated visible={true}>{testElement}</FadeExaggerated>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationGentle, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render child element with overriding styles and still apply Fade animations', () => {
    const styledElement = <div style={{ opacity: 0.5 }}>Test</div>;

    const { rerender } = render(<Fade visible={false}>{styledElement}</Fade>);

    rerender(<Fade visible={true}>{styledElement}</Fade>);

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render Fade with parent styles that override Fade opacity and still apply Fade animations', () => {
    const parentStyle = `
      .parentOverride, .parentOverride > .testContainer {
        opacity: 0.5 !important; /* Override any opacity applied by Fade */
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = parentStyle;
    document.head.appendChild(styleElement);

    const { rerender, container } = render(
      <div className="parentOverride">
        <Fade visible={false}>{testElement}</Fade>
      </div>,
    );

    const parentElement = container.firstChild as HTMLElement;

    setTimeout(() => {
      const parentComputedStyles = getComputedStyle(parentElement);
      expect(parentComputedStyles.opacity).toBe('0.5');
    }, 0);

    rerender(
      <div className="parentOverride">
        <Fade visible={true}>{testElement}</Fade>
      </div>,
    );

    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );

    document.head.removeChild(styleElement);
  });
});
