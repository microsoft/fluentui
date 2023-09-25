import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardStatusBase } from './DocumentCardStatus.base';
import { getStyles } from './DocumentCardStatus.styles';
import type {
  IDocumentCardStatusProps,
  IDocumentCardStatusStyleProps,
  IDocumentCardStatusStyles,
} from './DocumentCardStatus.types';

export const DocumentCardStatus: React.FunctionComponent<IDocumentCardStatusProps> = styled<
  IDocumentCardStatusProps,
  IDocumentCardStatusStyleProps,
  IDocumentCardStatusStyles
>(DocumentCardStatusBase, getStyles, undefined, { scope: 'DocumentCardStatus' });
