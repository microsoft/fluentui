import { styled } from '../../Utilities';
import { IDialogFooterProps, IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import { DialogFooterBase } from './DialogFooter.base';
import { getStyles } from './DialogFooter.styles';

export const DialogFooter: React.StatelessComponent<IDialogFooterProps> = styled<
  IDialogFooterProps,
  IDialogFooterStyleProps,
  IDialogFooterStyles
>(DialogFooterBase, getStyles, undefined, { scope: 'DialogFooter' });
