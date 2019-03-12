import { styled } from '../../Utilities';
import { DocumentCardBase } from './DocumentCard.base';
import { getStyles } from './DocumentCard.styles';
import { IDocumentCardProps, IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';

export const DocumentCard: React.StatelessComponent<IDocumentCardProps> = styled<
  IDocumentCardProps,
  IDocumentCardStyleProps,
  IDocumentCardStyles
>(DocumentCardBase, getStyles, undefined, { scope: 'DocumentCard' });
