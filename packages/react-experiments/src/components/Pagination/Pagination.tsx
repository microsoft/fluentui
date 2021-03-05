import * as React from 'react';
import { styled } from '../../Utilities';
import { IPaginationProps, IPaginationStyleProps, IPaginationStyles } from './Pagination.types';
import { getStyles } from './Pagination.styles';
import { PaginationBase } from './Pagination.base';

export const Pagination: React.FunctionComponent<IPaginationProps> = styled<
  IPaginationProps,
  IPaginationStyleProps,
  IPaginationStyles
>(PaginationBase, getStyles, undefined, { scope: 'Pagination' });
