import * as React from 'react';
import { makeStyles } from './makeStyles';
import { Customizer } from '@uifabric/utilities';
import { createTheme } from '../styles/theme';
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles';
import { safeMount } from '@uifabric/test-utilities';

describe('makeStyles', () => {
  const _stylesheet: Stylesheet = Stylesheet.getInstance();

  _stylesheet.setConfig({ injectionMode: InjectionMode.none });

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
    _stylesheet.reset();
  });

  it('can refer to styles from the default theme', () => {
    safeMount(<ThemeStyledComponent />);
    expect(_stylesheet.getRules()).toEqual('.root-0{background:#0078d4;}');
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
    expect(_stylesheet.getRules()).toEqual('.root-0{background:purple;}');
  });

  it('can render static styles', () => {
    safeMount(<StaticStyledComponent />);
    expect(_stylesheet.getRules()).toEqual('.root-0{background:yellow;}');
  });
});
