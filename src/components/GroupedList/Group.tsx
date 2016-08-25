import * as React from 'react';
import {
  IGroup,
  IGroupFooterProps,
  IGroupHeaderProps
} from './GroupedList.Props';

import {
  IDragDropContext,
  IDragDropEvents,
  IDragDropHelper
} from '../../utilities/dragdrop/index';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/index';

import { GroupFooter } from './GroupFooter';
import { GroupHeader } from './GroupHeader';

import {
  List
} from '../../List';
import {
  IDragDropOptions
} from './../../utilities/dragdrop/interfaces';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { css } from '../../utilities/css';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IGroupProps extends React.Props<Group> {
  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** helper to manage drag/drop across item rows and groups */
  dragDropHelper?: IDragDropHelper;

  /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
  eventsToRegister?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Information to pass in to the group footer. */
  footerProps?: IGroupFooterProps;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Optional grouping instructions. */
  groupIndex?: number;

  /** Optional group nesting level. */
  groupNestingDepth?: number;

  /** Optional grouping instructions. */
  group?: IGroup;

  /** Information to pass in to the group header. */
  headerProps?: IGroupHeaderProps;

  /** List of items to render. */
  items: any[];

  /** Optional list props to pass to list renderer.  */
  listProps?: any;

  /** Rendering callback to render the group items. */
  onRenderCell: (
    nestingDepth?: number,
    item?: any,
    index?: number
    ) => React.ReactNode;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Optional Viewport, provided by the parent component. */
  viewport?: IViewport;
}

export interface IGroupState {
  isDropping?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export class Group extends React.Component<IGroupProps, IGroupState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    footer: GroupFooter,
    header: GroupHeader,
    list: List
  };

  private _events: EventGroup;
  private _dragDropKey: string;

  constructor(props: IGroupProps) {
    super(props);

    this.state = {
      isDropping: false
    };

    this._getGroupDragDropOptions = this._getGroupDragDropOptions.bind(this);
    this._updateDroppingState = this._updateDroppingState.bind(this);
    this._renderSubGroup = this._renderSubGroup.bind(this);

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
      getGroupItemLimit,
      group,
      groupIndex,
      headerProps,
      footerProps,
      viewport,
      selectionMode
    } = this.props;
    let renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
    let isFooterVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && group.count > renderCount;

    let hasNestedGroups = group && group.children && group.children.length > 0;

    return (
      <div
        ref='root'
        className={ css('ms-GroupedList-group', this._getDroppingClassName()) }
        >
        {
          group && group.onRenderHeader ?
          group.onRenderHeader(group) :
          <GroupHeader
            group={ group }
            groupIndex={ groupIndex }
            groupLevel={ group ? group.level : 0 }
            headerProps={ headerProps }
            viewport={ viewport }
            selectionMode={ selectionMode }
            ref={ 'header' }
          />
        }
        {
          group && group.isCollapsed ?
          null :
          (
            hasNestedGroups ?
            (
              <List
                ref='list'
                items={ group.children }
                onRenderCell={ this._renderSubGroup }
                getItemCountForPage={ () => 1 }
                />
            ) :
            this._onRenderGroup(renderCount)
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

  public forceUpdate() {
    super.forceUpdate();
    this.forceListUpdate();
  }

  public forceListUpdate() {
    let {
      group
    } = this.props;

    if (this.refs.list) {
      this.refs.list.forceUpdate();
      if (group && group.children && group.children.length > 0) {
        let subGroupCount = group.children.length;

        for (let i = 0; i < subGroupCount; i++) {
          let subGroup = this.refs.list.refs['subGroup_' + String(i)] as Group;
          if (subGroup) {
            subGroup.forceListUpdate();
          }
        }
      }
    } else {
      let subGroup = this.refs['subGroup_' + String(0)] as Group;
      if (subGroup) {
        subGroup.forceListUpdate();
      }
    }
  }

  private _onRenderGroup(renderCount: number) {
    let {
      group,
      items,
      onRenderCell,
      listProps,
      groupNestingDepth
    } = this.props;
    let count = group ? group.count : items.length;
    let startIndex = group ? group.startIndex : 0;

    return (
      <List
        items={ items }
        onRenderCell={ (item, itemIndex) => onRenderCell(groupNestingDepth, item, itemIndex) }
        ref={ 'list' }
        renderCount={ Math.min(count, renderCount) }
        startIndex={ startIndex }
        { ...listProps }
        />
    );
  }

  private _renderSubGroup(subGroup, subGroupIndex) {
    let {
      dragDropEvents,
      dragDropHelper,
      eventsToRegister,
      getGroupItemLimit,
      groupNestingDepth,
      items,
      headerProps,
      footerProps,
      listProps,
      onRenderCell,
      selection,
      selectionMode,
      viewport
    } = this.props;

    return (!subGroup || subGroup.count > 0) ? (
      <Group
        ref={ 'subGroup_' + subGroupIndex }
        key={ this._getGroupKey(subGroup, subGroupIndex) }
        dragDropEvents={ dragDropEvents }
        dragDropHelper={ dragDropHelper }
        eventsToRegister={ eventsToRegister }
        footerProps={ footerProps }
        getGroupItemLimit={ getGroupItemLimit }
        group={ subGroup }
        groupIndex={ subGroupIndex }
        groupNestingDepth={ groupNestingDepth }
        headerProps={ headerProps }
        items={ items }
        listProps={ listProps }
        onRenderCell={ onRenderCell }
        selection={ selection }
        selectionMode={ selectionMode }
        viewport={ viewport }
        />
      ) : null;
  }

  private _getGroupKey(group: IGroup, groupIndex: number): string {
    return 'group-' + (group ?
      group.key + '-' + group.count :
      '');
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
