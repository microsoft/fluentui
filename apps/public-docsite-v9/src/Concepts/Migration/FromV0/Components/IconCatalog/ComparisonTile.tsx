import * as React from 'react';
import { DismissRegular, InfoRegular } from '@fluentui/react-icons';
import { Button, mergeClasses, Tooltip } from '@fluentui/react-components';

import { V0IconComponent, V9IconComponent } from './types';
import { useComparisonTileStyles } from './ComparisonTile.styles';

interface ComparisonTileProps {
  V0Icon: V0IconComponent;
  V9Icon?: V9IconComponent;
}

export const ComparisonTile: React.FC<ComparisonTileProps> = ({ V0Icon, V9Icon }) => {
  const noV9Icon = !V9Icon;

  const tooltipWarningContent = <ul>{noV9Icon && <li>No equivalent icon available</li>}</ul>;

  const styles = useComparisonTileStyles();
  return (
    <div className={styles.root} role="listitem">
      <Tooltip relationship="description" content={noV9Icon ? tooltipWarningContent : 'Good to go!'}>
        <Button
          appearance="subtle"
          className={mergeClasses(styles.badge, noV9Icon ? styles.warning : styles.success)}
          icon={<InfoRegular />}
          shape="circular"
        />
      </Tooltip>
      <div className={styles.tile}>
        <div className={styles.v0}>{<V0Icon outline />}</div>
        <div>{V0Icon.displayName}</div>
      </div>
      <div className={styles.tile}>
        <div className={styles.v9}>
          {V9Icon ? <V9Icon fontSize={20} /> : <DismissRegular color="red" fontSize={21} />}
        </div>
        <div>{V9Icon ? V9Icon.displayName : 'Not Available'}</div>
      </div>
    </div>
  );
};
