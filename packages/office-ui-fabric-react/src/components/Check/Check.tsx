import { styled } from '../../Utilities';
import { ICheckProps, ICheckStyleProps, ICheckStyles } from './Check.types';
import { CheckBase } from './Check.base';
import { getStyles } from './Check.styles';

export const Check = styled<ICheckProps, ICheckStyleProps, ICheckStyles>(CheckBase, getStyles, undefined, {
  scope: 'Check'
});
