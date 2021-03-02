import { Accessibility } from '../../types';

export const buttonGroupBehavior: Accessibility<ButtonGroupBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type ButtonGroupBehaviorProps = never;
