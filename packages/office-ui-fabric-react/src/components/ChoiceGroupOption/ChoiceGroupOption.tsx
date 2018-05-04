import { styled } from '../../Utilities';
import { ChoiceGroupOptionBase } from './ChoiceGroupOption.base';
import { IChoiceGroupOptionProps } from './ChoiceGroupOption.types';
import { getStyles } from './ChoiceGroupOption.styles';

export const ChoiceGroupOption = styled(ChoiceGroupOptionBase, getStyles);
