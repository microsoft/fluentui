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