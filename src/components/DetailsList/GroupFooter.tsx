import * as React from 'react';
import Link from '../Link/index';
import { IGroup } from './index';
import './GroupFooter.scss';

export interface IGroupFooterProps {
  group: IGroup;
  groupIndex: number;
  groupItemLimit: number;
  showAllLinkText?: string;
  onToggleSummarize?: (groupIndex: number) => void;
}

export default class GroupFooter extends React.Component<IGroupFooterProps, {}> {
  constructor(props: IGroupFooterProps) {
    super(props);

    this._onToggleSummarize = this._onToggleSummarize.bind(this);
  }

  public render() {
    let { group, groupItemLimit, showAllLinkText } = this.props;

    let showFooter = group && !group.isShowingAll && group.count > groupItemLimit;

    return showFooter ? (
      <div className='ms-groupFooter'>
        <Link
          onClick={ this._onToggleSummarize }>
          { showAllLinkText }
        </Link>
      </div>
    ) :
    null;
  }

  private _onToggleSummarize() {
    let { groupIndex, onToggleSummarize } = this.props;

    if (onToggleSummarize) {
      onToggleSummarize(groupIndex);
    }
  }
}
