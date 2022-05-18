import * as React from 'react';
import { styled } from '../../Utilities';
import { ShimmeredDetailsListBase } from './ShimmeredDetailsList.base';
import { getShimmeredDetailsListStyles } from './ShimmeredDetailsList.styles';
import type {
  IShimmeredDetailsListProps,
  IShimmeredDetailsListStyleProps,
  IShimmeredDetailsListStyles,
} from './ShimmeredDetailsList.types';

export const ShimmeredDetailsList: React.FunctionComponent<IShimmeredDetailsListProps> = styled<
  IShimmeredDetailsListProps,
  IShimmeredDetailsListStyleProps,
  IShimmeredDetailsListStyles
>(ShimmeredDetailsListBase, getShimmeredDetailsListStyles, undefined, { scope: 'ShimmeredDetailsList' });
