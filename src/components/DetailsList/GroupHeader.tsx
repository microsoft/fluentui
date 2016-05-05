import * as React from 'react';
import './GroupHeader.scss';
import Check from './Check';
import { IGroup, IDetailsGroupHeaderProps } from './index';
import { css } from '../../utilities/css';
import { default as Spinner } from '../Spinner/index';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';

export interface IGroupHeaderProps {
  group: IGroup;
  groupIndex: number;
  headerProps?: IDetailsGroupHeaderProps;
}

export interface IGroupHeaderState {
  isCollapsed: boolean;
  isLoadingVisible: boolean;
}

export default class GroupHeader extends React.Component<IGroupHeaderProps, IGroupHeaderState> {
  constructor(props: IGroupHeaderProps) {
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
    let { group, headerProps } = this.props;
    let { isCollapsed, isLoadingVisible } = this.state;
    let showCheckBox = true;
    let isSelected = group && group.isSelected;
    let loadingText = headerProps && headerProps.loadingText;

    return group && (
      <div
        className={ css('ms-GroupHeader', {
          'is-selected': isSelected
        }) }
        onClick={ this._onHeaderClick }
        data-is-focusable={ true } >

        <FocusZone direction={ FocusZoneDirection.horizontal }>

          { showCheckBox && (
            <button
              className='ms-GroupHeader-check'
              data-selection-toggle={ true }
              onClick={ this._onToggleSelectGroup } >
              <Check isChecked={ isSelected } />
            </button>
          )}

          <button className='ms-GroupHeader-expand' onClick={ this._onToggleCollapse }>
            <i className={ css('ms-Icon ms-Icon--chevronDown', {
              'is-collapsed': isCollapsed
            })} />
          </button>

          <div className='ms-GroupHeader-title ms-font-xl'>
            <span>{ group.name }</span>
            <span>( {group.count} )</span>
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
