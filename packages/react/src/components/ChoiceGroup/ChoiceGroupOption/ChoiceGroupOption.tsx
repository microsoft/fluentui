import * as React from 'react';
import { styled } from '../../../Utilities';
import { ChoiceGroupOptionBase } from './ChoiceGroupOption.base';
import { getStyles } from './ChoiceGroupOption.styles';
import type {
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles,
} from './ChoiceGroupOption.types';

export const ChoiceGroupOption: React.FunctionComponent<IChoiceGroupOptionProps> = styled<
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
>(ChoiceGroupOptionBase, getStyles, undefined, { scope: 'ChoiceGroupOption' });
