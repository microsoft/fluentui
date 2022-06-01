import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-components';

import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { TokenBoxes } from '../TokenBoxes/TokenBoxes';

import { BrandVariants, teamsLightTheme } from '@fluentui/react-theme';

export interface ContentProps {
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.padding('40px', '10%', '0px', '10%'),
    gridRowGap: tokens.spacingVerticalXXXL,
  },
});

// this data is temporary and will eventually be pulled from current theme
export const brandWeb: BrandVariants = {
  10: `#061724`,
  20: `#082338`,
  30: `#0a2e4a`,
  40: `#0c3b5e`,
  50: `#0e4775`,
  60: `#0f548c`,
  70: `#115ea3`,
  80: `#0f6cbd`,
  90: `#2886de`,
  100: `#479ef5`,
  110: `#62abf5`,
  120: `#77b7f7`,
  130: `#96c6fa`,
  140: `#b4d6fa`,
  150: `#cfe4fa`,
  160: `#ebf3fc`,
};

export const Content: React.FC<ContentProps> = props => {
  const styles = useStyles();
  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <Palette brandColors={brandWeb} />
      <Demo theme={teamsLightTheme} />
      <TokenBoxes brandColors={brandWeb} />
    </div>
  );
};
