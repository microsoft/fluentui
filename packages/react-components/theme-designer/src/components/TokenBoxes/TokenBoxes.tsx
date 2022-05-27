import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Switch, Caption1, FluentProvider } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, BrandVariants } from '@fluentui/react-theme';

export interface TokenBoxesProps {
  className?: string;
  brandColors: BrandVariants;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    width: '150px',
  },
  colors: {
    height: '50px',
  },
  textLabel: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const TokenBoxes: React.FC<TokenBoxesProps> = props => {
  const styles = useStyles();
  const [isDark, setIsDark] = React.useState(false);

  const LightTheme = createLightTheme(props.brandColors);
  const DarkTheme = createDarkTheme(props.brandColors);

  const theme = isDark ? DarkTheme : LightTheme;

  const colors = Object.keys(theme).filter(color => {
    return color.startsWith('color') && !color.includes('Palette');
  });

  return (
    <FluentProvider theme={theme}>
      <Caption1> Color Tokens </Caption1>
      <Switch
        onChange={React.useCallback(
          (e, v) => {
            setIsDark(v.checked);
          },
          [setIsDark],
        )}
        label="dark theme"
      />
      <div className={styles.root}>
        {colors.map(color => {
          const themeColor = ((theme as unknown) as Record<string, string>)[color];
          if (!themeColor) {
            return;
          }
          return (
            <div key={color} className={styles.boxes}>
              <div className={styles.colors} style={{ backgroundColor: themeColor }} />
              <div className={styles.textLabel}>{themeColor}</div>
            </div>
          );
        })}
      </div>
    </FluentProvider>
  );
};
