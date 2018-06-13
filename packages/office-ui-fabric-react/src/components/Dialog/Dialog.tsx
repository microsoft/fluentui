import { styled } from '../../Utilities';
import { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { DialogBase } from './Dialog.base';
import { getStyles } from './Dialog.styles';

export const Dialog = styled<IDialogProps, IDialogStyleProps, IDialogStyles>(DialogBase, getStyles);
