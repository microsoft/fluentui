import { styled } from '../../Styling';
import { IIconProps } from './Icon.types';
import { IconBase } from './Icon.base';
import { getStyles } from './Icon.styles';

export const Icon = styled(
  IconBase,
  getStyles
);
