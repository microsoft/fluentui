import type {
  LinkProps as LinkBaseProps,
  LinkState as LinkBaseState,
} from '@fluentui/react-headless-components-preview/link';
export type { LinkContextValue, LinkSlots } from '@fluentui/react-headless-components-preview/link';

export type LinkProps = LinkBaseProps & {
  /**
   * A link can appear with its default or subtle styling.
   *
   * @default 'default'
   */
  appearance?: 'default' | 'subtle';

  /**
   * Changes styling when the link is used alongside other text content.
   *
   * @default false
   */
  inline?: boolean;
};

export type LinkState = LinkBaseState & {
  appearance: NonNullable<LinkProps['appearance']>;
  inline: NonNullable<LinkProps['inline']>;
  root: LinkBaseState['root'] & {
    'data-appearance': NonNullable<LinkProps['appearance']>;
    'data-as': 'a' | 'button' | 'span';
    'data-href'?: string;
    'data-inline'?: string;
  };
};
