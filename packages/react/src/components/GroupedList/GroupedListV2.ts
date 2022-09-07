import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './GroupedList.styles';
import { GroupedListV2Wrapper } from './GroupedListV2.base';
import type { IGroupedListProps, IGroupedListStyles, IGroupedListStyleProps } from './GroupedList.types';

/**
 * NOTE: GroupedListV2 is "unstable" and meant for preview use. It passes
 * the same test suite as GroupedList but it is an entirely new implementation
 * so it may have bugs and implementation details may change without notice.
 *
 * GroupedListV2 is an API-compatible replacement for GroupedList with a new implementation
 * that addresses issues GroupedList has with virtualizing nested lists under certain
 * conditions.
 */
const GroupedListV2: React.FunctionComponent<IGroupedListProps> = styled<
  IGroupedListProps,
  IGroupedListStyleProps,
  IGroupedListStyles
>(GroupedListV2Wrapper, getStyles, undefined, {
  scope: 'GroupedListV2',
});

GroupedListV2.displayName = 'GroupedListV2_unstable';

export { GroupedListV2 as GroupedListV2_unstable };
