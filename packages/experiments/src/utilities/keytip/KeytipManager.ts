import { KeytipLayer } from '../../KeytipLayer';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { IKeytipProps } from '../../Keytip';
import {
  IKeySequence,
  convertSequencesToKeytipID,
} from '../../utilities/keysequence/IKeySequence';
import {
  transitionKeysContain,
  IKeytipTransitionKey
} from '../../utilities/keysequence/IKeytipTransitionKey';
import { constructKeytipTargetFromId } from '../../utilities/keytip/KeytipUtils';

export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree;
  public currentSequence: IKeySequence;

  private _layer: KeytipLayer;
  private _enableSequences: IKeytipTransitionKey[];
  private _exitSequences: IKeytipTransitionKey[];
  private _returnSequences: IKeytipTransitionKey[];

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
    this._enableSequences = this._layer.props.keytipStartSequences!;
    this._exitSequences = this._layer.props.keytipExitSequences!;
    this._returnSequences = this._layer.props.keytipReturnSequences!;
    // Create the KeytipTree
    this.keytipTree = new KeytipTree(this._layer.props.id);
  }

  /**
   * Gets the aria-describedby property for a set of keySequences
   * keySequences should not include the initial keytip 'start' sequence
   *
   * @param keySequences - Full path of IKeySequences for one keytip
   * @returns {string} String to use for the aria-describedby property for the element with this Keytip
   */
  public getAriaDescribedBy(keySequences: IKeySequence[]): string {
    const describedby = this._layer.props.id;
    if (!keySequences.length) {
      // Return just the layer ID
      return describedby;
    }

    return keySequences.reduce((prevValue: string, keySequence: IKeySequence, currentIndex: number): string => {
      return prevValue + ' ' + convertSequencesToKeytipID(keySequences.slice(0, currentIndex + 1));
    }, describedby);
  }

  /**
   * Registers a keytip
   * TODO: should this return an any? or something else
   *
   * @param keytipProps - Keytip to register
   * @returns {any} Object containing the aria-describedby and data-ktp-id DOM properties
   */
  // tslint:disable-next-line:no-any
  public registerKeytip(keytipProps: IKeytipProps): any {
    // Set 'visible' property to true in keytipProps if currentKeytip is this keytips parent
    if (this._isCurrentKeytipParent(keytipProps)) {
      keytipProps.visible = true;
    }

    // Set the 'keytips' property in _layer
    this._layer.registerKeytip(keytipProps);
    this.keytipTree.addNode(keytipProps);

    // Construct aria-describedby and data-ktp-id attributes and return
    const ariaDescribedBy = this.getAriaDescribedBy(keytipProps.keySequences);
    const ktpId = convertSequencesToKeytipID(keytipProps.keySequences);

    return {
      'aria-describedby': ariaDescribedBy,
      'data-ktp-id': ktpId
    };
  }

  /**
   * Unregisters a keytip
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   */
  public unregisterKeytip(keytipToRemove: IKeytipProps): void {
    this._layer.unregisterKeytip(keytipToRemove);
    this.keytipTree.removeNode(keytipToRemove.keySequences);
  }

  /**
   * Method that makes visible keytips currently in the DOM given a list of IDs.
   *
   * @param ids: list of Ids to show.
   */
  public showKeytips(ids: string[]): void {
    this._changeKeytipVisibility(ids, true /*visible*/);
  }

  /**
   * Method that hides keytips from the DOM given a list of IDs.
   * If a list is not passed in, than it will hide all the currently registered keytips.
   *
   * @param ids: optional list of Ids to hide.
   */
  public hideKeytips(ids?: string[]): void {
    // We can either hide keytips from the supplied array of ids, or all keytips.
    const keysToHide = ids ? ids : Object.keys(this.keytipTree.nodeMap);
    this._changeKeytipVisibility(keysToHide, false /* visible */);
  }

  public getLayerId(): string {
    return this._layer.props.id;
  }

  public exitKeytipMode(): void {
    this.hideKeytips();
    this.keytipTree.currentKeytip = undefined;
    this._layer.exitKeytipMode();
  }

  public enterKeytipMode(): void {
    this._layer.enterKeytipMode();
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
            const domEl = this._getKeytipDOMElement(this.keytipTree.currentKeytip.id);
            this.keytipTree.currentKeytip.onReturn(domEl);
          }

          // Clean currentSequence array
          this.currentSequence.keys = [];
          // Return pointer to its parent
          this.keytipTree.currentKeytip = this.keytipTree.nodeMap[this.keytipTree.currentKeytip.parent!];
          // Hide all keytips
          this.hideKeytips();
          // Show children keytips of the new currentKeytip
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }
      }
    } else if (transitionKeysContain(this._enableSequences, transitionKey) && !this.keytipTree.currentKeytip) {
      // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
      this.keytipTree.currentKeytip = this.keytipTree.root;
      this.hideKeytips();
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
        // If this is a persisted keytip, then we use its keytipLink
        this.keytipTree.currentKeytip = node.keytipLink ? node.keytipLink : node;

        // Execute this node's onExecute if defined
        if (this.keytipTree.currentKeytip.onExecute) {
          const domEl = this._getKeytipDOMElement(this.keytipTree.currentKeytip.id);
          this.keytipTree.currentKeytip.onExecute(domEl);
        }

        // To exit keytipMode after executing keytip we should check if currentKeytip has no children and
        // if the node doesn't have children nodes.
        if (this.keytipTree.currentKeytip.children.length === 0 && !this.keytipTree.currentKeytip.hasChildrenNodes) {
          this.exitKeytipMode();
        } else {
          // Show all children keytips
          this.hideKeytips();
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }

        // Clear currentSequence
        this.currentSequence = { keys: [] };
        return;
      }

      const partialNodes = this.keytipTree.getPartiallyMatchedNodes(currentSequence, this.keytipTree.currentKeytip);
      if (partialNodes.length > 0) {
        // We found nodes that partially match the sequence, so we show only those.
        this.hideKeytips();
        const ids = partialNodes.map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this.showKeytips(ids);
        // Save currentSequence
        this.currentSequence = currentSequence;
      }
    }
  }

  private _changeKeytipVisibility(ids: string[], visible: boolean): void {
    // Change visibility in layer
    this._layer.setKeytipVisibility(ids, visible);
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
  private _getKeytipDOMElement(keytipId: string): HTMLElement {
    const dataKeytipId = constructKeytipTargetFromId(keytipId);
    return document.querySelector(dataKeytipId) as HTMLElement;
  }
}