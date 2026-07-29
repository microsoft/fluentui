import type { TagBaseState } from '@fluentui/react-tags';

export type { TagBaseProps as TagProps, TagSlots, TagContextValues } from '@fluentui/react-tags';

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
