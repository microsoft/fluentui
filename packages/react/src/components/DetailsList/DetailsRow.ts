import * as React from 'react';
import { styled } from '../../Utilities';
import { IDetailsRowProps, IDetailsRowBaseProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';
import { DetailsRowBase } from './DetailsRow.base';
import { getDetailsRowStyles } from './DetailsRow.styles';

export { IDetailsRowProps, IDetailsRowBaseProps };

export const DetailsRow: React.FunctionComponent<IDetailsRowBaseProps> = styled<
  IDetailsRowBaseProps,
  IDetailsRowStyleProps,
  IDetailsRowStyles
>(DetailsRowBase, getDetailsRowStyles, undefined, {
  scope: 'DetailsRow',
});
