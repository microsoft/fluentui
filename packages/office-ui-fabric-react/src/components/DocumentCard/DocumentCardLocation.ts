import { styled } from '../../Utilities';
import { DocumentCardLocationBase } from './DocumentCardLocation.base';
import { getStyles } from './DocumentCardLocation.styles';
import { IDocumentCardLocationProps, IDocumentCardLocationStyleProps, IDocumentCardLocationStyles } from './DocumentCardLocation.types';

export const DocumentCardLocation = styled<IDocumentCardLocationProps, IDocumentCardLocationStyleProps, IDocumentCardLocationStyles>(
  DocumentCardLocationBase,
  getStyles,
  undefined,
  { scope: 'DocumentCardLocationBase' }
);
