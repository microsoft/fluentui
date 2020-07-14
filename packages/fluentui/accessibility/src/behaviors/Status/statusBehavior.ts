import { Accessibility } from '../../types';

/**
 * @description
 * The 'img' role is used to identify an element as image. Alt attribute have to be provided on status component.
 *
 * @specification
 * Adds role='img'.
 */
export const statusBehavior: Accessibility<StatusBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'img',
    },
  },
});

export type StatusBehaviorProps = never;
