import { styled } from '../../Utilities';
import { ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';
import { getStyles } from './Separator.styles';
import { SeparatorBase } from './Separator.base';

export const Separator: React.StatelessComponent<ISeparatorProps> = styled<ISeparatorProps, ISeparatorStyleProps, ISeparatorStyles>(
  SeparatorBase,
  getStyles,
  undefined,
  {
    scope: 'Separator'
  }
);
