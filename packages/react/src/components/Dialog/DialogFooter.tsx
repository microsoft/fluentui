import * as React from 'react';
import { styled } from '../../Utilities';
import { DialogFooterBase } from './DialogFooter.base';
import { getStyles } from './DialogFooter.styles';
import type { IDialogFooterProps, IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';

export const DialogFooter: React.FunctionComponent<IDialogFooterProps> = styled<
  IDialogFooterProps,
  IDialogFooterStyleProps,
  IDialogFooterStyles
>(DialogFooterBase, getStyles, undefined, { scope: 'DialogFooter' });

DialogFooter.displayName = 'DialogFooter';
