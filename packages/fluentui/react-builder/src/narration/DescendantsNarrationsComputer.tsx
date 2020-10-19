import { NarrationComputer, IAriaElement } from './NarrationComputer';

interface INarration {
  path: string[];
  text: string;
}

export class DescendantsNarrationsComputer {
  computer: NarrationComputer = new NarrationComputer();

  // Computes the screen reader narrations for the given element and all its focusable descendants, for the given platform.
  async compute(element: IAriaElement, platform: string): Promise<INarration[]> {
    // Prepare all the arrays
    const activeDescendantsParents: IAriaElement[] = [];
    const path: string[] = [];
    const narrations: INarration[] = [];

    // Traverse down the DOM tree rooted at the element and compute the activeDescendantsParents, path and narrations along the way
    this.findActiveDescendantsParents(element, activeDescendantsParents);
    await this.traverse(element, platform, path, narrations, activeDescendantsParents);

    return narrations;
  } // End compute

  // Traverses the DOM tree rooted at the given element to find all the parents which have the ariaActiveDescendantElement property set, and saves the found elements to the given parents array.
  findActiveDescendantsParents(element: IAriaElement, parents: IAriaElement[]) {
    if (element.ariaActiveDescendantElement != null) {
      // Begin if 1
      parents.push(element);
    } // End if 1
    Array.from(element.children).forEach(child => {
      // Begin foreach 1
      this.findActiveDescendantsParents(child as IAriaElement, parents);
    }); // End foreach 1
  } // End findActiveDescendantsParents

  // Traverses the given element and computes the narrations for it and its descendants which are focusable..
  async traverse(
    element: IAriaElement,
    platform: string,
    path: string[],
    narrations: INarration[],
    activeDescendantsParents: IAriaElement[],
  ) {
    // Determine the path
    const newPath = path.slice();
    const node = await (window as any).getComputedAccessibleNode(element);

    // Only add the item  to the path if the role is not a generic container
    if (node.role !== 'genericContainer') {
      const item = node.name ? `${node.role} (${node.name})` : node.role;
      newPath.push(item);
    }

    // If the element is focusable, stop the traversal and compute and save the narration
    const isDirectlyFocusable =
      (element.getAttribute('tabindex') || element.tabIndex >= 0) && element.ariaActiveDescendantElement == null;
    const isActiveDescendant = activeDescendantsParents.some(parent => {
      // Begin some 1
      return parent.tabIndex >= 0 && parent.ariaActiveDescendantElement === element;
    }); // End some 1
    if (isDirectlyFocusable || isActiveDescendant) {
      // Begin if 1
      const narration: INarration = {
        path: newPath,
        text: await this.computer.compute(element, platform),
      };
      narrations.push(narration);
      return;
    } // End if 1

    // Traverse down to all the children
    for (let i = 0; i < element.children.length; i++) {
      // Begin for 1
      const child = element.children[i] as IAriaElement;
      await this.traverse(child, platform, newPath, narrations, activeDescendantsParents);
    } // End for 1
  } // End traverse
} // End DescendantsNarrationsComputer
