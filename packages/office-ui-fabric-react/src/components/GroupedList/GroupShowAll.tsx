import { styled } from '../../Utilities';
import { getStyles } from './GroupShowAll.styles';
import { GroupShowAllBase } from './GroupShowAll.base';
import { IGroupShowAllProps } from './GroupShowAll.types';
export { IGroupShowAllProps };

export const GroupShowAll = styled(GroupShowAllBase, getStyles, undefined, { scope: 'GroupShowAll' });
