import * as React from 'react';
import { List } from 'react-window';
import type { RowComponentProps } from 'react-window';
import { ComparisonTile as ComparisonTileBase } from './ComparisonTile';
import type { V0IconComponent, V9IconComponent } from './types';

const ComparisonTile = React.memo(ComparisonTileBase);

interface IconGridProps {
  entries: {
    V0Icon: V0IconComponent;
    V9Icon?: V9IconComponent;
  }[];
}

const ROW_SIZE = 3;

const Row = ({ index, style, entries }: RowComponentProps<{ entries: IconGridProps['entries'] }>) => {
  const start = index * ROW_SIZE;
  const items = entries.slice(start, start + 3);
  return (
    <div style={style}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {items.map(({ V0Icon, V9Icon }) => (
          <ComparisonTile key={V0Icon.displayName} V0Icon={V0Icon} V9Icon={V9Icon} />
        ))}
      </div>
    </div>
  );
};

export const IconGrid: React.FC<IconGridProps> = ({ entries }) => {
  return (
    <List
      rowComponent={Row}
      rowCount={Math.ceil(entries.length / ROW_SIZE)}
      rowHeight={110}
      rowProps={{ entries }}
      style={{ height: 600, width: '100%' }}
    />
  );
};
