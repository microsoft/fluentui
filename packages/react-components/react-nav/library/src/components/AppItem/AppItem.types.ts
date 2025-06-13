import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavDensity } from '../Nav/Nav.types';

export type AppItemSlots = {
  /**
   * The root element of the AppItem.
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;
};

/**
 * AppItem Props
 */
export type AppItemProps = ComponentProps<AppItemSlots> & { href?: string };

/**
 * State used in rendering AppItem
 */
export type AppItemState = ComponentState<AppItemSlots> & {
  /**
   * The density of the NavItem
   *
   * @default 'medium'
   */
  density: NavDensity;
};
