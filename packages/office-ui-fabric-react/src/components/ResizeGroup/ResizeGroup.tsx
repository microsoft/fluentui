import { styled } from '../../Utilities';
import { IResizeGroupProps, IResizeGroupStyleProps, IResizeGroupStyles } from './ResizeGroup.types';
import { ResizeGroupBase } from './ResizeGroup.base';
import { getStyles } from './ResizeGroup.styles';

export const ResizeGroup = styled<IResizeGroupProps, IResizeGroupStyleProps, IResizeGroupStyles>(
  ResizeGroupBase,
  getStyles,
  undefined,
  { scope: 'ResizeGroup' }
);
