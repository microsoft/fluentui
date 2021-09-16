import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type LinkSlots = {
  root: IntrinsicShorthandProps<'a', 'button'>;
};

export interface LinkCommons {
  /**
   * Whether the link is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * When set, allows the link to be focusable even when it has been disabled. This is used in scenarios where it is
   * important to keep a consistent tab order for screen reader and keyboard users.
   * @default false
   */
  disabledFocusable?: boolean;

  /**
   * If true, changes styling when the link is being used alongside other text content.
   * @default false
   */
  inline?: boolean;

  /**
   * If true, changes the link styling to emphasize that it represents an alternative action.
   * @default false
   */
  secondary?: boolean;
}

export type LinkProps = ComponentProps<LinkSlots> & LinkCommons;

export type LinkState = ComponentState<LinkSlots> & LinkCommons;
