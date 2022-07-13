/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Button, Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants, teamsLightTheme } from '@fluentui/react-theme';
import { OverridableTokenBrandColors } from './OverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';
import type { DispatchTheme } from '../../useThemeDesignerReducer';
import { themeNames } from '../../utils/themeList';

export interface ColorTokensProps {
  className?: string;
  brand: BrandVariants;
  themeLabel: string;
  dispatchAppState: React.Dispatch<DispatchTheme>;
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
    gridTemplateColumns: '1fr 1fr 1fr .5fr',
    alignItems: 'center',
  },
});

const brandColors: ColorOverrideBrands = OverridableTokenBrandColors(teamsLightTheme, brandTeams);

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { brand, themeLabel, dispatchAppState } = props;

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
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
        <Button size="small" onClick={handleResetClick}>
          Reset Customizations
        </Button>
      </div>
      <ColorTokensList
        brand={brand}
        brandColors={brandColors}
        colorOverride={getCurrentOverride(themeLabel, colorOverride)}
        onNewOverride={onNewOverride}
      />
    </div>
  );
};
