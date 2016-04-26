import * as React from 'react';
import './GroupHeader.scss';
import Check from './Check';
import { IGroup } from './index';
import { css } from '../../utilities/css';
import { default as Spinner } from '../Spinner/index';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus';

export interface IGroupHeaderProps {
  group: IGroup;
  groupIndex: number;
  onToggleCollapse?: (groupIndex: number) => void;
  onToggleSelectGroup?: (groupIndex: number) => void;
  isGroupLoading?: (group: IGroup) => boolean;
  loadingText?: string;
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

    this.state = {
      isCollapsed: this.props.group && this.props.group.isCollapsed,
      isLoadingVisible: false
    };
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.group) {
      let newCollapsed = newProps.group.isCollapsed;
      let newLoadingVisible = !newCollapsed && newProps.isGroupLoading && newProps.isGroupLoading(newProps.group);

      this.setState({
        isCollapsed: newCollapsed,
        isLoadingVisible: newLoadingVisible
      });
    }
  }

  public render() {
    let { group, loadingText } = this.props;
    let { isCollapsed, isLoadingVisible } = this.state;
    let showCheckBox = true;
    let isSelected = group && group.isSelected;

    return group && (
      <div
        className={ css('ms-GroupHeader', {
          'is-selected': isSelected
        }) }
        onClick={ this._onToggleSelectGroup }
        data-is-focusable={ true } >

        <FocusZone direction={ FocusZoneDirection.horizontal }>

          { showCheckBox && (
            <button
              className='ms-GroupHeader-check'
              data-selection-toggle={ true } >
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

  private _onToggleCollapse(ev?: any) {
    let { onToggleCollapse, groupIndex, group, isGroupLoading } = this.props;
    let { isCollapsed } = this.state;

    let newCollapsed = !isCollapsed;
    let newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);

    this.setState({
      isCollapsed: newCollapsed,
      isLoadingVisible: newLoadingVisible
    });
    if (onToggleCollapse) {
      onToggleCollapse(groupIndex);
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onToggleSelectGroup() {
    let { onToggleSelectGroup, groupIndex } = this.props;
    if (onToggleSelectGroup) {
      onToggleSelectGroup(groupIndex);
    }
  }
}
