import type {
  TagGroupSlots as TagGroupBaseSlots,
  TagGroupBaseProps,
  TagGroupBaseState,
  TagGroupContextValue,
} from '@fluentui/react-tags';

export type TagGroupSlots = TagGroupBaseSlots;

export type TagGroupProps = TagGroupBaseProps;

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
