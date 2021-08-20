import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { LinkBase } from './Link.base';
import { getStyles } from './Link.styles';
import type { ILinkProps, ILinkStyleProps, ILinkStyles } from './Link.types';

export const Link: React.FunctionComponent<ILinkProps> = styled<ILinkProps, ILinkStyleProps, ILinkStyles>(
  LinkBase,
  getStyles,
  undefined,
  {
    scope: 'Link',
  },
);
