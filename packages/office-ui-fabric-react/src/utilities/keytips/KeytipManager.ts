import { KeytipLayer } from '../../KeytipLayer';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { IKeytipProps, Keytip } from '../../Keytip';
import {
  IKeySequence,
  convertSequencesToKeytipID,
  transitionKeysContain,
  IKeytipTransitionKey,
  keySequencesAreEqual,
  fullKeySequencesAreEqual,
  getDocument,
  replaceElement,
  findIndex,
  ktpLayerId
} from '../../Utilities';
import { constructKeytipTargetFromId, constructKeytipExecuteTargetFromId } from './KeytipUtils';

export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree = new KeytipTree();
  public keytips: IKeytipProps[] = [];
  public currentSequence: IKeySequence;

  private _layer: KeytipLayer;
  private _enableSequences: IKeytipTransitionKey[];
  private _exitSequences: IKeytipTransitionKey[];
  private _returnSequences: IKeytipTransitionKey[];
  private _newCurrentKeytipSequences?: IKeySequence[];

  /**
   * Static function to get singleton KeytipManager instance
   *
   * @returns {KeytipManager} Singleton KeytipManager instance
   */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Sets the _layer property and creates a KeytipTree
   * Should be called from the KeytipLayer constructor
   *
   * @param layer - KeytipLayer object
   */
  public init(layer: KeytipLayer): void {
    this._layer = layer;
    this.currentSequence = { keys: [] };
    // All guaranteed to be set because of defaultProps in KeytipLayer
    this._enableSequences = this._layer.props.keytipStartSequences!;
    this._exitSequences = this._layer.props.keytipExitSequences!;
    this._returnSequences = this._layer.props.keytipReturnSequences!;
  }

  /**
   * Registers a keytip
   *
   * @param keytipProps - Keytip to register
   */
  // tslint:disable-next-line:no-any
  public registerKeytip(keytipProps: IKeytipProps): void {
    // Set 'visible' property to true in keytipProps if currentKeytip is this keytips parent
    if (this._isCurrentKeytipParent(keytipProps)) {
      keytipProps.visible = true;
    }

    // Add keytip to this, Tree, and Layer
    // Check if trying to register a duplicate keytip, if so just update
    const keytipIndex = this._findKeytipIndex(keytipProps);
    if (keytipIndex >= 0) {
      // Update everything except 'visible'
      this.keytips = replaceElement(this.keytips, { ...keytipProps, visible: this.keytips[keytipIndex].visible }, keytipIndex);
    } else {
      this.keytips.push(keytipProps);
    }
    this.keytipTree.addNode(keytipProps);
    this._layer && this._layer.setKeytips(this.keytips);

    if (this._newCurrentKeytipSequences && fullKeySequencesAreEqual(keytipProps.keySequences, this._newCurrentKeytipSequences)) {
      // This keytip should become the currentKeytip and should execute right away
      this.keytipTree.currentKeytip = this.keytipTree.nodeMap[convertSequencesToKeytipID(keytipProps.keySequences)];
      if (this.keytipTree.currentKeytip.onExecute) {
        this.keytipTree.currentKeytip.onExecute(this._getKeytipDOMElement(this.keytipTree.currentKeytip.id));
      }

      // Show all children keytips if there
      this.keytipTree.currentKeytip.children && this.showKeytips(this.keytipTree.currentKeytip.children);

      // Unset _newCurrentKeytipSequences
      this._newCurrentKeytipSequences = undefined;
    }
  }

  /**
   * Register a persisted keytip
   * This means just adding a KeytipTreeNode
   */
  public registerPersistedKeytip(keytipProps: IKeytipProps): void {
    this.keytipTree.addNode(keytipProps);
  }

  /**
   * Update a keytip's props
   *
   * @param keytipProps - Keytip to update
   */
  public updateKeytip(keytipProps: IKeytipProps): void {
    // Update keytip in this.keytips
    const keytipIndex = this._findKeytipIndex(keytipProps);
    if (keytipIndex >= 0) {
      // Update everything except 'visible'
      this.keytips = replaceElement(this.keytips, { ...keytipProps, visible: this.keytips[keytipIndex].visible }, keytipIndex);
    }
    // Update keytip in keytip tree and layer
    this.keytipTree.addNode(keytipProps);
    this._layer && this._layer.setKeytips(this.keytips);
  }

  /**
   * Unregisters a keytip
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   */
  public unregisterKeytip(keytipToRemove: IKeytipProps): void {
    // Remove keytipToRemove from this.keytips
    this.keytips = this.keytips.filter((keytip: IKeytipProps) => {
      return !fullKeySequencesAreEqual(keytip.keySequences, keytipToRemove.keySequences);
    });
    // Remove the node from the Tree
    this.keytipTree.removeNode(keytipToRemove.keySequences);
    this._layer && this._layer.setKeytips(this.keytips);
  }

  /**
   * Unegister a persisted keytip
   * This means just removing it from the KeytipTree
   *
   * @param keySequences - keySequences of the persisted Keytip to unregister
   */
  public unregisterPersistedKeytip(keytipToRemove: IKeytipProps): void {
    this.keytipTree.removeNode(keytipToRemove.keySequences);
  }

  /**
   * Method that makes visible keytips currently in the DOM given a list of IDs.
   *
   * @param ids - list of Ids to show
   */
  public showKeytips(ids: string[]): void {
    // Set visible property in this.keytips
    for (const keytip of this.keytips) {
      if (ids.indexOf(convertSequencesToKeytipID(keytip.keySequences)) >= 0) {
        keytip.visible = true;
      } else {
        keytip.visible = false;
      }
    }

    // Set in layer
    this._layer && this._layer.setKeytips(this.keytips);
  }

  /**
   * Exit keytip mode
   */
  public exitKeytipMode(): void {
    this.keytipTree.currentKeytip = undefined;
    // Hide all keytips
    this.showKeytips([]);
    this._layer && this._layer.exitKeytipMode();
  }

  /**
   * Enter keytip mode
   */
  public enterKeytipMode(): void {
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
    const overflowKeytipNode = this.keytipTree.nodeMap[convertSequencesToKeytipID(overflowButtonSequences)];
    if (overflowKeytipNode) {
      if (overflowKeytipNode.onExecute) {
        overflowKeytipNode.onExecute(this._getKeytipDOMElement(overflowKeytipNode.id));
      }
    }
  }

  /**
   * Processes an IKeytipTransitionKey entered by the user
   *
   * @param transitionKey - IKeytipTransitionKey received by the layer to process
   */
  public processTransitionInput(transitionKey: IKeytipTransitionKey): void {
    if (transitionKeysContain(this._exitSequences, transitionKey) && this.keytipTree.currentKeytip) {
      // If key sequence is in 'exit sequences', exit keytip mode
      this.exitKeytipMode();
    } else if (transitionKeysContain(this._returnSequences, transitionKey)) {
      // If key sequence is in return sequences, move currentKeytip to parent (or if currentKeytip is the root, exit)
      if (this.keytipTree.currentKeytip) {
        if (this.keytipTree.currentKeytip.id === this.keytipTree.root.id) {
          // We are at the root, exit keytip mode
          this.exitKeytipMode();
        } else {
          // If this keytip has a onReturn prop, we execute the func.
          if (this.keytipTree.currentKeytip.onReturn) {
            this.keytipTree.currentKeytip.onReturn(this._getKeytipDOMElement(this.keytipTree.currentKeytip.id));
          }

          // Clean currentSequence array
          this.currentSequence.keys = [];
          // Return pointer to its parent
          this.keytipTree.currentKeytip = this.keytipTree.nodeMap[this.keytipTree.currentKeytip.parent!];
          // Show children keytips of the new currentKeytip
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }
      }
    } else if (transitionKeysContain(this._enableSequences, transitionKey) && !this.keytipTree.currentKeytip) {
      // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
      this.keytipTree.currentKeytip = this.keytipTree.root;
      // Show children of root
      this.showKeytips(this.keytipTree.currentKeytip.children);
      // Trigger onEnter callback
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
    const currentSequence: IKeySequence = { keys: [...this.currentSequence.keys, ...[key]] };

    // currentKeytip must be defined, otherwise we haven't entered keytip mode yet
    if (this.keytipTree.currentKeytip) {
      const node = this.keytipTree.getExactMatchedNode(currentSequence, this.keytipTree.currentKeytip);
      if (node) {
        this.keytipTree.currentKeytip = node;

        // Execute this node's onExecute if defined
        if (this.keytipTree.currentKeytip.onExecute) {
          this.keytipTree.currentKeytip.onExecute(this._getKeytipDOMElement(this.keytipTree.currentKeytip.id));
        }

        // To exit keytipMode after executing keytip we should check if currentKeytip has no children and
        // if the node doesn't have children nodes.
        if (this.keytipTree.currentKeytip.children.length === 0 && !this.keytipTree.currentKeytip.hasChildrenNodes) {
          this.exitKeytipMode();
        } else {
          // Show all children keytips
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }

        // Clear currentSequence
        this.currentSequence = { keys: [] };
        return;
      }

      const partialNodes = this.keytipTree.getPartiallyMatchedNodes(currentSequence, this.keytipTree.currentKeytip);
      if (partialNodes.length > 0) {
        // We found nodes that partially match the sequence, so we show only those.
        const ids = partialNodes.map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this.showKeytips(ids);
        // Save currentSequence
        this.currentSequence = currentSequence;
      }
    }
  }

  /**
   * Tests if the currentKeytip in this.keytipTree is the parent of 'keytipProps'
   *
   * @param keytipProps - Keytip to test the parent for
   * @returns {boolean} T/F if the currentKeytip is this keytipProps' parent
   */
  private _isCurrentKeytipParent(keytipProps: IKeytipProps): boolean {
    if (this.keytipTree.currentKeytip) {
      const fullSequence = [...keytipProps.keySequences];
      // Take off the last sequence to calculate the parent ID
      fullSequence.pop();
      // Parent ID is the root if there aren't any more sequences
      const parentID = fullSequence.length === 0 ? this.keytipTree.root.id : convertSequencesToKeytipID(fullSequence);
      return this.keytipTree.currentKeytip.id === parentID;
    }
    return false;
  }

  /**
   * Gets the DOM element for the specified keytip
   *
   * @param keytipId - ID of the keytip to query for
   * @return {HTMLElement} DOM element of the keytip
   */
  private _getKeytipDOMElement(keytipId: string): HTMLElement | null {
    const dataKtpExecuteTarget = constructKeytipExecuteTargetFromId(keytipId);
    return getDocument()!.querySelector(dataKtpExecuteTarget);
  }

  private _findKeytipIndex(keytipProps: IKeytipProps): number {
    return findIndex(this.keytips, (keytip: IKeytipProps) => {
      return fullKeySequencesAreEqual(keytip.keySequences, keytipProps.keySequences);
    });
  }
}