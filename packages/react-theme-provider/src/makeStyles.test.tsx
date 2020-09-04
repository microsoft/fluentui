import * as React from 'react';
import { makeStyles } from './makeStyles';
import { Customizer } from '@uifabric/utilities';
import { createTheme, loadTheme } from '@uifabric/styling';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles';
import { safeMount } from '@uifabric/test-utilities';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('makeStyles', () => {
  const stylesheet: Stylesheet = Stylesheet.getInstance();

  const useThemedStyles = makeStyles(theme => ({
    root: {
      background: theme.palette.themePrimary,
    },
  }));

  const ThemeStyledComponent = () => {
    const classes = useThemedStyles();

    return <div className={classes.root} />;
  };

  const useStaticStyles = makeStyles({
    root: {
      background: 'yellow',
    },
  });

  const StaticStyledComponent = () => {
    const classes = useStaticStyles();

    return <div className={classes.root} />;
  };

  beforeEach(() => {
    stylesheet.setConfig({ injectionMode: InjectionMode.none });
    stylesheet.reset();
  });

  it('can create basic styles as an object (no type errors)', () => {
    makeStyles({
      root: {
        alignItems: 'center',
      },
    });
  });

  it('can create style functions (no type errors)', () => {
    makeStyles(() => ({
      root: {
        alignItems: 'center',
      },
    }));
  });

  it('can refer to styles from the default theme', () => {
    safeMount(<ThemeStyledComponent />);
    expect(stylesheet.getRules()).toEqual('.root-0{background:#0078d4;}');
  });

  it('can refer to styles from a custom theme', () => {
    const customTheme = createTheme({
      palette: {
        themePrimary: 'purple',
      },
    });

    safeMount(
      <Customizer settings={{ theme: customTheme }}>
        <ThemeStyledComponent />
      </Customizer>,
    );
    expect(stylesheet.getRules()).toEqual('.root-0{background:purple;}');
  });

  it('can render static styles', () => {
    safeMount(<StaticStyledComponent />);
    expect(stylesheet.getRules()).toEqual('.root-0{background:yellow;}');
  });

  it('can update when loadTheme is called', () => {
    let wrapper: ReactWrapper;

    act(() => {
      wrapper = mount(<ThemeStyledComponent />);
    });

    expect(stylesheet.getRules()).toEqual('.root-0{background:#0078d4;}');

    act(() => {
      loadTheme(createTheme({ palette: { themePrimary: 'red' } }));
    });

    expect(stylesheet.getRules()).toEqual('.root-0{background:#0078d4;}.root-1{background:red;}');

    wrapper!.unmount();
  });
});
