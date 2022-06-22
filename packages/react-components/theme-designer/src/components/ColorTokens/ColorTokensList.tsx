import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Divider } from '@fluentui/react-components';
import type { AccentColor, AccentColors } from '../../utils/themes/createCustomLightTheme';

export interface ColorTokensListProps {
  accentColors: AccentColors;
}

const useStyles = makeStyles({
  root: {},
  col: {
    display: 'flex',
    justifyContent: 'left',
  },
  row: {
    paddingLeft: '5px',
    paddingRight: '5px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    height: '50px',
  },
});

export const ColorTokensList: React.FunctionComponent<ColorTokensListProps> = props => {
  const styles = useStyles();
  const { accentColors } = props;
  return (
    <div>
      {Object.keys(accentColors).map(accentColor => {
        const accentColorValue = ((accentColors as unknown) as Record<string, AccentColor>)[accentColor];
        if (!accentColorValue) {
          return;
        }
        return (
          <>
            <div key={accentColor.toString()} className={styles.row}>
              <div className={styles.col}>{accentColor}</div>
              <div className={styles.col}>{accentColorValue.brandValue}</div>
              <div className={styles.col}>{accentColorValue.usage}</div>
            </div>
            <Divider />
          </>
        );
      })}
    </div>
  );
};
