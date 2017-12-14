import { styled } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles } from './CommandBarButton.styles';

export const CommandBarButton = styled(
  SplitButtonBase,
  getStyles
);