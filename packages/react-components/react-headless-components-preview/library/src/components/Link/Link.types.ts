import type { LinkBaseState } from '@fluentui/react-link';

export type { LinkSlots, LinkBaseProps as LinkProps } from '@fluentui/react-link';

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
