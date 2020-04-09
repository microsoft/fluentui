import { Text } from 'office-ui-fabric-react/lib/Text';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  DetailsRow,
  IDetailsRowProps,
} from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';

const TestText = 'The quick brown fox jumped over the lazy dog.';

const Variants = [
  { name: 'tiny' },
  { name: 'xSmall' },
  { name: 'small' },
  { name: 'smallPlus' },
  { name: 'medium' },
  { name: 'mediumPlus' },
  { name: 'large' },
  { name: 'xLarge' },
  { name: 'xxLarge' },
  { name: 'mega' },
];

const renderDetailsRow = (props: IDetailsRowProps) => <DetailsRow {...props} styles={{ root: { color: 'inherit' } }} />;

const allItems = [];

Variants.forEach((setting, index: number) =>
  allItems.push({
    key: setting.name + index,
    variant: setting.name,
    example: (
      <Text key={setting.name + 'text' + index} variant={setting.name} nowrap block>
        {TestText}
      </Text>
    ),
  }),
);

const columns = [
  { key: 'column1', name: 'Variant', fieldName: 'variant', minWidth: 100, maxWidth: 150, isResizable: true },
  { key: 'column2', name: 'Example', fieldName: 'example', minWidth: 200, maxWidth: 1600, isResizable: true },
];

export const TextRampExample: React.FC = () => (
  <DetailsList
    items={allItems}
    columns={columns}
    setKey="set"
    selectionMode={SelectionMode.none}
    layoutMode={DetailsListLayoutMode.fixedColumns}
    onRenderRow={renderDetailsRow}
  />
);

// export class TextRampExample extends React.Component<{}, ITextRampExampleState> {
//   private _allItems: ITextRampExampleItem[];
//   private _columns: IColumn[];

//   constructor(props: {}) {
//     super(props);

//     this._allItems = [];

//     Variants.forEach((setting: ISetting<keyof IFontStyles>, index: number) =>
//       this._allItems.push({
//         key: setting.name + index,
//         variant: setting.name,
//         example: (
//           <Text key={setting.name + 'text' + index} variant={setting.name} nowrap block>
//             {TestText}
//           </Text>
//         ),
//       }),
//     );

//     this._columns = [
//       { key: 'column1', name: 'Variant', fieldName: 'variant', minWidth: 100, maxWidth: 150, isResizable: true },
//       { key: 'column2', name: 'Example', fieldName: 'example', minWidth: 200, maxWidth: 1600, isResizable: true },
//     ];

//     this.state = {
//       items: this._allItems,
//     };
//   }

//   public render(): JSX.Element {
//     const { items } = this.state;

//     return (
//       <DetailsList
//         items={items}
//         columns={this._columns}
//         setKey="set"
//         selectionMode={SelectionMode.none}
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//         onRenderRow={this._renderDetailsRow}
//       />
//     );
//   }

//   private _renderDetailsRow(props: IDetailsRowProps): JSX.Element {
//     return <DetailsRow {...props} styles={{ root: { color: 'inherit' } }} />;
//   }
// }
