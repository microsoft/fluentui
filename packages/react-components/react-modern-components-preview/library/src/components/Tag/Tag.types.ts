import type {
  TagProps as TagBaseProps,
  TagState as TagBaseState,
} from '@fluentui/react-headless-components-preview/tag';
export type { TagSlots } from '@fluentui/react-headless-components-preview/tag';

export type TagProps = TagBaseProps & {
  /**
   * A Tag can have a filled, outlined, or brand appearance.
   *
   * @default 'filled'
   */
  appearance?: 'brand' | 'filled' | 'outline';

  /**
   * A Tag can have a rounded or circular shape.
   *
   * @default 'rounded'
   */
  shape?: 'circular' | 'rounded';

  /**
   * A Tag supports three sizes.
   *
   * @default 'medium'
   */
  size?: 'extra-small' | 'small' | 'medium';
};

export type TagState = TagBaseState & {
  appearance: NonNullable<TagProps['appearance']>;
  avatarShape: 'circular' | 'square';
  avatarSize: 16 | 20 | 28;
  shape: NonNullable<TagProps['shape']>;
  size: NonNullable<TagProps['size']>;
  root: TagBaseState['root'] & {
    'data-appearance': NonNullable<TagProps['appearance']>;
    'data-has-dismiss-icon'?: string;
    'data-has-media'?: string;
    'data-shape': NonNullable<TagProps['shape']>;
    'data-size': NonNullable<TagProps['size']>;
  };
};
