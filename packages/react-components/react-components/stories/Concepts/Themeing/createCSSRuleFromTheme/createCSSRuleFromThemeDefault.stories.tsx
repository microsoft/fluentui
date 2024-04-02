/* eslint-disable no-restricted-globals */
import * as React from 'react';
import {
  makeStyles,
  tokens,
  shorthands,
  mergeClasses,
  createCSSRuleFromTheme,
  webLightTheme,
} from '@fluentui/react-components';

export const Default = () => {
  // When theme switching is not needed, you can use the `:root` selector
  const cssRule = createCSSRuleFromTheme(':root', webLightTheme);

  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet?.insertRule(cssRule);

  const styles = useStyles();

  return (
    <div className={styles.layout}>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground)}>colorBrandBackground</div>
      <div className={mergeClasses(styles.box, styles.colorBrandBackground2)}>colorBrandBackground2</div>
    </div>
  );
};

const useStyles = makeStyles({
  colorBrandBackground: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  colorBrandBackground2: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2,
  },
  box: {
    ...shorthands.padding(tokens.spacingHorizontalM),
  },
  layout: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM, tokens.spacingVerticalM),
  },
});
