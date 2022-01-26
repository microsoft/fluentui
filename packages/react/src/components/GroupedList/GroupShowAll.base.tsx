import * as React from 'react';
import { useCallback } from 'react';
import { classNamesFunction } from '../../Utilities';
import { Link } from '../../Link';
import { GroupSpacer } from './GroupSpacer';
import type { IGroupShowAllProps, IGroupShowAllStyleProps, IGroupShowAllStyles } from './GroupShowAll.types';

const getClassNames = classNamesFunction<IGroupShowAllStyleProps, IGroupShowAllStyles>();

export const GroupShowAllBase: React.FunctionComponent<IGroupShowAllProps> = props => {
  const { group, groupLevel, showAllLinkText = 'Show All', styles, theme, onToggleSummarize } = props;
  const classNames = getClassNames(styles, { theme: theme! });

  const memoizedOnClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      onToggleSummarize!(group!);

      ev.stopPropagation();
      ev.preventDefault();
    },
    [onToggleSummarize, group],
  );

  if (group) {
    return (
      <div className={classNames.root}>
        <GroupSpacer count={groupLevel!} />
        <Link onClick={memoizedOnClick}>{showAllLinkText}</Link>
      </div>
    );
  }

  return null;
};
