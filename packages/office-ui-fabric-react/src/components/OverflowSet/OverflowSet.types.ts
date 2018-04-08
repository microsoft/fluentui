import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IRenderFunction } from '../../Utilities';
import { IFocusZoneProps } from '../../FocusZone';

export interface IOverflowSet {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param {boolean} forceIntoFirstElement If true, focus will be forced into the first element, even if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param {HTMLElement} childElement The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean;
}

export interface IOverflowSetProps extends React.Props<OverflowSet> {
  /**
   * Gets the component ref.
   */
  componentRef?: (ref?: IOverflowSet | null) => void;

  /**
   * Class name
   */
  className?: string;

  /**
   * An array of items to be rendered by your onRenderItem function in the primary content area
  */
  items?: IOverflowSetItemProps[];

  /**
   * Change item layout direction to vertical/stacked
   * @default false
  */
  vertical?: boolean;

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
   * Use one or the other
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * If true do not contain the OverflowSet inside of a FocusZone,
   * otherwise the OverflowSet will contain a FocusZone.
   * If this is set to true focusZoneProps will be ignored.
   * Use one or the other
   */
  doNotContainWithinFocusZone?: boolean;

  /**
   * The role for the OverflowSet.
   * @default 'menubar'
   */
  role?: string;
}

export interface IOverflowSetItemProps {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}