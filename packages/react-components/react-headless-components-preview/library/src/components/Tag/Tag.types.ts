import type {
  TagSlots as TagBaseSlots,
  TagBaseProps,
  TagBaseState,
  TagContextValues as TagBaseContextValues,
} from '@fluentui/react-tags';

export type TagSlots = TagBaseSlots;

export type TagProps = TagBaseProps;

export type TagState = TagBaseState & {
  root: {
    /**
     * Data attribute set when the tag is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the tag renders as a dismissible button.
     */
    'data-dismissible'?: string;

    /**
     * Data attribute set when the tag is selected.
     */
    'data-selected'?: string;
  };
};

export type TagContextValues = TagBaseContextValues;
