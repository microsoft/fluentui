import type {
  DialogProps as DialogBaseProps,
  DialogState as DialogBaseState,
} from '@fluentui/react-headless-components-preview/dialog';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ScaleParams } from '@fluentui/react-motion-components-preview';
import type { ComponentState, Slot } from '@fluentui/react-utilities';

export type {
  DialogContextValue,
  DialogContextValues,
  DialogModalType,
  DialogOpenChangeData,
  DialogOpenChangeEvent,
  DialogOpenChangeEventHandler,
  DialogSurfaceContextValue,
} from '@fluentui/react-headless-components-preview/dialog';

export type DialogSlots = {
  /** Motion applied to the dialog surface. */
  surfaceMotion: Slot<PresenceMotionSlotProps<ScaleParams>>;
};

export type DialogInternalSlots = {
  surfaceMotion: NonNullable<Slot<PresenceMotionSlotProps<ScaleParams>>>;
};

export type DialogProps = DialogBaseProps & Partial<DialogSlots>;

export type DialogState = DialogBaseState &
  ComponentState<{
    surfaceMotion: NonNullable<DialogSlots['surfaceMotion']>;
  }>;
