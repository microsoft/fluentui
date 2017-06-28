import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.Props';
import { GroupSpacer } from './GroupSpacer';
import styles from './GroupFooter.scss';
// const styles: any = stylesImport;

export class GroupFooter extends BaseComponent<IGroupDividerProps, {}> {
  public render() {
    let { group, groupLevel, showAllLinkText } = this.props;

    return group && (
      <div className={ css('ms-groupFooter', styles.root) }>
        { GroupSpacer({ count: groupLevel }) }
        <Link onClick={ this._onSummarizeClick }>{ showAllLinkText }</Link>
      </div>
    );
  }

  @autobind
  private _onSummarizeClick(ev: React.MouseEvent<HTMLElement>) {
    this.props.onToggleSummarize(this.props.group);

    ev.stopPropagation();
    ev.preventDefault();
  }
}
