import * as React from 'react';
import {
  css,
  BaseComponent,
  createRef,
  IKeySequence,
  addElementAtIndex
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
    const overflowKeytipSequences = this.props.keytipSequences;

    let newOverflowItems: any[] = [];

    // Register all persisted keytips and save
    if (overflowKeytipSequences) {
      const overflowKeytipSequence = [...overflowKeytipSequences].pop();
      items.forEach((overflowItem) => {
        const keytip = (overflowItem as IOverflowSetItemProps).keytipProps;
        if (keytip) {
          // Modify this keytip's sequence to include the overflow sequence
          const modifiedOverflowItem = { ...overflowItem, keytipProps: { ...overflowItem.keytipProps } };
          this._modifyOverflowItemKeytip(overflowKeytipSequence!, modifiedOverflowItem, -1);
          newOverflowItems.push(modifiedOverflowItem);

          // Create persisted keytip
          const persistedKeytip = { ...keytip, hasChildrenNodes: false };
          if (keytip.hasChildrenNodes || overflowItem.subMenuProps) {
            // If the keytip has a submenu, we need to modify the onExecute
            persistedKeytip.onExecute = this._keytipManager.persistedKeytipExecute.bind(this._keytipManager, overflowKeytipSequences, modifiedOverflowItem.keytipProps.keySequences);
          } else {
            // If the keytip doesn't have a submenu, just execute the original function
            persistedKeytip.onExecute = (el: HTMLElement | null) => {
              keytip.onExecute && keytip.onExecute(el);
            };
          }

          // Add this persisted keytip to our internal list
          this._persistedKeytips.push(persistedKeytip);
        } else {
          newOverflowItems.push(overflowItem);
        }
      });
    } else {
      // If there is no keytip for the overflow button we don't have to do any of the above logic
      newOverflowItems = items;
    }
    return (
      <div { ...wrapperDivProps }>
        { this.props.onRenderOverflowButton(newOverflowItems) }
      </div>
    );
  }

  private _modifyOverflowItemKeytip(overflowSequence: IKeySequence, overflowItem: any, insertIndex: number): void {
    overflowItem.keytipProps.keySequences = addElementAtIndex(overflowItem.keytipProps.keySequences, insertIndex, overflowSequence);
    overflowItem.keytipProps.overflowSetSequence = overflowSequence;

    if (overflowItem.subMenuProps) {
      // Need to insert into subMenu keytips
      overflowItem.subMenuProps.items.forEach((item: any) => {
        if (item.keytipProps) {
          this._modifyOverflowItemKeytip(overflowSequence, item, --insertIndex);
        }
      });
    }
  }

}