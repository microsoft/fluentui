import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupFooter.styles';
import { GroupFooterBase } from './GroupFooter.base';
import { IGroupFooterProps, IGroupFooterStyles, IGroupFooterStyleProps } from './GroupFooter.types';
export { IGroupFooterProps };

export const GroupFooter: React.FunctionComponent<IGroupFooterProps> = styled<
  IGroupFooterProps,
  IGroupFooterStyleProps,
  IGroupFooterStyles
>(GroupFooterBase, getStyles, undefined, {
  scope: 'GroupFooter',
});
