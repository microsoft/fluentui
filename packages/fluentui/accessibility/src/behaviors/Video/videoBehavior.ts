import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'application' to 'root' slot
 */
export const videoBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'application',
    },
  },
});

export type VideoBehaviorProps = never;
