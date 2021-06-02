import * as React from 'react';
import { ComponentProps, ShorthandProps, ObjectShorthandProps } from '@fluentui/react-utilities';

export interface ComboboxProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Disables entire dropdown
   */
  disabled?: boolean;
}

export interface ComboboxState extends ComboboxProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Slot for the component children, avoid in favour of children and classnames for customization
   */
  content: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}
