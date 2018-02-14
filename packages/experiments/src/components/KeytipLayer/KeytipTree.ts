import {
  IKeySequence,
  keySequencesAreEqual,
  keySequenceStartsWith,
  convertSequencesToKeytipID
} from '../../utilities/keysequence';

export interface IKeytipTreeNode {
  // ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
  id: string;

  // KeySequence that invokes this KeytipTreeNode's onExecute function
  keytipSequence: IKeySequence;

  // Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
  onExecute?: () => void;

  // Function to execute when we 'go back' to this keytip's parent.
  onReturn?: () => void;

  // List of keytips that should become visible when this keytip is pressed, can be empty
  children: string[];

  // Parent keytip
  parent: string;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   */
  hasChildrenNodes?: boolean;

  /**
   * Optional link to another IKeytipTreeNode; only used for persisted Keytips in OverflowWells,
   * where we want keytips to be executed with and without the overflow keytip.
   */
  keytipLink?: IKeytipTreeNode;

  /**
   * Whether the keytip is visible or not in the dom.
   */
  visible?: boolean;

  // TODO: may need to know if keytip is disabled, if so shouldn't change visibility when start of sequence is pressed
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip?: IKeytipTreeNode;
  public currentSequence: IKeySequence;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  /**
   * KeytipTree constructor
   * @param enableSequences - KeySequences that will start keytip mode, passed down through the KeytipLayer
   */
  constructor(rootId: string) {

    // Root has no keytipSequences, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: rootId,
      children: [],
      parent: '',
      keytipSequence: { keys: [] },
      hasChildrenNodes: true
    };
    this.currentSequence = { keys: [] };
    this.nodeMap[this.root.id] = this.root;
  }

  // check if it has an overflow set
  // get overflowset node
  // add node to overflowset node
  // node

  /**
   * Add a keytip node to this KeytipTree
   * @param fullSequence - Full key sequence for the keytip to add
   * @param onExecute - Callback function to trigger when this keytip is activated
   */
  public addNode(sequence: IKeySequence[], onExecute?: () => void, hasChildrenNodes?: boolean, overflowSet?: IKeySequence): void {
    let fullSequence = [...sequence];
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
      node.hasChildrenNodes = hasChildrenNodes;
      node.parent = parentID;
    } else {
      // If node doesn't exist, add node
      node = {
        id: nodeID,
        keytipSequence: keytipSequence!,
        children: [],
        parent: parentID,
        onExecute,
        hasChildrenNodes,
      };
      this.nodeMap[nodeID] = node;
    }

    let parent = this.nodeMap[parentID];
    if (!parent) {
      // If parent doesn't exist, create parent with ID and children only
      parent = {
        id: parentID,
        hasChildrenNodes: true,
        children: [],
        keytipSequence: { keys: [] },
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

  private _getOverflowNode(overflowSequence: IKeySequence, parentSequence: IKeySequence[]): IKeytipTreeNode {
    let fullOverflowSequence = [...parentSequence, ...[overflowSequence]];
    let overflowNodeId = convertSequencesToKeytipID(fullOverflowSequence);

    let node = this.nodeMap[overflowNodeId];

    // if overflow node has not been added, we create it
    if (!node) {
      node = {
        id: overflowNodeId,
        keytipSequence: overflowSequence,
        parent: convertSequencesToKeytipID(parentSequence),
        children: [],
        hasChildrenNodes: true,
      };
      this.nodeMap[overflowNodeId] = node;
    }

    return node;
  }
}