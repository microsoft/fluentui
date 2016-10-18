import * as React from 'react';
import {
  IGroupDividerProps
} from './index';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../Check/Check';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { css } from '../../utilities/css';
import { autobind } from '../../utilities/autobind';
import './GroupHeader.scss';

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export class GroupHeader extends React.Component<IGroupDividerProps, IGroupHeaderState> {
  constructor(props: IGroupDividerProps) {
    super(props);

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
      viewport,
      selectionMode,
      loadingText,
      isCollapsedGroupSelectVisible
    } = this.props;
    let { isCollapsed, isLoadingVisible } = this.state;

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
        aria-label={ group.ariaLabel || group.name }
        data-is-focusable={ true } >

        <FocusZone direction={ FocusZoneDirection.horizontal }>

          { isSelectionCheckVisible ? (
            <button
              className='ms-GroupHeader-check'
              data-selection-toggle={ true }
              onClick={ this._onToggleSelectGroupClick } >
              <Check isChecked={ isSelected } />
            </button>
          ) : (selectionMode !== SelectionMode.none ? GroupSpacer({ count: 1 }) : null)
          }

          { GroupSpacer({ count: groupLevel }) }

          <div className='ms-GroupHeader-dropIcon'><i className='ms-Icon ms-Icon--Tag'></i></div>
          <button className='ms-GroupHeader-expand' onClick={ this._onToggleCollapse }>
            <i className={ css('ms-Icon ms-Icon--ChevronDown', {
              'is-collapsed': isCollapsed
            }) } />
          </button>

          <div className='ms-GroupHeader-title ms-font-xl'>
            <span>{ group.name } </span>
            <span>({ group.count }) </span>
          </div>

          <div className={ css('ms-GroupHeader-loading', { 'is-loading': isLoadingVisible }) }>
            <Spinner label={ loadingText } />
          </div>

        </FocusZone>
      </div>
    );
  }

  @autobind
  private _onToggleCollapse(ev: React.MouseEvent) {
    let { group, onToggleCollapse, isGroupLoading } = this.props;
    let { isCollapsed } = this.state;

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

  @autobind
  private _onToggleSelectGroupClick(ev: React.MouseEvent) {
    let { onToggleSelectGroup, group } = this.props;

    if (onToggleSelectGroup) {
      onToggleSelectGroup(group);
    }

    ev.preventDefault();
    ev.stopPropagation();
  }

  @autobind
  private _onHeaderClick() {
    let { group, onGroupHeaderClick, onToggleSelectGroup } = this.props;

    if (onGroupHeaderClick) {
      onGroupHeaderClick(group);
    } else if (onToggleSelectGroup) {
      onToggleSelectGroup(group);
    }
  }
}
