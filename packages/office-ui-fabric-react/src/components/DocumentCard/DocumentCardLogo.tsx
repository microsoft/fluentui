import { styled } from '../../Utilities';
import { DocumentCardLogoBase } from './DocumentCardLogo.base';
import { getStyles } from './DocumentCardLogo.styles';
import { IDocumentCardLogoProps, IDocumentCardLogoStyleProps, IDocumentCardLogoStyles } from './DocumentCardLogo.types';

export const DocumentCardLogo = styled<IDocumentCardLogoProps, IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>(
  DocumentCardLogoBase,
  getStyles,
  undefined,
  { scope: 'DocumentCardLogoBase' }
);
