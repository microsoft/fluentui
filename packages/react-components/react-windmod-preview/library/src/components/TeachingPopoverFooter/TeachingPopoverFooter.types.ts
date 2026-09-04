import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import type {
  TeachingPopoverFooterProps as TeachingPopoverFooterHeadlessProps,
  TeachingPopoverFooterState as TeachingPopoverFooterHeadlessState,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { Button } from '../Button/Button';
import type { PopoverAppearance } from '../Popover/Popover.types';

/** The look prop arrives by context, so this subpath has to name its type. */
export type { PopoverAppearance } from '../Popover/Popover.types';

/**
 * The headless footer takes its buttons as children of the root; the two Button slots are the
 * styled layer's to supply, and windmod supplies them on the windmod Button.
 */
export type TeachingPopoverFooterSlots = {
  /** The emphasised action. */
  primary: NonNullable<Slot<typeof Button>>;
  /** The lesser action, rendered only when supplied. */
  secondary?: Slot<typeof Button>;
};

/** A resolved footer Button slot: props plus the metadata that makes it renderable as JSX. */
export type TeachingPopoverFooterButtonSlot = SlotComponentType<
  ExtractSlotProps<TeachingPopoverFooterSlots['primary']>
>;

/** Windmod TeachingPopoverFooter props: the headless footer plus the two Button slots. */
export type TeachingPopoverFooterProps = TeachingPopoverFooterHeadlessProps & Partial<TeachingPopoverFooterSlots>;

/** Windmod TeachingPopoverFooter state: headless state, the resolved slots, and the appearance. */
export type TeachingPopoverFooterState = TeachingPopoverFooterHeadlessState & {
  appearance?: PopoverAppearance;
  primary: TeachingPopoverFooterButtonSlot;
  secondary?: TeachingPopoverFooterButtonSlot;
};
