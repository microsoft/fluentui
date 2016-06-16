import * as React from 'react';
import { GroupFooter } from './GroupFooter';
import { DetailsRow } from './DetailsRow';
import { GroupHeader } from './GroupHeader';
import { List } from '../../List';
import {
  IDragDropOptions
} from './../../utilities/dragdrop/interfaces';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';
import {
  IGroup,
  IColumn,
  IDetailsGroupHeaderProps,
  IDetailsGroupFooterProps,
  CheckboxVisibility
} from './DetailsList.Props';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/interfaces';
import {
  IDragDropEvents,
  IDragDropContext,
  IDragDropHelper
} from './../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import './DetailsGroup.scss';

export interface IDetailsGroupProps extends React.Props<DetailsGroup> {
  /** The items to render. */
  items: any[];

  /** Given column definitions */
  columns?: IColumn[];

  /** Optional grouping instructions. */
  group?: IGroup;

  /** Optional grouping instructions. */
  groupIndex?: number;

  /** Optional group nesting level. */
  groupNestingDepth?: number;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Controls the visibility of selection check box. */
  checkboxVisibility?: CheckboxVisibility;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Event names and corresponding callbacks that will be registered to the group and the rendered row elements */
  eventsToRegister?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** helper to manage drag/drop across item rows and groups */
  dragDropHelper?: IDragDropHelper;

  /** Information to pass in to the group header. */
  headerProps?: IDetailsGroupHeaderProps;

  /** Information to pass in to the group footer. */
  footerProps?: IDetailsGroupFooterProps;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;

  /** Is the list resizing a column */
  isSizing?: boolean;

  /** Callback to get the aria-label string for a given item. */
  getRowAriaLabel?: (item: any) => string;

  /** Optional callback to determine if an item is selectable. */
  canSelectItem?: (item: any) => boolean;
}

export interface IDetailsGroupState {
  isDropping?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;

export class DetailsGroup extends React.Component<IDetailsGroupProps, IDetailsGroupState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    list: List
  };

  private _events: EventGroup;
  private _dragDropKey: string;

  constructor(props: IDetailsGroupProps) {
    super(props);

    this.state = {
      isDropping: false
    };

    this._onRenderCell = this._onRenderCell.bind(this);
    this._getGroupDragDropOptions = this._getGroupDragDropOptions.bind(this);
    this._updateDroppingState = this._updateDroppingState.bind(this);

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    let { dragDropHelper } = this.props;
    if (dragDropHelper) {
      dragDropHelper.subscribe(this.refs.root, this._events, this._getGroupDragDropOptions());
    }
  }

  public componentWillUnmount() {
    this._events.dispose();

    let { dragDropHelper } = this.props;
    if (dragDropHelper) {
      dragDropHelper.unsubscribe(this.refs.root, this._dragDropKey);
    }
  }

  public render() {
    let {
      columns,
      dragDropEvents,
      dragDropHelper,
      eventsToRegister,
      group,
      groupIndex,
      groupNestingDepth,
      getGroupItemLimit,
      items,
      isSizing,
      headerProps,
      footerProps,
      onRenderMissingItem,
      onRowDidMount,
      onRowWillUnmount,
      selection,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      canSelectItem
    } = this.props;
    let renderCount = group ? getGroupItemLimit(group) : items.length;
    let isFooterVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && group.count > renderCount;

    let nestedGroups = null;
    let hasNestedGroups = group && group.children && group.children.length > 0;
    if (hasNestedGroups) {
      nestedGroups = group.children.map((subGroup: IGroup, subGroupIndex: number) => (
        (!subGroup || subGroup.count > 0) ? (
          <DetailsGroup
            ref={ 'subGroup_' + subGroupIndex }
            key={ this._getGroupKey(subGroup, subGroupIndex) }
            items={ items }
            columns={ columns }
            group={ subGroup }
            groupIndex={ subGroupIndex }
            groupNestingDepth={ groupNestingDepth }
            getGroupItemLimit={ getGroupItemLimit }
            selectionMode={ selectionMode }
            selection={ selection }
            eventsToRegister={ eventsToRegister }
            onRowDidMount={ onRowDidMount }
            onRowWillUnmount={ onRowWillUnmount }
            dragDropEvents={ dragDropEvents }
            onRenderMissingItem={ onRenderMissingItem }
            dragDropHelper={ dragDropHelper }
            viewport={ viewport }
            headerProps={ headerProps }
            footerProps={ footerProps }
            checkboxVisibility={ checkboxVisibility }
            getRowAriaLabel={ getRowAriaLabel }
            canSelectItem={ canSelectItem }
            />
          ) : null
      ));
    }

    return (
      <div
        ref='root'
        className={ css('ms-DetailsList-group', this._getDroppingClassName()) }>
        { group && group.onRenderHeader ?
          group.onRenderHeader(group) :
          <GroupHeader
            group={ group }
            groupIndex={ groupIndex }
            groupLevel={ group ? group.level : 0 }
            headerProps={ headerProps }
            viewport={ viewport }
            ref={ 'header' }
          />
        }
        {
          group && group.isCollapsed ?
          null :
          (
            hasNestedGroups ?
            nestedGroups :
            <List
              items={ items }
              onRenderCell={ this._onRenderCell }
              ref={ 'list' }
              renderCount={ renderCount }
              renderedWindowsAhead={ isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD }
              renderedWindowsBehind={ isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND }
              selection={ selection }
              startIndex={ group ? group.startIndex : 0 }
            />
          )
        }
        {
          group && group.onRenderFooter ?
          group.onRenderFooter(group) :
          (
            isFooterVisible &&
            <GroupFooter
              group={ group }
              groupIndex={ groupIndex }
              groupLevel={ group ? group.level : 0 }
              footerProps={ footerProps }
              ref={ 'footer' }
            />
          )
        }
       </div>
    );
  }

  public forceListUpdate() {
    let { group } = this.props;

    if (this.refs.list) {
      this.refs.list.forceUpdate();
    } else if (group && group.children && group.children.length > 0) {
      let subGroupCount = group.children.length;

      for (let i = 0; i < subGroupCount; i++) {
        let subGroup = this.refs['subGroup_' + String(i)] as DetailsGroup;
        if (subGroup) {
          subGroup.forceListUpdate();
        }
      }
    }
  }

  private _getGroupKey(group: IGroup, groupIndex: number): string {
    return 'group-' + (group ?
      group.key + '-' + group.count :
      '');
  }

  private _onRenderCell(item: any, index: number): React.ReactNode {
    let {
      columns,
      dragDropEvents,
      dragDropHelper,
      eventsToRegister,
      groupNestingDepth,
      onRenderMissingItem,
      onRowDidMount,
      onRowWillUnmount,
      selection,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      canSelectItem
    } = this.props;
    let rowKey = item ? item.key : index;

    if (!item) {
      if (onRenderMissingItem) {
        onRenderMissingItem(index);
      }

      return null;
    }

    return (
        <DetailsRow
          key={ rowKey }
          item={ item }
          itemIndex={ index }
          columns={ columns }
          selectionMode={ selectionMode }
          selection={ selection }
          onDidMount={ onRowDidMount }
          onWillUnmount={ onRowWillUnmount }
          eventsToRegister={ eventsToRegister }
          dragDropEvents={ dragDropEvents }
          dragDropHelper={ dragDropHelper }
          groupNestingDepth={ groupNestingDepth }
          viewport={ viewport }
          checkboxVisibility={ checkboxVisibility }
          getRowAriaLabel={ getRowAriaLabel }
          canSelectItem={ canSelectItem }
          />
    );
  }

  /**
   * collect all the data we need to enable drag/drop for a group
   */
  private _getGroupDragDropOptions(): IDragDropOptions {
    let { group, groupIndex, dragDropEvents, eventsToRegister } = this.props;
    this._dragDropKey = 'group-' + (group ? group.key : String(groupIndex));
    let options = {
      key: this._dragDropKey,
      eventMap: eventsToRegister,
      selectionIndex: -1,
      context: { data: group, index: groupIndex, isGroup: true },
      canDrag: () => { return false; }, // cannot drag groups
      canDrop: dragDropEvents.canDrop,
      onDragStart: null,
      updateDropState: this._updateDroppingState
    };
    return options;
  }

  /**
   * update groupIsDropping state based on the input value, which is used to change style during drag and drop
   *
   * @private
   * @param {boolean} newValue (new isDropping state value)
   * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
   */
  private _updateDroppingState(newIsDropping: boolean, event: DragEvent) {
    let { isDropping } = this.state;
    let { dragDropEvents } = this.props;

    if (!isDropping) {
      if (dragDropEvents.onDragLeave) {
        dragDropEvents.onDragLeave(event, null);
      }
    } else {
      if (dragDropEvents.onDragEnter) {
        dragDropEvents.onDragEnter(event, null);
      }
    }

    if (isDropping !== newIsDropping) {
      this.setState({ isDropping: newIsDropping });
    }
  }

  /**
   * get the correct css class to reflect the dropping state for a given group
   *
   * If the group is the current drop target, return the default dropping class name
   * Otherwise, return '';
   *
   */
  private _getDroppingClassName(): string {
    let { isDropping } = this.state;
    let { group } = this.props;

    let droppingClass = group && isDropping ? DEFAULT_DROPPING_CSS_CLASS : '';
    return droppingClass;
  }
}
