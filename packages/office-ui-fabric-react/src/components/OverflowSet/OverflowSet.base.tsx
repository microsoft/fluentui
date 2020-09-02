import * as React from 'react';

import { FocusZone, FocusZoneDirection, IFocusZone } from '@fluentui/react-focus';
import { IKeytipProps } from '../../Keytip';
import {
  initializeComponentRef,
  classNamesFunction,
  divProperties,
  elementContains,
  focusFirstChild,
  getNativeProps,
  warnMutuallyExclusive,
} from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import {
  IOverflowSet,
  IOverflowSetItemProps,
  IOverflowSetProps,
  IOverflowSetStyles,
  IOverflowSetStyleProps,
} from './OverflowSet.types';

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>();
const COMPONENT_NAME = 'OverflowSet';

export class OverflowSetBase extends React.Component<IOverflowSetProps, {}> implements IOverflowSet {
  private _focusZone = React.createRef<IFocusZone>();
  private _persistedKeytips: { [uniqueID: string]: IKeytipProps } = {};
  private _keytipManager: KeytipManager = KeytipManager.getInstance();
  private _divContainer = React.createRef<HTMLDivElement>();
  private _classNames: IProcessedStyleSet<IOverflowSetStyles>;

  constructor(props: IOverflowSetProps) {
    super(props);

    initializeComponentRef(this);
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      doNotContainWithinFocusZone: 'focusZoneProps',
    });
  }

  public render(): JSX.Element {
    const {
      items,
      overflowItems,
      className,
      // eslint-disable-next-line deprecation/deprecation
      focusZoneProps,
      styles,
      vertical,
      // eslint-disable-next-line deprecation/deprecation
      doNotContainWithinFocusZone,
      role,
      overflowSide = 'end',
    } = this.props;

    this._classNames = getClassNames(styles, { className, vertical });

    let Tag;
    let uniqueComponentProps;

    if (doNotContainWithinFocusZone) {
      Tag = 'div';
      uniqueComponentProps = {
        ...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties),
        ref: this._divContainer,
      };
    } else {
      Tag = FocusZone;
      uniqueComponentProps = {
        ...getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties),
        ...focusZoneProps,
        componentRef: this._focusZone,
        direction: vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
      };
    }

    const showOverflow = overflowItems && overflowItems.length > 0;

    return (
      <Tag
        role={role || 'group'}
        aria-orientation={role === 'menubar' ? (vertical === true ? 'vertical' : 'horizontal') : undefined}
        {...uniqueComponentProps}
        className={this._classNames.root}
      >
        {overflowSide === 'start' && showOverflow && this._onRenderOverflowButtonWrapper(overflowItems!)}
        {items && this._onRenderItems(items)}
        {overflowSide === 'end' && showOverflow && this._onRenderOverflowButtonWrapper(overflowItems!)}
      </Tag>
    );
  }

  /**
   * Sets focus to the first tabbable item in the OverflowSet.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element,
   * even if focus is already in theOverflowSet
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement?: boolean): boolean {
    let focusSucceeded = false;

    // eslint-disable-next-line deprecation/deprecation
    if (this.props.doNotContainWithinFocusZone) {
      if (this._divContainer.current) {
        focusSucceeded = focusFirstChild(this._divContainer.current);
      }
    } else if (this._focusZone.current) {
      focusSucceeded = this._focusZone.current.focus(forceIntoFirstElement);
    }

    return focusSucceeded;
  }

  /**
   * Sets focus to a specific child element within the OverflowSet.
   * @param childElement - The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(childElement?: HTMLElement): boolean {
    let focusSucceeded = false;

    if (!childElement) {
      return false;
    }

    // eslint-disable-next-line deprecation/deprecation
    if (this.props.doNotContainWithinFocusZone) {
      if (this._divContainer.current && elementContains(this._divContainer.current, childElement)) {
        childElement.focus();
        focusSucceeded = document.activeElement === childElement;
      }
    } else if (this._focusZone.current) {
      focusSucceeded = this._focusZone.current.focusElement(childElement);
    }

    return focusSucceeded;
  }

  // Add keytip register/unregister handlers to lifecycle functions to correctly manage persisted keytips
  public componentDidMount() {
    this._registerPersistedKeytips();
  }

  public componentWillUnmount() {
    this._unregisterPersistedKeytips();
  }

  public UNSAFE_componentWillUpdate() {
    this._unregisterPersistedKeytips();
  }

  public componentDidUpdate() {
    this._registerPersistedKeytips();
  }

  private _registerPersistedKeytips() {
    Object.keys(this._persistedKeytips).forEach((key: string) => {
      const keytip = this._persistedKeytips[key];
      const uniqueID = this._keytipManager.register(keytip, true);
      // Update map
      this._persistedKeytips[uniqueID] = keytip;
      delete this._persistedKeytips[key];
    });
  }

  private _unregisterPersistedKeytips() {
    // Delete all persisted keytips saved
    Object.keys(this._persistedKeytips).forEach((uniqueID: string) => {
      this._keytipManager.unregister(this._persistedKeytips[uniqueID], uniqueID, true);
    });
    this._persistedKeytips = {};
  }

  private _onRenderItems = (items: IOverflowSetItemProps[]): JSX.Element[] => {
    return items.map((item, i) => {
      return (
        <div key={item.key} className={this._classNames.item}>
          {this.props.onRenderItem(item)}
        </div>
      );
    });
  };

  private _onRenderOverflowButtonWrapper = (items: any[]): JSX.Element => {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = {
      className: this._classNames.overflowButton,
    };

    const overflowKeytipSequences = this.props.keytipSequences;
    let newOverflowItems: any[] = [];

    if (overflowKeytipSequences) {
      items.forEach(overflowItem => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
        if (keytip) {
          // Create persisted keytip
          const persistedKeytip: IKeytipProps = {
            content: keytip.content,
            keySequences: keytip.keySequences,
            disabled: keytip.disabled || !!(overflowItem.disabled || overflowItem.isDisabled),
            hasDynamicChildren: keytip.hasDynamicChildren,
            hasMenu: keytip.hasMenu,
          };

          if (keytip.hasDynamicChildren || this._getSubMenuForItem(overflowItem)) {
            // If the keytip has a submenu or children nodes, change onExecute to persistedKeytipExecute
            persistedKeytip.onExecute = this._keytipManager.menuExecute.bind(
              this._keytipManager,
              overflowKeytipSequences,
              overflowItem.keytipProps.keySequences,
            );
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = keytip.onExecute;
          }

          // Add this persisted keytip to our internal list, use a temporary uniqueID (its content)
          // uniqueID will get updated on register
          this._persistedKeytips[persistedKeytip.content] = persistedKeytip;

          // Add the overflow sequence to this item
          const newOverflowItem = {
            ...overflowItem,
            keytipProps: {
              ...keytip,
              overflowSetSequence: overflowKeytipSequences,
            },
          };
          newOverflowItems.push(newOverflowItem);
        } else {
          // Nothing to change, add overflowItem to list
          newOverflowItems.push(overflowItem);
        }
      });
    } else {
      newOverflowItems = items;
    }
    return <div {...wrapperDivProps}>{this.props.onRenderOverflowButton(newOverflowItems)}</div>;
  };

  /**
   * Gets the subMenu for an overflow item
   * Checks if itemSubMenuProvider has been defined, if not defaults to subMenuProps
   */
  private _getSubMenuForItem(item: any): any[] | undefined {
    if (this.props.itemSubMenuProvider) {
      return this.props.itemSubMenuProvider(item);
    }
    if (item.subMenuProps) {
      return item.subMenuProps.items;
    }
    return undefined;
  }
}
