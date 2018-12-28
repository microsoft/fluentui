import * as React from 'react';
import { styled, classNamesFunction } from '../../Utilities';
import { IGroupSpacerProps, IGroupSpacerStyleProps, IGroupSpacerStyles } from './GroupSpacer.types';
import { getStyles } from './GroupSpacer.styles';

const getClassNames = classNamesFunction<IGroupSpacerStyleProps, IGroupSpacerStyles>();

export const SPACER_WIDTH = 32;

export const GroupSpacer = styled<IGroupSpacerProps, IGroupSpacerStyleProps, IGroupSpacerStyles>(
  (props: IGroupSpacerProps) => {
    const { count, styles, theme, indentWidth = SPACER_WIDTH } = props;
    const classNames = getClassNames(styles, {
      theme: theme!
    });

    return count > 0 ? <span className={classNames.root} style={{ width: count * indentWidth }} /> : null;
  },
  getStyles,
  undefined,
  { scope: 'GroupSpacer' }
);
