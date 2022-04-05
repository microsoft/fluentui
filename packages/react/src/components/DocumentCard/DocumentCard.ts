import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardBase } from './DocumentCard.base';
import { getStyles } from './DocumentCard.styles';
import type { IDocumentCardProps, IDocumentCardStyleProps, IDocumentCardStyles } from './DocumentCard.types';

export const DocumentCard: React.FunctionComponent<IDocumentCardProps> = styled<
  IDocumentCardProps,
  IDocumentCardStyleProps,
  IDocumentCardStyles
>(DocumentCardBase, getStyles, undefined, { scope: 'DocumentCard' });
