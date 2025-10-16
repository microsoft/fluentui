import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { render, act } from '@testing-library/react';
import { getBySelector } from '../../common/testUtilities';
import { createTheme } from '@fluentui/theme';
import { Stylesheet } from '@fluentui/merge-styles';
import type { Theme, PartialTheme } from '@fluentui/theme';

const lightTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: 'white',
    bodyText: 'black',
  },
};

const darkTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: 'black',
    bodyText: 'white',
  },
};

describe('ThemeProvider', () => {
  const stylesheet: Stylesheet = Stylesheet.getInstance();

  beforeEach(() => {
    stylesheet.reset();
  });

  it('renders a div', () => {
    const { container } = render(<ThemeProvider>Hello</ThemeProvider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('can handle a partial theme', () => {
    const partialTheme: PartialTheme = {
      palette: {
        themePrimary: 'red',
      },
    };

    const { container } = render(<ThemeProvider theme={partialTheme}>Hello</ThemeProvider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('sets correct dir', () => {
    const { container } = render(
      <ThemeProvider className="tp-1" theme={{ rtl: true }}>
        <ThemeProvider className="tp-2" theme={{ rtl: false }}>
          Hello
        </ThemeProvider>
      </ThemeProvider>,
    );

    const themeProvider1 = getBySelector(container, '.tp-1') as HTMLElement;
    const themeProvider2 = getBySelector(container, '.tp-2') as HTMLElement;

    expect(themeProvider1.getAttribute('dir')).toBe('rtl');
    expect(themeProvider2.getAttribute('dir')).toBe('ltr');

    act(() => {
      render(
        <ThemeProvider className="tp-1" theme={{ rtl: false }}>
          <ThemeProvider className="tp-2" theme={{ rtl: false }}>
            Hello
          </ThemeProvider>
        </ThemeProvider>,
        { container },
      );
    });

    expect(themeProvider1.getAttribute('dir')).toBe('ltr');
    expect(themeProvider2.getAttribute('dir')).toBe(null);
  });

  it('renders a div with styling', () => {
    const { container } = render(<ThemeProvider theme={lightTheme}>Hello</ThemeProvider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders nested themes', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>Light theme</div>
        <ThemeProvider theme={darkTheme}>
          <div>Dark theme</div>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('provide the theme through context', () => {
    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();
      return null;
    };

    render(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    const expectedTheme: Theme = createTheme(lightTheme);
    expectedTheme.id = '0-0';

    expect(resolvedTheme).toEqual(expectedTheme);
  });

  it('can apply body theme to none', () => {
    expect(document.body.className).toBe('');
    const { container } = render(
      <ThemeProvider className="foo" theme={darkTheme} applyTo="none">
        app
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.body.className).toBe('');
  });

  it('can apply body theme to body', () => {
    expect(document.body.className).toBe('');
    const testClass = 'foo';
    const TestComponent = (
      <ThemeProvider className={testClass} theme={darkTheme} applyTo="body">
        app
      </ThemeProvider>
    );

    const { unmount } = render(TestComponent);

    expect(document.body).toMatchSnapshot();

    act(() => {
      unmount();
    });

    expect(document.body.className).toBe('');

    const { container } = render(TestComponent);
    expect(container.firstChild).toMatchSnapshot();
  });
});
