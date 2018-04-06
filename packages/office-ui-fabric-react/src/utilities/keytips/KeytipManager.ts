import { KeytipLayerBase } from '../../KeytipLayer';
import { KeytipTree } from './KeytipTree';
import { IKeytipTreeNode } from './IKeytipTreeNode';
import { IKeytipProps } from '../../Keytip';
import {
  IKeySequence,
  convertSequencesToKeytipID,
  transitionKeysContain,
  IKeytipTransitionKey,
  fullKeySequencesAreEqual,
  getDocument,
  replaceElement,
  findIndex,
  mergeOverflowKeySequences,
  Async
} from '../../Utilities';
import { constructKeytipExecuteTargetFromId } from './KeytipUtils';

export interface IUniqueKeytip {
  uniqueID: string;
  keytip: IKeytipProps;
}

export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree = new KeytipTree();
  public currentSequence: IKeySequence;
  public keytips: IUniqueKeytip[] = [];

  private _layer: KeytipLayerBase;

  private _enableSequences: IKeytipTransitionKey[];
  private _exitSequences: IKeytipTransitionKey[];
  private _returnSequences: IKeytipTransitionKey[];
  private _newCurrentKeytipSequences?: IKeySequence[];

  private _keytipIDCounter = 0;

  private _delayedKeytipQueue: string[] = [];
  private _delayedQueueTimeout: number;
  private _async: Async = new Async();

  /**
   * Static function to get singleton KeytipManager instance
   *
   * @returns {KeytipManager} Singleton KeytipManager instance
   */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Sets the _layer property and other related variables
   * Should be called from the KeytipLayer constructor
   *
   * @param layer - KeytipLayerBase object
   */
  public init(layer: KeytipLayerBase): void {
    this._layer = layer;
    this.currentSequence = '';
    // All guaranteed to be set because of defaultProps in KeytipLayer
    this._enableSequences = this._layer.props.keytipStartSequences!;
    this._exitSequences = this._layer.props.keytipExitSequences!;
    this._returnSequences = this._layer.props.keytipReturnSequences!;
  }

  /**
   * Registers a keytip
   *
   * @param keytipProps - Keytip to register
   * @returns {string} Unique ID for this keytip
   */
  public registerKeytip(keytipProps: IKeytipProps): string {
    const keytipTree = this.keytipTree;

    // Create a unique keytip
    const uniqueKeytip: IUniqueKeytip = this._constructUniqueKeytip(keytipProps);

    // Add keytip to the Manager, Tree, and Layer
    // Check if trying to register a duplicate keytip, if so just update
    const keytipIndex = this._findKeytipIndex(uniqueKeytip);
    if (keytipIndex < 0) {
      // Add
      this.keytips.push(uniqueKeytip);
      keytipTree.addNode(keytipProps, uniqueKeytip.uniqueID);
      this._layer && this._layer.setKeytips(this.getKeytips());

      // Add the keytip to the queue to show later
      if (this.keytipTree.isCurrentKeytipParent(keytipProps)) {
        this._addKeytipToQueue(convertSequencesToKeytipID(keytipProps.keySequences));
      }
    } else {
      // Update
      this._updateKeytip(uniqueKeytip, keytipIndex);
    }

    if (this._newCurrentKeytipSequences && fullKeySequencesAreEqual(keytipProps.keySequences, this._newCurrentKeytipSequences)) {
      // This keytip should become the currentKeytip and should execute right away
      let keytipSequence = [...keytipProps.keySequences];
      if (keytipProps.overflowSetSequence) {
        keytipSequence = mergeOverflowKeySequences(keytipSequence, keytipProps.overflowSetSequence);
      }

      // Set currentKeytip
      keytipTree.currentKeytip = keytipTree.getNode(convertSequencesToKeytipID(keytipSequence));
      if (keytipTree.currentKeytip) {
        // Show all children keytips if there
        const children = keytipTree.getChildren();
        children.length && this.showKeytips(children);

        if (keytipTree.currentKeytip.onExecute) {
          keytipTree.currentKeytip.onExecute(this._getKeytipDOMElement(keytipTree.currentKeytip.id));
        }
      }

      // Unset _newCurrentKeytipSequences
      this._newCurrentKeytipSequences = undefined;
    }

    return uniqueKeytip.uniqueID;
  }

  /**
   * Register a persisted keytip
   * This means just adding a KeytipTreeNode
   *
   * @param keytipProps - Persisted Keytip to register
   * @returns {string} Unique ID for this persisted keytip
   */
  public registerPersistedKeytip(keytipProps: IKeytipProps): string {
    const uniqueID = this._getNextUniqueID();
    this.keytipTree.addNode(keytipProps, uniqueID, true);
    return uniqueID;
  }

  /**
   * Update a keytip's props
   *
   * @param keytipProps - Keytip to update
   * @param uniqueID - Unique ID of this keytip
   */
  public updateKeytip(keytipProps: IKeytipProps, uniqueID: string): void {
    // Update keytip in this.keytips
    const uniqueKeytip = this._constructUniqueKeytip(keytipProps, uniqueID);
    const keytipIndex = this._findKeytipIndex(uniqueKeytip);
    if (keytipIndex >= 0) {
      this._updateKeytip(uniqueKeytip, keytipIndex);
    }
  }

  /**
   * Unregisters a keytip
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   */
  public unregisterKeytip(keytipToRemove: IKeytipProps, uniqueID: string): void {
    // Add the unique ID to the keytip
    const uniqueKeytipToRemove = this._constructUniqueKeytip(keytipToRemove, uniqueID);

    // Remove keytipToRemove from this.keytips
    this.keytips = this.keytips.filter((uniqueKtp: IUniqueKeytip) => {
      return !(fullKeySequencesAreEqual(uniqueKtp.keytip.keySequences, keytipToRemove.keySequences) && uniqueKtp.uniqueID === uniqueID);
    });

    // Remove keytip from the delayed queue
    this._removeKeytipFromQueue(convertSequencesToKeytipID(keytipToRemove.keySequences));

    // Remove the node from the Tree
    this.keytipTree.removeNode(keytipToRemove, uniqueID);
    this._layer && this._layer.setKeytips(this.getKeytips());
  }

  /**
   * Unegister a persisted keytip
   * This means just removing it from the KeytipTree
   *
   * @param keytipToRemove - Persisted keytip to remove
   * @param uniqueID - Unique ID of this persisted keytip
   */
  public unregisterPersistedKeytip(keytipToRemove: IKeytipProps, uniqueID: string): void {
    // Add the unique ID to the keytip
    this.keytipTree.removeNode(keytipToRemove, uniqueID);
  }

  /**
   * Method that makes visible keytips currently in the DOM given a list of IDs.
   *
   * @param ids - list of Keytip IDs to show
   */
  public showKeytips(ids: string[]): void {
    // Set visible property in this.keytips
    for (const keytip of this.getKeytips()) {
      const keytipId = convertSequencesToKeytipID(keytip.keySequences);
      if (ids.indexOf(keytipId) >= 0) {
        keytip.visible = true;
      } else if (keytip.overflowSetSequence && ids.indexOf(
        convertSequencesToKeytipID(
          mergeOverflowKeySequences(keytip.keySequences, keytip.overflowSetSequence))) >= 0) {
        // Check if the ID with the overflow is the keytip we're looking for
        keytip.visible = true;
      } else {
        keytip.visible = false;
      }
    }

    // Set in layer
    this._layer && this._layer.setKeytips(this.getKeytips());
  }

  /**
   * Exit keytip mode
   */
  public exitKeytipMode(): void {
    this.keytipTree.currentKeytip = undefined;
    this.currentSequence = '';
    // Hide all keytips
    this.showKeytips([]);
    this._layer && this._layer.exitKeytipMode();
    // Reset the delayed keytips if any
    this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
    this._delayedKeytipQueue = [];
  }

  /**
   * Enter keytip mode
   */
  public enterKeytipMode(): void {
    this.keytipTree.currentKeytip = this.keytipTree.root;
    // Show children of root
    this.showKeytips(this.keytipTree.getChildren());
    // Trigger onEnter callback
    this._layer && this._layer.enterKeytipMode();
  }

  /**
   * Callback function to use for persisted keytips
   *
   * @param overflowButtonSequences - The overflow button sequence to execute
   * @param keytipSequences - The keytip that should become the 'currentKeytip' when it is registered
   */
  public persistedKeytipExecute(overflowButtonSequences: IKeySequence[], keytipSequences: IKeySequence[]) {
    // Save newCurrentKeytip for later
    this._newCurrentKeytipSequences = keytipSequences;

    // Execute the overflow button's onExecute
    const overflowKeytipNode = this.keytipTree.getNode(convertSequencesToKeytipID(overflowButtonSequences));
    if (overflowKeytipNode && overflowKeytipNode.onExecute) {
      overflowKeytipNode.onExecute(this._getKeytipDOMElement(overflowKeytipNode.id));
    }
  }

  /**
   * Processes an IKeytipTransitionKey entered by the user
   *
   * @param transitionKey - IKeytipTransitionKey received by the layer to process
   */
  public processTransitionInput(transitionKey: IKeytipTransitionKey): void {
    const currKtp = this.keytipTree.currentKeytip;
    if (transitionKeysContain(this._exitSequences, transitionKey) && currKtp) {
      // If key sequence is in 'exit sequences', exit keytip mode
      this.exitKeytipMode();
    } else if (transitionKeysContain(this._returnSequences, transitionKey)) {
      // If key sequence is in return sequences, move currentKeytip to parent (or if currentKeytip is the root, exit)
      if (currKtp) {
        if (currKtp.id === this.keytipTree.root.id) {
          // We are at the root, exit keytip mode
          this.exitKeytipMode();
        } else {
          // If this keytip has a onReturn prop, we execute the func.
          if (currKtp.onReturn) {
            currKtp.onReturn(this._getKeytipDOMElement(currKtp.id));
          }

          // Reset currentSequence
          this.currentSequence = '';
          // Return pointer to its parent
          this.keytipTree.currentKeytip = this.keytipTree.getNode(currKtp.parent);
          // Show children keytips of the new currentKeytip
          this.showKeytips(this.keytipTree.getChildren());
        }
      }
    } else if (transitionKeysContain(this._enableSequences, transitionKey) && !currKtp) {
      // If key sequence is in 'entry sequences' and currentKeytip is null, we enter keytip mode
      this.enterKeytipMode();
    }
  }

  /**
   * Processes inputs from the document listener and traverse the keytip tree
   *
   * @param key - Key pressed by the user
   */
  public processInput(key: string): void {
    // Concat the input key with the current sequence
    const currSequence: IKeySequence = this.currentSequence + key;
    let currKtp = this.keytipTree.currentKeytip;

    // currentKeytip must be defined, otherwise we haven't entered keytip mode yet
    if (currKtp) {
      const node = this.keytipTree.getExactMatchedNode(currSequence, currKtp);
      if (node) {
        this.keytipTree.currentKeytip = currKtp = node;
        const currKtpChildren = this.keytipTree.getChildren();

        // Execute this node's onExecute if defined
        if (currKtp.onExecute) {
          currKtp.onExecute(this._getKeytipDOMElement(currKtp.id));
          // Reset currKtp, this might have changed from the onExecute
          currKtp = this.keytipTree.currentKeytip;
        }

        // To exit keytipMode after executing keytip we should check if currentKeytip has no children and
        // if the node doesn't have children nodes
        if (currKtpChildren.length === 0 && !currKtp.hasChildrenNodes) {
          this.exitKeytipMode();
        } else {
          // Show all children keytips
          this.showKeytips(currKtpChildren);
        }

        // Clear currentSequence
        this.currentSequence = '';
        return;
      }

      const partialNodes = this.keytipTree.getPartiallyMatchedNodes(currSequence, currKtp);
      if (partialNodes.length > 0) {
        // We found nodes that partially match the sequence, so we show only those
        // Omit showing persisted nodes here
        const ids = partialNodes.filter((partialNode: IKeytipTreeNode) => {
          return !partialNode.persisted;
        }).map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this.showKeytips(ids);
        // Save currentSequence
        this.currentSequence = currSequence;
      }
    }
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

  private _addKeytipToQueue(keytipID: string) {
    // Add keytip
    this._delayedKeytipQueue.push(keytipID);
    // Clear timeout
    this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
    // Reset timeout
    this._delayedQueueTimeout = this._async.setTimeout(() => {
      if (this._delayedKeytipQueue.length) {
        this.showKeytips(this._delayedKeytipQueue);
        this._delayedKeytipQueue = [];
      }
    }, 300);
  }

  private _removeKeytipFromQueue(keytipID: string) {
    const index = this._delayedKeytipQueue.indexOf(keytipID);
    if (index >= 0) {
      // Remove keytip
      this._delayedKeytipQueue.splice(index, 1);
      // Clear timeout
      this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
      // Reset timeout
      this._delayedQueueTimeout = this._async.setTimeout(() => {
        if (this._delayedKeytipQueue.length) {
          this.showKeytips(this._delayedKeytipQueue);
          this._delayedKeytipQueue = [];
        }
      }, 300);
    }
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
   * Update a unique keytip in this.keytips
   *
   * @param uniqueKeytip - Keytip to update
   * @param keytipIndex - Index of the keytip in the array
   */
  private _updateKeytip(uniqueKeytip: IUniqueKeytip, keytipIndex: number): void {
    // Update everything except 'visible'
    uniqueKeytip.keytip.visible = this.keytips[keytipIndex].keytip.visible;
    this.keytips = replaceElement(this.keytips, uniqueKeytip, keytipIndex);

    // Update keytip in keytip tree and layer
    this.keytipTree.updateNode(uniqueKeytip.keytip, uniqueKeytip.uniqueID);
    this._layer && this._layer.setKeytips(this.getKeytips());
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
   * Gets the DOM element for the specified keytip
   *
   * @param keytipId - ID of the keytip to query for
   * @returns {HTMLElement | null} DOM element of the keytip if found
   */
  private _getKeytipDOMElement(keytipId: string): HTMLElement | null {
    const dataKtpExecuteTarget = constructKeytipExecuteTargetFromId(keytipId);
    return getDocument()!.querySelector(dataKtpExecuteTarget);
  }

  /**
   * Find a keytip in this.keytips
   *
   * @param ktpToFind - IUniqueKeytipProps to find
   * @returns {number} Index of the keytip in this.keytips (or -1 if not found)
   */
  private _findKeytipIndex(ktpToFind: IUniqueKeytip): number {
    return findIndex(this.keytips, (ktp: IUniqueKeytip) => {
      return fullKeySequencesAreEqual(ktp.keytip.keySequences, ktpToFind.keytip.keySequences) &&
        ktp.uniqueID === ktpToFind.uniqueID;
    });
  }
}