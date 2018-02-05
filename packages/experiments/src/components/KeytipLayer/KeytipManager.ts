import { KeytipLayer } from './KeytipLayer';
import { KeytipTree } from './KeytipTree';
import { IKeytipProps } from '../../Keytip';
import {
  IKeySequence,
  convertSequencesToKeytipID,
  keySequencesContain,
  keySequencesAreEqual,
  keySequenceStartsWith,
} from '../../utilities/keysequence';

export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree;

  private _layer: KeytipLayer;
  private _currentSequence: IKeySequence;
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
    // Create the KeytipTree
    this.keytipTree = new KeytipTree(this._layer.props.keytipStartSequences!,
      this._layer.props.keytipExitSequences!,
      this._layer.props.keytipGoBackSequences!);
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

  public showKeytips(ids?: string[]): void {
    // TODO
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

  public processInput(keySequence: IKeySequence): void {
    let currentSequence = { keyCodes: [...this._currentSequence.keyCodes, ...keySequence.keyCodes] };

    // If key sequence is in 'exit sequences', exit keytip mode
    //    Trigger layer's onExit callback
    if (keySequencesContain(this._exitSequences, currentSequence) && this.currentKeytip) {
      this.hideKeytips();
      this.exitKeytipMode();
      return;
    }
    // If key sequence is in 'go back sequences', move currentKeytip to parent (or if currentKeytip is the root, exit)
    //    Trigger node's onGoBackExecute
    //    Hide all keytips currently showing
    //    Show all keytips of children of currentKeytip
    if (keySequencesContain(this._goBackSequences, currentSequence)) {
      if (this.currentKeytip) {
        if (this.currentKeytip.id === this.keytipTree.root.id) {
          // We are at the root, exit keytip mode
          this.exitKeytipMode();
        } else {
          this.currentKeytip = this.keytipTree.nodeMap[this.currentKeytip.parent!];
          if (this.currentKeytip.onGoBack) {
            this.currentKeytip.onGoBack();
          }

          this.hideKeytips(); // HIDE ALL
          this.showKeytips(this.currentKeytip.children);
        }
      }
      return;
    }

    // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
    //    Show children of root
    //    Trigger layer's onEnter callback
    if (keySequencesContain(this._enableSequences, currentSequence) && !this.currentKeytip) {
      this.currentKeytip = this.keytipTree.root;
      this.showKeytips(this.currentKeytip.children);
      this.enterKeytipMode();
    }

    if (this.currentKeytip) {
      let node = this._getExactMatchedNode(currentSequence, this.currentKeytip);
      if (node) { // we found a matching node
        this.currentKeytip = node;
        if (this.currentKeytip.onExecute) {
          this.currentKeytip.onExecute();
        }
        this.hideKeytips();
        if (this.currentKeytip.children.length === 0) {
          this.exitKeytipMode();
          // TODO: WE NEED TO CHECK IF THIS IS REALLY A LEAF OR NOT
        } else {
          this.showKeytips(this.currentKeytip.children);
        }
        this._currentSequence = { keyCodes: [] };
        return;
      }

      let partialNodes = this._getPartialMatchedNodes(currentSequence, this.currentKeytip);
      if (partialNodes.length > 0) {
        // we found partial nodes, so we show only those.
        this.hideKeytips();
        let ids = partialNodes.map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this.showKeytips(ids); // show only keytips that were partially matched
        this._currentSequence = currentSequence;
      }
    }
  }
}