import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverBodyMediaLength = 'short' | 'medium' | 'tall';

export type TeachingPopoverBodySlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * Optional Media Content.
   */
  media?: Slot<'span'>;
};

export type TeachingPopoverBodyProps = ComponentProps<TeachingPopoverBodySlots> & {
  mediaLength?: TeachingPopoverBodyMediaLength;

  /*Required for pagination if used in carousel*/
  value?: string;
};

export type TeachingPopoverBodyState = ComponentState<TeachingPopoverBodySlots> &
  Partial<Pick<TeachingPopoverBodyProps, 'mediaLength'>> &
  Required<Pick<TeachingPopoverBodyProps, 'value'>>;
