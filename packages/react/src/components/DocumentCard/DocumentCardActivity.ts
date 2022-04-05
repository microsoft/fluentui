import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardActivityBase } from './DocumentCardActivity.base';
import { getStyles } from './DocumentCardActivity.styles';
import type {
  IDocumentCardActivityProps,
  IDocumentCardActivityStyleProps,
  IDocumentCardActivityStyles,
} from './DocumentCardActivity.types';

export const DocumentCardActivity: React.FunctionComponent<IDocumentCardActivityProps> = styled<
  IDocumentCardActivityProps,
  IDocumentCardActivityStyleProps,
  IDocumentCardActivityStyles
>(DocumentCardActivityBase, getStyles, undefined, { scope: 'DocumentCardActivity' });
