import { Accessibility } from '../../types';

/**
 * @description
 * Implements ARIA Radio Group design pattern.
 * @specification
 * Adds role='application'. This allows screen readers to handle the component as
 * a structure containing one or more focusable elements requiring user input, such as
 * keyboard or gesture events, that do not follow a standard interaction pattern supported
 * by a widget role.
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
