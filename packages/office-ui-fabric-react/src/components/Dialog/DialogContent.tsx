import { styled } from '../../Utilities';
import { IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import { DialogContentBase } from './DialogContent.base';
import { getStyles } from './DialogContent.styles';

export const DialogContent: React.StatelessComponent<IDialogContentProps> = styled<
  IDialogContentProps,
  IDialogContentStyleProps,
  IDialogContentStyles
>(DialogContentBase, getStyles, undefined, { scope: 'DialogContent' });
