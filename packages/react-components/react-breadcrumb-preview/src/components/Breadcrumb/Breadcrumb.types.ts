import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type BreadcrumbItem = {
  key: string;
  type: 'button' | 'non-interactive';
};

/**
 * Data shared between breadcrumb components
 */
export type BreadcrumbContextValues = Required<Pick<BreadcrumbProps, 'size'>> & {
  items: Set<BreadcrumbItem>;
  registerItem: (item: BreadcrumbItem) => void;
  removeItem: (item: BreadcrumbItem) => void;
  hasInteractiveItems: boolean;
};

export type BreadcrumbSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'nav'>;
  /**
   * Ordered list which contains items.
   */
  list?: Slot<'ol'>;
};

/**
 * Breadcrumb Props
 */
export type BreadcrumbProps = ComponentProps<BreadcrumbSlots> & {
  /**
   * Sets the focus behavior for the Breadcrumb.
   *
   * `tab`
   * This behaviour will cycle through all elements inside of the Breadcrumb when pressing the Tab key and then release focus
   * after the last inner element.
   *
   * `arrow`
   * This behaviour will cycle through all elements inside of the Breadcrumb when pressing the Arrow key.
   *
   * @default 'tab'
   */
  focusMode?: 'arrow' | 'tab';

  /**
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> & Required<Pick<BreadcrumbProps, 'size'>>;
