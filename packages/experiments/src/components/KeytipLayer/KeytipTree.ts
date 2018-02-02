import { IKeySequence, keySequencesContain } from '../../utilities/keysequence';
import { KeytipManager } from './KeytipManager';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // KeySequence that invokes this KeytipTreeNode's onExecute function
  keytipSequence?: IKeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // Function to execute when we 'go back' to this keytip
  onGoBack?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: string[];

  // Parent keytip
  parent?: string;

  // TODO: may need to know if keytip is disabled, if so shouldn't change visibility when start of sequence is pressed
  // TODO: visible/hidden
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip: IKeytipTreeNode;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  private _enableSequences: IKeySequence[];
  private _exitSequences: IKeySequence[];
  private _manager: KeytipManager;

  /**
   * KeytipTree constructor
   * @param enableSequences - KeySequences that will start keytip mode, passed down through the KeytipLayer
   */
  constructor(enableSequences: IKeySequence[], exitSequences: IKeySequence[]) {
    this._manager = KeytipManager.getInstance();
    this._enableSequences = enableSequences;
    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: this._manager.getLayer().props.id,
      children: []
    };
    this.nodeMap[this.root.id] = this.root;
  }

  /**
   * Add a keytip node to this KeytipTree
   * @param fullSequence - Full key sequence for the keytip to add
   * @param onExecute - Callback function to trigger when this keytip is activated
   */
  public addNode(fullSequence: IKeySequence[], onExecute: () => void): void {
    let nodeID = this._manager.convertSequencesToID(fullSequence);
    // This keytip's sequence is the last one defined
    let keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    let parentID = fullSequence.length === 0 ? this.root.id : this._manager.convertSequencesToID(fullSequence);

    // See if node already exists
    let node = this.nodeMap[nodeID];
    if (node) {
      // If node exists, it was added when one of its children was added
      // Update keytipSequence, onExecute, parent
      node.keytipSequence = keytipSequence;
      node.onExecute = onExecute;
      node.parent = parentID;
    } else {
      // If node doesn't exist, add node
      node = {
        id: nodeID,
        keytipSequence: keytipSequence,
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
        children: []
      };
      this.nodeMap[parentID] = parent;
    }
    // Add node to parent's children
    parent.children.push(nodeID);
  }

  /**
   * Processes inputs from the document listener and traverses the keytip tree
   * @param keySequence - Keys pressed by the user
   */
  public processInput(keySequence: IKeySequence): void {
    // If key sequence is in 'exit sequences', exit keytip mode
    //    Trigger layer's onExit callback
    if (keySequencesContain(this._exitSequences, keySequence)) {
      this._manager.getLayer().exitKeytipMode();
    }
    // If key sequence is in 'go back sequences', move currentKeytip to parent (or if currentKeytip is the root, exit)
    //    Trigger node's onGoBackExecute
    //    Hide all keytips currently showing
    //    Show all keytips of children of currentKeytip

    // If key sequence is in 'entry sequences' and currentKeytip is null, set currentKeytip to root
    //    Show children of root
    //    Trigger layer's onEnter callback
    if (keySequencesContain(this._enableSequences, keySequence)) {
      // Test
    }

    // If currentKeytip is a non-root node, look at all children of currentKeytip
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