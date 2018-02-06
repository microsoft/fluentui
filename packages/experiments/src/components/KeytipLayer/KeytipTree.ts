import {
  IKeySequence,
  keySequencesContain,
  keySequencesAreEqual,
  keySequenceStartsWith,
  convertSequencesToKeytipID
} from '../../utilities/keysequence';
import { KeytipManager } from './KeytipManager';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // KeySequence that invokes this KeytipTreeNode's onExecute function
  keytipSequence: IKeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // Function to execute when we 'go back' to this keytip's parent.
  onGoBack?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: string[];

  // Parent keytip
  parent: string;

  // TODO: may need to know if keytip is disabled, if so shouldn't change visibility when start of sequence is pressed
  // TODO: visible/hidden
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip?: IKeytipTreeNode;
  public currentSequence: IKeySequence;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  private _enableSequences: IKeySequence[];
  private _exitSequences: IKeySequence[];
  private _goBackSequences: IKeySequence[];
  private _manager: KeytipManager;

  /**
   * KeytipTree constructor
   * @param enableSequences - KeySequences that will start keytip mode, passed down through the KeytipLayer
   */
  constructor(rootId: string, enableSequences: IKeySequence[], exitSequences: IKeySequence[], goBackSequences: IKeySequence[]) {
    this._manager = KeytipManager.getInstance();
    this._enableSequences = enableSequences;
    this._exitSequences = exitSequences;
    this._goBackSequences = goBackSequences;

    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: rootId,
      children: [],
      parent: '',
      keytipSequence: { keyCodes: [] }
    };
    this.currentSequence = { keyCodes: [] };
    this.nodeMap[this.root.id] = this.root;
  }

  /**
   * Add a keytip node to this KeytipTree
   * @param fullSequence - Full key sequence for the keytip to add
   * @param onExecute - Callback function to trigger when this keytip is activated
   */
  public addNode(fullSequence: IKeySequence[], onExecute: () => void): void {
    let nodeID = convertSequencesToKeytipID(fullSequence);
    // This keytip's sequence is the last one defined
    let keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    let parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    // See if node already exists
    let node = this.nodeMap[nodeID];
    if (node) {
      // If node exists, it was added when one of its children was added
      // Update keytipSequence, onExecute, parent
      node.keytipSequence = keytipSequence!;
      node.onExecute = onExecute;
      node.parent = parentID;
    } else {
      // If node doesn't exist, add node
      node = {
        id: nodeID,
        keytipSequence: keytipSequence!,
        onExecute: onExecute,
        children: [],
        parent: parentID
      };
      this.nodeMap[nodeID] = node;
    }

    let parent = this.nodeMap[parentID];
    if (!parent) {
      // If parent doesn't exist, create parent with ID and children only
      parent = {
        id: parentID,
        children: [],
        keytipSequence: { keyCodes: [] },
        parent: ''
      };
      this.nodeMap[parentID] = parent;
    }
    // Add node to parent's children
    parent.children.push(nodeID);
  }

  /**
   * Processes inputs from the document listener and traverse the keytip tree
   * @param keySequence - Keys pressed by the user
   */
  public processInput(keySequence: IKeySequence): void {
    let currentSequence = { keyCodes: [...this.currentSequence.keyCodes, ...keySequence.keyCodes] };

    // If key sequence is in 'exit sequences', exit keytip mode
    //    Trigger layer's onExit callback
    if (keySequencesContain(this._exitSequences, currentSequence) && this.currentKeytip) {
      this.currentKeytip = undefined;
      this._manager.hideKeytips();
      this._manager.exitKeytipMode();
      return;
    }
    // If key sequence is in 'go back sequences', move currentKeytip to parent (or if currentKeytip is the root, exit)
    //    Trigger node's onGoBackExecute
    //    Hide all keytips currently showing
    //    Show all keytips of children of currentKeytip
    if (keySequencesContain(this._goBackSequences, currentSequence)) {
      if (this.currentKeytip) {
        if (this.currentKeytip.id === this.root.id) {
          // We are at the root, exit keytip mode
          this.currentKeytip = undefined;
          this._manager.exitKeytipMode();
        } else {
          this.currentKeytip = this.nodeMap[this.currentKeytip.parent!];
          if (this.currentKeytip.onGoBack) {
            this.currentKeytip.onGoBack();
          }

          this._manager.hideKeytips(); // HIDE ALL
          this._manager.showKeytips(this.currentKeytip.children);
        }
      }
      return;
    }

    // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
    //    Show children of root
    //    Trigger layer's onEnter callback
    if (keySequencesContain(this._enableSequences, currentSequence) && !this.currentKeytip) {
      this.currentKeytip = this.root;
      this._manager.showKeytips(this.currentKeytip.children);
      this._manager.enterKeytipMode();
    }

    if (this.currentKeytip) {
      let node = this.getExactMatchedNode(currentSequence, this.currentKeytip);
      if (node) { // we found a matching node
        this.currentKeytip = node;
        if (this.currentKeytip.onExecute) {
          this.currentKeytip.onExecute();
        }
        this._manager.hideKeytips();
        if (this.currentKeytip.children.length === 0) {
          this.currentKeytip = undefined;
          this._manager.exitKeytipMode();
          // TODO: WE NEED TO CHECK IF THIS IS REALLY A LEAF OR NOT
        } else {
          this._manager.showKeytips(this.currentKeytip.children);
        }
        this.currentSequence = { keyCodes: [] };
        return;
      }

      let partialNodes = this.getPartiallyMatchedNodes(currentSequence, this.currentKeytip);
      if (partialNodes.length > 0) {
        // we found partial nodes, so we show only those.
        this._manager.hideKeytips();
        let ids = partialNodes.map((partialNode: IKeytipTreeNode) => { return partialNode.id; });
        this._manager.showKeytips(ids); // show only keytips that were partially matched
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

  public getExactMatchedNode(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined {
    let possibleNodes = this._getChildrenNodes(currentKeytip.children);
    for (let node of possibleNodes) {
      if (keySequencesAreEqual(node.keytipSequence, keySequence)) {
        return node;
      }
    }
    return undefined;
  }

  public getPartiallyMatchedNodes(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[] {
    let nodes: IKeytipTreeNode[] = [];
    let possibleNodes = this._getChildrenNodes(currentKeytip.children);
    for (let node of possibleNodes) {
      if (keySequenceStartsWith(node.keytipSequence, keySequence)) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  private _getChildrenNodes(ids: string[]): IKeytipTreeNode[] {
    let nodes: IKeytipTreeNode[] = [];
    for (let id of ids) {
      nodes.push(this.nodeMap[id]);
    }
    return nodes;
  }
}