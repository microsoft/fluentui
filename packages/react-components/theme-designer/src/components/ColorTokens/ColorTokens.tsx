/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Button, Caption1, makeStyles } from '@fluentui/react-components';
import type { Brands } from '@fluentui/react-theme';
import { AccessibilityList } from './AccessibilityList';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

export interface ColorTokensProps {}

const useStyles = makeStyles({
  root: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '15px 1fr 1fr 1fr .5fr',
    alignItems: 'center',
  },
  col: {
    gridColumnStart: '2',
  },
});

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const {
    state: {
      brand,
      isDark,
      themeWithOverrides,
      darkBrandOverrides,
      lightBrandOverrides,
      lightThemeOverrides,
      darkThemeOverrides,
      themeName,
    },
    dispatch,
  } = useThemeDesigner();
  const brandColorOverrides = isDark ? darkBrandOverrides : lightBrandOverrides;
  const themeOverrides = isDark ? darkThemeOverrides : lightThemeOverrides;

  const onNewOverride = (color: string, newColor: Brands) => {
    dispatch({
      type: 'addOverride',
      payload: {
        colorToken: color,
        newColor: brand[newColor],
        brand: newColor,
      },
    });
  };

  const handleResetClick = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <Caption1 className={styles.col}>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
        <Button size="small" onClick={handleResetClick}>
          Reset Customizations
        </Button>
      </div>
      <AccessibilityList
        themeOverrides={themeOverrides}
        brand={brand}
        themeName={themeName}
        colorOverride={brandColorOverrides}
        onNewOverride={onNewOverride}
        theme={themeWithOverrides}
      />
    </div>
  );
};
