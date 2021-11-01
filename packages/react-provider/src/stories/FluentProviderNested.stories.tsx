import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { webLightTheme } from '@fluentui/react-theme'; // codesandbox-dependency: @fluentui/react-theme ^9.0.0-beta
import { FluentProvider } from '@fluentui/react-provider'; // codesandbox-dependency: @fluentui/react-provider ^9.0.0-beta

const useStyles = makeStyles({
  example: {
    margin: '5px',
  },
  themedText: theme => ({
    border: `5px solid ${theme.colorBrandStroke1}`,
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    padding: '5px',
  }),
});

export const Nested = () => {
  const styles = useStyles();
  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <div className={styles.example}>
          <div className={styles.themedText}>Web Light Theme using brand tokens</div>
        </div>
        <FluentProvider
          theme={{
            colorBrandStroke1: 'salmon',
            colorBrandBackground2: 'white',
          }}
        >
          <div className={styles.example}>
            <div className={styles.themedText}>Nested FluentProvider with partial theme</div>
          </div>
        </FluentProvider>
      </FluentProvider>
    </>
  );
};

Nested.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider can be nested to override some or all of a theme.',
    },
  },
};
