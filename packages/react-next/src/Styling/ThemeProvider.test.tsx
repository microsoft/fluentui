import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ThemeProvider } from './ThemeProvider';
import { Theme, useTheme, mergeThemes } from '@fluentui/react-theme-provider';
import { Customizations } from '../Utilities';

describe('ThemeProvider', () => {
  const legacyTheme = { fonts: { medium: { fontWeight: 800 } } };

  const lightTheme: Theme = mergeThemes({
    stylesheets: [],
    tokens: {
      body: {
        fill: 'white',
        text: 'black',
      },
    },
  });

  it('can provide the theme through context', () => {
    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });

  it('can provide legacy theme from Customizations', () => {
    ReactTestUtils.act(() => {
      Customizations.applySettings({ theme: legacyTheme });
    });

    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    mount(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(mergeThemes({ tokens: legacyTheme }));
  });

  it('provide theme from theme prop if passed', () => {
    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });

  it('provide new theme over legacy theme', () => {
    ReactTestUtils.act(() => {
      Customizations.applySettings({ theme: legacyTheme });
    });

    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });
});
