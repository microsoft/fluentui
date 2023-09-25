import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupShowAll.styles';
import { GroupShowAllBase } from './GroupShowAll.base';
import type { IGroupShowAllProps, IGroupShowAllStyleProps, IGroupShowAllStyles } from './GroupShowAll.types';

export const GroupShowAll: React.FunctionComponent<IGroupShowAllProps> = styled<
  IGroupShowAllProps,
  IGroupShowAllStyleProps,
  IGroupShowAllStyles
>(GroupShowAllBase, getStyles, undefined, { scope: 'GroupShowAll' });

export type { IGroupShowAllProps };
