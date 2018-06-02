import { styled } from '../../Utilities';
import { ToggleBase } from './Toggle.base';
import { getStyles } from './Toggle.styles';
import { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

export const Toggle = styled<IToggleProps, IToggleStyleProps, IToggleStyles>(ToggleBase, getStyles);
