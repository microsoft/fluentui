import { styled } from '../../Utilities';
import { IDetailsHeaderProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles } from './DetailsHeader.types';
import { DetailsHeaderBase } from './DetailsHeader.base';
import { getStyles } from './DetailsHeader.styles';

export { IDetailsHeaderProps };

export const DetailsHeader = styled<IDetailsHeaderProps, IDetailsHeaderStyleProps, IDetailsHeaderStyles>(
  DetailsHeaderBase,
  getStyles,
  undefined,
  { scope: 'DetailsHeader' }
);
