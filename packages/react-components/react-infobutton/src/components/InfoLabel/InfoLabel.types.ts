import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InfoButton } from '../InfoButton';
import type { InfoButtonProps } from '../InfoButton';

export type InfoLabelSlots = {
  root: NonNullable<Slot<'span'>>;

  /**
   * The Label component.
   *
   * It is not typically necessary to use this prop. The label text is the child of the `<InfoLabel>`, and other props
   * such as `size` and `required` should be set directly on the `InfoLabel`.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<InfoLabel>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  label: NonNullable<Slot<typeof Label>>;

  /**
   * The InfoButton component.
   *
   * It is not typically necessary to use this prop. The content can be set using the `info` prop of the InfoLabel.
   */
  infoButton: Slot<typeof InfoButton>;
};

/**
 * InfoLabel Props
 */
export type InfoLabelProps = ComponentProps<Partial<InfoLabelSlots>, 'label'> & {
  /**
   * The content of the InfoButton's popover.
   */
  info?: InfoButtonProps['info'];
};

/**
 * State used in rendering InfoLabel
 */
export type InfoLabelState = ComponentState<InfoLabelSlots> & Pick<InfoLabelProps, 'size'>;
