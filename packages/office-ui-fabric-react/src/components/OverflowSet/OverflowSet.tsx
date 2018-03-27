import * as React from 'react';
import {
  css,
  BaseComponent,
  createRef,
  IKeySequence
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IOverflowSet, IOverflowSetProps, IOverflowSetItemProps } from './OverflowSet.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { KeytipManager } from '../../utilities/keytips';
import { IKeytipProps } from '../../Keytip';
import * as stylesImport from './OverflowSet.scss';

const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone = createRef<FocusZone>();
  private _persistedKeytips: IKeytipProps[] = [];
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  public render() {
    if (this._persistedKeytips.length) {
      // Delete all persisted keytips saved
      this._persistedKeytips.forEach((keytips: IKeytipProps) => {
        this._keytipManager.unregisterPersistedKeytip(keytips);
      });
      this._persistedKeytips = [];
    }

    const {
      items,
      overflowItems,
      className,
      focusZoneProps,
      vertical = false,
      role = 'menubar'
    } = this.props;

    return (
      <FocusZone
        { ...focusZoneProps }
        componentRef={ this._focusZone }
        className={ mergeStyles(
          'ms-OverflowSet',
          styles.root,
          vertical && styles.rootVertical,
          className
        ) }
        direction={ vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal }
        role={ role }
      >
        { items && this._onRenderItems(items) }
        { overflowItems && overflowItems.length > 0 && this._onRenderOverflowButtonWrapper(overflowItems) }
      </FocusZone>
    );
  }

  public focus() {
    if (this._focusZone.value) {
      this._focusZone.value.focus();
    }
  }

  public componentDidMount() {
    this._registerPersistedKeytips();
  }

  public componentDidUpdate() {
    this._registerPersistedKeytips();
  }

  private _registerPersistedKeytips() {
    this._persistedKeytips.forEach((keytips: IKeytipProps) => {
      this._keytipManager.registerPersistedKeytip(keytips);
    });
  }

  private _onRenderItems = (items: IOverflowSetItemProps[]): JSX.Element[] => {
    const overflowKeytipSequences = this.props.keytipSequences;

    return items.map((item, i) => {
      const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };

      // Remove overflowSetSequence from all regular items
      if (overflowKeytipSequences && item.keytipProps) {
        this._removeOverflowSequence(item);
      }

      return (
        <div key={ item.key } { ...wrapperDivProps }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }

  private _onRenderOverflowButtonWrapper = (items: any[]): JSX.Element => {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-overflowButton', styles.item) };
    const overflowKeytipSequences = this.props.keytipSequences;

    // Register all persisted keytips and save
    if (overflowKeytipSequences) {
      items.forEach((overflowItem) => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
        if (keytip) {
          // Create persisted keytip
          const persistedKeytip: IKeytipProps = {
            content: keytip.content,
            keySequences: keytip.keySequences,
            hasChildrenNodes: false,
            disabled: keytip.disabled
          };

          if (keytip.hasChildrenNodes || overflowItem.subMenuProps) {
            // If the keytip has a submenu, change onExecute to persistedKeytipExecute
            persistedKeytip.onExecute = this._keytipManager.persistedKeytipExecute.bind(this._keytipManager, overflowKeytipSequences, overflowItem.keytipProps.keySequences);
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = (el: HTMLElement | null) => {
              keytip.onExecute && keytip.onExecute(el);
            };
          }

          // Add this persisted keytip to our internal list
          this._persistedKeytips.push(persistedKeytip);

          // Add the overflow sequence to this item and its subMenu items
          this._addOverflowSequence(overflowKeytipSequences, overflowItem);
        }
      });
    }
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(items) }
      </div>
    );
  }

  /**
   * Unsets overflowSetSequence on item and its subMenu items
   */
  private _removeOverflowSequence(item: any): void {
    item.keytipProps.overflowSetSequence = undefined;

    if (item.subMenuProps) {
      item.subMenuProps.items.forEach((subMenuItem: any) => {
        if (subMenuItem.keytipProps) {
          this._removeOverflowSequence(subMenuItem);
        }
      });
    }
  }

  /**
   * Sets overflowSetSequence on item and its subMenu items
   */
  private _addOverflowSequence(overflowSequence: IKeySequence[], overflowItem: any): void {
    overflowItem.keytipProps.overflowSetSequence = overflowSequence;

    if (overflowItem.subMenuProps) {
      overflowItem.subMenuProps.items.forEach((subMenuItem: any) => {
        if (subMenuItem.keytipProps) {
          this._addOverflowSequence(overflowSequence, subMenuItem);
        }
      });
    }
  }

}