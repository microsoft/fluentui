/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles, teamsDarkTheme, teamsLightTheme, Button, Caption1 } from '@fluentui/react-components';
import type { Brands, Theme } from '@fluentui/react-theme';
import { getOverridableTokenBrandColors } from './getOverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';
import { themeNames } from '../../utils/themeList';
import { AccessibilityList } from './AccessibilityList';
import { AppContext } from '../../ThemeDesigner';
import { useContextSelector } from '@fluentui/react-context-selector';

export interface ColorTokensProps {
  theme: Theme;
}

export type ColorOverrideBrands = Record<string, Brands>;

export type ColorOverrides = Record<string, ColorOverrideBrands>;

export type DispatchColorOverrides = {
  type: string;
  colorToken?: string;
  newValue?: Brands;
};

const getCurrentOverride = (themeLabel: string, colorOverride: ColorOverrides) => {
  return colorOverride[themeLabel];
};

const initialColorOverride: ColorOverrides = Object.fromEntries(themeNames.map(currTheme => [currTheme, {}]));

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

const lightBrandColors: ColorOverrideBrands = getOverridableTokenBrandColors(teamsLightTheme, brandTeams);
const darkBrandColors: ColorOverrideBrands = getOverridableTokenBrandColors(teamsDarkTheme, brandTeams);

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { theme } = props;
  const appState = useContextSelector(AppContext, ctx => ctx.appState);
  const dispatchAppState = useContextSelector(AppContext, ctx => ctx.dispatchAppState);
  const { brand, isDark, themeLabel } = appState;
  const brandColors = isDark ? darkBrandColors : lightBrandColors;

  const colorOverrideReducer: (
    state: ColorOverrides,
    action: { type: string; colorToken?: string; newValue?: Brands },
  ) => ColorOverrides = (state, action) => {
    switch (action.type) {
      case 'Add Override':
        if (!action.colorToken || !action.newValue) {
          return state;
        }
        return {
          ...state,
          [themeLabel]: { ...state[themeLabel], [action.colorToken]: action.newValue },
        };
      case 'Reset Overrides':
        return { ...state, [themeLabel]: {} };
      case 'Reset Custom Overrides':
        return { ...state, customLight: {}, customDark: {} };
      default:
        return state;
    }
  };

  const [colorOverride, dispatchColorOverride] = React.useReducer(colorOverrideReducer, initialColorOverride);

  const onNewOverride = (color: string, newColor: Brands) => {
    dispatchAppState({ type: 'Override', overrides: { [color]: brand[newColor] } });
    dispatchColorOverride({ type: 'Add Override', colorToken: color, newValue: newColor });
  };

  const handleResetClick = () => {
    dispatchAppState({ type: 'Override' });
    dispatchColorOverride({ type: 'Reset Overrides' });
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
        brand={brand}
        brandColors={brandColors}
        colorOverride={getCurrentOverride(themeLabel, colorOverride)}
        onNewOverride={onNewOverride}
        theme={theme}
      />
    </div>
  );
};
