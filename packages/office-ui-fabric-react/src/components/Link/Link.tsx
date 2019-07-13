import * as React from 'react';
import { styled } from '../../Utilities';
import { LinkBase } from './Link.base';
import { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';
import { getStyles } from './Link.styles';

export const Link: React.StatelessComponent<ILinkProps> = styled<ILinkProps, ILinkStyleProps, ILinkStyles>(LinkBase, getStyles, undefined, {
  scope: 'Link'
});
