import {
  IKeySequence,
  keySequencesAreEqual,
  keySequenceStartsWith,
  convertSequencesToKeytipID
} from '../../utilities/keysequence/IKeySequence';
import { IKeytipProps } from '../../Keytip';
import { find } from '../../Utilities';

export interface IKeytipTreeNode {
  /**
   * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
   */
  id: string;

  /**
   * KeySequence that invokes this KeytipTreeNode's onExecute function
   */
  keytipSequence: IKeySequence;

  /**
   * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
   */
  onExecute?: (el: HTMLElement) => void;

  /**
   * Function to execute when we return to this keytip
   */
  onReturn?: (el: HTMLElement) => void;

  /**
   * List of keytip IDs that should become visible when this keytip is pressed, can be empty
   */
  children: string[];

  /**
   * Parent keytip ID
   */
  parent: string;

  /**
   * Whether or not this node has children nodes or not. Should be used for menus/overflow components, that have
   * their children registered after the initial rendering of the DOM.
   */
  hasChildrenNodes?: boolean;

  /**
   * T/F if this keytip's component is currently disabled
   */
  disabled?: boolean;

  /**
   * Link to another keytip node if this is a persisted keytip
   */
  keytipLink?: IKeytipTreeNode;
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
   *
   * @param rootId - Layer ID to create the root node of the tree
   */
  constructor(rootId: string) {

    // Root has no keytipSequence, we instead check _enableSequences to handle multiple entry points
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

  /**
   * Add a keytip node to this KeytipTree
   *
   * @param keytipProps - Keytip to add to the Tree
   */
  public addNode(keytipProps: IKeytipProps): void {
    const fullSequence = [...keytipProps.keySequences];
    const nodeID = convertSequencesToKeytipID(fullSequence);
    // This keytip's sequence is the last one defined
    const keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    let overflowNode = undefined;
    // Account for overflowSetSequence
    if (keytipProps.overflowSetSequence && keytipSequence) {
      const overflowParentNode = this._getOrCreateOverflowNode(keytipProps.overflowSetSequence, parentID, fullSequence);
      const overflowNodeID = convertSequencesToKeytipID([...fullSequence, keytipProps.overflowSetSequence, keytipSequence]);
      overflowNode = this.nodeMap[overflowNodeID];

      // Create or update the persisted keytip
      if (overflowNode) {
        overflowNode.keytipSequence = keytipSequence;
        overflowNode.onExecute = keytipProps.onExecute;
        overflowNode.hasChildrenNodes = keytipProps.hasChildrenNodes;
        overflowNode.parent = overflowParentNode.id;
        overflowNode.disabled = keytipProps.disabled;
      } else {
        overflowNode = this._createNode(overflowNodeID, keytipSequence, overflowParentNode.id, [], keytipProps.hasChildrenNodes);
        this.nodeMap[overflowNodeID] = overflowNode;
      }
      overflowParentNode.children.push(overflowNodeID);
    }

    // See if node already exists
    let node = this.nodeMap[nodeID];
    if (node) {
      // If node exists, it was added when one of its children was added or is now being updated
      // Update values
      node.keytipSequence = keytipSequence!;
      node.onExecute = keytipProps.onExecute;
      node.onReturn = keytipProps.onReturn;
      node.hasChildrenNodes = keytipProps.hasChildrenNodes;
      node.keytipLink = overflowNode;
      node.parent = parentID;
      node.disabled = keytipProps.disabled;
    } else {
      // If node doesn't exist, add node
      node = this._createNode(nodeID, keytipSequence!, parentID, [], keytipProps.hasChildrenNodes,
        keytipProps.onExecute, keytipProps.onReturn, keytipProps.disabled);
      node.keytipLink = overflowNode;
      this.nodeMap[nodeID] = node;
    }

    // Get parent node given its id.
    const parent = this._getOrCreateParentNode(parentID);

    // Add node to parent's children if not already added
    if (parent.children.indexOf(nodeID) === -1) {
      parent.children.push(nodeID);
    }
  }

  /**
   * Removes a node from the KeytipTree
   * Will also remove all of the node's children from the Tree
   *
   * @param sequence - full IKeySequence of the node to remove
   */
  public removeNode(sequence: IKeySequence[]): void {
    const fullSequence = [...sequence];
    const nodeID = convertSequencesToKeytipID(fullSequence);
    // Take off the last sequence to calculate the parent ID
    fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    const parent = this.nodeMap[parentID];
    if (parent) {
      // Remove node from its parent's children
      parent.children.splice(parent.children.indexOf(nodeID), 1);
    }

    const node = this.nodeMap[nodeID];
    if (node) {
      // Remove all the node's children from the nodeMap
      const children = node.children;
      for (const child of children) {
        delete this.nodeMap[child];
      }

      // If node has an overflowLink, delete that node too.
      const overflowLink = node.keytipLink;
      if (overflowLink) {
        const parentOverflow = this.nodeMap[overflowLink.parent];
        parentOverflow.children.splice(parentOverflow.children.indexOf(overflowLink.id, 1));
        delete this.nodeMap[overflowLink.id];
      }

      // Remove the node from the nodeMap
      delete this.nodeMap[nodeID];
    }
  }

  /**
   * Searches the currentKeytip's children to exactly match a sequence
   *
   * @param keySequence - IKeySequence to match
   * @param currentKeytip - The keytip who's children will try to match
   * @returns {IKeytipTreeNode | undefined} The node that exactly matched the keySequence, or undefined if none matched
   */
  public getExactMatchedNode(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined {
    const possibleNodes = this._getNodes(currentKeytip.children);

    return find(possibleNodes, (node: IKeytipTreeNode) => {
      return keySequencesAreEqual(node.keytipSequence, keySequence) && !node.disabled;
    });
  }

  /**
   * Searches the currentKeytip's children to find nodes that start with the given sequence
   *
   * @param keySequence - IKeySequence to partially match
   * @param currentKeytip - The keytip who's children will try to partially match
   * @returns {IKeytipTreeNode[]} List of tree nodes that partially match the given sequence
   */
  public getPartiallyMatchedNodes(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[] {
    const possibleNodes = this._getNodes(currentKeytip.children);

    return possibleNodes.filter((node: IKeytipTreeNode) => {
      return keySequenceStartsWith(node.keytipSequence, keySequence) && !node.disabled;
    });
  }

  /**
   * Retrieves or creates a parent node based on an ID
   *
   * @param parentId - ID of the parent node
   * @returns {IKeytipTreeNode} Node retrieved or created from the given parent ID
   */
  private _getOrCreateParentNode(parentId: string): IKeytipTreeNode {
    let parent = this.nodeMap[parentId];
    if (!parent) {
      // If parent doesn't exist, create parent with ID and children only
      parent = this._createNode(parentId, { keys: [] }, '' /* parentId */, [] /* childrenIds */, true /*hasChildren */);
      this.nodeMap[parentId] = parent;
    }
    return parent;
  }

  private _createNode(
    id: string,
    sequence: IKeySequence,
    parentId: string,
    children: string[],
    hasChildrenNodes?: boolean,
    onExecute?: (el: HTMLElement) => void,
    onReturn?: (el: HTMLElement) => void,
    disabled?: boolean): IKeytipTreeNode {
    return {
      id,
      keytipSequence: sequence,
      parent: parentId,
      children,
      onExecute,
      onReturn,
      hasChildrenNodes,
      disabled
    };
  }

  /**
   * Gets all nodes from their IDs
   *
   * @param ids List of keytip IDs
   * @returns {IKeytipTreeNode[]} Array of nodes that match the given IDs
   */
  private _getNodes(ids: string[]): IKeytipTreeNode[] {
    return ids.map((id: string): IKeytipTreeNode => {
      return this.nodeMap[id];
    });
  }

  /**
   * Retrieves or creates an overflow node
   *
   * @param overflowSequence - Single key sequence for the overflow item
   * @param parentId - ID of the parent keytip
   * @param parentSequence - Full IKeySequence[] of the parent
   * @returns {IKeytipTreeNode} - Node for this overflow item
   */
  private _getOrCreateOverflowNode(overflowSequence: IKeySequence, parentId: string, parentSequence: IKeySequence[]): IKeytipTreeNode {
    const fullOverflowSequence = [...parentSequence, ...[overflowSequence]];
    const overflowNodeId = convertSequencesToKeytipID(fullOverflowSequence);

    let node = this.nodeMap[overflowNodeId];

    // if overflow node has not been added, we create it
    if (!node) {
      node = this._createNode(overflowNodeId, overflowSequence, parentId, [], true);
      this.nodeMap[overflowNodeId] = node;
      const parent = this._getOrCreateParentNode(parentId);
      parent.children.push(overflowNodeId);
    }

    return node;
  }
}