import * as React from 'react';
import { styled } from '../../Utilities';
import { DialogContentBase } from './DialogContent.base';
import { getStyles } from './DialogContent.styles';
import type { IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';

export const DialogContent: React.FunctionComponent<IDialogContentProps> = styled<
  IDialogContentProps,
  IDialogContentStyleProps,
  IDialogContentStyles
>(DialogContentBase, getStyles, undefined, { scope: 'DialogContent' });

DialogContent.displayName = 'DialogContent';
