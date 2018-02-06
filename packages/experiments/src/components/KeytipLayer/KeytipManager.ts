import { KeytipLayer } from './KeytipLayer';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { IKeytipProps } from '../../Keytip';
import {
  IKeySequence,
  convertSequencesToKeytipID,
  keySequencesContain,
} from '../../utilities/keysequence';

export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree;
  public currentSequence: IKeySequence;

  private _layer: KeytipLayer;
  private _enableSequences: IKeySequence[];
  private _exitSequences: IKeySequence[];
  private _goBackSequences: IKeySequence[];

  /**
 * Static function to get singleton KeytipManager instance
 */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Sets the _layer property and creates a KeytipTree
   * Should be called from the KeytipLayer constructor
   * @param layer - KeytipLayer object
   */
  public init(layer: KeytipLayer): void {
    this._layer = layer;
    this.currentSequence = { keyCodes: [] };
    this._enableSequences = this._layer.props.keytipStartSequences!;
    this._exitSequences = this._layer.props.keytipExitSequences!;
    this._goBackSequences = this._layer.props.keytipGoBackSequences!;
    // Create the KeytipTree
    this.keytipTree = new KeytipTree(this._layer.props.id);
  }

  /**
   * Gets the aria-describedby property for a set of keySequences
   * keySequences should not include the initial keytip 'start' sequence
   * @param keySequences - Full path of IKeySequences for one keytip
   */
  public getAriaDescribedBy(keySequences: IKeySequence[]): string {
    let describedby = this._layer.props.id;
    if (!keySequences.length) {
      // Return just the layer ID
      return describedby;
    }

    for (let i = 0; i < keySequences.length; i++) {
      describedby += ' ' + convertSequencesToKeytipID(keySequences.slice(0, i + 1));
    }

    return describedby;
  }

  /**
   * Registers a keytip in _layer
   * @param keytipProps - Keytip to register
   */
  public registerKeytip(keytipProps: IKeytipProps): void {
    // Set the 'keytips' property in _layer
    this._layer && this._layer.registerKeytip(keytipProps);
  }

  public showKeytips(ids: string[]): void {
    for (let id of ids) {
      this.keytipTree.nodeMap[id] = { ...this.keytipTree.nodeMap[id], visible: true };
    }
  }

  public hideKeytips(ids?: string[]): void {
    // TODO
  }

  public getLayerId(): string {
    return this._layer.props.id;
  }

  public exitKeytipMode(): void {
    this.keytipTree.currentKeytip = undefined;
    this._layer.exitKeytipMode();
  }

  public enterKeytipMode(): void {
    this._layer.enterKeytipMode();
  }

  /**
   * Processes inputs from the document listener and traverse the keytip tree
   * @param keySequence - Keys pressed by the user
   */
  public processInput(keySequence: IKeySequence): void {
    let currentSequence = { keyCodes: [...this.currentSequence.keyCodes, ...keySequence.keyCodes] };

    // If key sequence is in 'exit sequences', exit keytip mode
    //    Trigger layer's onExit callback
    if (keySequencesContain(this._exitSequences, currentSequence) && this.keytipTree.currentKeytip) {
      this.hideKeytips();
      this.exitKeytipMode();
      return;
    }
    // If key sequence is in 'go back sequences', move currentKeytip to parent (or if currentKeytip is the root, exit)
    //    Trigger node's onGoBackExecute
    //    Hide all keytips currently showing
    //    Show all keytips of children of currentKeytip
    if (keySequencesContain(this._goBackSequences, currentSequence)) {
      if (this.keytipTree.currentKeytip) {
        if (this.keytipTree.currentKeytip.id === this.keytipTree.root.id) {
          // We are at the root, exit keytip mode
          this.exitKeytipMode();
        } else {
          // If this keytip has a goBack prop, we execute the func.
          if (this.keytipTree.currentKeytip.onGoBack) {
            this.keytipTree.currentKeytip.onGoBack();
          }

          // Return pointer to its parent
          this.keytipTree.currentKeytip = this.keytipTree.nodeMap[this.keytipTree.currentKeytip.parent!];
          this.hideKeytips(); // HIDE ALL
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }
      }
      return;
    }

    // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
    //    Show children of root
    //    Trigger layer's onEnter callback
    if (keySequencesContain(this._enableSequences, currentSequence) && !this.keytipTree.currentKeytip) {
      this.keytipTree.currentKeytip = this.keytipTree.root;
      this.showKeytips(this.keytipTree.currentKeytip.children);
      this.enterKeytipMode();
    }

    if (this.keytipTree.currentKeytip) {
      let node = this.keytipTree.getExactMatchedNode(currentSequence, this.keytipTree.currentKeytip);
      if (node) { // we found a matching node
        this.keytipTree.currentKeytip = node;
        if (this.keytipTree.currentKeytip.onExecute) {
          this.keytipTree.currentKeytip.onExecute();
        }

        if (this.keytipTree.currentKeytip.children.length === 0) {
          this.exitKeytipMode();
          // TODO: WE NEED TO CHECK IF THIS IS REALLY A LEAF OR NOT
        } else {
          this.showKeytips(this.keytipTree.currentKeytip.children);
        }
        this.hideKeytips();
        this.currentSequence = { keyCodes: [] };
        return;
      }

      let partialNodes = this.keytipTree.getPartiallyMatchedNodes(currentSequence, this.keytipTree.currentKeytip);
      if (partialNodes.length > 0) {
        // we found partial nodes, so we show only those.
        this.hideKeytips();
        let ids = partialNodes.map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this.showKeytips(ids); // show only keytips that were partially matched
        this.currentSequence = currentSequence;
      }
    }

    // If currentKeytip is a node, look at all children of currentKeytip
    //    If the sequence exactly matches one of the children
    //      Trigger node's onExecute
    //      ** TODO: we would have to do the below after the DOM has finished rendering to know for sure if node was a leaf (e.g. menu) **
    //      If the new node is a leaf
    //        Set currentKeytip to null and exit keytip mode
    //      Else
    //        Set currentKeytip to node just triggered
    //        Hide all keytips currently showing
    //        Show all keytips of children of currentKeytip
    //    Else if the sequence matches the first part of a keytip
    //      Set visibility to false on keytips that don't match
    //    Else the sequence doesn't match anything
    //      Do nothing

    // Building up sequences
    /**
     * Have a 'currentSequence'
     * Every time processInput runs, it takes currentSequence + keySequence and tries to match that to the children of 'currentKeytip'
     * If it finds a match, it will set currentSequence += keySequence
     * When we match a whole keytip, we clear currentSequence
     */
  }
}