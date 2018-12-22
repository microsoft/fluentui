// @codepen

import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, IGroup, IGroupDividerProps } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, createGroups, IExampleItem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { mergeStyles, DefaultPalette, DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const headerClass = mergeStyles({
  borderTop: '1px solid ' + DefaultPalette.neutralQuaternary,
  borderBottom: '1px solid ' + DefaultPalette.neutralQuaternary,
  padding: '8px',
  margin: '8px 0',
  background: DefaultPalette.neutralLighterAlt,
  boxShadow: '0 0 20px -8px ' + DefaultPalette.black,
  // Overlay the sizer bars
  position: 'relative',
  zIndex: 100
});
const headerTitleClass = mergeStyles(DefaultFontStyles.xLarge, {
  padding: '4px 0'
});
const headerLinkSetClass = mergeStyles({
  margin: '4px -8px'
});
const headerLinkClass = mergeStyles({
  margin: '0 8px'
});

const ITEMS_PER_GROUP = 20;
const GROUP_COUNT = 20;

let _items: IExampleItem[];
let _groups: IGroup[];

export class DetailsListCustomGroupHeadersExample extends React.Component {
  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(500);
    _groups = _groups || createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
  }

  public render(): JSX.Element {
    return (
      <div>
        <DetailsList
          items={_items}
          groups={_groups}
          groupProps={{
            onRenderHeader: this._onRenderGroupHeader,
            onRenderFooter: this._onRenderGroupFooter
          }}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />
      </div>
    );
  }

  private _onRenderGroupHeader = (props: IGroupDividerProps): JSX.Element => {
    return (
      <div className={headerClass}>
        <div className={headerTitleClass}>{`I am a custom header for: ${props.group!.name}`}</div>
        <div className={headerLinkSetClass}>
          <Link className={headerLinkClass} onClick={this._onToggleSelectGroup(props)}>
            {props.isSelected ? 'Remove selection' : 'Select group'}
          </Link>
          <Link className={headerLinkClass} onClick={this._onToggleCollapse(props)}>
            {props.group!.isCollapsed ? 'Expand group' : 'Collapse group'}
          </Link>
        </div>
      </div>
    );
  };

  private _onRenderGroupFooter = (props: IGroupDividerProps): JSX.Element => {
    return (
      <div className={headerClass}>
        <div className={headerTitleClass}>{`I'm a custom footer for: ${props.group!.name}`}</div>
      </div>
    );
  };

  private _onToggleSelectGroup(props: IGroupDividerProps): () => void {
    return () => {
      props.onToggleSelectGroup!(props.group!);
    };
  }

  private _onToggleCollapse(props: IGroupDividerProps): () => void {
    return () => {
      props!.onToggleCollapse!(props!.group!);
    };
  }
}
