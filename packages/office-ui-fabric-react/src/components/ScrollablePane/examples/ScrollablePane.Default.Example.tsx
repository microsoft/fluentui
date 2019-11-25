import * as React from 'react';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { lorem } from '@uifabric/example-data';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    height: '40vh',
    position: 'relative',
    maxHeight: 'inherit'
  },
  pane: {
    maxWidth: 400,
    border: '1px solid ' + theme.palette.neutralLight
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black
  },
  textContent: {
    padding: '15px 10px'
  }
});

export interface IScrollablePaneExampleItem {
  color: string;
  text: string;
  index: number;
}

export class ScrollablePaneDefaultExample extends React.Component {
  private _items: IScrollablePaneExampleItem[];

  constructor(props: any) {
    super(props);

    const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4', '#71afe5', '#eff6fc', '#deecf9'];
    this._items = [];
    // Using splice prevents the colors from being duplicated
    for (let i = 0; i < 5; i++) {
      this._items.push({
        color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
        text: lorem(200),
        index: i
      });
    }
  }

  public render() {
    const contentAreas = this._items.map(this._createContentArea);

    return (
      <div className={classNames.wrapper}>
        <ScrollablePane styles={{ root: classNames.pane }}>{...contentAreas}</ScrollablePane>
      </div>
    );
  }

  private _createContentArea = (item: IScrollablePaneExampleItem) => {
    return (
      <div
        key={item.index}
        style={{
          backgroundColor: item.color
        }}
      >
        <Sticky stickyPosition={StickyPositionType.Both}>
          <div className={classNames.sticky}>Sticky Component #{item.index + 1}</div>
        </Sticky>
        <div className={classNames.textContent}>{item.text}</div>
      </div>
    );
  };
}
