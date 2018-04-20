import * as React from 'react';
import {
  css,
  BaseComponent,
  createRef,
  getNativeProps,
  divProperties,
  focusFirstChild,
  elementContains
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IOverflowSet, IOverflowSetProps, IOverflowSetItemProps } from './OverflowSet.types';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';

import * as stylesImport from './OverflowSet.scss';
const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone = createRef<IFocusZone>();
  private _divContainer = createRef<HTMLDivElement>();

  constructor(props: IOverflowSetProps) {
    super(props);

    if (props.doNotContainWithinFocusZone) {
      this._warnMutuallyExclusive({
        'doNotContainWithinFocusZone': 'focusZoneProps'
      });
    }
  }

  public render(): JSX.Element {
    const {
      items,
      overflowItems,
      className,
      focusZoneProps,
      vertical = false,
      role = 'menubar',
      doNotContainWithinFocusZone
    } = this.props;

    let Tag;
    let uniqueComponentProps;

    if (doNotContainWithinFocusZone) {
      Tag = 'div';
      uniqueComponentProps = {
        ...getNativeProps(this.props, divProperties),
        ref: this._divContainer
      };
    } else {
      Tag = FocusZone;
      uniqueComponentProps = {
        ...focusZoneProps,
        componentRef: this._focusZone,
        direction: vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal
      };
    }

    return (
      <Tag
        { ...uniqueComponentProps }
        className={ mergeStyles(
          'ms-OverflowSet',
          styles.root,
          vertical && styles.rootVertical,
          className
        ) }
        role={ role }
      >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && this._onRenderOverflowButtonWrapper(overflowItems) }
      </Tag>
    );
  }

  /**
   * Sets focus to the first tabbable item in the OverflowSet.
   * @param {boolean} forceIntoFirstElement If true, focus will be forced into the first element,
   * even if focus is already in theOverflowSet
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focus(forceIntoFirstElement?: boolean): boolean {
    let focusSucceeded = false;

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
   * @param {HTMLElement} childElement The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  public focusElement(childElement?: HTMLElement): boolean {
    let focusSucceeded = false;

    if (!childElement) {
      return false;
    }

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

  private _onRenderItems = (items: IOverflowSetItemProps[]): JSX.Element[] => {
    return items.map((item, i) => {
      const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };

      return (
        <div key={ item.key } { ...wrapperDivProps }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }

  private _onRenderOverflowButtonWrapper = (items: any[]): JSX.Element => {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-overflowButton', styles.item) };
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(items) }
      </div>
    );
  }

}