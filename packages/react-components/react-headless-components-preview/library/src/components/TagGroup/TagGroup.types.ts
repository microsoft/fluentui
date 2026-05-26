import type { TagGroupBaseState, TagGroupContextValue } from '@fluentui/react-tags';

export type { TagGroupBaseProps as TagGroupProps, TagGroupSlots } from '@fluentui/react-tags';

export type TagGroupState = TagGroupBaseState & {
  root: {
    /**
     * Data attribute set when the group is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the group is dismissible.
     */
    'data-dismissible'?: string;
  };
};

export type TagGroupContextValues = {
  tagGroup: TagGroupContextValue;
};
