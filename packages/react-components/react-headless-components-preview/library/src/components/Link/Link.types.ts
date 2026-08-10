import type { LinkSlots as LinkBaseSlots, LinkBaseProps, LinkBaseState } from '@fluentui/react-link';

/**
 * Link component slots
 */
export type LinkSlots = LinkBaseSlots;

/**
 * Link component props
 */
export type LinkProps = LinkBaseProps;

/**
 * Link component state
 */
export type LinkState = LinkBaseState & {
  root: {
    /**
     * Data attribute set when the link is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the link is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;
  };
};
