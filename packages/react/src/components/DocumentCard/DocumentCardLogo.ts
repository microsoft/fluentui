import * as React from 'react';
import { styled } from '../../Utilities';
import { DocumentCardLogoBase } from './DocumentCardLogo.base';
import { getStyles } from './DocumentCardLogo.styles';
import type {
  IDocumentCardLogoProps,
  IDocumentCardLogoStyleProps,
  IDocumentCardLogoStyles,
} from './DocumentCardLogo.types';

export const DocumentCardLogo: React.FunctionComponent<IDocumentCardLogoProps> = styled<
  IDocumentCardLogoProps,
  IDocumentCardLogoStyleProps,
  IDocumentCardLogoStyles
>(DocumentCardLogoBase, getStyles, undefined, { scope: 'DocumentCardLogo' });
