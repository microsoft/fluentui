import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import * as renderer from 'react-test-renderer';
import { Theme, PartialTheme } from './types';
import { useTheme } from './useTheme';
import { mount } from 'enzyme';
import { mergeThemes } from '@fluentui/theme';
import { createDefaultTheme } from './createDefaultTheme';

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

    const expectedTheme = mergeThemes(createDefaultTheme(), lightTheme);
    expect(resolvedTheme).toEqual(expectedTheme);
  });

  it('can apply body theme to root element', () => {
    expect(document.body.className).toBe('');
    const component = renderer.create(
      <ThemeProvider className="foo" theme={darkTheme} applyTo="element">
        app
      </ThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

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

    const wrapper = mount(TestComponent);
    const rootClass = wrapper.find('div').prop('className');
    expect(rootClass).toBe(`${testClass} ${document.body.className}`);

    wrapper.unmount();

    expect(document.body.className).toBe('');

    const component = renderer.create(TestComponent);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
