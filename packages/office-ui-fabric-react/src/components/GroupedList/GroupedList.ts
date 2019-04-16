import { styled } from '../../Utilities';
import { getStyles } from './GroupedList.styles';
import { GroupedListBase } from './GroupedList.base';
import { IGroupedListProps, IGroupedListStyles, IGroupedListStyleProps } from './GroupedList.types';
export { IGroupedListProps };

export const GroupedList: React.StatelessComponent<IGroupedListProps> = styled<
  IGroupedListProps,
  IGroupedListStyleProps,
  IGroupedListStyles
>(GroupedListBase, getStyles, undefined, {
  scope: 'GroupedList'
});
