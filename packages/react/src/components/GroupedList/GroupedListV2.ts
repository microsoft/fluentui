import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupedList.styles';
import { GroupedListV2Wrapper } from './GroupedListV2.base';
import type { IGroupedListProps, IGroupedListStyles, IGroupedListStyleProps } from './GroupedList.types';

export const GroupedListV2: React.FunctionComponent<IGroupedListProps> = styled<
  IGroupedListProps,
  IGroupedListStyleProps,
  IGroupedListStyles
>(GroupedListV2Wrapper, getStyles, undefined, {
  scope: 'GroupedListV2',
});

export type { IGroupedListProps };
