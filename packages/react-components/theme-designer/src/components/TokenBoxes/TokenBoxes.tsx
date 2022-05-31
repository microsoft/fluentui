import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { Label, useId, Input, Switch, Caption1, FluentProvider, tokens } from '@fluentui/react-components';
import { createLightTheme, createDarkTheme, BrandVariants } from '@fluentui/react-theme';

export interface TokenBoxesProps {
  className?: string;
  brandColors: BrandVariants;
}

export interface TokenBoxProps {
  color: string;
  themeColor: string;
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: tokens.spacingVerticalXXL,
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.borderRadius('0.5em'),
    ...shorthands.border('2px solid'),
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)',
    paddingBottom: '10px',
    ...shorthands.overflow('hidden'),
  },
  colors: {
    height: '100px',
  },
  text: {
    paddingLeft: tokens.spacingVerticalS,
  },
});

export const TokenBox: React.FC<TokenBoxProps> = props => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.colors} style={{ backgroundColor: props.themeColor }} />
      <div className={styles.text}>
        {props.color}
        <br />
        {props.themeColor}
      </div>
    </>
  );
};

export const TokenBoxes: React.FC<TokenBoxesProps> = props => {
  const styles = useStyles();
  const [isDark, setIsDark] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>('');

  const LightTheme = createLightTheme(props.brandColors);
  const DarkTheme = createDarkTheme(props.brandColors);

  const theme = isDark ? DarkTheme : LightTheme;

  const colors = Object.keys(theme).filter(color => {
    return color.startsWith('color') && !color.includes('Palette');
  });

  const filteredColors = colors.filter(color => {
    const themeColor = ((theme as unknown) as Record<string, string>)[color];
    if (!themeColor) {
      return;
    }
    return themeColor.includes(filter);
  });

  // Switch needs to be hoisted
  return (
    <>
      <div>
        <Label htmlFor={useId('input-outline')}>Search</Label>
        <Input
          appearance="outline"
          id={useId('input-outline')}
          onChange={React.useCallback(
            (ev, data) => {
              setFilter(ev.target.value);
            },
            [setFilter],
          )}
        />
      </div>
      <Switch
        onChange={React.useCallback(
          (e, v) => {
            setIsDark(v.checked);
          },
          [setIsDark],
        )}
        label="dark theme"
      />
      <FluentProvider theme={theme}>
        <Caption1> Color Tokens </Caption1>
        <div className={styles.root}>
          {filteredColors.map(color => {
            const themeColor = ((theme as unknown) as Record<string, string>)[color];
            if (!themeColor) {
              return;
            }
            return (
              <div className={styles.boxes} key={color}>
                <TokenBox color={color} themeColor={themeColor} />
              </div>
            );
          })}
        </div>
      </FluentProvider>
    </>
  );
};
