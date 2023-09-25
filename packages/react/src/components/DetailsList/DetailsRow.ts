import * as React from 'react';
import { styled } from '../../Utilities';
import { DetailsRowBase } from './DetailsRow.base';
import { getDetailsRowStyles } from './DetailsRow.styles';
import type {
  IDetailsRowProps,
  IDetailsRowBaseProps,
  IDetailsRowStyleProps,
  IDetailsRowStyles,
} from './DetailsRow.types';

export const DetailsRow: React.FunctionComponent<IDetailsRowBaseProps> = styled<
  IDetailsRowBaseProps,
  IDetailsRowStyleProps,
  IDetailsRowStyles
>(DetailsRowBase, getDetailsRowStyles, undefined, {
  scope: 'DetailsRow',
});

export type { IDetailsRowProps, IDetailsRowBaseProps };
