import { Text } from 'office-ui-fabric-react/lib/Text';
import { DetailsList, IColumn, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';

const TestText = 'The quick brown fox jumped over the lazy dog.';
const Weights: string[] = ['400', '600', '700'];
const Items = Weights.map(weight => ({
  key: weight,
  variant: weight,
  example: <Text style={{ fontWeight: Number(weight) }}>{TestText}</Text>,
}));
const Columns: IColumn[] = [
  { key: 'column1', name: 'Variant', fieldName: 'variant', minWidth: 100, maxWidth: 150, isResizable: true },
  {
    key: 'column2',
    name: 'Example',
    fieldName: 'example',
    minWidth: 200,
    maxWidth: 1600,
    isResizable: true,
    onRender: item => item.example,
  },
];

export const TextRampExample = () => (
  <DetailsList
    items={Items}
    columns={Columns}
    setKey="set"
    selectionMode={SelectionMode.none}
    layoutMode={DetailsListLayoutMode.fixedColumns}
  />
);
