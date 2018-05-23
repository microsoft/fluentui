import { styled } from '../../Utilities';
import { ChoiceGroupBase } from './ChoiceGroup.base';
import { IChoiceGroupProps } from './ChoiceGroup.types';
import { getStyles } from './ChoiceGroup.styles';

export const ChoiceGroup: (props: IChoiceGroupProps) => JSX.Element = styled(ChoiceGroupBase, getStyles);
