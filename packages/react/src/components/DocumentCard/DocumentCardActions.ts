import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardActionsBase } from './DocumentCardActions.base';
import { getStyles } from './DocumentCardActions.styles';
import type {
  IDocumentCardActionsProps,
  IDocumentCardActionsStyleProps,
  IDocumentCardActionsStyles,
} from './DocumentCardActions.types';

export const DocumentCardActions: React.FunctionComponent<IDocumentCardActionsProps> = styled<
  IDocumentCardActionsProps,
  IDocumentCardActionsStyleProps,
  IDocumentCardActionsStyles
>(DocumentCardActionsBase, getStyles, undefined, { scope: 'DocumentCardActions' });
