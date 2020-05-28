import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import * as renderer from 'react-test-renderer';
import { Theme } from './types';
import { useTheme } from './useTheme';
import { mount } from 'enzyme';
import { mergeThemes } from './mergeThemes';

const lightTheme: Theme = mergeThemes({
  stylesheets: [],
  tokens: {
    body: {
      fill: 'white',
      text: 'black',
    },
  },
});

const darkTheme: Theme = mergeThemes({
  tokens: {
    body: {
      fill: 'black',
      text: 'white',
    },
  },
});

describe('ThemeProvider', () => {
  it('renders a div', () => {
    const component = renderer.create(<ThemeProvider>Hello</ThemeProvider>);
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

    expect(resolvedTheme).toEqual(lightTheme);
  });
});
