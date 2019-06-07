import * as React from 'react';
import { styled } from '../../Utilities';
import { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { DialogBase } from './Dialog.base';
import { getStyles } from './Dialog.styles';

export const Dialog: React.StatelessComponent<IDialogProps> = styled<IDialogProps, IDialogStyleProps, IDialogStyles>(
  DialogBase,
  getStyles,
  undefined,
  { scope: 'Dialog' }
);
