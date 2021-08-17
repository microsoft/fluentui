import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardLocationBase } from './DocumentCardLocation.base';
import { getStyles } from './DocumentCardLocation.styles';
import type {
  IDocumentCardLocationProps,
  IDocumentCardLocationStyleProps,
  IDocumentCardLocationStyles,
} from './DocumentCardLocation.types';

export const DocumentCardLocation: React.FunctionComponent<IDocumentCardLocationProps> = styled<
  IDocumentCardLocationProps,
  IDocumentCardLocationStyleProps,
  IDocumentCardLocationStyles
>(DocumentCardLocationBase, getStyles, undefined, { scope: 'DocumentCardLocation' });
