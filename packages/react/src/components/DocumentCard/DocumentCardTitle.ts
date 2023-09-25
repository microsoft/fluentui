import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardTitleBase } from './DocumentCardTitle.base';
import { getStyles } from './DocumentCardTitle.styles';
import type {
  IDocumentCardTitleProps,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles,
} from './DocumentCardTitle.types';

export const DocumentCardTitle: React.FunctionComponent<IDocumentCardTitleProps> = styled<
  IDocumentCardTitleProps,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles
>(DocumentCardTitleBase, getStyles, undefined, { scope: 'DocumentCardTitle' });
