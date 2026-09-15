import type { LinkBaseState } from '@fluentui/react-link';

export type { LinkSlots, LinkBaseProps as LinkProps } from '@fluentui/react-link';

/**
 * Link component state
 */
export type LinkState = LinkBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when disabled but still focusable; omitted otherwise.
     */
    'data-disabled-focusable'?: string;
  };
};
