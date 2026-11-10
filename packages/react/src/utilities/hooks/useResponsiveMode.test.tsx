import * as React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { ResponsiveMode } from '../decorators/withResponsiveMode';
import { useResponsiveMode } from './useResponsiveMode';

const resizeTo = (width: number, height: number = 100) => {
  act(() => {
    const win = window as any;
    Object.defineProperty(win.HTMLHtmlElement.prototype, 'clientWidth', { configurable: true, value: width });
    win.innerHeight = height;
    win.dispatchEvent(new Event('resize'));
  });
};

describe('useResponsiveMode', () => {
  let responsiveModes: ResponsiveMode[] = [];
  let container: HTMLElement | undefined;

  const TestComponent: React.FunctionComponent = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    responsiveModes.push(useResponsiveMode(ref));

    return <div ref={ref} data-testid="test-component" />;
  };

  const cleanupTest = () => {
    if (container) {
      container = undefined;
      responsiveModes = [];
    }
  };

  afterEach(() => {
    cleanup();
    cleanupTest();
  });

  it('can return the correct value', () => {
    // Set initial window size.
    resizeTo(400);

    // Render with initial value
    const renderResult = render(<TestComponent />);
    container = renderResult.container;
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small]);

    // Set to max small constraint, should not re-render.
    resizeTo(479);
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small]);

    // Go one over.
    resizeTo(480);
    expect(responsiveModes).toEqual([ResponsiveMode.large, ResponsiveMode.small, ResponsiveMode.medium]);

    // Back to large.
    resizeTo(1000);
    expect(responsiveModes).toEqual([
      ResponsiveMode.large,
      ResponsiveMode.small,
      ResponsiveMode.medium,
      ResponsiveMode.large,
    ]);

    cleanupTest();

    // Expect only one render as the size has not changed.
    const newRenderResult = render(<TestComponent />);
    container = newRenderResult.container;
    expect(responsiveModes).toEqual([ResponsiveMode.large]);
  });
});
