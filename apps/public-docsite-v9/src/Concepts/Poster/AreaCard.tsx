import * as React from 'react';

import { useAreaCardStyles } from './AreaCard.styles';
import { PackageCard } from './PackageCard';
import { AreaInfo, PackageInfo } from './types';

type Props = {
  areaInfo: AreaInfo;
};

export const AreaCard: React.FunctionComponent<Props> = props => {
  const {
    areaInfo: { name, packages },
  } = props;

  const styles = useAreaCardStyles();

  const columns: PackageInfo[][] = [];
  let currentColumn: PackageInfo[] = [];
  columns.push(currentColumn);

  packages.forEach(packageInfo => {
    if (packageInfo.newColumn) {
      currentColumn = [];
      columns.push(currentColumn);
    }
    currentColumn.push(packageInfo);
  });

  return (
    <div className={styles.root}>
      <div className={styles.title}>{name}</div>
      <div className={styles.items}>
        {columns.map(column => (
          // eslint-disable-next-line react/jsx-key
          <div className={styles.column}>
            {column.map(packageInfo => (
              <PackageCard key={packageInfo.name} packageInfo={packageInfo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
