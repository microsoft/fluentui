import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IRenderFunction, IKeySequence } from '../../Utilities';
import { IFocusZoneProps } from '../../FocusZone';
import { IKeytipProps } from '../../Keytip';

export interface IOverflowSet {
  /**
 * Sets focus to the button.
 */
  focus: () => void;
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

  /**
   * Optional full keytip sequence for the overflow button, if it will have a keytip
   */
  keytipSequences?: IKeySequence[];
}

export interface IOverflowSetItemProps {
  /**
   * Unique id to identify the item
   */
  key: string;

  /**
   * Optional keytip for the overflowSetItem
   */
  keytipProps?: IKeytipProps;

  /**
   * Any additional properties to use when custom rendering menu items.
   */
  [propertyName: string]: any;
}