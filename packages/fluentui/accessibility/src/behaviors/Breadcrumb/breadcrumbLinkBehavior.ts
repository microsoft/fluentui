import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'. This can be overriden by providing 'aria-disabled' property directly to the component.
 */
export const breadcrumbLinkBehavior: Accessibility<BreadcrumbLinkBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': !!props.disabled,
      ...(props.current && { 'aria-current': 'page' }),
    },
  },
});

export type BreadcrumbLinkBehaviorProps = {
  disabled?: boolean;
  current?: boolean;
};
