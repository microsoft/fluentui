import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton/InfoButton';

export type InfoLabelSlots = {
  root: NonNullable<Slot<'span'>>;

  label: NonNullable<Slot<typeof Label>>;

  infoButton: Slot<typeof InfoButton>;
};

/**
 * InfoLabel Props
 */
export type InfoLabelProps = ComponentProps<Partial<InfoLabelSlots>, 'label'>;

/**
 * State used in rendering InfoLabel
 */
export type InfoLabelState = ComponentState<InfoLabelSlots> & Pick<InfoLabelProps, 'size'>;
