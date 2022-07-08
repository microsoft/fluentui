/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { ColorTokensList } from './ColorTokensList';
import { Button, Caption1 } from '@fluentui/react-components';
import { Brands, BrandVariants, teamsLightTheme } from '@fluentui/react-theme';
import { OverridableTokenBrandColors } from './OverridableTokenBrandColors';
import { brandTeams } from '../../utils/brandColors';
import { getCurrentOverride, useColorOverrideReducer } from './useColorOverrideReducer';
import type { DispatchTheme, ReducerState } from '../../useThemeDesignerReducer';

export interface ColorTokensProps {
  className?: string;
  brand: BrandVariants;
  appState: ReducerState;
  dispatchState: React.Dispatch<DispatchTheme>;
}

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

  const [colorOverride, dispatchColorOverride] = useColorOverrideReducer(appState, brand, dispatchState);

  const handleResetClick = () => {
    dispatchState({ type: 'Override' });
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
        colorOverride={getCurrentOverride(appState, colorOverride)}
        dispatchColorOverride={dispatchColorOverride}
        dispatchState={dispatchState}
      />
    </div>
  );
};
