import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import { Link } from '../../Link';
import { IGroupDividerProps } from './GroupedList.Props';
import { GroupSpacer } from './GroupSpacer';
import * as stylesImport from './GroupFooter.scss';
const styles: any = stylesImport;

export class GroupFooter extends BaseComponent<IGroupDividerProps, {}> {
  public render(): JSX.Element | null {
    let { group, groupLevel, footerText } = this.props;

    if (group && footerText) {
      return (
        <div className={ css('ms-groupFooter', styles.root) }>
          { GroupSpacer({ count: groupLevel! }) }
          { footerText }
        </div>
      );
    }
    return null;
  }
}
