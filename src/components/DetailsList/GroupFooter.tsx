import * as React from 'react';
import { Link } from '../../Link';
import {
  IDetailsGroupFooterProps,
  IGroup,
  } from './DetailsList.Props';
import { GroupSpacer } from './GroupSpacer';
import './GroupFooter.scss';

export interface IGroupFooterProps {
  group: IGroup;
  groupIndex: number;
  groupLevel: number;
  footerProps?: IDetailsGroupFooterProps;
}

export class GroupFooter extends React.Component<IGroupFooterProps, {}> {
  constructor(props: IGroupFooterProps) {
    super(props);

    this._onToggleSummarize = this._onToggleSummarize.bind(this);
  }

  public render() {
    let { group, groupLevel, footerProps } = this.props;
    let showAllLinkText = footerProps && footerProps.showAllLinkText;

    return group && (
      <div className='ms-groupFooter'>
        { GroupSpacer({ count: groupLevel }) }
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
