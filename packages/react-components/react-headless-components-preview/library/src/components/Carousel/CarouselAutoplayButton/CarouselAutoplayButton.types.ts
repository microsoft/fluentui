import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '../../Button';

export type CarouselAutoplayButtonSlots = {
  /** Text button, not a toggle. Its visible label is its accessible name. */
  root: NonNullable<Slot<Extract<ButtonProps, { as?: 'button' }>>>;
};

export type CarouselAutoplayButtonProps = ComponentProps<CarouselAutoplayButtonSlots> & {
  /** Defaults to "Play". */
  playLabel?: string;
  /** Defaults to "Pause". */
  pauseLabel?: string;
  /** Shown, and exposed as `aria-disabled`, while the user prefers reduced motion. */
  reducedMotionLabel?: string;
};

export type CarouselAutoplayButtonState = ComponentState<CarouselAutoplayButtonSlots> & {
  /** False with fewer than two groups or a static collection. */
  rendered: boolean;
};
