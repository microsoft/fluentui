import { styled } from '../../Utilities';
import {
  IBaseChicletProps,
  IBaseChicletStyleProps,
  IBaseChicletStyles
} from './BaseChiclet.types';
import { getStyles } from './BaseChiclet.styles';
import { BaseChicletBase } from './BaseChiclet.base';

export const BaseChiclet = styled<IBaseChicletProps, IBaseChicletStyleProps, IBaseChicletStyles>(
  BaseChicletBase,
  getStyles
);