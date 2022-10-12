import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import { ComparisonTile as ComparisonTileBase } from './ComparisonTile';
import { V0IconComponent, V9IconComponent } from './types';

const ComparisonTile = React.memo(ComparisonTileBase);

interface IIconGridProps {
  entries: {
    V0Icon: V0IconComponent;
    V9Icon: V9IconComponent;
  }[];
}

const Row = ({ index, style, data }: ListChildComponentProps) => {
  const start = index * 3;
  const items = data.slice(start, start + 3) as IIconGridProps['entries'];
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

export const IconGrid: React.FC<IIconGridProps> = ({ entries }) => {
  return (
    <List width="100%" itemCount={entries.length / 3} height={600} itemData={entries} itemSize={110}>
      {Row}
    </List>
  );
};
