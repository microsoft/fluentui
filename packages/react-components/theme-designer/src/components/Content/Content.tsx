import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Divider, FluentProvider, tokens } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-alert';

import { Demo } from '../Demo/Demo';
import { AccessibilityChecker } from '../AccessibilityChecker/AccessibilityChecker';
import { Palette } from '../Palette/Palette';
import { TokenBoxes } from '../TokenBoxes/TokenBoxes';

import { Theme, BrandVariants } from '@fluentui/react-theme';

export interface ContentProps {
  className?: string;
  brand: BrandVariants;
  theme: Theme;
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

  return (
    <FluentProvider theme={props.theme}>
      <Alert intent="warning" action={{ appearance: 'transparent' }}>
        This tool is still a work in progress - colors are still subject to adjustment.
      </Alert>
      <div className={mergeClasses(styles.root, props.className)}>
        <Palette brandColors={props.brand} />
        <Demo theme={props.theme} />
        <Divider />
        <AccessibilityChecker theme={props.theme} />
        <Divider />
        <TokenBoxes theme={props.theme} />
      </div>
    </FluentProvider>
  );
};
