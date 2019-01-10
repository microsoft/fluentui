import { styled } from '../../Utilities';
import { DocumentCardBase } from './DocumentCard.base';
import { getStyles } from './DocumentCard.styles';
import { IDocumentCardProps, IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';

export const DocumentCard = styled<IDocumentCardProps, IDocumentCardStyleProps, IDocumentCardStyles>(
  DocumentCardBase,
  getStyles,
  undefined,
  { scope: 'DocumentCard' }
);
