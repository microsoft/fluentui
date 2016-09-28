import * as React from 'react';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.Props';
import { GroupSpacer } from './GroupSpacer';
import { autobind } from '../../utilities/autobind';
import './GroupFooter.scss';

export class GroupFooter extends React.Component<IGroupDividerProps, {}> {
  public render() {
    let { group, groupLevel, showAllLinkText } = this.props;

    return group && (
      <div className='ms-groupFooter'>
        { GroupSpacer({ count: groupLevel }) }
        <Link onClick={ this._onSummarizeClick }>{ showAllLinkText }</Link>
      </div>
    );
  }

  @autobind
  private _onSummarizeClick(ev: React.MouseEvent) {
    this.props.onToggleSummarize(this.props.group);

    ev.stopPropagation();
    ev.preventDefault();
  }
}
