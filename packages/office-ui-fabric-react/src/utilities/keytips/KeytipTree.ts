import {
  IKeySequence,
  keySequencesAreEqual,
  keySequenceStartsWith,
  convertSequencesToKeytipID,
  find,
  ktpLayerId,
  mergeOverflowKeySequences,
  values
} from '../../Utilities';
import { IKeytipProps } from '../../Keytip';

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
  onExecute?: (el: HTMLElement | null) => void;

  /**
   * Function to execute when we return to this keytip
   */
  onReturn?: (el: HTMLElement | null) => void;

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
   * T/F if this keytip is a persisted keytip
   */
  persisted?: boolean;
}

export interface IKeytipTreeNodeMap {
  [nodeId: string]: IKeytipTreeNode;
}

export class KeytipTree {
  public currentKeytip?: IKeytipTreeNode;
  public root: IKeytipTreeNode;
  public nodeMap: IKeytipTreeNodeMap = {};

  private _idSeparator = '::';

  /**
   * KeytipTree constructor
   *
   */
  constructor() {
    // Root has no keytipSequence, we instead check _enableSequences to handle multiple entry points
    this.root = {
      id: ktpLayerId,
      children: [],
      parent: '',
      keytipSequence: { keys: [] },
      hasChildrenNodes: true
    };
    this.nodeMap[this.root.id] = this.root;
  }

  /**
   * Add a keytip node to this KeytipTree
   *
   * @param keytipProps - Keytip to add to the Tree
   */
  public addNode(keytipProps: IKeytipProps, persisted?: boolean): void {
    let fullSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      fullSequence = mergeOverflowKeySequences(fullSequence, keytipProps.overflowSetSequence);
    }
    const nodeID = convertSequencesToKeytipID(fullSequence);
    const combinedID = nodeID + this._idSeparator + keytipProps.uniqueID!;

    // This keytip's sequence is the last one defined
    const keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    // Create node and add to map
    const node = this._createNode(nodeID, keytipSequence!, parentID, [], keytipProps.hasChildrenNodes,
      keytipProps.onExecute, keytipProps.onReturn, keytipProps.disabled, persisted);
    this.nodeMap[combinedID] = node;

    // Find all nodes that have this node as its parent, add them to 'children' if not already there
    const children = Object.keys(this.nodeMap).reduce((array: string[], nodeMapKey: string): string[] => {
      if (this.nodeMap[nodeMapKey].parent === nodeID) {
        array.push(this.nodeMap[nodeMapKey].id);
      }
      return array;
    }, []);
    this.nodeMap[combinedID].children = this.nodeMap[combinedID].children.concat(children);

    // Try to add self to parents children, if they exist
    const parent = this.getNode(parentID);
    if (parent) {
      parent.children.push(nodeID);
    }
  }

  /**
   *
   * @param keytipProps
   */
  public updateNode(keytipProps: IKeytipProps): void {
    let fullSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      fullSequence = mergeOverflowKeySequences(fullSequence, keytipProps.overflowSetSequence);
    }
    const nodeID = convertSequencesToKeytipID(fullSequence);
    const combinedID = nodeID + this._idSeparator + keytipProps.uniqueID!;

    // This keytip's sequence is the last one defined
    const keytipSequence = fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);

    const node = this.nodeMap[combinedID];
    if (node) {
      // Update values
      node.id = nodeID;
      node.keytipSequence = keytipSequence!;
      node.onExecute = keytipProps.onExecute;
      node.onReturn = keytipProps.onReturn;
      node.hasChildrenNodes = keytipProps.hasChildrenNodes;
      node.parent = parentID;
      node.disabled = keytipProps.disabled;
    }
  }

  /**
   * Removes a node from the KeytipTree
   *
   * @param sequence - full IKeySequence of the node to remove
   */
  public removeNode(keytipProps: IKeytipProps): void {
    let fullSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      fullSequence = mergeOverflowKeySequences(fullSequence, keytipProps.overflowSetSequence);
    }
    const nodeID = convertSequencesToKeytipID(fullSequence);
    const combinedID = nodeID + this._idSeparator + keytipProps.uniqueID!;
    // Take off the last sequence to calculate the parent ID
    fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);
    const parent = this.getNode(parentID);
    if (parent) {
      // Remove node from its parent's children
      parent.children.splice(parent.children.indexOf(nodeID), 1);
    }

    if (this.nodeMap[combinedID]) {
      // Remove the node from the nodeMap
      delete this.nodeMap[combinedID];
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
    const possibleNodes = this.getNodes(currentKeytip.children);
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
    // TODO: should we allow for persisted children here?
    const possibleNodes = this.getNodes(this.getChildren(currentKeytip));

    return possibleNodes.filter((node: IKeytipTreeNode) => {
      return keySequenceStartsWith(node.keytipSequence, keySequence) && !node.disabled;
    });
  }

  /**
   * Get the non-persisted children of the current keytip
   *
   * @param node
   */
  public getChildren(node?: IKeytipTreeNode): string[] {
    if (!node) {
      node = this.currentKeytip;
      if (!node) {
        return [];
      }
    }
    const children = node.children;
    return Object.keys(this.nodeMap).reduce((nodes: string[], key: string): string[] => {
      if (children.indexOf(this.nodeMap[key].id) >= 0 && !this.nodeMap[key].persisted) {
        nodes.push(this.nodeMap[key].id);
      }
      return nodes;
    }, []);
  }

  /**
   * Gets all nodes from their IDs
   *
   * @param ids List of keytip IDs
   * @returns {IKeytipTreeNode[]} Array of nodes that match the given IDs, can be empty
   */
  public getNodes(ids: string[]): IKeytipTreeNode[] {
    return Object.keys(this.nodeMap).reduce((nodes: IKeytipTreeNode[], key: string): IKeytipTreeNode[] => {
      if (ids.indexOf(this.nodeMap[key].id) >= 0) {
        nodes.push(this.nodeMap[key]);
      }
      return nodes;
    }, []);
  }

  /**
   * Gets a single node from its ID
   *
   * @param id
   */
  public getNode(id: string): IKeytipTreeNode | undefined {
    const nodeMapValues = values<IKeytipTreeNode>(this.nodeMap);
    return find(nodeMapValues, (node: IKeytipTreeNode): boolean => {
      return node.id === id;
    });
  }

  private _createNode(
    id: string,
    sequence: IKeySequence,
    parentId: string,
    children: string[],
    hasChildrenNodes?: boolean,
    onExecute?: (el: HTMLElement) => void,
    onReturn?: (el: HTMLElement) => void,
    disabled?: boolean,
    persisted?: boolean): IKeytipTreeNode {
    return {
      id,
      keytipSequence: sequence,
      parent: parentId,
      children,
      onExecute,
      onReturn,
      hasChildrenNodes,
      disabled,
      persisted
    };
  }
}