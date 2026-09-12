import type { TagGroupBaseState } from '@fluentui/react-tags';

export type { TagGroupBaseProps as TagGroupProps, TagGroupSlots, TagGroupContextValues } from '@fluentui/react-tags';

export type TagGroupState = TagGroupBaseState & {
  root: {
    /**
     * Present when the group is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the group is dismissible; omitted otherwise.
     */
    'data-dismissible'?: string;
  };
};
