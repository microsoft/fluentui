import { styled } from '../../Utilities';
import { DocumentCardActionsBase } from './DocumentCardActions.base';
import { getStyles } from './DocumentCardActions.styles';
import { IDocumentCardActionsProps, IDocumentCardActionsStyleProps, IDocumentCardActionsStyles } from './DocumentCardActions.types';

export const DocumentCardActions: React.StatelessComponent<IDocumentCardActionsProps> = styled<
  IDocumentCardActionsProps,
  IDocumentCardActionsStyleProps,
  IDocumentCardActionsStyles
>(DocumentCardActionsBase, getStyles, undefined, { scope: 'DocumentCardActions' });
