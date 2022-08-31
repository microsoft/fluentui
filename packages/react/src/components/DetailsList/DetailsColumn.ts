import * as React from 'react';
import { styled } from '../../Utilities';
import { DetailsColumnBase } from './DetailsColumn.base';
import { getDetailsColumnStyles } from './DetailsColumn.styles';
import type { IDetailsColumnProps, IDetailsColumnStyleProps, IDetailsColumnStyles } from './DetailsColumn.types';

export const DetailsColumn: React.FunctionComponent<IDetailsColumnProps> = styled<
  IDetailsColumnProps,
  IDetailsColumnStyleProps,
  IDetailsColumnStyles
>(DetailsColumnBase, getDetailsColumnStyles, undefined, { scope: 'DetailsColumn' });

export type { IDetailsColumnProps };
