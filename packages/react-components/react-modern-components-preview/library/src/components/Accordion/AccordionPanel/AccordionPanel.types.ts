import type {
  AccordionPanelProps as AccordionPanelBaseProps,
  AccordionPanelSlots as AccordionPanelBaseSlots,
  AccordionPanelState as AccordionPanelBaseState,
} from '@fluentui/react-headless-components-preview/accordion';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { CollapseParams } from '@fluentui/react-motion-components-preview';
import type { ComponentState, Slot } from '@fluentui/react-utilities';

export type AccordionPanelSlots = AccordionPanelBaseSlots & {
  /** Motion applied when the panel opens and closes. */
  collapseMotion?: Slot<PresenceMotionSlotProps<CollapseParams>>;
};

export type AccordionPanelInternalSlots = AccordionPanelBaseSlots & {
  collapseMotion: NonNullable<AccordionPanelSlots['collapseMotion']>;
};

export type AccordionPanelProps = AccordionPanelBaseProps & Partial<Pick<AccordionPanelSlots, 'collapseMotion'>>;

export type AccordionPanelState = AccordionPanelBaseState &
  ComponentState<Pick<AccordionPanelInternalSlots, 'collapseMotion'>>;
