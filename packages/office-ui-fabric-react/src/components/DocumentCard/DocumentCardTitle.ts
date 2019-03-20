import { styled } from '../../Utilities';
import { DocumentCardTitleBase } from './DocumentCardTitle.base';
import { getStyles } from './DocumentCardTitle.styles';
import { IDocumentCardTitleProps, IDocumentCardTitleStyleProps, IDocumentCardTitleStyles } from './DocumentCardTitle.types';

export const DocumentCardTitle: React.StatelessComponent<IDocumentCardTitleProps> = styled<
  IDocumentCardTitleProps,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles
>(DocumentCardTitleBase, getStyles, undefined, { scope: 'DocumentCardTitle' });
