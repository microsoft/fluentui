import { styled } from '../../Styling';
import { LabelBase } from './Label.base';
import { ILabelProps } from './Label.types';
import { getStyles } from './Label.styles';

export const Label = styled(
  LabelBase,
  getStyles
);
