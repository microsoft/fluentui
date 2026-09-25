import type {
  TagGroupProps as TagGroupBaseProps,
  TagGroupState as TagGroupBaseState,
} from '@fluentui/react-headless-components-preview/tag-group';
export type { TagGroupSlots } from '@fluentui/react-headless-components-preview/tag-group';

export type TagGroupProps = TagGroupBaseProps & {
  /**
   * Appearance inherited by child tags.
   *
   * @default 'filled'
   */
  appearance?: 'brand' | 'filled' | 'outline';

  /**
   * Size inherited by child tags.
   *
   * @default 'medium'
   */
  size?: 'extra-small' | 'small' | 'medium';
};

export type TagGroupState = TagGroupBaseState & {
  appearance: NonNullable<TagGroupProps['appearance']>;
  size: NonNullable<TagGroupProps['size']>;
  root: TagGroupBaseState['root'] & {
    'data-appearance': NonNullable<TagGroupProps['appearance']>;
    'data-size': NonNullable<TagGroupProps['size']>;
  };
};
