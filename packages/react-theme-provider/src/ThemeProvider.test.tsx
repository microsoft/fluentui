import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import * as renderer from 'react-test-renderer';
import { Theme, PartialTheme } from './types';
import { useTheme } from './useTheme';
import { mount } from 'enzyme';
import { mergeThemes, createTheme } from '@fluentui/theme';
import { Stylesheet } from '@uifabric/merge-styles';
import { getTokens } from './getTokens';

const lightTheme = mergeThemes({
  stylesheets: [],
  tokens: {
    color: {
      body: {
        background: 'white',
        contentColor: 'black',
      },
    },
  },
});

const darkTheme = mergeThemes({
  tokens: {
    color: {
      body: {
        background: 'black',
        contentColor: 'white',
      },
    },
  },
});

describe('ThemeProvider', () => {
  const stylesheet: Stylesheet = Stylesheet.getInstance();

  beforeEach(() => {
    stylesheet.reset();
  });

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

  it('sets correct dir', () => {
    const wrapper = mount(
      <ThemeProvider className="tp-1" theme={{ rtl: true }}>
        <ThemeProvider className="tp-2" theme={{ rtl: false }}>
          Hello
        </ThemeProvider>
      </ThemeProvider>,
    );

    const themeProvider1 = wrapper
      .find('.tp-1')
      .first()
      .getDOMNode();
    const themeProvider2 = wrapper
      .find('.tp-2')
      .first()
      .getDOMNode();

    expect(themeProvider1.getAttribute('dir')).toBe('rtl');
    expect(themeProvider2.getAttribute('dir')).toBe('ltr');

    wrapper.setProps({ theme: { rtl: false } });
    expect(themeProvider1.getAttribute('dir')).toBe('ltr');
    expect(themeProvider2.getAttribute('dir')).toBe(null);

    wrapper.unmount();
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

    const expectedTheme: Theme = mergeThemes(createTheme({}), lightTheme);
    expectedTheme.tokens = getTokens(expectedTheme);
    expectedTheme.id = '0-0';
    expect(resolvedTheme).toEqual(expectedTheme);
  });

  it('can apply body theme to none', () => {
    expect(document.body.className).toBe('');
    const component = renderer.create(
      <ThemeProvider className="foo" theme={darkTheme} applyTo="none">
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

    expect(document.body).toMatchSnapshot();

    wrapper.unmount();

    expect(document.body.className).toBe('');

    const component = renderer.create(TestComponent);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
