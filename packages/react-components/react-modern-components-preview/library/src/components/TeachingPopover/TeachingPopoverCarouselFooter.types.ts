import type {
  TeachingPopoverCarouselFooterProps as TeachingPopoverCarouselFooterBaseProps,
  TeachingPopoverCarouselFooterState as TeachingPopoverCarouselFooterBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
export type { TeachingPopoverCarouselFooterSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverCarouselFooterProps = TeachingPopoverCarouselFooterBaseProps & {
  /** @default 'centered' */
  layout?: 'offset' | 'centered';
};
export type TeachingPopoverCarouselFooterState = TeachingPopoverCarouselFooterBaseState & {
  layout: NonNullable<TeachingPopoverCarouselFooterProps['layout']>;
  root: TeachingPopoverCarouselFooterBaseState['root'] & {
    'data-layout': NonNullable<TeachingPopoverCarouselFooterProps['layout']>;
  };
};
