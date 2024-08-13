import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BackgroundAppearanceContextValue } from '@fluentui/react-shared-contexts';

export type LinkSlots = {
  /**
   * Root of the component that renders as either an <a> or a <button> tag.
   */
  root: Slot<'a', 'button' | 'span'>;
};

export type LinkProps = ComponentProps<LinkSlots> & {
  /**
   * A link can appear either with its default style or subtle.
   * If not specified, the link appears with its default styling.
   * @default 'default'
   */
  appearance?: 'default' | 'subtle';

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
};

export type LinkState = ComponentState<LinkSlots> &
  Required<Pick<LinkProps, 'appearance' | 'disabled' | 'disabledFocusable' | 'inline'>> & {
    backgroundAppearance?: BackgroundAppearanceContextValue;
  };
