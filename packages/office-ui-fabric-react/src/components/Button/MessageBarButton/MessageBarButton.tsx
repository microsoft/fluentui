import { styled, nullRender, customizable } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles } from './MessageBarButton.styles';

export const MessageBarButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    onRenderDescription: nullRender,
  })
);