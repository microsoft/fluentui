import * as React from 'react';
import { Customizer } from '@fluentui/utilities';
import { createTheme } from '@fluentui/theme';
import { loadTheme } from '@fluentui/style-utilities';
import { Stylesheet, InjectionMode } from '@fluentui/merge-styles';
import { render, act } from '@testing-library/react';
import { makeStyles } from './makeStyles';
import { ThemeProvider } from './ThemeProvider';

describe('makeStyles', () => {
  const stylesheet: Stylesheet = Stylesheet.getInstance();

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const useThemedStyles = makeStyles(theme => ({
    root: {
      background: theme.palette.themePrimary,
    },
  }));

  const ThemeStyledComponentInner = () => {
    const classes = useThemedStyles();

    return <div className={classes.root} />;
  };

  const ThemeStyledComponent = () => <ThemeStyledComponentInner />;

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const useStaticStyles = makeStyles({
    root: {
      background: 'yellow',
    },
  });

  const StaticStyledComponentInner = () => {
    const classes = useStaticStyles();

    return <div className={classes.root} />;
  };

  const StaticStyledComponent = () => <StaticStyledComponentInner />;

  beforeEach(() => {
    stylesheet.setConfig({ injectionMode: InjectionMode.none });
    stylesheet.reset();
  });

  it('can create basic styles as an object (no type errors)', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    makeStyles({
      root: {
        alignItems: 'center',
      },
    });
  });

  it('can create style functions (no type errors)', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    makeStyles(() => ({
      root: {
        alignItems: 'center',
      },
    }));
  });

  it('can refer to styles from the default theme', () => {
    render(<ThemeStyledComponent />);
    expect(stylesheet.getRules()).toEqual('.root-0{background:#0078d4;}');
  });

  it('can refer to styles from a custom theme', () => {
    const customTheme = createTheme({
      palette: {
        themePrimary: 'purple',
      },
    });

    render(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <Customizer settings={{ theme: customTheme }}>
        <ThemeStyledComponent />
      </Customizer>,
    );
    expect(stylesheet.getRules()).toEqual('.root-0{background:purple;}');
  });

  it('can render static styles', () => {
    render(<StaticStyledComponent />);
    expect(stylesheet.getRules()).toEqual('.root-0{background:yellow;}');
  });

  it('can update when loadTheme is called', () => {
    let unmount: (() => void) | undefined;

    act(() => {
      const { unmount: renderedUnmount } = render(
        <ThemeProvider>
          <ThemeStyledComponent />
        </ThemeProvider>,
      );
      unmount = renderedUnmount;
    });

    const rules = stylesheet.getRules();

    act(() => {
      loadTheme(createTheme({ palette: { themePrimary: 'red' } }));
    });

    expect(stylesheet.getRules()).not.toEqual(rules);

    if (unmount) {
      unmount();
    }
  });
});
