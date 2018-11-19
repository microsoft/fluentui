import { styled } from '../../Utilities';
import { MessageBarBase } from './MessageBar.base';
import { getStyles } from './MessageBar.styles';
import { IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles } from './MessageBar.types';

export const MessageBar: (props: IMessageBarProps) => JSX.Element = styled<IMessageBarProps, IMessageBarStyleProps, IMessageBarStyles>(
  MessageBarBase,
  getStyles,
  undefined,
  {
    scope: 'MessageBar'
  }
);
