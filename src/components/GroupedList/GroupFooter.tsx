import * as React from 'react';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.Props';
import { GroupSpacer } from './GroupSpacer';
import './GroupFooter.scss';

export class GroupFooter extends React.Component<IGroupDividerProps, {}> {
  public render() {
    let { group, groupLevel, showAllLinkText, onToggleSummarize } = this.props;

    return group && (
      <div className='ms-groupFooter'>
        { GroupSpacer({ count: groupLevel }) }
        <Link onClick={ onToggleSummarize }>{ showAllLinkText }</Link>
      </div>
    );
  }
}
