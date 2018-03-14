import * as React from 'react';
import {
  css,
  autobind,
  BaseComponent,
  IKeySequence
} from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { IOverflowSet, IOverflowSetProps, IOverflowSetItemProps } from './OverflowSet.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { KeytipManager } from '../../utilities/keytips';
import * as stylesImport from './OverflowSet.scss';

const styles: any = stylesImport;

export class OverflowSet extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {

  private _focusZone: FocusZone;
  private _persistedKeytips: IKeySequence[][] = [];
  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  public render() {
    if (this._persistedKeytips.length) {
      // Delete all persisted keytips saved
      this._persistedKeytips.forEach((keySequences: IKeySequence[]) => {
        this._keytipManager.unregisterPersistedKeytip(keySequences);
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
        componentRef={ this._resolveRef('_focusZone') }
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
    if (this._focusZone) {
      this._focusZone.focus();
    }
  }

  @autobind
  private _onRenderItems(items: IOverflowSetItemProps[]): JSX.Element[] {
    return items.map((item, i) => {
      const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-item', styles.item) };

      return (
        <div key={ item.key } { ...wrapperDivProps }>
          { this.props.onRenderItem(item) }
        </div>
      );
    });
  }

  @autobind
  private _onRenderOverflowButtonWrapper(items: any[]): JSX.Element {
    const wrapperDivProps: React.HTMLProps<HTMLDivElement> = { className: css('ms-OverflowSet-overflowButton', styles.item) };
    const overflowKeytip = this.props.keytipProps;

    const newOverflowItems: any[] = [];

    // Register all persisted keytips and save
    items.forEach((overflowItem) => {
      const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
      if (keytip) {
        // Create persisted keytip
        const persistedKeytip = { ...keytip, hasChildrenNodes: false };
        if (keytip.hasChildrenNodes) {
          // If the keytip has a submenu, we need to modify the onExecute
          persistedKeytip.onExecute = this._keytipManager.persistedKeytipExecute.bind(this._keytipManager, overflowKeytip!.keySequences, keytip.keySequences);
        } else {
          // If the keytip doesn't have a submenu, just execute the original function
          // and exit keytip mode
          persistedKeytip.onExecute = (el: HTMLElement) => {
            keytip.onExecute && keytip.onExecute(el);
            this._keytipManager.exitKeytipMode();
          };
        }
        this._keytipManager.registerPersistedKeytip(persistedKeytip);
        this._persistedKeytips.push(persistedKeytip.keySequences);

        // Modify this keytip's sequence to include the overflow sequence
        const overflowSequence = { ...overflowKeytip!.keySequences }.pop();
        const modifiedOverflowItem = { ...overflowItem };
        this._modifyOverflowItemKeytip(overflowSequence!, modifiedOverflowItem, -1);
        newOverflowItems.push(modifiedOverflowItem);
      } else {
        newOverflowItems.push(overflowItem);
      }
    });
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(newOverflowItems, this.props.keytipProps) }
      </div>
    );
  }

  private _modifyOverflowItemKeytip(overflowSequence: IKeySequence, overflowItem: any, insertIndex: number): void {
    overflowItem.keytipProps.keySequences.splice(insertIndex, 0, overflowSequence);
    overflowItem.keytipProps.overflowSetSequence = overflowSequence;

    if (overflowItem.subMenuProps) {
      // Need to insert into subMenu keytips
      const newIndex = insertIndex - 1;
      overflowItem.subMenuProps.items.forEach((item: any) => {
        if (item.keytipProps) {
          this._modifyOverflowItemKeytip(overflowSequence, item, newIndex);
        }
      });
    }
  }

}