import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { tokens, useId, Button, Caption1, Input } from '@fluentui/react-components';
import { Theme } from '@fluentui/react-theme';
import { SearchRegular } from '@fluentui/react-icons';

export interface TokenBoxesProps {
  className?: string;
  theme: Theme;
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
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: tokens.spacingVerticalS,
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.5em',
    border: '2px solid',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)',
    paddingBottom: '10px',
    overflow: 'hidden',
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
  const [filter, setFilter] = React.useState<string>('');

  const theme = props.theme;

  const colors = Object.keys(theme).filter(color => {
    return color.startsWith('color') && !color.includes('Palette');
  });

  const filteredColors = colors.filter(color => {
    const themeColor = (theme as unknown as Record<string, string>)[color];
    if (!themeColor) {
      return;
    }
    return themeColor.includes(filter) || color.toLowerCase().includes(filter.toLowerCase());
  });

  const changeFilter = React.useCallback((ev, data) => setFilter(ev.target.value), [setFilter]);

  return (
    <div>
      <Caption1> Color tokens </Caption1>
      <div className={styles.topbar}>
        <Input
          placeholder="Search"
          contentAfter={<Button aria-label="Search" appearance="transparent" icon={<SearchRegular />} size="small" />}
          appearance="outline"
          id={useId('input-outline')}
          onChange={changeFilter}
        />
      </div>
      <div className={styles.root}>
        {filteredColors.map(color => {
          const themeColor = (theme as unknown as Record<string, string>)[color];
          if (!themeColor) {
            return;
          }
          return (
            <div
              className={styles.boxes}
              key={color}
              style={{
                backgroundColor: props.theme.colorBrandBackgroundInverted,
                color: props.theme.colorNeutralForeground1Static,
              }}
            >
              <TokenBox color={color} themeColor={themeColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
