import { styled } from '../../../Utilities';
import { ChoiceGroupOptionBase } from './ChoiceGroupOption.base';
import { IChoiceGroupOptionProps, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types';
import { getStyles } from './ChoiceGroupOption.styles';

export const ChoiceGroupOption: React.StatelessComponent<IChoiceGroupOptionProps> = styled<
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
>(ChoiceGroupOptionBase, getStyles, undefined, { scope: 'ChoiceGroupOption' });
