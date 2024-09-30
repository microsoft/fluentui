import * as React from 'react';
import { Fade, FadeExaggerated, FadeSnappy } from './Fade';
import { render, waitFor } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { mockAnimateFunction } from '../../testing/testUtils';

describe('Fade motion component', () => {
  let animateSpy: jest.SpyInstance;
  const testElement = <div data-testid="fade-content">Test</div>;

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
    animateSpy = jest.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimateFunction);
  });

  afterEach(() => {
    animateSpy.mockRestore();
  });

  it('should render Fade with correct opacity keyframes, duration and easing (visible=false -> true -> false)', () => {
    const { rerender, getByTestId } = render(<Fade visible={false}>{testElement}</Fade>);
    const fadeContent = getByTestId('fade-content');

    // Initially invisible when rendered as visible={false}
    expect(getComputedStyle(fadeContent).opacity).toBe('0');

    // Testing fade in motion
    rerender(<Fade visible={true}>{testElement}</Fade>);
    expect(getComputedStyle(fadeContent).opacity).toBe('1');
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );

    // Testing fade out motion
    rerender(<Fade visible={false}>{testElement}</Fade>);
    expect(getComputedStyle(fadeContent).opacity).toBe('0');
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
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
    const styledElement = (
      <div data-testid="fade-content" style={{ opacity: 0.5 }}>
        Test
      </div>
    );

    const { rerender, getByTestId } = render(<Fade visible={false}>{styledElement}</Fade>);
    const fadeContent = getByTestId('fade-content');

    rerender(<Fade visible={true}>{styledElement}</Fade>);

    expect(getComputedStyle(fadeContent).opacity).toBe('1');
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
  });

  it('should render Fade with parent styles that override Fade opacity and still apply Fade animations (visible=false -> true -> false)', async () => {
    const parentStyle = `
      .parentOverride, .parentOverride > div {
        opacity: 0.5 !important; /* Override any opacity applied by Fade */
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = parentStyle;
    document.head.appendChild(styleElement);

    const { rerender, container, getByTestId } = render(
      <div className="parentOverride">
        <Fade visible={false}>{testElement}</Fade>
      </div>,
    );
    const fadeContent = getByTestId('fade-content');

    const parentElement = container.firstChild as HTMLElement;

    await waitFor(() => {
      const parentComputedStyles = getComputedStyle(parentElement);
      expect(parentComputedStyles.opacity).toBe('0.5');
      document.head.removeChild(styleElement);
    });

    expect(getComputedStyle(fadeContent).opacity).toBe('0');

    rerender(
      <div className="parentOverride">
        <Fade visible={true}>{testElement}</Fade>
      </div>,
    );

    expect(getComputedStyle(fadeContent).opacity).toBe('1');
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 0 }, { opacity: 1 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );

    rerender(
      <div className="parentOverride">
        <Fade visible={false}>{testElement}</Fade>
      </div>,
    );
    expect(getComputedStyle(fadeContent).opacity).toBe('0');
    expect(animateSpy).toHaveBeenCalledWith(
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEase }),
    );
  });
});
