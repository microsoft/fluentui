import { IKeytipProps } from '../../Keytip';
import {
  arraysAreEqual,
  replaceElement,
  findIndex,
  find,
  EventGroup,
  KeytipEvents
} from '../../Utilities';

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

  private _keytipIDCounter = 0;

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
   * @returns {string} Unique ID for this keytip
   */
  public registerKeytip(keytipProps: IKeytipProps): string {
    // Add the overflowSetSequence if necessary
    const newKeytipProps = this.addParentOverflowSequence(keytipProps);

    // Create a unique keytip
    const uniqueKeytip: IUniqueKeytip = this._constructUniqueKeytip(newKeytipProps);

    // Add to array
    this.keytips.push(uniqueKeytip);
    EventGroup.raise(this, KeytipEvents.KEYTIP_ADDED, {
      keytip: newKeytipProps,
      uniqueID: uniqueKeytip.uniqueID
    });

    return uniqueKeytip.uniqueID;
  }

  /**
   * Register a persisted keytip
   *
   * @param keytipProps - Persisted Keytip to register
   * @returns {string} Unique ID for this persisted keytip
   */
  public registerPersistedKeytip(keytipProps: IKeytipProps): string {
    const uniqueKeytip: IUniqueKeytip = this._constructUniqueKeytip(keytipProps);
    this.persistedKeytips.push(uniqueKeytip);
    EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_ADDED, {
      keytip: keytipProps,
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
  public updateKeytip(keytipProps: IKeytipProps, uniqueID: string): void {
    const newKeytipProps = this.addParentOverflowSequence(keytipProps);
    const uniqueKeytip = this._constructUniqueKeytip(newKeytipProps, uniqueID);
    const keytipIndex = this._findKeytipIndex(uniqueID);
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
   */
  public unregisterKeytip(keytipToRemove: IKeytipProps, uniqueID: string): void {
    // Remove keytipToRemove from this.keytips
    this.keytips = this.keytips.filter((uniqueKtp: IUniqueKeytip) => {
      return uniqueKtp.uniqueID !== uniqueID;
    });

    EventGroup.raise(this, KeytipEvents.KEYTIP_REMOVED, {
      keytip: keytipToRemove,
      uniqueID: uniqueID
    });
  }

  /**
   * Unegister a persisted keytip
   *
   * @param keytipToRemove - Persisted keytip to remove
   * @param uniqueID - Unique ID of this persisted keytip
   */
  public unregisterPersistedKeytip(keytipToRemove: IKeytipProps, uniqueID: string): void {
    // Remove persisted keytip from this.persistedKeytips
    this.persistedKeytips = this.persistedKeytips.filter((uniqueKtp: IUniqueKeytip) => {
      return uniqueKtp.uniqueID !== uniqueID;
    });

    EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_REMOVED, {
      keytip: keytipToRemove,
      uniqueID: uniqueID
    });
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
  public addParentOverflowSequence(keytipProps: IKeytipProps): IKeytipProps {
    const fullSequence = [...keytipProps.keySequences];
    fullSequence.pop();
    if (fullSequence.length !== 0) {
      const parentKeytip = find(this.getKeytips(), (keytip: IKeytipProps) => {
        return arraysAreEqual(fullSequence, keytip.keySequences);
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
  public persistedKeytipExecute(overflowButtonSequences: string[], keytipSequences: string[]) {
    EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, {
      overflowButtonSequences,
      keytipSequences
    });
  }

  /**
   * Generates the next unique ID for a keytip
   *
   * @returns {string} A unique ID for a keytip
   */
  private _getNextUniqueID(): string {
    return (++this._keytipIDCounter).toString();
  }

  /**
   * Creates an IUniqueKeytip object
   *
   * @param keytipProps - IKeytipProps
   * @param uniqueID - Unique ID, will default to the next unique ID if not passed
   * @returns {IUniqueKeytip} IUniqueKeytip object
   */
  private _constructUniqueKeytip(keytipProps: IKeytipProps, uniqueID: string = this._getNextUniqueID()): IUniqueKeytip {
    return { keytip: { ...keytipProps }, uniqueID };
  }

  /**
   * Find a keytip in this.keytips
   *
   * @param ktpToFind - IUniqueKeytipProps to find
   * @returns {number} Index of the keytip in this.keytips (or -1 if not found)
   */
  private _findKeytipIndex(uniqueID: string): number {
    return findIndex(this.keytips, (ktp: IUniqueKeytip) => {
      return ktp.uniqueID === uniqueID;
    });
  }
}