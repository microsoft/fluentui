import { styled } from '../../Utilities';
import { DocumentCardActivityBase } from './DocumentCardActivity.base';
import { getStyles } from './DocumentCardActivity.styles';
import { IDocumentCardActivityProps, IDocumentCardActivityStyleProps, IDocumentCardActivityStyles } from './DocumentCardActivity.types';

export const DocumentCardActivity = styled<IDocumentCardActivityProps, IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>(
  DocumentCardActivityBase,
  getStyles,
  undefined,
  { scope: 'DocumentCardActivityBase' }
);
