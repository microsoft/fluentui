import { styled } from '../../Utilities';
import { IDetailsHeaderProps, IDetailsHeaderBaseProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types';
import { DetailsHeaderBase } from './DetailsHeader.base';
import { getStyles } from './DetailsHeader.styles';

export { IDetailsHeaderProps, IDetailsHeaderBaseProps };

export const DetailsHeader: React.StatelessComponent<IDetailsHeaderBaseProps> = styled<
  IDetailsHeaderBaseProps,
  IDetailsHeaderStyleProps,
  IDetailsHeaderStyles
>(DetailsHeaderBase, getStyles, undefined, { scope: 'DetailsHeader' });
