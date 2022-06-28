import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Divider, FluentProvider, tokens } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-alert';

import type { DispatchTheme } from '../../useThemeDesignerReducer';

import { Demo } from '../Demo/Demo';
import { AccessibilityChecker } from '../AccessibilityChecker/AccessibilityChecker';
import { Palette } from '../Palette/Palette';
import { ColorTokens } from '../ColorTokens/ColorTokens';

import { Theme, BrandVariants } from '@fluentui/react-theme';

export interface ContentProps {
  className?: string;
  brand: BrandVariants;
  theme: Theme;
  isDark: boolean;
  dispatchState: React.Dispatch<DispatchTheme>;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.padding('40px', '5%', '0px', '5%'),
    gridRowGap: tokens.spacingVerticalXXXL,
  },
});

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  const { className, brand, theme, isDark, dispatchState } = props;

  return (
    <FluentProvider theme={theme}>
      <Alert intent="warning" action={{ appearance: 'transparent' }}>
        This tool is still a work in progress - colors are still subject to adjustment.
      </Alert>
      <div className={mergeClasses(styles.root, className)}>
        <Palette brandColors={brand} />
        <Demo theme={theme} />
        <Divider />
        <AccessibilityChecker theme={theme} />
        <Divider />
        <ColorTokens isDark={isDark} brand={brand} dispatchState={dispatchState} />
      </div>
    </FluentProvider>
  );
};
