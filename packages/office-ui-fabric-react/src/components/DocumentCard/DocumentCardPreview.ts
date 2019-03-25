import { styled } from '../../Utilities';
import { DocumentCardPreviewBase } from './DocumentCardPreview.base';
import { getStyles } from './DocumentCardPreview.styles';
import { IDocumentCardPreviewProps, IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles } from './DocumentCardPreview.types';

export const DocumentCardPreview: React.StatelessComponent<IDocumentCardPreviewProps> = styled<
  IDocumentCardPreviewProps,
  IDocumentCardPreviewStyleProps,
  IDocumentCardPreviewStyles
>(DocumentCardPreviewBase, getStyles, undefined, { scope: 'DocumentCardPreview' });
