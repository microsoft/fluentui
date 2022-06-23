import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants, teamsLightTheme } from '@fluentui/react-theme';
import { AccentColors, OverridableTokenBrandColors } from './OverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';

export interface ColorTokensProps {
  className?: string;
  isDark: boolean;
  brand: BrandVariants;
}

const useStyles = makeStyles({
  root: {},
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
  },
});

const brandColors: AccentColors = OverridableTokenBrandColors(teamsLightTheme, brandTeams);

export const ColorTokens: React.FunctionComponent<ColorTokensProps> = props => {
  const styles = useStyles();

  const { brand } = props;

  // const theme = isDark ? createDarkTheme(brand) : createLightTheme(brand);

  const colorOverrideReducer: (
    state: AccentColors,
    action: { colorToken: string; newValue: Brands },
  ) => AccentColors = (state, action) => {
    return { ...state, [action.colorToken]: action.newValue };
  };

  const [colorOverrides, dispatchColorOverrides] = React.useReducer(colorOverrideReducer, {});

  return (
    <div className={props.className}>
      <div className={styles.row}>
        <Caption1>Color tokens</Caption1>
        <Caption1>Assigned values</Caption1>
        <Caption1>Usage examples</Caption1>
      </div>
      <ColorTokensList
        brand={brand}
        brandColors={brandColors}
        colorOverrides={colorOverrides}
        dispatchColorOverrides={dispatchColorOverrides}
      />
    </div>
  );
};
