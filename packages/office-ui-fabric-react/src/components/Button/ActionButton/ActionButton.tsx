import { styled, nullRender } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles } from './ActionButton.styles';

export const ActionButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    onRenderDescription: nullRender
  })
);