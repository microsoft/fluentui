import { styled } from '../../Utilities';
import { ShimmeredDetailsListBase } from './ShimmeredDetailsList.base';
import { getStyles } from './ShimmeredDetailsList.styles';
import { IShimmeredDetailsListProps, IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';

export const ShimmeredDetailsList: React.StatelessComponent<IShimmeredDetailsListProps> = styled<
  IShimmeredDetailsListProps,
  IShimmeredDetailsListStyleProps,
  IShimmeredDetailsListStyles
>(ShimmeredDetailsListBase, getStyles, undefined, { scope: 'ShimmeredDetailsList' });
