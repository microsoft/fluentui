
export interface IVirtualElement extends HTMLElement {
  _virtual: {
    parent?: IVirtualElement;
    children: IVirtualElement[];
  };
}

export function setVirtualParent(child: HTMLElement, parent: HTMLElement) {
  let virtualChild = <IVirtualElement>child;
  let virtualParent = <IVirtualElement>parent;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {
      children: []
    }
  }

  let oldParent = virtualChild._virtual.parent;

  if (oldParent && oldParent !== parent) {
    // Remove the child from its old parent.
    let index = oldParent._virtual.children.indexOf(virtualChild);

    if (index > -1) {
      oldParent._virtual.children.splice(index, 1);
    }
  }

  virtualChild._virtual.parent = virtualParent || undefined;

  if (virtualParent) {
    if (!virtualParent._virtual) {
      virtualParent._virtual = {
        children: []
      };
    }

    virtualParent._virtual.children.push(virtualChild);
  }
}

export function getVirtualParent(child: HTMLElement): HTMLElement {
  let parent: HTMLElement;

  if (isVirtualElement(child)) {
    parent = child._virtual.parent;
  }

  return parent;
}

export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement {
  return allowVirtualParents && getVirtualParent(child) || child.parentElement;
}

export function elementContains(parent: HTMLElement, child: HTMLElement, allowVirtualParents: boolean = true): boolean {
  let isContained: boolean;

  if (allowVirtualParents) {
    isContained = false;

    while (child) {
      let nextParent = getParent(child);

      if (nextParent === parent) {
        isContained = true;
        break;
      }

      child = nextParent;
    }
  } else {
    isContained = parent.contains(child);
  }

  return isContained;
}

export function isVirtualElement(element: HTMLElement | IVirtualElement): element is IVirtualElement {
  return !!(<IVirtualElement>element)._virtual;
}
