import { styled } from '../../Utilities';
import { OverflowSetBase } from './OverflowSet.base';
import { getStyles } from './OverflowSet.styles';
import { IOverflowSetProps } from './OverflowSet.types';

export const OverflowSet: React.StatelessComponent<IOverflowSetProps> = styled(OverflowSetBase, getStyles, undefined, {
  scope: 'OverflowSet'
});
