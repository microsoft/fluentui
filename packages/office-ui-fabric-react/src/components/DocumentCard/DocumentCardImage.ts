import { styled } from '../../Utilities';
import { DocumentCardImageBase } from './DocumentCardImage.base';
import { getStyles } from './DocumentCardImage.styles';
import { IDocumentCardImageProps, IDocumentCardImageStyleProps, IDocumentCardImageStyles } from './DocumentCardImage.types';

export const DocumentCardImage = styled<IDocumentCardImageProps, IDocumentCardImageStyleProps, IDocumentCardImageStyles>(
  DocumentCardImageBase,
  getStyles,
  undefined,
  { scope: 'DocumentCardImage' }
);
