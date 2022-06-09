import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { Divider, FluentProvider, tokens } from '@fluentui/react-components';

import { Demo } from '../Demo/Demo';
import { Palette } from '../Palette/Palette';
import { TokenBoxes } from '../TokenBoxes/TokenBoxes';

import { Theme, BrandVariants } from '@fluentui/react-theme';

export interface ContentProps {
  className?: string;
  brand: BrandVariants;
  darkTheme: Theme;
  lightTheme: Theme;
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
  const [isDark, setIsDark] = React.useState<boolean>(false);

  const toggleTheme = React.useCallback(() => setIsDark(!isDark), [isDark, setIsDark]);

  const theme = isDark ? props.darkTheme : props.lightTheme;

  return (
    <FluentProvider theme={theme}>
      <div className={mergeClasses(styles.root, props.className)}>
        <Palette brandColors={props.brand} />
        <Demo theme={theme} />
        <Divider />
        <TokenBoxes theme={theme} isDark={isDark} toggleTheme={toggleTheme} />
      </div>
    </FluentProvider>
  );
};
