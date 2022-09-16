import * as React from 'react';
import { classNamesFunction, SelectionMode } from '../../Utilities';
import { GroupSpacer } from './GroupSpacer';
import type { IGroupFooterStyleProps, IGroupFooterStyles, IGroupFooterProps } from './GroupFooter.types';
import { CHECK_CELL_WIDTH } from '../DetailsList/DetailsRowCheck.styles';

const getClassNames = classNamesFunction<IGroupFooterStyleProps, IGroupFooterStyles>();

export const GroupFooterBase: React.FunctionComponent<IGroupFooterProps> = props => {
  const { group, groupLevel, footerText, indentWidth, styles, theme } = props;
  const classNames = getClassNames(styles, { theme: theme! });

  if (group && footerText) {
    return (
      <div className={classNames.root}>
        {props.selectionMode !== SelectionMode.none && <GroupSpacer indentWidth={CHECK_CELL_WIDTH} count={1} />}
        <GroupSpacer indentWidth={indentWidth} count={groupLevel!} />
        <span className={classNames.title}>{footerText}</span>
      </div>
    );
  }

  return null;
};
