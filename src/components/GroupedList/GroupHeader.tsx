import * as React from 'react';
import {
  IGroupHeaderProps,
  IGroup
} from './index';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../Check/Check';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { css } from '../../utilities/css';
import { IViewport } from '../../utilities/decorators/withViewport';
import './GroupHeader.scss';

export interface IGroupHeader {
  group: IGroup;
  groupIndex: number;
  groupLevel: number;
  headerProps?: IGroupHeaderProps;
  viewport?: IViewport;
  selectionMode?: SelectionMode;
}

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeader extends React.Component<IGroupHeader, IGroupHeaderState> {
  constructor(props: IGroupHeader) {
    super(props);

    this._onToggleCollapse = this._onToggleCollapse.bind(this);
    this._onToggleSelectGroup = this._onToggleSelectGroup.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);

    this.state = {
      isCollapsed: this.props.group && this.props.group.isCollapsed,
      isLoadingVisible: false
    };
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.group) {
      let newCollapsed = newProps.group.isCollapsed;
      let isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
      let newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);

      this.setState({
        isCollapsed: newCollapsed,
        isLoadingVisible: newLoadingVisible
      });
    }
  }

  public render() {
    let {
      group,
      groupLevel,
      headerProps,
      viewport,
      selectionMode
    } = this.props;
    let { isCollapsed, isLoadingVisible } = this.state;
    let loadingText = headerProps && headerProps.loadingText;
    let isCollapsedGroupSelectVisible = headerProps && headerProps.isCollapsedGroupSelectVisible;
    if (isCollapsedGroupSelectVisible === undefined) {
      isCollapsedGroupSelectVisible = true;
    }
    let canSelectGroup = selectionMode === SelectionMode.multiple;
    let isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
    let isSelected = group && group.isSelected && isSelectionCheckVisible;

    return group && (
      <div
        className={ css('ms-GroupHeader', {
          'is-selected': isSelected
        }) }
        style={ viewport ? { minWidth: viewport.width } : {} }
        onClick={ this._onHeaderClick }
        data-is-focusable={ true } >

        <FocusZone direction={ FocusZoneDirection.horizontal }>

          { isSelectionCheckVisible ? (
            <button
              className='ms-GroupHeader-check'
              data-selection-toggle={ true }
              onClick={ this._onToggleSelectGroup } >
              <Check isChecked={ isSelected } />
            </button>
            ) : (selectionMode !== SelectionMode.none ? GroupSpacer({ count: 1 }) : null )
          }

          { GroupSpacer({ count: groupLevel }) }

          <div className='ms-GroupHeader-dropIcon'><i className='ms-Icon ms-Icon--Tag'></i></div>
          <button className='ms-GroupHeader-expand' onClick={ this._onToggleCollapse }>
            <i className={ css('ms-Icon ms-Icon--ChevronDown', {
              'is-collapsed': isCollapsed
            })} />
          </button>

          <div className='ms-GroupHeader-title ms-font-xl'>
            <span>{ group.name } </span>
            <span>({ group.count })</span>
          </div>

          <div className={ css('ms-GroupHeader-loading', { 'is-loading': isLoadingVisible }) }>
            <Spinner label={ loadingText } />
          </div>

        </FocusZone>
      </div>
    );
  }

  private _onToggleCollapse(ev: React.MouseEvent) {
    let { group, headerProps } = this.props;
    let { isCollapsed } = this.state;
    let onToggleCollapse = headerProps && headerProps.onToggleCollapse;
    let isGroupLoading = headerProps && headerProps.isGroupLoading;

    let newCollapsed = !isCollapsed;
    let newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible
    });
    if (onToggleCollapse) {
      onToggleCollapse(group);
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onToggleSelectGroup(ev: React.MouseEvent) {
    let { group, headerProps } = this.props;
    let onToggleSelectGroup = headerProps && headerProps.onToggleSelectGroup;

    if (onToggleSelectGroup) {
      onToggleSelectGroup(group);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  private _onHeaderClick() {
    let { group, headerProps } = this.props;

    if (headerProps) {
      let { onGroupHeaderClick, onToggleSelectGroup } = headerProps;
      if (onGroupHeaderClick) {
        onGroupHeaderClick(group);
      } else if (onToggleSelectGroup) {
        onToggleSelectGroup(group);
      }
    }
  }
}
