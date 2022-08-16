export function applyCompositeNavigation(element: HTMLElement) {
  const container = element;
  let mode: 'row' | 'column' = 'row';
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
      mode = 'row';
      const candidate = treeWalker.nextNode();
      if (isHTMLElement(candidate)) {
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
      mode = 'row';
      const candidate = treeWalker.previousNode();
      if (isHTMLElement(candidate)) {
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

    if (!isCell(node) && !isRow(node)) {
      return NodeFilter.FILTER_SKIP;
    }

    if (mode === 'column' && isRow(node)) {
      return NodeFilter.FILTER_REJECT;
    }

    if (mode === 'row' && isCell(node)) {
      return NodeFilter.FILTER_REJECT;
    }

    if (node.tabIndex < 0) {
      return NodeFilter.FILTER_SKIP;
    }

    return NodeFilter.FILTER_ACCEPT;
  };

  const treeWalker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode });

  const up = (current: HTMLElement) => {
    const prevMode = mode;
    mode = 'row';
    treeWalker.currentNode = current;

    if (prevMode === 'column') {
      treeWalker.previousNode();
    }

    const node = treeWalker.previousNode();
    if (isHTMLElement(node)) {
      return node;
    }
    return null;
  };

  const down = (current: HTMLElement) => {
    mode = 'row';
    treeWalker.currentNode = current;
    const node = treeWalker.nextNode();
    if (isHTMLElement(node)) {
      return node;
    }
    return null;
  };

  const left = (current: HTMLElement) => {
    treeWalker.currentNode = current;
    const prevMode = mode;
    mode = 'column';
    let node: Node | null = null;

    if (prevMode === 'row') {
      let tmp: Node | null = null;
      while ((tmp = treeWalker.nextNode())) {
        node = tmp;
      }
    } else {
      node = treeWalker.previousNode();
    }

    if (isHTMLElement(node)) {
      return node;
    }
    return null;
  };

  const right = (current: HTMLElement) => {
    mode = 'column';
    treeWalker.currentNode = current;
    const node = treeWalker.nextNode();
    if (isHTMLElement(node)) {
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
        break;
    }

    if (next) {
      e.preventDefault();
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

function isCell(element: HTMLElement) {
  if (
    element.getAttribute('role') === 'cell' ||
    element.getAttribute('role') === 'gridcell' ||
    element.tagName === 'TD'
  ) {
    return true;
  }

  return false;
}
