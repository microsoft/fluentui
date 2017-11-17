import { styled } from '../../Styling';
import { ToggleBase } from './Toggle.base';
import { IToggleProps } from './Toggle.types';
import { getStyles } from './Toggle.styles';

export const Toggle = styled(
  ToggleBase,
  getStyles
);
