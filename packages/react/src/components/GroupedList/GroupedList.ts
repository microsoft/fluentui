import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupedList.styles';
import { GroupedListBase } from './GroupedList.base';
import type { IGroupedListProps, IGroupedListStyles, IGroupedListStyleProps } from './GroupedList.types';

export const GroupedList: React.FunctionComponent<IGroupedListProps> = styled<
  IGroupedListProps,
  IGroupedListStyleProps,
  IGroupedListStyles
>(GroupedListBase, getStyles, undefined, {
  scope: 'GroupedList',
});

export type { IGroupedListProps };
