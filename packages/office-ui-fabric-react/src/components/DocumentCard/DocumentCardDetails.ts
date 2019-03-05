import { styled } from '../../Utilities';
import { DocumentCardDetailsBase } from './DocumentCardDetails.base';
import { getStyles } from './DocumentCardDetails.styles';
import { IDocumentCardDetailsProps, IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles } from './DocumentCardDetails.types';

export const DocumentCardDetails: React.StatelessComponent<IDocumentCardDetailsProps> = styled<
  IDocumentCardDetailsProps,
  IDocumentCardDetailsStyleProps,
  IDocumentCardDetailsStyles
>(DocumentCardDetailsBase, getStyles, undefined, { scope: 'DocumentCardDetails' });
