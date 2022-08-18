export function applyCellNavigation(element: HTMLElement) {
  const container = element;
  let column = 0;
  let mode: 'row' | 'column' | undefined = undefined;
  let movingOut = false;

  const pre = document.createElement('div');
  const post = document.createElement('div');

  if (!pre || !post) {
    return;
  }

  pre.tabIndex = 0;
  post.tabIndex = 0;

  pre.addEventListener('focus', () => {
    if (movingOut) {
      movingOut = false;
      return;
    } else {
      treeWalker.currentNode = container;
      const candidate = treeWalker.nextNode();
      if (isHTMLElement(candidate)) {
        column = 0;
        candidate.focus();
      }
    }
  });

  post.addEventListener('focus', () => {
    if (movingOut) {
      movingOut = false;
      return;
    } else {
      treeWalker.currentNode = post;
      const candidate = treeWalker.previousNode();
      if (isHTMLElement(candidate)) {
        column = findColumnCount(candidate);
        candidate.focus();
      }
    }
  });

  container.before(pre);
  container.after(post);

  const acceptNode = (node: Node) => {
    if (!isHTMLElement(node)) {
      return NodeFilter.FILTER_SKIP;
    }

    if (mode === 'column') {
      return acceptCell(node);
    }

    if (mode === 'row') {
      return acceptRow(node);
    }

    if (node.tabIndex >= 0) {
      return NodeFilter.FILTER_ACCEPT;
    }

    return NodeFilter.FILTER_SKIP;
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
      case 'Tab':
        movingOut = true;
        if (e.shiftKey) {
          pre.focus();
        } else {
          post.focus();
        }

        break;
      default:
        return;
    }

    if (next) {
      e.preventDefault();
      next.focus();
    }
  };

  const onFocusOut = () => {
    mode = undefined;
  };

  container.addEventListener('keydown', onKeyDown);
  container.addEventListener('focusout', onFocusOut);
  return () => {
    container.removeEventListener('focusout', onFocusOut);
    container.removeEventListener('keydown', onKeyDown);
  };
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

function findColumnCount(node: HTMLElement) {
  let cur = node;
  while (cur.parentElement && !isRow(cur)) {
    cur = cur.parentElement;
  }

  return cur.querySelectorAll('[role="cell"], [role="gridcell"], td').length - 1;
}
