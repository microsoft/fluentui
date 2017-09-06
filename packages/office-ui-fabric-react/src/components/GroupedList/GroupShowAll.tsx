import * as React from 'react';
import {
  BaseComponent,
  autobind,
  css
} from '../../Utilities';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.Props';
import { GroupSpacer } from './GroupSpacer';
import * as stylesImport from './GroupShowAll.scss';
const styles: any = stylesImport;

export class GroupShowAll extends BaseComponent<IGroupDividerProps, {}> {
  public render(): JSX.Element | null {
    let { group, groupLevel, showAllLinkText } = this.props;

    if (group) {
      return (
        <div className={ css('ms-groupFooter', styles.root) }>
          { GroupSpacer({ count: groupLevel! }) }
          <Link onClick={ this._onSummarizeClick }>{ showAllLinkText }</Link>
        </div>
      );
    }
    return null;
  }

  @autobind
  private _onSummarizeClick(ev: React.MouseEvent<HTMLElement>) {
    this.props.onToggleSummarize!(this.props.group!);

    ev.stopPropagation();
    ev.preventDefault();
  }
}
