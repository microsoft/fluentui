import type { TagBaseState } from '@fluentui/react-tags';

export type { TagBaseProps as TagProps, TagSlots, TagContextValues } from '@fluentui/react-tags';

export type TagState = TagBaseState & {
  root: {
    /**
     * Present when the tag is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the tag renders as a dismissible button; omitted otherwise.
     */
    'data-dismissible'?: string;

    /**
     * Present when the tag is selected; omitted otherwise.
     */
    'data-selected'?: string;
  };
};
