import * as React from 'react';
import { styled } from '../../Utilities';
import { ChoiceGroupBase } from './ChoiceGroup.base';
import { IChoiceGroupProps, IChoiceGroupStyles, IChoiceGroupStyleProps } from './ChoiceGroup.types';
import { getStyles } from './ChoiceGroup.styles';

export const ChoiceGroup: React.FunctionComponent<IChoiceGroupProps> = styled<
  IChoiceGroupProps,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles
>(ChoiceGroupBase, getStyles, undefined, { scope: 'ChoiceGroup' });
