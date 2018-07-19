import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { Link } from '../../Link';
import { IGroupShowAllProps } from './GroupShowAll.types';
import { IGroupShowAllStyleProps, IGroupShowAllStyles } from './GroupShowAll.types';
import { GroupSpacer } from './GroupSpacer';

const getClassNames = classNamesFunction<IGroupShowAllStyleProps, IGroupShowAllStyles>();

export class GroupShowAllBase extends BaseComponent<IGroupShowAllProps, {}> {
  public static defaultProps: IGroupShowAllProps = {
    showAllLinkText: 'Show All'
  };

  public render(): JSX.Element | null {
    const { group, groupLevel, showAllLinkText, styles, theme } = this.props;
    const classNames = getClassNames(styles, { theme: theme! });

    if (group) {
      return (
        <div className={classNames.root}>
          <GroupSpacer count={groupLevel!} />
          <Link onClick={this._onSummarizeClick}>{showAllLinkText}</Link>
        </div>
      );
    }
    return null;
  }

  private _onSummarizeClick = (ev: React.MouseEvent<HTMLElement>): void => {
    this.props.onToggleSummarize!(this.props.group!);

    ev.stopPropagation();
    ev.preventDefault();
  };
}
