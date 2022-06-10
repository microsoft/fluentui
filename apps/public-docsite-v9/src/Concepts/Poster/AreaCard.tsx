import * as React from 'react';

import { makeStyles, shorthands, tokens, typographyStyles } from '@fluentui/react-components';
import { AreaInfo, PackageInfo } from './types';
import { PackageCard } from './PackageCard';

const useStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralBackground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('visible'),
    ...shorthands.padding('40px'),
    boxSizing: 'border-box',
    boxShadow: tokens.shadow16,
    ...shorthands.margin('50px'),
  },
  title: {
    ...typographyStyles.subtitle1,
    color: tokens.colorBrandForeground2,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
  column: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
});

type Props = {
  areaInfo: AreaInfo;
};

export const AreaCard: React.FunctionComponent<Props> = props => {
  const {
    areaInfo: { name, packages },
  } = props;

  const styles = useStyles();

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
