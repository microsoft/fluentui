import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardPreviewBase } from './DocumentCardPreview.base';
import { getStyles } from './DocumentCardPreview.styles';
import type {
  IDocumentCardPreviewProps,
  IDocumentCardPreviewStyleProps,
  IDocumentCardPreviewStyles,
} from './DocumentCardPreview.types';

export const DocumentCardPreview: React.FunctionComponent<IDocumentCardPreviewProps> = styled<
  IDocumentCardPreviewProps,
  IDocumentCardPreviewStyleProps,
  IDocumentCardPreviewStyles
>(DocumentCardPreviewBase, getStyles, undefined, { scope: 'DocumentCardPreview' });
