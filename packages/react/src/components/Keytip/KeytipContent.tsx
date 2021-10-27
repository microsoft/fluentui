import * as React from 'react';
import { styled } from '../../Utilities';
import { KeytipContentBase } from './KeytipContent.base';
import { getStyles } from './Keytip.styles';
import type { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';

export const KeytipContent: React.FunctionComponent<IKeytipProps> = styled<
  IKeytipProps,
  IKeytipStyleProps,
  IKeytipStyles
>(KeytipContentBase, getStyles, undefined, {
  scope: 'KeytipContent',
});
