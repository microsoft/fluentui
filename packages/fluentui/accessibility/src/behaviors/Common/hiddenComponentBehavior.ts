import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-hidden=true' to 'root' slot.
 */
export const hiddenComponentBehavior: Accessibility<never> = () => {
  const definition = {
    attributes: {
      root: {
        'aria-hidden': true,
      },
    },
  };

  if (process.env.NODE_ENV !== 'production') {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'Hidden';
  }

  return definition;
};
