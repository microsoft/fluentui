import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { ComparisonTile as ComparisonTileBase } from './ComparisonTile';
import { V0IconComponent, V9IconComponent } from './types';

const ComparisonTile = React.memo(ComparisonTileBase);

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap('10px'),
  },
});

interface IIconGridProps {
  entries: {
    V0Icon: V0IconComponent;
    V9Icon: V9IconComponent;
  }[];
}

const renderIcon = ({ V0Icon, V9Icon }: { V0Icon: V0IconComponent; V9Icon: V9IconComponent }) => {
  if (!V0Icon) {
    return null;
  }

  return <ComparisonTile key={V0Icon.displayName} V0Icon={V0Icon} V9Icon={V9Icon} />;
};

export const IconGrid: React.FC<IIconGridProps> = ({ entries }) => {
  const styles = useStyles();
  return (
    <div className={styles.grid} role="list">
      {entries.map(renderIcon)}
    </div>
  );
};
