import * as React from 'react';
import {
  Button,
  ButtonState,
  ButtonCustomStylesContextProvider,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    ...shorthands.border('1px', 'solid', 'red'),
    ...shorthands.borderRadius('0'),
  },
});

const useCustomStyles = (state: ButtonState): ButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(state.root.className, styles.root);
  return state;
};

export const CustomStyles = () => (
  <>
    <ButtonCustomStylesContextProvider value={{ useCustomStyles }}>
      <Button>Rounded</Button>
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
    </ButtonCustomStylesContextProvider>
  </>
);

CustomStyles.parameters = {
  docs: {
    description: {
      story: 'A button can be styles using a centralized, custom styles hook.',
    },
  },
};
