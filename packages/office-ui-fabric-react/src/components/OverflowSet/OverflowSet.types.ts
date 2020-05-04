import * as React from 'react';

import { IFocusZoneProps } from '@fluentui/react-focus';
import { IKeytipProps } from '../../Keytip';
import { IStyle } from '../../Styling';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { OverflowSetBase } from './OverflowSet.base';

/**
 * {@docCategory OverflowSet}
 */
export interface IOverflowSet {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even if
   * focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * shouldReceiveFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param childElement - The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean;
}

/**
 * {@docCategory OverflowSet}
 */
export interface IOverflowSetProps extends React.ClassAttributes<OverflowSetBase> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<IOverflowSet>;

  /**
   * Class name
   */
  className?: string;

  /**
   * An array of items to be rendered by your onRenderItem function in the primary content area
   */
  items?: IOverflowSetItemProps[];

  /**
   * Change item layout direction to vertical/stacked.
   * If role is set to `menubar`, `vertical={true}` will also add proper `aria-orientation`.
   * @defaultvalue false
   */
  vertical?: boolean;

  /**
   * Controls wether or not the overflow button is placed at the start or end of the items.
   * This gives a reveresed visual behavior but maintains correct keyboard navigation.
   * @defaultValue 'end'
   */
  overflowSide?: 'start' | 'end';

  /**
   * An array of items to be passed to overflow contextual menu
   */
  overflowItems?: IOverflowSetItemProps[];

  /**
   * Method to call when trying to render an item.
   */
  onRenderItem: (item: IOverflowSetItemProps) => any;

  /**
   * Rendering method for overflow button and contextual menu. The argument to the function is
   * the overflowItems passed in as props to this function.
   */
  onRenderOverflowButton: IRenderFunction<any[]>;

  /**
   * Custom properties for OverflowSet's FocusZone.
   * If doNotContainWithinFocusZone is set to true focusZoneProps will be ignored.
   * Use one or the other.
   * @deprecated In 8.0 the OverflowSet will no longer be wrapped in a FocusZone
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * If true do not contain the OverflowSet inside of a FocusZone,
   * otherwise the OverflowSet will contain a FocusZone.
   * If this is set to true focusZoneProps will be ignored.
   * Use one or the other.
   * @deprecated In 8.0 the OverflowSet will no longer be wrapped in a FocusZone
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * The role for the OverflowSet.
   * @defaultvalue 'group'
   */
  role?: string;

  /**
   * Optional full keytip sequence for the overflow button, if it will have a keytip.
   */
  keytipSequences?: string[];

  /**
   * Function that will take in an IOverflowSetItemProps and return the subMenu for that item.
   * If not provided, will use 'item.subMenuProps.items' by default.
   * This is only used if your overflow set has keytips.
   */
  itemSubMenuProvider?: (item: IOverflowSetItemProps) => any[] | undefined;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IOverflowSetProps, IOverflowSetStyles>;
}

/**
 * {@docCategory OverflowSet}
 */
export interface IOverflowSetStyles {
  /** The style that is layered onto the root element of OverflowSet. */
  root?: IStyle;
  /** The style that is layered onto each individual item in the overflow set. */
  item?: IStyle;
  /** The style that is layered onto the overflow button for the overflow set. */
  overflowButton?: IStyle;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory OverflowSet}
 */
export type IOverflowSetStyleProps = Pick<IOverflowSetProps, 'vertical' | 'className'>;

/**
 * {@docCategory OverflowSet}
 */
export interface IOverflowSetItemProps {
  /**
   * Unique id to identify the item.
   */
  key: string;

  /**
   * Optional keytip for the overflowSetItem.
   */
  keytipProps?: IKeytipProps;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}
