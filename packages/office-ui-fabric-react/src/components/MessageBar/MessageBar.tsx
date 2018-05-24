import { styled } from '../../Utilities';
import { MessageBarBase } from './MessageBar.base';
import { getStyles } from './MessageBar.styles';
import { IMessageBarProps } from './MessageBar.types';

export const MessageBar: (props: IMessageBarProps) => JSX.Element = styled(
  MessageBarBase,
  getStyles
);
