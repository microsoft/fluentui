import * as React from 'react';
import { useStyles } from './useStyles';
import * as renderer from 'react-test-renderer';
import { Customizer } from '@uifabric/utilities';
import { createTheme } from '../styles/theme';

describe('useStyles', () => {
  const Foo = () => {
    const classes = useStyles(theme => ({
      root: {
        background: theme.palette.themePrimary,
      },
    }));

    return <div className={classes.root} />;
  };

  it('can refer to styles from the default theme', () => {
    const component = renderer.create(<Foo />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can refer to styles from a custom theme', () => {
    const customTheme = createTheme({
      palette: {
        themePrimary: 'purple',
      },
    });

    const component = renderer.create(
      <Customizer settings={{ theme: customTheme }}>
        <Foo />
      </Customizer>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
