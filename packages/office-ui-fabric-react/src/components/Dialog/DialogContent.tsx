import { styled } from '../../Utilities';
import { IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import { DialogContentBase } from './DialogContent.base';
import { getStyles } from './DialogContent.styles';

export const DialogContent = styled<IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles>(
  DialogContentBase,
  getStyles,
  undefined,
  { scope: 'DialogContent' }
);
