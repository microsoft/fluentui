import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'application' to 'root' slot
 */
export const videoBehavior: Accessibility<VideoBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'application',
    },
  },
});

export type VideoBehaviorProps = never;
