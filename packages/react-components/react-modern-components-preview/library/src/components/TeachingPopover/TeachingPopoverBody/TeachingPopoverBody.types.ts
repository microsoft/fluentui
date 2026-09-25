import type {
  TeachingPopoverBodyProps as TeachingPopoverBodyBaseProps,
  TeachingPopoverBodyState as TeachingPopoverBodyBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
export type { TeachingPopoverBodySlots } from '@fluentui/react-headless-components-preview/teaching-popover';

export type TeachingPopoverBodyProps = TeachingPopoverBodyBaseProps;
export type TeachingPopoverBodyState = TeachingPopoverBodyBaseState & {
  media?: TeachingPopoverBodyBaseState['media'] & {
    'data-media-length': TeachingPopoverBodyBaseState['mediaLength'];
  };
};
