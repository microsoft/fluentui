import { styled } from '../../Utilities';
import { DocumentCardStatusBase } from './DocumentCardStatus.base';
import { getStyles } from './DocumentCardStatus.styles';
import { IDocumentCardStatusProps, IDocumentCardStatusStyleProps, IDocumentCardStatusStyles } from './DocumentCardStatus.types';

export const DocumentCardStatus: React.StatelessComponent<IDocumentCardStatusProps> = styled<
  IDocumentCardStatusProps,
  IDocumentCardStatusStyleProps,
  IDocumentCardStatusStyles
>(DocumentCardStatusBase, getStyles, undefined, { scope: 'DocumentCardStatus' });
