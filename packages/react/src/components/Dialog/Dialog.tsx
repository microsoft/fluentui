import * as React from 'react';
import { styled } from '../../Utilities';
import { DialogBase } from './Dialog.base';
import { getStyles } from './Dialog.styles';
import type { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';

export const Dialog: React.FunctionComponent<IDialogProps> = styled<IDialogProps, IDialogStyleProps, IDialogStyles>(
  DialogBase,
  getStyles,
  undefined,
  { scope: 'Dialog' },
);
Dialog.displayName = 'Dialog';
