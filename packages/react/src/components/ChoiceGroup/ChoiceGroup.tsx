import * as React from 'react';
import { styled } from '../../Utilities';
import { ChoiceGroupBase } from './ChoiceGroup.base';
import { getStyles } from './ChoiceGroup.styles';
import type { IChoiceGroupProps, IChoiceGroupStyles, IChoiceGroupStyleProps } from './ChoiceGroup.types';

export const ChoiceGroup: React.FunctionComponent<IChoiceGroupProps> = styled<
  IChoiceGroupProps,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles
>(ChoiceGroupBase, getStyles, undefined, { scope: 'ChoiceGroup' });
