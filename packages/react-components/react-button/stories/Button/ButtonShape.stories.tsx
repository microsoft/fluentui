import * as React from 'react';
import { makeStyles, Button, webLightTheme, Theme, FluentProvider } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

const customSemanticTokensTheme: Theme = {
  ...webLightTheme,
  ctrlButtonBorderRadius: '8px',
};

export const Shape = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.wrapper}>
        <Button appearance="primary">Fluent</Button>
        <Button shape="circular">Circular</Button>
        <Button shape="square">Square</Button>
      </div>
      <FluentProvider className={styles.wrapper} theme={customSemanticTokensTheme}>
        <Button appearance="primary">8 px border radius</Button>
        <Button shape="circular">Circular</Button>
        <Button shape="square">Square</Button>
      </FluentProvider>
    </>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A button can be rounded, circular, or square.',
    },
  },
};
