import { styled } from '../../Utilities';
import { IPaginationProps, IPaginationStyleProps, IPaginationStyles } from './Pagination.types';
import { getStyles } from './Pagination.styles';
import { PaginationBase } from './Pagination.base';

export const Pagination: React.StatelessComponent<IPaginationProps> = styled<IPaginationProps, IPaginationStyleProps, IPaginationStyles>(
  PaginationBase,
  getStyles,
  undefined,
  { scope: 'Pagination' }
);
