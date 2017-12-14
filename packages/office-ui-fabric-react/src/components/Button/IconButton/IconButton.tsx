import { styled, nullRender, customizable } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles } from './IconButton.styles';

export const IconButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    onRenderText: nullRender,
    onRenderDescription: nullRender,
  })
);