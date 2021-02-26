import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Link}
 */
export type LinkProps = ComponentProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement> &
  Omit<React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, 'type'> & {
    /**
     * URL the link points to. If not provided, the link renders as a button (unless that behavior is
     * overridden using `as`).
     */
    href?: string;

    /**
     * Click handler for the link.
     */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => void;

    /**
     * Relationship to the linked URL (can be a space-separated list).
     * Most common values are `noreferrer` and/or `noopener`.
     * This prop is only applied if `href` is set.
     */
    rel?: string;

    /**
     * Where to open the linked URL. Common values are `_blank` (a new tab or window),
     * `_self` (the current window/context), `_parent`, and `_top`.
     * This prop is only applied if `href` is set.
     */
    target?: string;

    /**
     * Built-in HTML attribute with different behavior depending on how the link is rendered.
     * If rendered as `<a>`, hints at the MIME type.
     * If rendered as `<button>`, override the type of button (`button` is the default).
     */
    type?: string;

    /**
     * Whether the link is disabled.
     * @defaultvalue false
     */
    disabled?: boolean;

    /**
     * When set, allows the link to be focusable even when it has been disabled. This is used in scenarios where it is
     * important to keep a consistent tab order for screen reader and keyboard users.
     * @defaultvalue false
     */
    disabledFocusable?: boolean;

    /**
     * If true, changes styling when the link is being used alongside other text content.
     * @defaultvalue false
     */
    inline?: boolean;

    /**
     * If true, changes the link styling to emphasize that it represents an alternative action.
     * @defaultvalue false
     */
    secondary?: boolean;
  };

/**
 * {@docCategory Link}
 */
export interface LinkState extends LinkProps {}
