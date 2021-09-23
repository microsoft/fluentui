import * as React from 'react';
import { ComponentPropsCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

export type DividerProps = ComponentPropsCompat &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Determines the alignment of the content within the divider.
     * @defaultvalue 'center'
     */
    alignContent?: 'start' | 'end' | 'center';

    /**
     * A divider can have one of the preset appearances.
     * When not specified, the divider has its default appearance.
     */
    appearance?: 'brand' | 'strong' | 'subtle';

    /**
     * Adds padding to the begining and end of the divider
     */
    inset?: boolean;

    /**
     * A divider can be horizontal (default) or vertical
     * @default false
     */
    vertical?: boolean;

    /**
     * Accessibility wrapper for content when presented.
     * A shorthand prop can be a literal, object, or
     * JSX. The `children` prop of the object can be a render function,
     * taking in the original slot component and props.
     */
    wrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLDivElement>>;
  };

export type DividerState = DividerProps & {
  /**
   * Ref to the root slot
   */
  ref: React.RefObject<HTMLElement>;

  /**
   * The Id created to expose accessability for readers
   */
  labelledById?: string;
};
