import { find, values } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';
import { IKeytipTreeNode } from './IKeytipTreeNode';
import { mergeOverflows, sequencesToID } from '../../utilities/keytips/KeytipUtils';
import { KTP_LAYER_ID } from '../../utilities/keytips/KeytipConstants';

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
      id: KTP_LAYER_ID,
      children: [],
      parent: '',
      keySequences: []
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
    const nodeID = sequencesToID(fullSequence);

    // Take off the last item to calculate the parent sequence
    fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = this._getParentID(fullSequence);

    // Create node and add to map
    const node = this._createNode(nodeID, parentID, [], keytipProps, persisted);
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
    const nodeID = sequencesToID(fullSequence);

    // Take off the last item to calculate the parent sequence
    fullSequence.pop();
    // Parent ID is the root if there aren't any more sequences
    const parentID = this._getParentID(fullSequence);
    const node = this.nodeMap[uniqueID];
    const parent = this.getNode(parentID);
    if (node) {
      // If the ID of the node has changed, update node's parent's array of children with new ID
      if (parent && node.id !== nodeID) {
        const index = parent.children.indexOf(node.id);
        index >= 0 && (parent.children[index] = nodeID);
      }
      // Update values
      node.id = nodeID;
      node.keySequences = keytipProps.keySequences;
      node.overflowSetSequence = keytipProps.overflowSetSequence;
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
   * @param sequence - full string of the node to remove
   */
  public removeNode(keytipProps: IKeytipProps, uniqueID: string): void {
    const fullSequence = this._getFullSequence(keytipProps);
    const nodeID = sequencesToID(fullSequence);

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
   * @param keySequence - string to match
   * @param currentKeytip - The keytip whose children will try to match
   * @returns The node that exactly matched the keySequence, or undefined if none matched
   */
  public getExactMatchedNode(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined {
    const possibleNodes = this.getNodes(currentKeytip.children);
    return find(possibleNodes, (node: IKeytipTreeNode) => {
      return this._getNodeSequence(node) === keySequence && !node.disabled;
    });
  }

  /**
   * Searches the currentKeytip's children to find nodes that start with the given sequence. Will not match
   * disabled nodes but will match persisted nodes
   *
   * @param keySequence - string to partially match
   * @param currentKeytip - The keytip whose children will try to partially match
   * @returns List of tree nodes that partially match the given sequence
   */
  public getPartiallyMatchedNodes(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[] {
    // Get children that are persisted
    const possibleNodes = this.getNodes(currentKeytip.children);
    return possibleNodes.filter((node: IKeytipTreeNode) => {
      return this._getNodeSequence(node).indexOf(keySequence) === 0 && !node.disabled;
    });
  }

  /**
   * Get the non-persisted children of the give node
   * If no node is given, will use the 'currentKeytip'
   *
   * @param node - Node to get the children for
   * @returns List of node IDs that are the children of the node
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
   * @param ids - List of keytip IDs
   * @returns Array of nodes that match the given IDs, can be empty
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
   * @returns Node with the given ID, if found
   */
  public getNode(id: string): IKeytipTreeNode | undefined {
    const nodeMapValues = values<IKeytipTreeNode>(this.nodeMap);
    return find(
      nodeMapValues,
      (node: IKeytipTreeNode): boolean => {
        return node.id === id;
      }
    );
  }

  /**
   * Tests if the currentKeytip in this.keytipTree is the parent of 'keytipProps'
   *
   * @param keytipProps - Keytip to test the parent for
   * @returns T/F if the currentKeytip is this keytipProps' parent
   */
  public isCurrentKeytipParent(keytipProps: IKeytipProps): boolean {
    if (this.currentKeytip) {
      let fullSequence = [...keytipProps.keySequences];
      if (keytipProps.overflowSetSequence) {
        fullSequence = mergeOverflows(fullSequence, keytipProps.overflowSetSequence);
      }
      // Take off the last sequence to calculate the parent ID
      fullSequence.pop();
      // Parent ID is the root if there aren't any more sequences
      const parentID = fullSequence.length === 0 ? this.root.id : sequencesToID(fullSequence);
      let matchesCurrWithoutOverflow = false;
      if (this.currentKeytip.overflowSetSequence) {
        const currKeytipIdWithoutOverflow = sequencesToID(this.currentKeytip.keySequences);
        matchesCurrWithoutOverflow = currKeytipIdWithoutOverflow === parentID;
      }
      return matchesCurrWithoutOverflow || this.currentKeytip.id === parentID;
    }
    return false;
  }

  private _getParentID(fullSequence: string[]): string {
    return fullSequence.length === 0 ? this.root.id : sequencesToID(fullSequence);
  }

  private _getFullSequence(keytipProps: IKeytipProps): string[] {
    let fullSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      fullSequence = mergeOverflows(fullSequence, keytipProps.overflowSetSequence);
    }
    return fullSequence;
  }

  private _getNodeSequence(node: IKeytipTreeNode): string {
    let fullSequence = [...node.keySequences];
    if (node.overflowSetSequence) {
      fullSequence = mergeOverflows(fullSequence, node.overflowSetSequence);
    }
    return fullSequence[fullSequence.length - 1];
  }

  private _createNode(id: string, parentId: string, children: string[], keytipProps: IKeytipProps, persisted?: boolean): IKeytipTreeNode {
    const { keySequences, hasDynamicChildren, overflowSetSequence, hasMenu, onExecute, onReturn, disabled } = keytipProps;
    const node = {
      id,
      keySequences,
      overflowSetSequence,
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
