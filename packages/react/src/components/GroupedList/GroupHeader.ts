import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupHeader.styles';
import { GroupHeaderBase } from './GroupHeader.base';
import type { IGroupHeaderProps, IGroupHeaderStyles, IGroupHeaderStyleProps } from './GroupHeader.types';

export const GroupHeader: React.FunctionComponent<IGroupHeaderProps> = styled<
  IGroupHeaderProps,
  IGroupHeaderStyleProps,
  IGroupHeaderStyles
>(GroupHeaderBase, getStyles, undefined, {
  scope: 'GroupHeader',
});

export type { IGroupHeaderProps };
