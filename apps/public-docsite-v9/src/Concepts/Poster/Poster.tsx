import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { libraryInfo } from './metadata';
import { AreaCard } from './AreaCard';
import { AreaInfo } from './types';
import { Legend } from './Legend';
import { OverviewCard } from './OverviewCard';
import { usePosterStyles } from './Poster.styles';

export const Poster: React.FunctionComponent = () => {
  const styles = usePosterStyles();

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
