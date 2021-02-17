import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utils';

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
     * Where to open the linked URL. Common values are `_blank` (a new tab or window),
     * `_self` (the current window/context), `_parent`, and `_top`.
     * This prop is only applied if `href` is set.
     */
    target?: string;

    /**
     * Relationship to the linked URL (can be a space-separated list).
     * Most common values are `noreferrer` and/or `noopener`.
     * This prop is only applied if `href` is set.
     */
    rel?: string;

    /**
     * Click handler for the link.
     */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => void;

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
     * Built-in HTML attribute with different behavior depending on how the link is rendered.
     * If rendered as `<a>`, hints at the MIME type.
     * If rendered as `<button>`, override the type of button (`button` is the default).
     */
    type?: string;

    /**
     * If true, changes styling when the link is being used alongside other text content.
     */
    inline?: boolean;

    /** Style tokens */
    // tokens?: RecursivePartial<LinkTokens>;
  };

/**
 * {@docCategory Link}
 */
export interface LinkState extends LinkProps {}

// /**
//  * {@docCategory Link}
//  */
// export type LinkTokens = ColorTokens &
//   FontTokens & {
//     // The text decoration used for the link in its default state.
//     textDecoration?: string;

//     // The set of color tokens that are applied when the link has been visited.
//     visited?: ColorTokenSet;

//     // The text decoration used for the link when it is being focused.
//     focused?: {
//       textDecoration: string;
//     };

//     // The text decoration used for the link when it is being hovered.
//     hovered?: {
//       textDecoration: string;
//     };

//     // The text decoration used for the link when it is being pressed.
//     pressed?: {
//       textDecoration: string;
//     };

//     // The text decoration used for the link when it is in a disabled state.
//     disabled?: {
//       textDecoration: string;
//     };
//   };

// /**
//  * {@docCategory Link}
//  */
// export type LinkVariants<TTokens = LinkTokens> = {
//   root?: TTokens;
// };
