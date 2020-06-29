import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'application' to 'root' slot
 */
const videoBehavior: Accessibility = () => ({
  attributes: {
    root: {
      role: 'application',
    },
  },
});

export default videoBehavior;

export type VideoBehaviorProps = never;
