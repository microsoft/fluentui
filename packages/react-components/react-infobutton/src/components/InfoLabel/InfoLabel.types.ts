import { Label } from '@fluentui/react-label';
import { InfoButton } from '../InfoButton';
import { InfoTip } from '../InfoTip/InfoTip';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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

  /**
   * The InfoTip component.
   *
   * It is not typically necessary to use this prop. The content can be set using the `info` prop of the InfoLabel.
   */
  infoTip: Slot<typeof InfoTip>;
};

/**
 * InfoLabel Props
 */
export type InfoLabelProps = ComponentProps<Partial<InfoLabelSlots>, 'label'> & {
  /**
   * The content of the InfoButton's popover.
   */
  info?: InfoButtonProps['info'];

  /**
   * Whether the information provided is interactive.
   *
   * When an InfoLabel is interactive, the bubble will show a popover on click and will trap focus. When it is not interactive,
   * the bubble will show a tooltip and will be triggered through hover or focus.
   *
   * **Note**: When the information provided is interactive, the InfoLabel must be set to interactive, otherwise the
   * accessible experience will not be correct.
   */
  interactive: boolean;
};

/**
 * State used in rendering InfoLabel
 */
export type InfoLabelState = ComponentState<InfoLabelSlots> & Pick<InfoLabelProps, 'size' | 'interactive'>;
