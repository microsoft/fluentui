import { IKeytipProps } from '../../Keytip';
import { arraysEqual, replaceElement, findIndex, find, EventGroup, getId } from '../../Utilities';
import { KeytipEvents } from '../../utilities/keytips/KeytipConstants';

export interface IUniqueKeytip {
  uniqueID: string;
  keytip: IKeytipProps;
}

/**
 * This class is responsible for handling registering, updating, and unregistering of keytips
 */
export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytips: IUniqueKeytip[] = [];
  public persistedKeytips: IUniqueKeytip[] = [];

  // This is (and should be) updated and kept in sync
  // with the inKeytipMode in KeytipLayer.
  public inKeytipMode = false;

  // Boolean that gets checked before entering keytip mode by the KeytipLayer
  // Used for an override in special cases (e.g. Disable entering keytip mode when a modal is shown)
  public shouldEnterKeytipMode = true;

  /**
   * Static function to get singleton KeytipManager instance
   *
   * @returns {KeytipManager} Singleton KeytipManager instance
   */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Registers a keytip
   *
   * @param keytipProps - Keytip to register
   * @param persisted - T/F if this keytip should be persisted, default is false
   * @returns {string} Unique ID for this keytip
   */
  public register(keytipProps: IKeytipProps, persisted: boolean = false): string {
    let props: IKeytipProps = keytipProps;
    if (!persisted) {
      // Add the overflowSetSequence if necessary
      props = this.addParentOverflow(keytipProps);
    }
    // Create a unique keytip
    const uniqueKeytip: IUniqueKeytip = this._getUniqueKtp(props);
    // Add to array
    persisted ? this.persistedKeytips.push(uniqueKeytip) : this.keytips.push(uniqueKeytip);

    const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_ADDED : KeytipEvents.KEYTIP_ADDED;
    EventGroup.raise(this, event, {
      keytip: props,
      uniqueID: uniqueKeytip.uniqueID
    });

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
    const keytipIndex = findIndex(this.keytips, (ktp: IUniqueKeytip) => {
      return ktp.uniqueID === uniqueID;
    });
    if (keytipIndex >= 0) {
      // Update everything except 'visible'
      uniqueKeytip.keytip.visible = this.keytips[keytipIndex].keytip.visible;
      // Update keytip in this.keytips
      this.keytips = replaceElement(this.keytips, uniqueKeytip, keytipIndex);
      // Raise event
      EventGroup.raise(this, KeytipEvents.KEYTIP_UPDATED, {
        keytip: uniqueKeytip.keytip,
        uniqueID: uniqueKeytip.uniqueID
      });
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
    if (persisted) {
      // Remove keytip from this.persistedKeytips
      this.persistedKeytips = this.persistedKeytips.filter((uniqueKtp: IUniqueKeytip) => {
        return uniqueKtp.uniqueID !== uniqueID;
      });
    } else {
      // Remove keytip from this.keytips
      this.keytips = this.keytips.filter((uniqueKtp: IUniqueKeytip) => {
        return uniqueKtp.uniqueID !== uniqueID;
      });
    }

    const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_REMOVED : KeytipEvents.KEYTIP_REMOVED;
    EventGroup.raise(this, event, {
      keytip: keytipToRemove,
      uniqueID: uniqueID
    });
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
   * @returns {IKeytipProps[]} All keytips stored in the manager
   */
  public getKeytips(): IKeytipProps[] {
    return this.keytips.map((uniqueKeytip: IUniqueKeytip) => {
      return uniqueKeytip.keytip;
    });
  }

  /**
   * Adds the overflowSetSequence to the keytipProps if its parent keytip also has it
   *
   * @param keytipProps - Keytip props to add overflowSetSequence to if necessary
   * @returns {IKeytipProps} - Modified keytip props, if needed to be modified
   */
  public addParentOverflow(keytipProps: IKeytipProps): IKeytipProps {
    const fullSequence = [...keytipProps.keySequences];
    fullSequence.pop();
    if (fullSequence.length !== 0) {
      const parentKeytip = find(this.getKeytips(), (keytip: IKeytipProps) => {
        return arraysEqual(fullSequence, keytip.keySequences);
      });
      if (parentKeytip && parentKeytip.overflowSetSequence) {
        return {
          ...keytipProps,
          overflowSetSequence: parentKeytip.overflowSetSequence
        };
      }
    }
    return keytipProps;
  }

  /**
   * Public function to bind for overflow items that have a submenu
   *
   * @param overflowButtonSequences
   * @param keytipSequences
   */
  public menuExecute(overflowButtonSequences: string[], keytipSequences: string[]) {
    EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, {
      overflowButtonSequences,
      keytipSequences
    });
  }

  /**
   * Creates an IUniqueKeytip object
   *
   * @param keytipProps - IKeytipProps
   * @param uniqueID - Unique ID, will default to the next unique ID if not passed
   * @returns {IUniqueKeytip} IUniqueKeytip object
   */
  private _getUniqueKtp(keytipProps: IKeytipProps, uniqueID: string = getId()): IUniqueKeytip {
    return { keytip: { ...keytipProps }, uniqueID };
  }
}
