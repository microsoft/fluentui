import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '../FluentProvider'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

const useStyles = makeStyles({
  example: theme => ({
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    border: `5px solid ${theme.colorBrandStroke1}`,
    borderRadius: '5px',
    margin: '5px',
  }),
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
      story: 'A Fluent provider can be nested to override some or all of a theme.',
    },
  },
};
