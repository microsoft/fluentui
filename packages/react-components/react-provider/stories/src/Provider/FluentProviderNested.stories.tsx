import * as React from 'react';
import { makeStyles, tokens, webLightTheme, FluentProvider } from '@fluentui/react-components';

const useStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `5px solid ${tokens.colorBrandStroke1}`,
    borderRadius: '5px',
    margin: '5px',
  },
  text: {
    padding: '5px',
    fontSize: '18px',
  },
});

export const Nested = () => {
  const styles = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.example}>
        <div className={styles.text}>Web Light Theme using brand tokens</div>

        <FluentProvider
          theme={{
            colorBrandStroke1: '#780510',
            colorBrandBackground2: '#fa8072',
            colorBrandForeground2: '#780510',
          }}
        >
          <div className={styles.example}>
            <div className={styles.text}>Nested FluentProvider with partial theme</div>
          </div>
        </FluentProvider>
      </div>
    </FluentProvider>
  );
};

Nested.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider can be nested to override some or all of a tokens.',
    },
  },
};
