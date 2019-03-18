import { styled } from '../../Utilities';
import { ICoachmarkProps, ICoachmarkStyleProps, ICoachmarkStyles } from './Coachmark.types';
import { getStyles } from './Coachmark.styles';
import { CoachmarkBase } from './Coachmark.base';

export const Coachmark: React.StatelessComponent<ICoachmarkProps> = styled<ICoachmarkProps, ICoachmarkStyleProps, ICoachmarkStyles>(
  CoachmarkBase,
  getStyles,
  undefined,
  {
    scope: 'Coachmark'
  }
);
