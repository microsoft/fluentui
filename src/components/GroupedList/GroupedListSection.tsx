import * as React from 'react';
import {
  IGroup,
  IGroupDividerProps
} from './GroupedList.Props';

import {
  IDragDropContext,
  IDragDropEvents,
  IDragDropHelper
} from '../../utilities/dragdrop/index';

import {
  BaseComponent,
  autobind
} from '../../Utilities';

import {
  ISelection,
  SelectionMode,
  SELECTION_CHANGE
} from '../../utilities/selection/index';

import { GroupFooter } from './GroupFooter';
import { GroupHeader } from './GroupHeader';

import {
  List
} from '../../List';
import {
  IDragDropOptions
} from './../../utilities/dragdrop/interfaces';
import { assign, css } from '../../Utilities';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IGroupedListSectionProps extends React.Props<GroupedListSection> {
  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** helper to manage drag/drop across item rows and groups */
  dragDropHelper?: IDragDropHelper;

  /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
  eventsToRegister?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Information to pass in to the group footer. */
  footerProps?: IGroupDividerProps;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Optional grouping instructions. */
  groupIndex?: number;

  /** Optional group nesting level. */
  groupNestingDepth?: number;

  /** Optional grouping instructions. */
  group?: IGroup;

  /** Information to pass in to the group header. */
  headerProps?: IGroupDividerProps;

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

  /** Override for rendering the group header. */
  onRenderGroupHeader?: (props?: IGroupDividerProps, defaultRender?: (props?: IGroupDividerProps) => JSX.Element) => JSX.Element;

  /** Override for rendering the group footer. */
  onRenderGroupFooter?: (props?: IGroupDividerProps, defaultRender?: (props?: IGroupDividerProps) => JSX.Element) => JSX.Element;
}

export interface IGroupedListSectionState {
  isDropping?: boolean;
  isSelected?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export class GroupedListSection extends BaseComponent<IGroupedListSectionProps, IGroupedListSectionState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    list: List
  };

  private _subGroups: {
    [key: string]: GroupedListSection;
  };
  private _dragDropKey: string;

  constructor(props: IGroupedListSectionProps) {
    super(props);

    let { selection, group } = props;

    this._subGroups = {};
    this.state = {
      isDropping: false,
      isSelected: (selection && group) ? selection.isRangeSelected(group.startIndex, group.count) : false
    };
  }

  public componentDidMount() {
    let { dragDropHelper, selection } = this.props;

    if (dragDropHelper) {
      dragDropHelper.subscribe(this.refs.root, this._events, this._getGroupDragDropOptions());
    }

    if (selection) {
      this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
    }
  }

  public componentWillUnmount() {
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
      selectionMode,
      onRenderGroupHeader = this._onRenderGroupHeader,
      onRenderGroupFooter = this._onRenderGroupFooter
    } = this.props;
    let { isSelected } = this.state;
    let renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
    let isFooterVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && group.count > renderCount;
    let hasNestedGroups = group && group.children && group.children.length > 0;

    let dividerProps: IGroupDividerProps = {
      group: group,
      groupIndex: groupIndex,
      groupLevel: group ? group.level : 0,
      isSelected,
      viewport: viewport,
      selectionMode: selectionMode
    };
    let groupHeaderProps: IGroupDividerProps = assign({}, headerProps, dividerProps);
    let groupFooterProps: IGroupDividerProps = assign({}, footerProps, dividerProps);

    return (
      <div
        ref='root'
        className={ css('ms-GroupedList-group', this._getDroppingClassName()) }
        >
        { onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader) }
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
        { isFooterVisible && onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter) }
      </div>
    );
  }

  public forceUpdate() {
    super.forceUpdate();
    this.forceListUpdate();
  }

  public forceListUpdate() {
    let { group } = this.props;

    if (this.refs.list) {
      this.refs.list.forceUpdate();

      if (group && group.children && group.children.length > 0) {
        let subGroupCount = group.children.length;

        for (let i = 0; i < subGroupCount; i++) {
          let subGroup = this.refs.list.refs['subGroup_' + String(i)] as GroupedListSection;

          if (subGroup) {
            subGroup.forceListUpdate();
          }
        }
      }
    } else {
      let subGroup = this.refs['subGroup_' + String(0)] as GroupedListSection;

      if (subGroup) {
        subGroup.forceListUpdate();
      }
    }
  }

  @autobind
  private _onRenderGroupHeader(props: IGroupDividerProps) {
    return <GroupHeader { ...props } />;
  }

  @autobind
  private _onRenderGroupFooter(props: IGroupDividerProps) {
    return <GroupFooter { ...props } />;
  }

  private _onSelectionChange() {
    let { group, selection } = this.props;
    let isSelected = selection.isRangeSelected(group.startIndex, group.count);

    if (isSelected !== this.state.isSelected) {
      this.setState({ isSelected });
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

  @autobind
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
      <GroupedListSection
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
  @autobind
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
  @autobind
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
