/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Button, Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants, teamsLightTheme } from '@fluentui/react-theme';
import { OverridableTokenBrandColors } from './OverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';

import type { DispatchTheme, ReducerState } from '../../useThemeDesignerReducer';

export interface ColorTokensProps {
  className?: string;
  brand: BrandVariants;
  appState: ReducerState;
  dispatchState: React.Dispatch<DispatchTheme>;
}

export type ColorOverrides = {
  teamsLight: Record<string, Brands>;
  teamsDark: Record<string, Brands>;
  webLight: Record<string, Brands>;
  webDark: Record<string, Brands>;
  customLight: Record<string, Brands>;
  customDark: Record<string, Brands>;
};

export type DispatchColorOverrides = {
  type: string;
  colorToken?: string;
  newValue?: Brands;
};

const useStyles = makeStyles({
  root: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr .5fr',
    alignItems: 'center',
  },
});

const brandColors: Record<string, Brands> = OverridableTokenBrandColors(teamsLightTheme, brandTeams);

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { brand, appState, dispatchState } = props;

  const colorOverrideReducer: (
    state: ColorOverrides,
    action: { type: string; colorToken?: string; newValue?: Brands },
  ) => ColorOverrides = (state, action) => {
    switch (action.type) {
      case 'Add Override':
        if (!action.colorToken || !action.newValue) {
          return state;
        }
        dispatchState({ type: 'Override', overrides: { [action.colorToken]: brand[action.newValue] } });
        switch (appState.themeLabel) {
          case 'Teams Light':
            return { ...state, teamsLight: { ...state.teamsLight, [action.colorToken]: action.newValue } };
          case 'Teams Dark':
            return { ...state, teamsDark: { ...state.teamsDark, [action.colorToken]: action.newValue } };
          case 'Web Light':
            return { ...state, webLight: { ...state.webLight, [action.colorToken]: action.newValue } };
          case 'Web Dark':
            return { ...state, webDark: { ...state.webDark, [action.colorToken]: action.newValue } };
          case 'Custom':
            if (!appState.isDark) {
              return { ...state, customLight: { ...state.customLight, [action.colorToken]: action.newValue } };
            } else {
              return { ...state, customDark: { ...state.customDark, [action.colorToken]: action.newValue } };
            }
          default:
            return state;
        }
      case 'Reset Overrides':
        dispatchState({ type: 'Override' });
        switch (appState.themeLabel) {
          case 'Teams Light':
            return { ...state, teamsLight: {} };
          case 'Teams Dark':
            return { ...state, teamsDark: {} };
          case 'Web Light':
            return { ...state, webLight: {} };
          case 'Web Dark':
            return { ...state, webDark: {} };
          case 'Custom':
            if (!appState.isDark) {
              return { ...state, customLight: {} };
            } else {
              return { ...state, customDark: {} };
            }
          default:
            return state;
        }
      default:
        return state;
    }
  };

  const currOverride = () => {
    switch (appState.themeLabel) {
      case 'Teams Light':
        return colorOverride.teamsLight;
      case 'Teams Dark':
        return colorOverride.teamsDark;
      case 'Web Light':
        return colorOverride.webLight;
      case 'Web Dark':
        return colorOverride.webDark;
      case 'Custom':
        if (!appState.isDark) {
          return colorOverride.customLight;
        } else {
          return colorOverride.customDark;
        }
      default:
        return colorOverride.customLight;
    }
  };

  const [colorOverride, dispatchColorOverride] = React.useReducer(colorOverrideReducer, {
    teamsLight: {},
    teamsDark: {},
    webLight: {},
    webDark: {},
    customLight: {},
    customDark: {},
  });

  const handleButtonClick = () => {
    dispatchColorOverride({ type: 'Reset Overrides' });
  };

  return (
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
        <Button size="small" onClick={handleButtonClick}>
          Reset Customizations
        </Button>
      </div>
      <ColorTokensList
        brand={brand}
        brandColors={brandColors}
        colorOverride={currOverride()}
        dispatchColorOverride={dispatchColorOverride}
      />
    </div>
  );
};
