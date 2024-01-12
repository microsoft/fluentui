import { find, getDocument, isElementVisibleAndNotHidden, values } from '../../Utilities';
import { ktpTargetFromSequences, mergeOverflows, sequencesToID } from '../../utilities/keytips/KeytipUtils';
import { KTP_LAYER_ID } from '../../utilities/keytips/KeytipConstants';
import type { IKeytipProps } from '../../Keytip';
import type { IKeytipTreeNode } from './IKeytipTreeNode';

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
      keySequences: [],
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

    // Try to add self to parents children
    const parents = this.getNodes([parentID]);
    parents.forEach(parent => parent.children.push(nodeID));
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
    const prevParent = node.parent;
    if (node) {
      // Fix parent nodes if needed
      if (prevParent !== parentID) {
        // If parent has changed, remove child from old parent
        this._removeChildFromParents(prevParent, node.id);
      }
      if (node.id !== nodeID) {
        // If the ID of the node has changed, update node's parent's array of children with new ID
        const parents = this.getNodes([parentID]);
        parents.forEach(parent => {
          const index = parent.children.indexOf(node.id);
          index >= 0 ? (parent.children[index] = nodeID) : parent.children.push(nodeID);
        });
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
    this._removeChildFromParents(this._getParentID(fullSequence), nodeID);

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
   * @param doc - The document for DOM operations
   * @returns The node that exactly matched the keySequence, or undefined if none matched
   */
  public getExactMatchedNode(
    keySequence: string,
    currentKeytip: IKeytipTreeNode,
    doc?: Document,
  ): IKeytipTreeNode | undefined {
    const theDoc = doc ?? getDocument()!;
    const possibleNodes = this.getNodes(currentKeytip.children);
    const matchingNodes = possibleNodes.filter((node: IKeytipTreeNode) => {
      return this._getNodeSequence(node) === keySequence && !node.disabled;
    });

    // If we found no nodes, we are done
    if (matchingNodes.length === 0) {
      return undefined;
    }

    // Since the matching nodes all have the same key sequence,
    // Grab the first one build the correct selector
    const node = matchingNodes[0];

    // If we have exactly one node, return it
    if (matchingNodes.length === 1) {
      return node;
    }

    // Get the potential target elements based on a selector from the sequences
    const keySequences = node.keySequences;
    const overflowSetSequence = node.overflowSetSequence;
    const fullKeySequences = overflowSetSequence ? mergeOverflows(keySequences, overflowSetSequence) : keySequences;
    const keytipTargetSelector = ktpTargetFromSequences(fullKeySequences);
    const potentialTargetElements = theDoc.querySelectorAll(keytipTargetSelector);

    // If we have less nodes than the potential target elements,
    // we won't be able to map element to node, return the first node.
    // Note, the number of nodes could be more than the number of potential
    // target elements, if an OverflowSet is involved
    if (matchingNodes.length < potentialTargetElements.length) {
      return node;
    }

    // Attempt to find the node that corresponds to the first visible/non-hidden element
    const matchingIndex = Array.from(potentialTargetElements).findIndex((element: HTMLElement) =>
      isElementVisibleAndNotHidden(element, theDoc.defaultView ?? undefined),
    );
    if (matchingIndex !== -1) {
      return matchingNodes[matchingIndex];
    }

    // We did not find any visible elements associated with any of the nodes.
    // We may be dealing with a keytip that is a submenu in an OverflowSet.
    // Worst case, fall back to the first node returned
    const overflowNode = matchingNodes.find(matchingNode => matchingNode.hasOverflowSubMenu);
    return overflowNode || node;
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
    return find(nodeMapValues, (node: IKeytipTreeNode): boolean => {
      return node.id === id;
    });
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

  private _createNode(
    id: string,
    parentId: string,
    children: string[],
    keytipProps: IKeytipProps,
    persisted?: boolean,
  ): IKeytipTreeNode {
    const {
      keySequences,
      hasDynamicChildren,
      overflowSetSequence,
      hasMenu,
      onExecute,
      onReturn,
      disabled,
      hasOverflowSubMenu,
    } = keytipProps;
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
      persisted,
      hasOverflowSubMenu,
    };
    node.children = Object.keys(this.nodeMap).reduce((array: string[], nodeMapKey: string): string[] => {
      if (this.nodeMap[nodeMapKey].parent === id) {
        array.push(this.nodeMap[nodeMapKey].id);
      }
      return array;
    }, []);
    return node;
  }

  private _removeChildFromParents(parentID: string, childID: string): void {
    const parents = this.getNodes([parentID]);
    parents.forEach(parent => {
      const childIndex = parent.children.indexOf(childID);
      if (childIndex >= 0) {
        parent.children.splice(childIndex, 1);
      }
    });
  }
}
