import { styled } from '../../Utilities';
import { IIconProps } from './Icon.types';
import { IconBase } from './Icon.base';
import { getStyles } from './Icon.styles';

export const Icon = styled(
  IconBase,
  getStyles
);
