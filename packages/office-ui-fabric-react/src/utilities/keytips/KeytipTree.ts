import {
  IKeySequence,
  keySequenceStartsWith,
  convertSequencesToKeytipID,
  find,
  ktpLayerId,
  mergeOverflowKeySequences,
  values
} from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { IKeytipTreeNode } from './IKeytipTreeNode';

/**
 * This class is responsible for handling the parent/child relationships between keytips
 */
export class KeytipTree {
  public currentKeytip?: IKeytipTreeNode;
  public root: IKeytipTreeNode;
  public nodeMap: { [nodeId: string]: IKeytipTreeNode } = {};

  /**
   * KeytipTree constructor
   */
  constructor() {
    // Root has no keytipSequence
    this.root = {
      id: ktpLayerId,
      children: [],
      parent: '',
      keytipSequence: ''
    };
    this.nodeMap[this.root.id] = this.root;
  }

  /**
   * Add a keytip node to this KeytipTree
   *
   * @param keytipProps - Keytip to add to the Tree
   * @param uniqueID - Unique ID for this keytip
   * @param persisted - T/F if this keytip should be marked as persisted
   */
  public addNode(keytipProps: IKeytipProps, uniqueID: string, persisted?: boolean): void {
    const fullSequence = this._getFullSequence(keytipProps);
    const nodeID = convertSequencesToKeytipID(fullSequence);

    // This keytip's sequence is the last one defined
    const keytipSequence = fullSequence.pop();

    // Parent ID is the root if there aren't any more sequences
    const parentID = this._getParentID(fullSequence);

    // Create node and add to map
    const node = this._createNode(nodeID, keytipSequence!, parentID, [], keytipProps.hasDynamicChildren, keytipProps.hasMenu,
      keytipProps.onExecute, keytipProps.onReturn, keytipProps.disabled, persisted);
    this.nodeMap[uniqueID] = node;

    // Try to add self to parents children, if they exist
    const parent = this.getNode(parentID);
    if (parent) {
      parent.children.push(nodeID);
    }
  }

  /**
   * Updates a node in the tree
   *
   * @param keytipProps - Keytip props to update
   * @param uniqueID - Unique ID for this keytip
   */
  public updateNode(keytipProps: IKeytipProps, uniqueID: string): void {
    const fullSequence = this._getFullSequence(keytipProps);
    const nodeID = convertSequencesToKeytipID(fullSequence);

    // This keytip's sequence is the last one defined
    const keytipSequence = fullSequence.pop();

    // Parent ID is the root if there aren't any more sequences
    const parentID = this._getParentID(fullSequence);
    const node = this.nodeMap[uniqueID];
    if (node) {
      // Update values
      node.id = nodeID;
      node.keytipSequence = keytipSequence!;
      node.onExecute = keytipProps.onExecute;
      node.onReturn = keytipProps.onReturn;
      node.hasDynamicChildren = keytipProps.hasDynamicChildren;
      node.hasMenu = keytipProps.hasMenu;
      node.parent = parentID;
      node.disabled = keytipProps.disabled;
    }
  }

  /**
   * Removes a node from the KeytipTree
   *
   * @param sequence - full IKeySequence of the node to remove
   */
  public removeNode(keytipProps: IKeytipProps, uniqueID: string): void {
    const fullSequence = this._getFullSequence(keytipProps);
    const nodeID = convertSequencesToKeytipID(fullSequence);

    // Take off the last sequence to calculate the parent ID
    fullSequence.pop();

    // Parent ID is the root if there aren't any more sequences
    const parentID = this._getParentID(fullSequence);
    const parent = this.getNode(parentID);
    if (parent) {
      // Remove node from its parent's children
      parent.children.splice(parent.children.indexOf(nodeID), 1);
    }

    if (this.nodeMap[uniqueID]) {
      // Remove the node from the nodeMap
      delete this.nodeMap[uniqueID];
    }
  }

  /**
   * Searches the currentKeytip's children to exactly match a sequence. Will not match disabled nodes but
   * will match persisted nodes
   *
   * @param keySequence - IKeySequence to match
   * @param currentKeytip - The keytip who's children will try to match
   * @returns {IKeytipTreeNode | undefined} The node that exactly matched the keySequence, or undefined if none matched
   */
  public getExactMatchedNode(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined {
    const possibleNodes = this.getNodes(currentKeytip.children);
    return find(possibleNodes, (node: IKeytipTreeNode) => {
      return node.keytipSequence === keySequence && !node.disabled;
    });
  }

  /**
   * Searches the currentKeytip's children to find nodes that start with the given sequence. Will not match
   * disabled nodes but will match persisted nodes
   *
   * @param keySequence - IKeySequence to partially match
   * @param currentKeytip - The keytip who's children will try to partially match
   * @returns {IKeytipTreeNode[]} List of tree nodes that partially match the given sequence
   */
  public getPartiallyMatchedNodes(keySequence: IKeySequence, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[] {
    // Get children that are persisted
    const possibleNodes = this.getNodes(currentKeytip.children);
    return possibleNodes.filter((node: IKeytipTreeNode) => {
      return keySequenceStartsWith(node.keytipSequence, keySequence) && !node.disabled;
    });
  }

  /**
   * Get the non-persisted children of the give node
   * If no node is given, will use the 'currentKeytip'
   *
   * @param node - Node to get the children for
   * @returns {string[]} List of node IDs that are the children of the node
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
   * @param id - ID of the node to get
   * @returns {IKeytipTreeNode | undefined} Node with the given ID, if found
   */
  public getNode(id: string): IKeytipTreeNode | undefined {
    const nodeMapValues = values<IKeytipTreeNode>(this.nodeMap);
    return find(nodeMapValues, (node: IKeytipTreeNode): boolean => {
      return node.id === id;
    });
  }

  /**
   * Tests if the currentKeytip in this.keytipTree is the parent of 'keytipProps'
   *
   * @param keytipProps - Keytip to test the parent for
   * @returns {boolean} T/F if the currentKeytip is this keytipProps' parent
   */
  public isCurrentKeytipParent(keytipProps: IKeytipProps): boolean {
    if (this.currentKeytip) {
      let fullSequence = [...keytipProps.keySequences];
      if (keytipProps.overflowSetSequence) {
        fullSequence = mergeOverflowKeySequences(fullSequence, keytipProps.overflowSetSequence);
      }
      // Take off the last sequence to calculate the parent ID
      fullSequence.pop();
      // Parent ID is the root if there aren't any more sequences
      const parentID = fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);
      return this.currentKeytip.id === parentID;
    }
    return false;
  }

  private _getParentID(fullSequence: IKeySequence[]): string {
    return fullSequence.length === 0 ? this.root.id : convertSequencesToKeytipID(fullSequence);
  }

  private _getFullSequence(keytipProps: IKeytipProps): IKeySequence[] {
    let fullSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      fullSequence = mergeOverflowKeySequences(fullSequence, keytipProps.overflowSetSequence);
    }
    return fullSequence;
  }

  private _createNode(
    id: string,
    sequence: IKeySequence,
    parentId: string,
    children: string[],
    hasDynamicChildren?: boolean,
    hasMenu?: boolean,
    onExecute?: (el: HTMLElement) => void,
    onReturn?: (el: HTMLElement) => void,
    disabled?: boolean,
    persisted?: boolean): IKeytipTreeNode {
    const node = {
      id,
      keytipSequence: sequence,
      parent: parentId,
      children,
      onExecute,
      onReturn,
      hasDynamicChildren,
      hasMenu,
      disabled,
      persisted
    };
    node.children = Object.keys(this.nodeMap).reduce((array: string[], nodeMapKey: string): string[] => {
      if (this.nodeMap[nodeMapKey].parent === id) {
        array.push(this.nodeMap[nodeMapKey].id);
      }
      return array;
    }, []);
    return node;
  }
}