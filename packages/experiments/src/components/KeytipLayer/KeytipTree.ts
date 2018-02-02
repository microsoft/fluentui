import { IKeySequence } from '../../Utilities';
import { KeytipManager } from './KeytipManager';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // KeySequence that invokes this KeytipTreeNode's onExecute function
  keytipSequence?: IKeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: string[];

  // Parent keytip
  parent?: string;
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip: IKeytipTreeNode;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  private _enableSequences: IKeySequence[];
  private _root: IKeytipTreeNode;
  private _nodes: IKeytipTreeNode[];
  private _manager: KeytipManager;

  /**
   * KeytipTree constructor
   * @param enableSequences - KeySequences that will start keytip mode, passed down through the KeytipLayer
   */
  constructor(enableSequences: IKeySequence[]) {
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
  public addNode(fullSequence: IKeySequence[], onExecute: () => void) {
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
}