import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Theme } from '../types';
import { useTheme } from '../useTheme';
import { mergeThemes } from '../mergeThemes';
import { Customizations } from '@uifabric/utilities';
import { FontWeights } from '@uifabric/styling';
import { convertLegacyTheme } from './convertLegacyTheme';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  let wrapper: ReactWrapper | undefined;
  const legacyTheme = { fonts: { medium: { fontWeight: FontWeights.bold } } };

  const lightTheme: Theme = mergeThemes({
    stylesheets: [],
    tokens: {
      body: {
        fill: 'white',
        text: 'black',
      },
    },
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('provide the theme through context', () => {
    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    wrapper = mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });

  it('provide legacy theme from Customizations', () => {
    Customizations.applySettings({ theme: legacyTheme });

    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    wrapper = mount(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(mergeThemes(convertLegacyTheme(legacyTheme)));
  });

  it('provide theme from theme prop if passed', () => {
    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    wrapper = mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });

  it('provide new theme over legacy theme', () => {
    Customizations.applySettings({ theme: legacyTheme });

    let resolvedTheme: Theme | undefined = undefined;
    const TestComponent = () => {
      resolvedTheme = useTheme();

      return null;
    };

    wrapper = mount(
      <ThemeProvider theme={lightTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(resolvedTheme).toEqual(lightTheme);
  });
});
