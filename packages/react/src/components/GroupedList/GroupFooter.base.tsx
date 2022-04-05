import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import { GroupSpacer } from './GroupSpacer';
import type { IGroupFooterStyleProps, IGroupFooterStyles, IGroupFooterProps } from './GroupFooter.types';

const getClassNames = classNamesFunction<IGroupFooterStyleProps, IGroupFooterStyles>();

export const GroupFooterBase: React.FunctionComponent<IGroupFooterProps> = props => {
  const { group, groupLevel, footerText, indentWidth, styles, theme } = props;
  const classNames = getClassNames(styles, { theme: theme! });

  if (group && footerText) {
    return (
      <div className={classNames.root}>
        <GroupSpacer indentWidth={indentWidth} count={groupLevel!} />
        {footerText}
      </div>
    );
  }

  return null;
};
