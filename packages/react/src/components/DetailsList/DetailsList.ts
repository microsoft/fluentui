import * as React from 'react';
import { styled } from '../../Utilities';
import { IDetailsListProps, IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types';
import { DetailsListBase } from './DetailsList.base';
import { getStyles } from './DetailsList.styles';

export { IDetailsListProps };

export const DetailsList: React.FunctionComponent<IDetailsListProps> = styled<
  IDetailsListProps,
  IDetailsListStyleProps,
  IDetailsListStyles
>(DetailsListBase, getStyles, undefined, {
  scope: 'DetailsList',
});
