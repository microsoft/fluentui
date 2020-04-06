import * as React from 'react';
import { DetailsList, DetailsRow, IDetailsRowStyles, IDetailsListProps } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();

export class DetailsListCustomRowsExample extends React.Component<{}, {}> {
  private _items: IExampleItem[];

  constructor(props: {}) {
    super(props);
    this._items = createListItems(500);
  }

  public render() {
    return (
      <DetailsList
        items={this._items}
        setKey="set"
        onRenderRow={this._onRenderRow}
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  private _onRenderRow: IDetailsListProps['onRenderRow'] = props => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        // Every other row renders with a different background color
        customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };
}
