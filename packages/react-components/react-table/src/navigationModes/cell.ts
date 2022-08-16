export function applyCellNavigation(element: HTMLElement) {
  const container = element;
  let column = 0;
  let mode: 'row' | 'column' = 'row';

  const acceptNode = (node: Node) => {
    if (!isHTMLElement(node)) {
      return NodeFilter.FILTER_SKIP;
    }

    if (mode === 'column') {
      return acceptCell(node);
    } else {
      return acceptRow(node);
    }
  };

  const acceptCell = (node: HTMLElement) => {
    if (isRow(node)) {
      return NodeFilter.FILTER_REJECT;
    }

    if (node.tabIndex < 0) {
      return NodeFilter.FILTER_SKIP;
    }

    return NodeFilter.FILTER_ACCEPT;
  };

  const acceptRow = (node: HTMLElement) => {
    if (isRow(node)) {
      return NodeFilter.FILTER_ACCEPT;
    }

    return NodeFilter.FILTER_SKIP;
  };

  const treeWalker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode });

  const up = (current: HTMLElement) => {
    mode = 'row';
    treeWalker.currentNode = current;
    treeWalker.previousNode(); // current row
    const row = treeWalker.previousNode();
    if (!row) {
      return null;
    }

    mode = 'column';
    treeWalker.currentNode = row;
    let curCol = 0;
    let node: Node | null = null;
    while (curCol <= column) {
      node = treeWalker.nextNode();
      curCol++;
    }
    if (isHTMLElement(node)) {
      return node;
    }
    return null;
  };

  const down = (current: HTMLElement) => {
    mode = 'row';
    treeWalker.currentNode = current;
    const row = treeWalker.nextNode();
    if (!row) {
      return null;
    }

    mode = 'column';
    treeWalker.currentNode = row;
    let curCol = 0;
    let node: Node | null = null;
    while (curCol <= column) {
      node = treeWalker.nextNode();
      curCol++;
    }
    if (isHTMLElement(node)) {
      return node;
    }
    return null;
  };

  const left = (current: HTMLElement) => {
    treeWalker.currentNode = current;
    mode = 'column';
    const node = treeWalker.previousNode();

    if (isHTMLElement(node)) {
      column--;
      return node;
    }
    return null;
  };

  const right = (current: HTMLElement) => {
    mode = 'column';
    treeWalker.currentNode = current;
    const node = treeWalker.nextNode();
    if (isHTMLElement(node)) {
      column++;
      return node;
    }
    return null;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const target = e.target;
    if (!target || !isHTMLElement(target)) {
      return;
    }

    let next: HTMLElement | null = null;

    switch (e.key) {
      case 'ArrowDown':
        next = down(target);
        break;
      case 'ArrowUp':
        next = up(target);
        break;
      case 'ArrowLeft':
        next = left(target);
        break;
      case 'ArrowRight':
        next = right(target);
        break;
      default:
        return;
    }

    e.preventDefault();
    if (next) {
      next.focus();
    }
  };

  container.addEventListener('keydown', onKeyDown);
  return () => container.removeEventListener('keydown', onKeyDown);
}

function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof HTMLElement;
}

function isRow(element: HTMLElement) {
  if (element.getAttribute('role') === 'row' || element.tagName === 'TR') {
    return true;
  }

  return false;
}
