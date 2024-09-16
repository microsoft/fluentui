import { EventGroup, getId } from '../../Utilities';
import { KeytipEvents } from '../../utilities/keytips/KeytipConstants';
import type { IKeytipProps } from '../../Keytip';

export interface IUniqueKeytip {
  uniqueID: string;
  keytip: IKeytipProps;
}

/**
 * This class is responsible for handling registering, updating, and unregistering of keytips
 */
export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytips: { [key: string]: IUniqueKeytip } = {};
  public persistedKeytips: { [key: string]: IUniqueKeytip } = {};
  public sequenceMapping: { [key: string]: IKeytipProps } = {};

  // This is (and should be) updated and kept in sync
  // with the inKeytipMode in KeytipLayer.
  public inKeytipMode = false;

  // Boolean that gets checked before entering keytip mode by the KeytipLayer
  // Used for an override in special cases (e.g. Disable entering keytip mode when a modal is shown)
  public shouldEnterKeytipMode = true;

  // Boolean to indicate whether to delay firing an event to update subscribers of
  // keytip data changed.
  public delayUpdatingKeytipChange = false;

  /**
   * Static function to get singleton KeytipManager instance
   *
   * @returns Singleton KeytipManager instance
   */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Initialization code to set set parameters to define
   * how the KeytipManager handles keytip data.
   *
   * @param delayUpdatingKeytipChange - T/F if we should delay notifiying keytip subscribers
   * of keytip changes
   */
  public init(delayUpdatingKeytipChange: boolean) {
    this.delayUpdatingKeytipChange = delayUpdatingKeytipChange;
  }

  /**
   * Registers a keytip
   *
   * @param keytipProps - Keytip to register
   * @param persisted - T/F if this keytip should be persisted, default is false
   * @returns Unique ID for this keytip
   */
  public register(keytipProps: IKeytipProps, persisted: boolean = false): string {
    let props: IKeytipProps = keytipProps;
    if (!persisted) {
      // Add the overflowSetSequence if necessary
      props = this.addParentOverflow(keytipProps);
      this.sequenceMapping[props.keySequences.toString()] = props;
    }
    // Create a unique keytip
    const uniqueKeytip: IUniqueKeytip = this._getUniqueKtp(props);
    // Add to dictionary
    persisted
      ? (this.persistedKeytips[uniqueKeytip.uniqueID] = uniqueKeytip)
      : (this.keytips[uniqueKeytip.uniqueID] = uniqueKeytip);

    // We only want to add something new if we are currently showing keytip mode
    if (this.inKeytipMode || !this.delayUpdatingKeytipChange) {
      const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_ADDED : KeytipEvents.KEYTIP_ADDED;
      EventGroup.raise(this, event, {
        keytip: props,
        uniqueID: uniqueKeytip.uniqueID,
      });
    }

    return uniqueKeytip.uniqueID;
  }

  /**
   * Update a keytip
   *
   * @param keytipProps - Keytip to update
   * @param uniqueID - Unique ID of this keytip
   */
  public update(keytipProps: IKeytipProps, uniqueID: string): void {
    const newKeytipProps = this.addParentOverflow(keytipProps);
    const uniqueKeytip = this._getUniqueKtp(newKeytipProps, uniqueID);
    const oldKeyTip = this.keytips[uniqueID];
    if (oldKeyTip) {
      // Update everything except 'visible'
      uniqueKeytip.keytip.visible = oldKeyTip.keytip.visible;
      // Update keytip in this.keytips
      this.keytips[uniqueID] = uniqueKeytip;

      // Update the sequence to be up to date
      delete this.sequenceMapping[oldKeyTip.keytip.keySequences.toString()];
      this.sequenceMapping[uniqueKeytip.keytip.keySequences.toString()] = uniqueKeytip.keytip;

      // Raise event only if we are currently in keytip mode
      if (this.inKeytipMode || !this.delayUpdatingKeytipChange) {
        EventGroup.raise(this, KeytipEvents.KEYTIP_UPDATED, {
          keytip: uniqueKeytip.keytip,
          uniqueID: uniqueKeytip.uniqueID,
        });
      }
    }
  }

  /**
   * Unregisters a keytip
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   * @param uniqueID - Unique ID of this keytip
   * @param persisted - T/F if this keytip should be persisted, default is false
   */
  public unregister(keytipToRemove: IKeytipProps, uniqueID: string, persisted: boolean = false): void {
    persisted ? delete this.persistedKeytips[uniqueID] : delete this.keytips[uniqueID];
    !persisted && delete this.sequenceMapping[keytipToRemove.keySequences.toString()];

    const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_REMOVED : KeytipEvents.KEYTIP_REMOVED;
    // Update keytips only if we're in keytip mode
    if (this.inKeytipMode || !this.delayUpdatingKeytipChange) {
      EventGroup.raise(this, event, {
        keytip: keytipToRemove,
        uniqueID,
      });
    }
  }

  /**
   * Manual call to enter keytip mode
   */
  public enterKeytipMode(): void {
    EventGroup.raise(this, KeytipEvents.ENTER_KEYTIP_MODE);
  }

  /**
   * Manual call to exit keytip mode
   */
  public exitKeytipMode(): void {
    EventGroup.raise(this, KeytipEvents.EXIT_KEYTIP_MODE);
  }

  /**
   * Gets all IKeytipProps from this.keytips
   *
   * @returns All keytips stored in the manager
   */
  public getKeytips(): IKeytipProps[] {
    return Object.keys(this.keytips).map(key => this.keytips[key].keytip);
  }

  /**
   * Adds the overflowSetSequence to the keytipProps if its parent keytip also has it
   *
   * @param keytipProps - Keytip props to add overflowSetSequence to if necessary
   * @returns - Modified keytip props, if needed to be modified
   */
  public addParentOverflow(keytipProps: IKeytipProps): IKeytipProps {
    const fullSequence = [...keytipProps.keySequences];
    fullSequence.pop();
    if (fullSequence.length !== 0) {
      const parentKeytip = this.sequenceMapping[fullSequence.toString()];
      if (parentKeytip && parentKeytip.overflowSetSequence) {
        return {
          ...keytipProps,
          overflowSetSequence: parentKeytip.overflowSetSequence,
        };
      }
    }
    return keytipProps;
  }

  /**
   * Public function to bind for overflow items that have a submenu
   */
  public menuExecute(overflowButtonSequences: string[], keytipSequences: string[]) {
    EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, {
      overflowButtonSequences,
      keytipSequences,
    });
  }

  /**
   * Creates an IUniqueKeytip object
   *
   * @param keytipProps - IKeytipProps
   * @param uniqueID - Unique ID, will default to the next unique ID if not passed
   * @returns IUniqueKeytip object
   */
  private _getUniqueKtp(keytipProps: IKeytipProps, uniqueID: string = getId()): IUniqueKeytip {
    return { keytip: { ...keytipProps }, uniqueID };
  }
}
