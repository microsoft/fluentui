import { Accessibility } from '../../types';

export const buttonGroupBehavior: Accessibility<ButtonGroupBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type ButtonGroupBehaviorProps = never;
