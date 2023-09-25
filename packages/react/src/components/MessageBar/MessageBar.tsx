import * as React from 'react';
import { styled } from '../../Utilities';
import { MessageBarBase } from './MessageBar.base';
import { getStyles } from './MessageBar.styles';
import type { IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles } from './MessageBar.types';

export const MessageBar: React.FunctionComponent<IMessageBarProps> = styled<
  IMessageBarProps,
  IMessageBarStyleProps,
  IMessageBarStyles
>(MessageBarBase, getStyles, undefined, {
  scope: 'MessageBar',
});
