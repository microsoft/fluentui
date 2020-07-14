import { Accessibility } from '../../types';

/**
 * @description
 * Loader is usually an element that displays the progress status for a task that take a long time or consists of several steps.
 * Adds attribute 'aria-labelledby' on 'root' when loader has 'tabIndex' prop. This can be overriden by providing 'aria-labelledby' or 'aria-label' property directly to the component.
 *
 * @specification
 * Adds role 'progressbar' to 'root' slot.
 */
export const loaderBehavior: Accessibility<LoaderBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        role: 'progressbar',
        'aria-labelledby': getDefaultAriaLabelledBy(props),
      },
    },
  };
};

export type LoaderBehaviorProps = {
  /** id of the loader label element. */
  labelId?: string;
};

/**
 * Returns the id of the loader label if user provide tabIndex prop. It is used when user does not provide aria-label or
 * aria-labelledby as prop.
 */
const getDefaultAriaLabelledBy = (props: LoaderBehaviorProps) => {
  if (props['aria-label'] || props['aria-labelledby']) {
    return undefined;
  }
  return props['tabIndex'] === undefined ? undefined : props.labelId;
};
