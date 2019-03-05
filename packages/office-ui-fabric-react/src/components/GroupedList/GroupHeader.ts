import { styled } from '../../Utilities';
import { getStyles } from './GroupHeader.styles';
import { GroupHeaderBase } from './GroupHeader.base';
import { IGroupHeaderProps, IGroupHeaderStyles, IGroupHeaderStyleProps } from './GroupHeader.types';
export { IGroupHeaderProps };

export const GroupHeader: React.StatelessComponent<IGroupHeaderProps> = styled<
  IGroupHeaderProps,
  IGroupHeaderStyleProps,
  IGroupHeaderStyles
>(GroupHeaderBase, getStyles, undefined, {
  scope: 'GroupHeader'
});
