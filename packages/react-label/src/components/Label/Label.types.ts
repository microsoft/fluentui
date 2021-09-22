import * as React from 'react';
import type {
  ComponentPropsCompat,
  ComponentStateCompat,
  ObjectShorthandPropsCompat,
  ShorthandPropsCompat,
} from '@fluentui/react-utilities';

/**
 * Label Props
 */
export type LabelProps = ComponentPropsCompat &
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    /**
     * Renders the label as disabled
     * @defaultvalue false
     */
    disabled?: boolean;

    /**
     * Displays and indicator that the label is for a required field. The required prop can be set to true to display
     * an asterisk (*). Or it can be set to a string or jsx content to display a different indicator.
     * @defaultvalue false
     */
    required?: boolean | ShorthandPropsCompat<ComponentPropsCompat>;

    /**
     * A label supports different sizes.
     * @defaultvalue 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * A label supports semibold/strong fontweight.
     * @defaultvalue false
     */
    strong?: boolean;
  };

/**
 * Names of the shorthand properties in LabelProps
 */
export type LabelShorthandProps = 'required';

/**
 * Names of LabelProps that have a default value in useLabel
 */
export type LabelDefaultedProps = 'size';

/**
 * State used in rendering Label
 */
export type LabelState = ComponentStateCompat<LabelProps, LabelShorthandProps, LabelDefaultedProps> & {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;

  /**
   * The required prop resolved to a slot object
   */
  required?: ObjectShorthandPropsCompat<ComponentPropsCompat>;
};
