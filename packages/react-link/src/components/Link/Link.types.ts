import * as React from 'react';
import type { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type LinkSlots = {
  root:
    | ObjectShorthandProps<JSX.IntrinsicElements['a'], HTMLAnchorElement, 'a'>
    | ObjectShorthandProps<JSX.IntrinsicElements['button'], HTMLButtonElement, 'button'>;
};

export type LinkCommons = {
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
   * URL the link points to. If not provided, the link renders as a button (unless that behavior is
   * overridden using `as`).
   */
  href?: string;

  /**
   * If true, changes styling when the link is being used alongside other text content.
   * @default false
   */
  inline?: boolean;

  /**
   * Click handler for the link.
   */
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Relationship to the linked URL (can be a space-separated list).
   * Most common values are `noreferrer` and/or `noopener`.
   * This prop is only applied if link is rendered as `<a>`.
   */
  rel?: string;

  /**
   * WAI-ARIA role applied to the element.
   * This prop is only applied if link is rendered as `<button>`.
   * @default "link"
   */
  role?: string;

  /**
   * If true, changes the link styling to emphasize that it represents an alternative action.
   * @default false
   */
  secondary?: boolean;

  /**
   * Where to open the linked URL. Common values are `_blank` (a new tab or window),
   * `_self` (the current window/context), `_parent`, and `_top`.
   * This prop is only applied if link is rendered as `<a>`.
   */
  target?: string;

  /**
   * Built-in HTML attribute with different behavior depending on how the link is rendered.
   * If rendered as `<a>`, hints at the MIME type.
   * If rendered as `<button>`, override the type of button (`button` is the default).
   */
  type?: string;
};

export type LinkProps = Omit<ComponentProps<LinkSlots>, 'type'> & LinkCommons & {};

export interface LinkState extends ComponentState<LinkSlots>, LinkCommons {}
