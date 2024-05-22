/* eslint-disable no-restricted-globals, no-restricted-properties */
import * as React from 'react';
import { makeStyles, tokens, mergeClasses, createCSSRuleFromTheme, webLightTheme } from '@fluentui/react-components';

const useStyles = makeStyles({
  colorBrandBackground: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  colorBrandBackground2: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2,
  },
  box: { padding: tokens.spacingHorizontalM },
  layout: {
    display: 'flex',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
});

export const Default = () => {
  React.useLayoutEffect(() => {
    // When theme switching is not needed, you can use the `:root` selector
    const cssRule = createCSSRuleFromTheme(':root', webLightTheme);

    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(cssRule);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const styles = useStyles();

  return (
    <div className={styles.layout}>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground)}>colorBrandBackground</div>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground2)}>colorBrandBackground2</div>
    </div>
  );
};
