import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavSize } from '../Nav/Nav.types';

export type AppItemStaticSlots = {
  /**
   * The root element of the AppItemStatic.
   */
  root: Slot<'div'>;
  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;
};

/**
 * AppItemStatic Props
 */
export type AppItemStaticProps = ComponentProps<AppItemStaticSlots> & {};

/**
 * State used in rendering AppItemStatic
 */
export type AppItemStaticState = ComponentState<AppItemStaticSlots> & {
  /**
   * The size of the Nav
   *
   * @default 'medium'
   */
  size: NavSize;
};
