import * as React from 'react';
import './GroupHeader.scss';
import Check from './Check';
import { IGroup } from './index';
import { css } from '../../utilities/css';

export interface IGroupHeaderProps {
  group: IGroup;
  groupIndex: number;
  onToggleCollapse?: (groupIdx: number) => void;
  onToggleSelectGroup?: (groupIdx: number) => void;
}

export interface IGroupHeaderState {
  isCollapsed: boolean;
}

export default class GroupHeader extends React.Component<IGroupHeaderProps, IGroupHeaderState> {
  constructor(props: IGroupHeaderProps) {
    super(props);

    this._onToggleCollapse = this._onToggleCollapse.bind(this);
    this._onToggleSelectGroup = this._onToggleSelectGroup.bind(this);

    this.state = {
      isCollapsed: this.props.group && this.props.group.isCollapsed
    };
  }

  public componentWillReceiveProps(newProps) {
    if (newProps.group && newProps.group.isCollapsed !== this.state.isCollapsed) {
      this.setState({
        isCollapsed: newProps.group.isCollapsed
      });
    }
  }

  public render() {
    let { group } = this.props;
    let { isCollapsed } = this.state;

    let showCheckBox = true;
    let isSelected = group && group.isSelected;

    let checkBox = showCheckBox ? (
      <button
        tabIndex={ -1 }
        className='ms-GroupHeader-check'
        data-selection-toggle={ true }
      >
        <Check isChecked={ isSelected } />
      </button>
      ) :
      null;

    return group ? (
      <div className={ css('ms-GroupHeader ms-font-xl', {
          'is-selected': isSelected
        }) } onClick={ this._onToggleSelectGroup }>
        { checkBox }
        <i className={ css('ms-GroupHeader-expandButton ms-Icon ms-Icon--chevronDown', {
          'is-collapsed': isCollapsed
        }) } onClick={ this._onToggleCollapse }></i>
        <div className='ms-GroupHeader-title'>{ group.name } ( { group.count } )</div>
      </div>
    ) :
    null;
  }

  private _onToggleCollapse(ev?: any) {
    let { onToggleCollapse, groupIndex } = this.props;
    this.setState({
      isCollapsed: !this.state.isCollapsed
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
