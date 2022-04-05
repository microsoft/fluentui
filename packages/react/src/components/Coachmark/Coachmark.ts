import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './Coachmark.styles';
import { CoachmarkBase } from './Coachmark.base';
import type { ICoachmarkProps, ICoachmarkStyleProps, ICoachmarkStyles } from './Coachmark.types';

export const Coachmark: React.FunctionComponent<ICoachmarkProps> = styled<
  ICoachmarkProps,
  ICoachmarkStyleProps,
  ICoachmarkStyles
>(CoachmarkBase, getStyles, undefined, {
  scope: 'Coachmark',
});
