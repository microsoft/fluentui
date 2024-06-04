import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import { ComparisonTile as ComparisonTileBase } from './ComparisonTile';
import { V0IconComponent, V9IconComponent } from './types';

const ComparisonTile = React.memo(ComparisonTileBase);

interface IconGridProps {
  entries: {
    V0Icon: V0IconComponent;
    V9Icon?: V9IconComponent;
  }[];
}

const ROW_SIZE = 3;

interface RowProps extends ListChildComponentProps {
  data: IconGridProps['entries'];
}

const Row = ({ index, style, data }: RowProps) => {
  const start = index * ROW_SIZE;
  const items = data.slice(start, start + 3);
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
    <List width="100%" itemCount={entries.length / ROW_SIZE} height={600} itemData={entries} itemSize={110}>
      {Row}
    </List>
  );
};
