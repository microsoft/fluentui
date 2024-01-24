import { Button } from '@fluentui/react-button';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverContextValue } from '../../TeachingPopoverContext';

export type TeachingPopoverFooterSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The primary button slot.
   */
  primary: NonNullable<Slot<typeof Button>>;

  /**
   * The secondary button slot.
   */
  secondary: Slot<typeof Button>;
};

export type TeachingPopoverFooterStrings = {
  primary: string;
  secondary: string;
};

export type TeachingPopoverFooterState = ComponentState<TeachingPopoverFooterSlots> &
  Pick<TeachingPopoverContextValue, 'appearance'>;

export type TeachingPopoverFooterProps = ComponentProps<Partial<TeachingPopoverFooterSlots>> & {
  strings: TeachingPopoverFooterStrings;
};
