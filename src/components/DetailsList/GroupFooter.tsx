import * as React from 'react';
import './GroupFooter.scss';
import { IGroup } from './interfaces';

export interface IGroupFooterProps {
  group: IGroup;
  groupIndex: number;
  groupItemLimit: number;
  onShowMore?: (groupIndex: number) => void;
}

export interface IGroupFooterState {
}

export default class GroupFooter extends React.Component<IGroupFooterProps, IGroupFooterState> {
  constructor(props: IGroupFooterProps) {
    super(props);

    this._onShowMore = this._onShowMore.bind(this);
  }

  public render() {
    let { group, groupItemLimit } = this.props;

    let showFooter = group && !group.isShowingAll && group.count > groupItemLimit;

    return showFooter ? (
      <div className='ms-groupFooter ms-font-s' onClick={ this._onShowMore } >
        Show All
      </div>
    ) :
    null;
  }

  private _onShowMore() {
    let { groupIndex, onShowMore } = this.props;

    if (onShowMore) {
      onShowMore(groupIndex);
    }
  }
}
