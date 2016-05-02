import * as React from 'react';
import Link from '../Link/index';
import { IGroup, IDetailsGroupFooterProps } from './index';
import './GroupFooter.scss';

export interface IGroupFooterProps {
  group: IGroup;
  groupIndex: number;
  footerProps?: IDetailsGroupFooterProps;
}

export default class GroupFooter extends React.Component<IGroupFooterProps, {}> {
  constructor(props: IGroupFooterProps) {
    super(props);

    this._onToggleSummarize = this._onToggleSummarize.bind(this);
  }

  public render() {
    let { group, footerProps } = this.props;
    let showAllLinkText = footerProps && footerProps.showAllLinkText;

    return group && (
      <div className='ms-groupFooter'>
        <Link
          onClick={ this._onToggleSummarize }>
          { showAllLinkText }
        </Link>
      </div>
    );
  }

  private _onToggleSummarize() {
    let { group, footerProps } = this.props;
    let onToggleSummarize = footerProps && footerProps.onToggleSummarize;

    if (onToggleSummarize) {
      onToggleSummarize(group);
    }
  }
}
