import * as React from 'react';
import { styled } from '../../Utilities';
import { DetailsListBase } from './DetailsList.base';
import { getDetailsListStyles } from './DetailsList.styles';
import type { IDetailsListProps, IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types';

export const DetailsList: React.FunctionComponent<IDetailsListProps> = styled<
  IDetailsListProps,
  IDetailsListStyleProps,
  IDetailsListStyles
>(DetailsListBase, getDetailsListStyles, undefined, {
  scope: 'DetailsList',
});

export type { IDetailsListProps };
