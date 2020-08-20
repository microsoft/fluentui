import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mergeThemes } from '@fluentui/theme';
import { FluentTheme } from '@uifabric/fluent-theme/lib/next';
import { ThemeProvider } from './ThemeProvider';
import { Theme, PartialTheme } from './ThemeProvider.types';
import { useTheme } from './useTheme';
import { mount } from 'enzyme';

const lightTheme = mergeThemes({
  stylesheets: [],
  tokens: {
    body: {
      background: 'white',
      contentColor: 'black',
    },
  },
});

const darkTheme = mergeThemes({
  tokens: {
    body: {
      background: 'black',
      contentColor: 'white',
    },
  },
});

describe('ThemeProvider', () => {
  it('renders a div', () => {
    const component = renderer.create(<ThemeProvider>Hello</ThemeProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can handle a partial theme', () => {
    const partialTheme: PartialTheme = {
      tokens: {
        foo: {
          background: 'red',
        },
      },
    };

    const component = renderer.create(<ThemeProvider theme={partialTheme}>Hello</ThemeProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a div with styling', () => {
    const component = renderer.create(<ThemeProvider theme={lightTheme}>Hello</ThemeProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nested themes', () => {
    const component = renderer.create(
      <ThemeProvider theme={lightTheme}>
        <div>Light theme</div>
        <ThemeProvider theme={darkTheme}>
          <div>Dark theme</div>
        </ThemeProvider>
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('provide the theme through context', () => {
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

    const expectedTheme = mergeThemes(FluentTheme, lightTheme);
    expect(resolvedTheme).toEqual(expectedTheme);
  });
});
