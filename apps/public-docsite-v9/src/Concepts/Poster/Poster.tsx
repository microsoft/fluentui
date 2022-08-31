import * as React from 'react';
import { FluentProvider, makeStyles, shorthands, tokens, webLightTheme } from '@fluentui/react-components';
import { libraryInfo } from './metadata';
import { AreaCard } from './AreaCard';
import { AreaInfo } from './types';
import { Legend } from './Legend';
import { OverviewCard } from './OverviewCard';

const useStyles = makeStyles({
  root: {
    ...shorthands.padding('40px'),
    ...shorthands.overflow('auto'),
    width: 'fit-content',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    width: 'unset', //Needed to prevent cascade of width:fit-content
  },
  row: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
  legend: {
    ...shorthands.margin(0, '40px'),
  },
});

export const Poster: React.FunctionComponent = () => {
  const styles = useStyles();

  const rows: AreaInfo[][] = [];
  let currentRow: AreaInfo[] = [];
  rows.push(currentRow);

  libraryInfo.areas.forEach(areaInfo => {
    if (areaInfo.newRow) {
      currentRow = [];
      rows.push(currentRow);
    }
    currentRow.push(areaInfo);
  });

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <div className={styles.items}>
          {rows.map((row, index, arr) => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.row}>
              {index === 0 && <OverviewCard key="Overview" />}
              {row.map(areaInfo => (
                <AreaCard key={areaInfo.name} areaInfo={areaInfo} />
              ))}
            </div>
          ))}
          <div className={styles.legend}>
            <Legend />
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};
