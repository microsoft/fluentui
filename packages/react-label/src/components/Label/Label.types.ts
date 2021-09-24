import type {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * Label Props
 */
export type LabelCommons = {
  /**
   * Renders the label as disabled
   * @defaultvalue false
   */
  disabled: boolean;

  /**
   * A label supports different sizes.
   * @defaultvalue 'medium'
   */
  size: 'small' | 'medium' | 'large';

  /**
   * A label supports semibold/strong fontweight.
   * @defaultvalue false
   */
  strong: boolean;
};

/**
 * Names of the shorthand properties in LabelProps
 */
export type LabelShorthandProps = 'required';

/**
 * Names of LabelProps that have a default value in useLabel
 */
export type LabelDefaultedProps = 'size';

export type LabelSlots = {
  root: IntrinsicShorthandProps<'label'>;
  required?: IntrinsicShorthandProps<'span'>;
};

/**
 * State used in rendering Label
 */
export type LabelState = ComponentState<LabelSlots> & LabelCommons;

export type LabelProps = Omit<ComponentProps<LabelSlots>, 'required'> &
  Partial<LabelCommons> & {
    /**
     * Displays and indicator that the label is for a required field. The required prop can be set to true to display
     * an asterisk (*). Or it can be set to a string or jsx content to display a different indicator.
     * @defaultvalue false
     */
    required?: boolean | ObjectShorthandProps<React.HTMLAttributes<HTMLElement>> | React.ReactNode;
  };
