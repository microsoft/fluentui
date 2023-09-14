import * as React from 'react';

import { CodeItemInfo, PackageInfo } from './types';
import { CodeItemCard } from './CodeItemCard';
import { usePackageCardStyles } from './PackageCard.styles';

type Props = {
  packageInfo: PackageInfo;
};

export const PackageCard: React.FunctionComponent<Props> = props => {
  const {
    packageInfo: { codeItems, name },
  } = props;

  const styles = usePackageCardStyles();

  const columns: CodeItemInfo[][] = [];
  let currentColumn: CodeItemInfo[] = [];
  columns.push(currentColumn);

  codeItems.forEach(codeItemInfo => {
    if (codeItemInfo.newColumn) {
      currentColumn = [];
      columns.push(currentColumn);
    }
    currentColumn.push(codeItemInfo);
  });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.packageIcon}
        >
          <path
            d="M13.4089 2.51301C12.5053 2.14671 11.4947 2.14671 10.5911 2.51301L8.40058 3.40106L17.9928 7.13136L21.3671 5.82763C21.2312 5.7149 21.0769 5.62165 20.9075 5.55298L13.4089 2.51301ZM22 7.19118L12.7498 10.7651V21.6883C12.9736 21.6426 13.1943 21.5762 13.4089 21.4892L20.9075 18.4493C21.5679 18.1815 22 17.5401 22 16.8275V7.19118ZM11.2498 21.6882V10.7651L2 7.19134V16.8275C2 17.5401 2.43211 18.1815 3.09252 18.4493L10.5911 21.4892C10.8056 21.5762 11.0261 21.6425 11.2498 21.6882ZM2.63273 5.82774L11.9998 9.44684L15.9168 7.93346L6.37434 4.22251L3.09252 5.55298C2.92308 5.62167 2.76867 5.71496 2.63273 5.82774Z"
            fill="currentColor"
          />
        </svg>
        <div className={styles.title}>{name}</div>
      </div>
      <div className={styles.items}>
        {columns.map(column => (
          // eslint-disable-next-line react/jsx-key
          <div className={styles.column}>
            {column.map(codeItemInfo => (
              <CodeItemCard key={codeItemInfo.name} codeItemInfo={codeItemInfo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
