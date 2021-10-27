import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './Pagination.styles';
import { PaginationBase } from './Pagination.base';
import type { IPaginationProps, IPaginationStyleProps, IPaginationStyles } from './Pagination.types';

export const Pagination: React.FunctionComponent<IPaginationProps> = styled<
  IPaginationProps,
  IPaginationStyleProps,
  IPaginationStyles
>(PaginationBase, getStyles, undefined, { scope: 'Pagination' });
