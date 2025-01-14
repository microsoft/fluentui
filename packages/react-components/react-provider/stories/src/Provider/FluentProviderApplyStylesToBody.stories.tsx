import * as React from 'react';
import { tokens, FluentProvider, webDarkTheme, makeStyles, makeStaticStyles } from '@fluentui/react-components';

const useGlobalStyles = makeStaticStyles({
  body: {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase500,
  },
  h1: {
    fontSize: tokens.fontSizeBase500,
  },
});

const useLocalStyles = makeStyles({
  provider: {
    backgroundColor: 'none',
  },
});

/**
 * The `applyStylesTo` controls whether theme tokens should be applied to FluentProvider or document body,
 * which can be useful for global styles.
 */
export const ApplyStylesToBody = () => {
  const styles = useLocalStyles();

  useGlobalStyles();

  return (
    <FluentProvider applyStylesTo="body" className={styles.provider} theme={webDarkTheme}>
      <h1>Document body and this element styled with global styles and theme tokens</h1>
    </FluentProvider>
  );
};
