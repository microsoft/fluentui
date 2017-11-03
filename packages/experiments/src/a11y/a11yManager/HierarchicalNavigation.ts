import A11yAttribute, { A11yAttributeType } from './A11yAttribute';
import BaseNavigationMode from './BaseNavigationMode';
import DomTraversal from '../dom/DomTraversal';
import Focus from '../focus/Focus';
import Keyboard, { IKeyboardEvent } from '../keyboard/Keyboard';

export default class HierarchicalNavigation extends BaseNavigationMode {
  public get name(): string {
    return 'Hierarchical';
  }

  public get supportedSelectors(): string[] {
    return ['next', 'prev', 'inside', 'outside'];
  }

  protected _navigate(modeRoot: HTMLElement, event: IKeyboardEvent, currentElement: HTMLElement): HTMLElement | undefined {
    let elementToGo: HTMLElement | undefined;

    if (Keyboard.isTab(event)) {
      const topChildren: HTMLElement[] = this._getChildren(this._getHierarchyRoot(currentElement));
      if (topChildren.length && currentElement !== topChildren[topChildren.length - 1]) {
        elementToGo = this._getNextElement(currentElement);
      } else {
        // If this is the last focusable child of the root, we need to let go of the focus
        // Since the next focus might be outside of our managed tree, we just set the focus
        // to the last focusable element of our tree and let the browser handle the event.
        // Note: In Hierarchical Navigation, the first focusable child is also the first focusable descendent
        // But the last focusable child may not be the last focusable descendent
        const descendents: HTMLElement[] = this._getDescendants(this._getHierarchyRoot(currentElement));
        if (descendents.length > 0) {
          descendents[descendents.length - 1].focus();
        }
      }
    } else if (Keyboard.isShiftTab(event)) {
      // If this is the last focusable child of the root, we need to let go of the focus
      // Since the next focus might be outside of our managed tree, we just set the focus
      // to the first focusable element of our tree and let the browser handle the event.
      const firstChild: HTMLElement = this._getChildren(this.manager.root)[0];
      if (currentElement !== firstChild) {
        elementToGo = this._getPreviousElement(currentElement);
      }
    } else if (Keyboard.isEnter(event)) {
      elementToGo = this._getInsideElement(currentElement);
    } else if (Keyboard.isEscape(event)) {
      elementToGo = this._getOutsideElement(currentElement);
    }
    return elementToGo;
  }

  protected _select(modeRoot: HTMLElement, selector: string, element: HTMLElement): HTMLElement | undefined {
    switch (selector) {
      case 'next':
        return this._getNextElement(element);
      case 'prev':
        return this._getPreviousElement(element);
      case 'outside':
        return this._getOutsideElement(element);
      case 'inside':
        return this._getInsideElement(element);
    }
    return undefined;
  }

  /**
   * Returns the first parent that meets at least on of the following:
   *  - is a focusable element
   *  - has a NavigateByHierarchy attribute
   *  - is the manager's root element
   */
  private _getParent(element: HTMLElement): HTMLElement {
    const result: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(element, (it: HTMLElement) => {
      const hierAttr: A11yAttribute =
        A11yAttribute.getFromElementByType(this.manager.prefix, it, A11yAttributeType.NavigateByHierarchy)[0];

      return !!hierAttr || Focus.isElementFocusable(it);
    }, this.manager.root, false);

    return result || this.manager.root;
  }

  /**
   * Returns the root element for hierarchical navigation. This can be the main root or an element
   * marked up with NavigateByHierarchy attribute.
   */
  private _getHierarchyRoot(element: HTMLElement): HTMLElement {
    const result: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(element, (it: HTMLElement) => {
      const hierAttr: A11yAttribute =
        A11yAttribute.getFromElementByType(this.manager.prefix, it, A11yAttributeType.NavigateByHierarchy)[0];
      return !!hierAttr;
    }, this.manager.root, false);

    return result || this.manager.root;
  }

  private _getSiblings(element: HTMLElement): HTMLElement[] {
    const parent: HTMLElement = this._getParent(element);
    const siblings: HTMLElement[] = Focus.getFocusableSiblings(element, parent);
    return siblings.filter((sib: HTMLElement) => {
      return parent === this._getParent(sib);
    });
  }

  private _getChildren(element: HTMLElement): HTMLElement[] {
    const children: HTMLElement[] = Focus.getFocusableChildren(element);
    return children.filter((child: HTMLElement) => {
      return element === this._getParent(child);
    });
  }

  private _getDescendants(element: HTMLElement): HTMLElement[] {
    const children: HTMLElement[] = Focus.getFocusableDescendants(element);
    return children.filter((descendent: HTMLElement) => {
      return element === this._getHierarchyRoot(descendent);
    });
  }

  private _getNextElement(element: HTMLElement): HTMLElement {
    const siblings: HTMLElement[] = this._getSiblings(element);
    return siblings.length > 0 ? siblings[0] : element;
  }

  private _getPreviousElement(element: HTMLElement): HTMLElement {
    const siblings: HTMLElement[] = this._getSiblings(element);
    return siblings.length > 0 ? siblings[siblings.length - 1] : element;
  }

  private _getInsideElement(element: HTMLElement): HTMLElement | undefined {
    return Focus.getFirstFocusableChild(element);
  }

  private _getOutsideElement(element: HTMLElement): HTMLElement | undefined {
    const parent: HTMLElement = Focus.getFocusableParent(element, this.manager.root);
    if (parent !== this.manager.root || Focus.isElementFocusable(this.manager.root)) {
      return parent;
    } else {
      // If the root element is the parent but it's not focusable, then there is no outside element
      return undefined;
    }
  }
}
