const DatasetName = {
  // Whether the polyfill added an inferred role to the element due to lack of
  // explicit author role.
  INFERRED_ROLE: 'data-fg-ir',
  // Whether the element is a focus group item.
  ITEM: 'data-fg-item',
  // The value of tabindex defined by the author before the polyfill decoration.
  AUTHOR_TABINDEX: 'data-fg-ati',
  // Which focus group segment does the current item belong to.
  SEGMENT: 'data-fg-seg',
  // Which focus group segment does the current item belong to.
  SEGMENT_START: 'data-fg-segs',
};
const BehaviorToken = {
  TOOLBAR: 'toolbar',
  TABLIST: 'tablist',
  RADIOGROUP: 'radiogroup',
  LISTBOX: 'listbox',
  MENU: 'menu',
  MENUBAR: 'menubar',
  NONE: 'none',
};
const BEHAVIOR_TOKENS = Object.values(BehaviorToken);
const BehaviorMap = /* @__PURE__ */ new Map([
  [BehaviorToken.TOOLBAR, { ownerRole: 'toolbar', childRole: null, wrap: false, axis: 'inline' }],
  [BehaviorToken.TABLIST, { ownerRole: 'tablist', childRole: 'tab', wrap: true, axis: 'inline' }],
  [
    BehaviorToken.RADIOGROUP,
    {
      ownerRole: 'radiogroup',
      childRole: 'radio',
      wrap: false,
      axis: void 0,
    },
  ],
  [BehaviorToken.LISTBOX, { ownerRole: 'listbox', childRole: 'option', wrap: false, axis: void 0 }],
  [BehaviorToken.MENU, { ownerRole: 'menu', childRole: 'menuitem', wrap: true, axis: 'block' }],
  [BehaviorToken.MENUBAR, { ownerRole: 'menubar', childRole: 'menuitem', wrap: true, axis: 'inline' }],
]);
function getClosestElement(start, selector) {
  if (!start || !selector) {
    return null;
  }
  if (start instanceof ShadowRoot) {
    return getClosestElement(start.host, selector);
  }
  const assignedSlot = start.assignedSlot;
  return assignedSlot
    ? // Element is slotted — check self, then traverse up through the slot's
      // ancestors, treating the slotted element as a child of the slot.
      start.matches(selector)
      ? start
      : getClosestElement(assignedSlot, selector)
    : start.closest(selector) ??
        (start.getRootNode() instanceof ShadowRoot ? getClosestElement(start.getRootNode().host, selector) : null);
}
function nodeContains(node, otherNode) {
  if (!node || !otherNode) {
    return false;
  }
  let currentNode = otherNode;
  while (currentNode) {
    if (currentNode === node) {
      return true;
    }
    if (typeof currentNode.assignedElements !== 'function' && currentNode.assignedSlot?.parentNode) {
      currentNode = currentNode.assignedSlot?.parentNode;
    } else if (currentNode.nodeType === document.DOCUMENT_FRAGMENT_NODE) {
      currentNode = currentNode.host;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return false;
}
function getParentElement(node) {
  if (!node) {
    return null;
  }
  if (typeof node.assignedElements !== 'function' && node.assignedSlot) {
    return node.assignedSlot;
  }
  const root = node.getRootNode();
  if (root instanceof ShadowRoot) {
    return node.parentElement ?? root.host;
  }
  return node.parentElement;
}
function getLastElementChild(node) {
  return node ? node.lastElementChild ?? getLastElementChild(node.shadowRoot) : null;
}
function getLastElementDescendant(container) {
  let descendant = null;
  for (let lastChild = getLastElementChild(container); lastChild; lastChild = getLastElementChild(lastChild)) {
    descendant = lastChild;
  }
  return descendant;
}
class ShadowMutationObserver {
  static #shadowObservers = /* @__PURE__ */ new Set();
  #root;
  #options;
  #callback;
  #observer;
  #subObservers;
  #isObserving = false;
  static #overrideAttachShadow(win) {
    const origAttachShadow = win.Element.prototype.attachShadow;
    if (origAttachShadow.__origAttachShadow) {
      return;
    }
    Element.prototype.attachShadow = function (options) {
      const shadowRoot = origAttachShadow.call(this, options);
      for (const shadowObserver of ShadowMutationObserver.#shadowObservers) {
        shadowObserver.#addSubObserver(shadowRoot);
      }
      return shadowRoot;
    };
    Element.prototype.attachShadow.__origAttachShadow = origAttachShadow;
  }
  constructor(callback) {
    this.#callback = callback;
    this.#observer = new MutationObserver(this.#callbackWrapper);
    this.#subObservers = /* @__PURE__ */ new Map();
  }
  #callbackWrapper = (mutations, observer) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const removed = mutation.removedNodes;
        const added = mutation.addedNodes;
        for (let i = 0; i < removed.length; i++) {
          this.#walkShadows(removed[i], true);
        }
        for (let i = 0; i < added.length; i++) {
          this.#walkShadows(added[i]);
        }
      }
    }
    this.#callback(mutations, observer);
  };
  #addSubObserver(shadowRoot) {
    if (!this.#options || !this.#callback || this.#subObservers.has(shadowRoot)) {
      return;
    }
    if (this.#options.subtree && nodeContains(this.#root, shadowRoot)) {
      const subObserver = new MutationObserver(this.#callbackWrapper);
      this.#subObservers.set(shadowRoot, subObserver);
      if (this.#isObserving) {
        subObserver.observe(shadowRoot, this.#options);
      }
      this.#walkShadows(shadowRoot);
    }
  }
  #removeSubObserver(shadowRoot) {
    const observer = this.#subObservers.get(shadowRoot);
    if (observer) {
      observer.disconnect();
      this.#subObservers.delete(shadowRoot);
    }
    if (!this.#subObservers.size) {
      this.#subObservers.clear();
    }
  }
  disconnect() {
    this.#isObserving = false;
    this.#options = {};
    ShadowMutationObserver.#shadowObservers.delete(this);
    for (const shadowRoot of this.#subObservers.keys()) {
      this.#removeSubObserver(shadowRoot);
    }
    this.#observer.disconnect();
  }
  observe(target, options) {
    const doc = target.nodeType === Node.DOCUMENT_NODE ? target : target.ownerDocument;
    const win = doc?.defaultView;
    if (!doc || !win) {
      return;
    }
    ShadowMutationObserver.#overrideAttachShadow(win);
    ShadowMutationObserver.#shadowObservers.add(this);
    this.#root = target;
    this.#options = options;
    this.#isObserving = true;
    this.#observer.observe(target, options);
    this.#walkShadows(target);
  }
  #walkShadows(target, remove) {
    const doc = target.nodeType === Node.DOCUMENT_NODE ? target : target.ownerDocument;
    if (!doc) {
      return;
    }
    if (target === doc) {
      target = doc.body;
    } else {
      const shadowRoot = target.shadowRoot;
      if (shadowRoot) {
        if (remove) {
          const subObserver = this.#subObservers.get(shadowRoot);
          if (subObserver) {
            subObserver.disconnect();
            this.#subObservers.delete(shadowRoot);
          }
        } else {
          this.#addSubObserver(shadowRoot);
        }
        return;
      }
    }
    const walker = doc.createTreeWalker(target, NodeFilter.SHOW_ELEMENT, {
      acceptNode: node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (remove) {
            const subObserver = this.#subObservers.get(node);
            if (subObserver) {
              subObserver.disconnect();
              this.#subObservers.delete(node);
            }
          } else {
            const shadowRoot = node.shadowRoot;
            if (shadowRoot) {
              this.#addSubObserver(shadowRoot);
            }
          }
        }
        return NodeFilter.FILTER_SKIP;
      },
    });
    walker.nextNode();
  }
  takeRecords() {
    const records = this.#observer.takeRecords();
    for (const subObserver of this.#subObservers.values()) {
      records.push(...subObserver.takeRecords());
    }
    return records;
  }
}
function createMutationObserver(callback) {
  return new ShadowMutationObserver(callback);
}
class ShadowTreeWalker {
  filter;
  root;
  whatToShow;
  get currentNode() {
    return this.#currentNode;
  }
  set currentNode(node) {
    if (!nodeContains(this.root, node)) {
      throw new Error('Cannot set currentNode to a node that is not contained by the root node.');
    }
    this.#currentNode = node;
    this.#forwardStack = null;
    this.#backwardStack = null;
    this.#resetSlotted();
    this.#isLastDirectionForward = false;
  }
  /** @type {Document} */
  #doc;
  /** @type {Node} */
  #currentNode;
  /** @type {Array<{walker: TreeWalker, hostNode: Element|null}> | null} */
  #forwardStack = null;
  /** @type {Array<{walker: TreeWalker, hostNode: Element|null}> | null} */
  #backwardStack = null;
  /** @type {Element[]} */
  #slotted = [];
  /**
   * Tracks slotted elements whose children have been queued
   * @type {WeakSet<Element>}
   */
  #slottedWithChildren = /* @__PURE__ */ new WeakSet();
  /** @type {boolean} */
  #isLastDirectionForward = true;
  constructor(doc, root, whatToShow, filter) {
    this.#doc = doc;
    this.root = root;
    this.filter = filter ?? null;
    this.whatToShow = whatToShow ?? NodeFilter.SHOW_ALL;
    this.#currentNode = root;
  }
  nextNode() {
    if (!this.#isLastDirectionForward) {
      this.#forwardStack = null;
      this.#resetSlotted();
      this.#isLastDirectionForward = true;
    }
    if (this.#forwardStack === null) {
      this.#forwardStack = this.#buildStack(true);
    }
    const previous = this.#currentNode;
    const result = this.#walkForward();
    if (result === null) {
      this.#currentNode = previous;
      this.#forwardStack = null;
      this.#resetSlotted();
    }
    return result;
  }
  previousNode() {
    if (this.#isLastDirectionForward) {
      this.#backwardStack = null;
      this.#resetSlotted();
      this.#isLastDirectionForward = false;
    }
    if (this.#backwardStack === null) {
      this.#backwardStack = this.#buildStack(false);
    }
    const previous = this.#currentNode;
    const result = this.#walkBackward();
    if (result === null) {
      this.#currentNode = previous;
      this.#backwardStack = null;
      this.#resetSlotted();
    }
    return result;
  }
  #resetSlotted() {
    this.#slotted = [];
    this.#slottedWithChildren = /* @__PURE__ */ new WeakSet();
  }
  #filterNode = node => {
    if (typeof this.filter === 'function') {
      return this.filter(node);
    } else if (this.filter?.acceptNode) {
      return this.filter.acceptNode(node);
    }
    return NodeFilter.FILTER_ACCEPT;
  };
  /**
   * Returns a filter callback for native TreeWalker nodes.
   *
   * Both directions accept shadow hosts and apply `#filterNode` to regular
   * elements. The only difference is a side effect: forward filters push a
   * new shadow walker onto `#forwardStack` when a shadow host is encountered
   * (the backward path handles shadow entry explicitly in `#walkBackward`).
   *
   * @param {boolean} isForward
   */
  #makeFilter(isForward) {
    return node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.parentNode?.shadowRoot) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.localName === 'slot' && node.getRootNode() instanceof ShadowRoot) {
          return NodeFilter.FILTER_ACCEPT;
        }
        const shadowRoot = node.shadowRoot;
        if (shadowRoot) {
          if (isForward) {
            const top = this.#forwardStack[0];
            if (!top || top.walker.root !== shadowRoot) {
              const walker = this.#doc.createTreeWalker(shadowRoot, this.whatToShow, {
                acceptNode: this.#makeFilter(true),
              });
              this.#forwardStack.unshift({ walker, hostNode: node });
            }
          }
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return this.#filterNode(node);
        }
      }
      return NodeFilter.FILTER_SKIP;
    };
  }
  /**
   * Builds a direction-specific stack from `#currentNode` by walking up
   * through shadow roots to the walker's `root`.
   *
   * The stack is ordered innermost-first: index 0 is the walker whose root
   * contains `#currentNode` directly.
   *
   * @param {boolean} isForward
   * @returns {Array<{walker: TreeWalker, hostNode: Element|null}>}
   */
  #buildStack(isForward) {
    const makeFilter = () => this.#makeFilter(isForward);
    if (!nodeContains(this.root, this.#currentNode)) {
      this.#currentNode = this.root;
    }
    const stack = [];
    let currentNode = this.#currentNode;
    let walkerCurrentNode = this.#currentNode;
    const resolveSlot = node => {
      const slot = node.assignedSlot;
      if (!slot || !nodeContains(this.root, slot)) {
        return [];
      }
      const assigned = [...slot.assignedElements({ flatten: true })];
      const idx = assigned.indexOf(node);
      let siblings = [];
      if (isForward) {
        if (idx >= 0 && idx < assigned.length - 1) {
          siblings = assigned.slice(idx + 1);
        }
      } else {
        if (idx > 0) {
          siblings = assigned.slice(0, idx).reverse();
        }
      }
      currentNode = walkerCurrentNode = slot;
      return siblings;
    };
    const initialSlotted = resolveSlot(this.#currentNode);
    this.#slotted = initialSlotted;
    while (currentNode && currentNode !== this.root) {
      if (currentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        const shadowRoot = currentNode;
        const walker = this.#doc.createTreeWalker(shadowRoot, this.whatToShow, {
          acceptNode: makeFilter(),
        });
        walker.currentNode = walkerCurrentNode;
        stack.push({ walker, hostNode: shadowRoot.host });
        currentNode = walkerCurrentNode = shadowRoot.host;
        const siblings = resolveSlot(currentNode);
        if (siblings.length) {
          stack[stack.length - 1].savedSlotted = siblings;
        }
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    const rootWalker = this.#doc.createTreeWalker(this.root, this.whatToShow, {
      acceptNode: makeFilter(),
    });
    rootWalker.currentNode = walkerCurrentNode;
    stack.push({ walker: rootWalker, hostNode: null });
    const rootShadow = this.root.shadowRoot;
    if (rootShadow && !stack.some(e => e.walker.root === rootShadow)) {
      const shadowWalker = this.#doc.createTreeWalker(rootShadow, this.whatToShow, { acceptNode: makeFilter() });
      stack.unshift({ walker: shadowWalker, hostNode: this.root });
    }
    if (isForward && this.#currentNode !== this.root) {
      const currentShadow = this.#currentNode.shadowRoot;
      if (currentShadow && !stack.some(e => e.walker.root === currentShadow)) {
        const shadowWalker = this.#doc.createTreeWalker(currentShadow, this.whatToShow, { acceptNode: makeFilter() });
        const entry = { walker: shadowWalker, hostNode: this.#currentNode };
        if (initialSlotted.length) {
          entry.savedSlotted = initialSlotted;
          this.#slotted = [];
        }
        stack.unshift(entry);
      }
    }
    return stack;
  }
  /**
   * Forward traversal engine. Operates on `#forwardStack`.
   * Functionally identical to the old `nextNode()` body.
   */
  #walkForward() {
    if (this.#slotted.length > 0) {
      const slottedEl = this.#slotted.shift();
      if (slottedEl.shadowRoot) {
        const nodeResult2 = this.#filterNode(slottedEl);
        if (nodeResult2 === NodeFilter.FILTER_REJECT) {
          return this.#walkForward();
        }
        const shadowRoot = slottedEl.shadowRoot;
        const walker = this.#doc.createTreeWalker(shadowRoot, this.whatToShow, {
          acceptNode: this.#makeFilter(true),
        });
        const savedSlotted = this.#slotted;
        this.#slotted = [];
        this.#forwardStack.unshift({
          walker,
          hostNode: slottedEl,
          savedSlotted,
        });
        if (nodeResult2 === NodeFilter.FILTER_ACCEPT) {
          this.#currentNode = slottedEl;
          return slottedEl;
        }
        return this.#walkForward();
      }
      const nodeResult = this.#filterNode(slottedEl);
      if (nodeResult !== NodeFilter.FILTER_REJECT) {
        if (slottedEl.firstElementChild) {
          this.#slotted.unshift(...slottedEl.children);
        }
      }
      if (nodeResult === NodeFilter.FILTER_ACCEPT) {
        this.#currentNode = slottedEl;
        return slottedEl;
      }
      return this.#walkForward();
    }
    const active = this.#forwardStack[0];
    if (!active) {
      return null;
    }
    const nextNode = active.walker.nextNode();
    if (nextNode) {
      if (nextNode.localName === 'slot') {
        this.#slotted = [...nextNode.assignedElements({ flatten: true })];
        return this.#walkForward();
      }
      const shadowRoot = nextNode.shadowRoot;
      if (shadowRoot) {
        const nodeResult = this.#filterNode(nextNode);
        if (nodeResult === NodeFilter.FILTER_ACCEPT) {
          this.#currentNode = nextNode;
          return nextNode;
        }
        return this.#walkForward();
      }
      this.#currentNode = nextNode;
      return nextNode;
    } else {
      if (this.#forwardStack.length > 1) {
        const popped = this.#forwardStack.shift();
        if (popped.savedSlotted?.length) {
          this.#slotted = popped.savedSlotted;
        }
        return this.#walkForward();
      } else {
        return null;
      }
    }
  }
  /**
   * Backward traversal engine. Operates on `#backwardStack`.
   *
   * Unlike `#walkForward()`, this does NOT rely on filter side effects to
   * push shadow walkers. Instead, when a shadow host is encountered via
   * native `previousNode()`, it explicitly creates and pushes a shadow walker
   * positioned at the last descendant of the shadow root, then recurses.
   *
   * When a shadow walker is exhausted, the host is returned (if accepted by
   * the user filter), because in reverse tree order shadow children come
   * before the host.
   */
  #walkBackward() {
    if (this.#slotted.length > 0) {
      const slottedEl = this.#slotted.shift();
      if (slottedEl.shadowRoot) {
        const nodeResult2 = this.#filterNode(slottedEl);
        if (nodeResult2 === NodeFilter.FILTER_REJECT) {
          return this.#walkBackward();
        }
        this.#currentNode = slottedEl;
        const savedSlotted = this.#slotted;
        this.#slotted = [];
        return this.#enterShadowBackward(slottedEl, savedSlotted);
      }
      const nodeResult = this.#filterNode(slottedEl);
      if (nodeResult === NodeFilter.FILTER_REJECT) {
        return this.#walkBackward();
      }
      if (slottedEl.firstElementChild && !this.#slottedWithChildren.has(slottedEl)) {
        this.#slottedWithChildren.add(slottedEl);
        this.#slotted.unshift(...[...slottedEl.children].reverse(), slottedEl);
        return this.#walkBackward();
      }
      if (nodeResult === NodeFilter.FILTER_ACCEPT) {
        this.#currentNode = slottedEl;
        return slottedEl;
      }
      return this.#walkBackward();
    }
    const active = this.#backwardStack[0];
    if (!active) {
      return null;
    }
    if (active.walker.currentNode === active.walker.root && active.walker.root !== this.root) {
      const lastChild = getLastElementDescendant(active.walker.root);
      if (lastChild) {
        active.walker.currentNode = lastChild;
        const gen = this.#handleBackwardNode(lastChild);
        const { value, done } = gen.next();
        if (!done) {
          return value;
        }
      }
    }
    const previousNode = active.walker.previousNode();
    if (previousNode) {
      const gen = this.#handleBackwardNode(previousNode);
      const { value, done } = gen.next();
      if (!done) {
        return value;
      }
      this.#currentNode = previousNode;
      return previousNode;
    } else {
      if (this.#backwardStack.length > 1) {
        const popped = this.#backwardStack.shift();
        if (popped.savedSlotted?.length) {
          this.#slotted = popped.savedSlotted;
        }
        const hostNode = popped.hostNode;
        if (hostNode) {
          const nodeResult = this.#filterNode(hostNode);
          if (nodeResult === NodeFilter.FILTER_ACCEPT) {
            this.#currentNode = hostNode;
            return hostNode;
          }
        }
        return this.#walkBackward();
      } else {
        if (this.#currentNode !== this.root) {
          const nodeResult = this.#filterNode(this.root);
          if (nodeResult === NodeFilter.FILTER_ACCEPT) {
            this.#currentNode = this.root;
            return this.root;
          }
        }
        return null;
      }
    }
  }
  /**
   * Handle a node encountered during backward traversal: expand <slot>s,
   * enter shadow hosts, or filter regular elements.
   *
   * Yields a value to return from #walkBackward, or returns with no
   * value to signal "fall through" (e.g. filter rejected the node in
   * the initial-entry path).
   *
   * @param {Element} node
   */
  *#handleBackwardNode(node) {
    if (node.localName === 'slot') {
      this.#slotted = [...node.assignedElements({ flatten: true })].reverse();
      yield this.#walkBackward();
      return;
    }
    if (node.shadowRoot) {
      this.#currentNode = node;
      yield this.#enterShadowBackward(node);
      return;
    }
    const nodeResult = this.#filterNode(node);
    if (nodeResult === NodeFilter.FILTER_ACCEPT) {
      this.#currentNode = node;
      yield node;
    }
  }
  /**
   * Enter a shadow host's shadow root for backward traversal: create a new
   * shadow walker, push it onto `#backwardStack`, and recurse.
   *
   * @param {Element} hostNode - The shadow host to enter.
   * @param {Element[]} [savedSlotted] - Slotted siblings to restore after
   *   this shadow scope is exhausted and the host is popped.
   */
  #enterShadowBackward(hostNode, savedSlotted) {
    const shadowRoot = hostNode.shadowRoot;
    const walker = this.#doc.createTreeWalker(shadowRoot, this.whatToShow, {
      acceptNode: this.#makeFilter(false),
    });
    this.#backwardStack.unshift({ walker, hostNode, savedSlotted });
    return this.#walkBackward();
  }
}
function createTreeWalker(doc, root, whatToShow, filter) {
  return new ShadowTreeWalker(doc, root, whatToShow, filter);
}
function hasDocument() {
  return typeof document !== 'undefined';
}
function supportsFocusGroup() {
  return 'focusgroup' in (globalThis?.HTMLElement?.prototype ?? {});
}
let focusgroupCount = 0;
function generateUniqueId() {
  return String(focusgroupCount++);
}
function isKeyboardFocusable(element, owner) {
  return (
    // Is content editable
    (element.isContentEditable || // A media element with controls, this check is necessary because
      // `tabIndex` is `-1` in WebKit in this case
      element.matches(':is(audio, video)[controls]') || // Is tabbable
      element.tabIndex > -1) &&
    !(
      // Not disabled
      (
        element.disabled ||
        element.hasAttribute('disabled') || // Not an anchor or area without href
        element.matches(':is(a, area):not([href])') || // Not inert
        element.inert || // Not hidden
        !checkVisibility(element, owner) || // Not a media element without controls
        element.matches(':is(audio, video):not([controls])') || // Has not been assigned a tabindex by the polyfill
        element.hasAttribute(DatasetName.AUTHOR_TABINDEX)
      )
    )
  );
}
function getNavigationDirection(event, owner, axis) {
  if (isKeyConflictElement(event.composedPath()[0])) {
    return event.key === 'Tab' ? (event.shiftKey ? 'backward' : 'forward') : null;
  }
  if (event.shiftKey || event.ctrlKey || event.metaKey) {
    return null;
  }
  const { writingMode, direction } = window.getComputedStyle(owner);
  const isVertical = !writingMode.startsWith('horizontal-');
  const isRtl = direction === 'rtl';
  const horizontal = isVertical ? 'block' : 'inline';
  const vertical = isVertical ? 'inline' : 'block';
  const isHorizontalReversed = isVertical ? writingMode.endsWith('-rl') !== isRtl : isRtl;
  const isVerticalReversed = isVertical && isRtl;
  const map = {
    ArrowUp: {
      axis: vertical,
      dir: isVerticalReversed ? 'forward' : 'backward',
    },
    ArrowDown: {
      axis: vertical,
      dir: isVerticalReversed ? 'backward' : 'forward',
    },
    ArrowLeft: {
      axis: horizontal,
      dir: isHorizontalReversed ? 'forward' : 'backward',
    },
    ArrowRight: {
      axis: horizontal,
      dir: isHorizontalReversed ? 'backward' : 'forward',
    },
    Home: { dir: 'start' },
    End: { dir: 'end' },
  };
  const action = map[event.key];
  if (!action || (axis && action.axis && action.axis !== axis)) {
    return null;
  }
  return action.dir;
}
function isKeyConflictElement(el) {
  return (
    el?.nodeType === Node.ELEMENT_NODE && // Is an editable form element
    ((['INPUT', 'TEXTAREA', 'SELECT'].includes(el.nodeName) &&
      !['checkbox', 'radio'].includes(el.getAttribute('type'))) || // Is content editable
      el.isContentEditable || // Scrollable and scroll direction aligns with the direction limit
      // TODO
      // Element with preventDefault() on arrow keys
      (['AUDIO', 'VIDEO'].includes(el.nodeName) && el.hasAttribute('controls')) || // iframes and object
      ['IFRAME', 'OBJECT'].includes(el.nodeName))
  );
}
function isSegmentor(element, owner) {
  if (!checkVisibility(element)) {
    return false;
  }
  if (isKeyboardFocusable(element, owner)) {
    return element.getAttribute('focusgroup').includes('none');
  }
  const walker = createTreeWalker(document, element, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    if (walker.currentNode !== element && isKeyboardFocusable(walker.currentNode, owner)) {
      return true;
    }
  }
  return false;
}
function checkVisibility(element, ancestor) {
  if ('checkVisibility' in Element.prototype) {
    return element.checkVisibility({
      visibilityProperty: true,
      contentVisibilityAuto: true,
    });
  }
  if (element.getClientRects().length === 0) {
    return false;
  }
  let current = element;
  while (current) {
    const { visibility, contentVisibility } = window.getComputedStyle(current);
    if (['hidden', 'collapse'].includes(visibility)) {
      return false;
    }
    if (current !== element && contentVisibility === 'hidden') {
      return false;
    }
    if (!ancestor || current === ancestor) {
      break;
    }
    current = getParentElement(current);
  }
  return true;
}
function inferRole(element, behavior, kind) {
  const allowRoleInferring = hasGenericRole(element) || (kind === 'child' && element.nodeName === 'BUTTON');
  const role = allowRoleInferring ? BehaviorMap.get(behavior)?.[`${kind}Role`] : void 0;
  if (role) {
    if (!element.hasAttribute('role') || element.hasAttribute(DatasetName.INFERRED_ROLE)) {
      element.setAttribute('role', role);
      element.setAttribute(DatasetName.INFERRED_ROLE, '');
    }
  } else if (element.hasAttribute(DatasetName.INFERRED_ROLE)) {
    element.removeAttribute('role');
    element.removeAttribute(DatasetName.INFERRED_ROLE);
  }
}
function hasGenericRole(element) {
  if ('computedRole' in HTMLElement.prototype) {
    return element.computedRole === 'generic';
  }
  return ['DIV', 'SPAN'].includes(element.nodeName) || element.nodeName.includes('-');
}
globalThis.__FOCUSGROUP_POLYFILL_SHADOW_MUTATION_OBSERVERS ??= /* @__PURE__ */ new Set();
const observers = globalThis.__FOCUSGROUP_POLYFILL_SHADOW_MUTATION_OBSERVERS;
function addObserver(observer) {
  observers.add(observer);
}
function flushAllObservers() {
  for (const observer of observers ?? []) {
    observer.takeRecords();
  }
}
class FocusGroup {
  /**
   * The focus group owner element.
   * @type {HTMLElement!}
   */
  #owner;
  /**
   * The unique ID for the group.
   * @type {string}
   */
  #id = generateUniqueId();
  /**
   * The focus group behavior.
   * @type {BehaviorToken!}
   */
  #behavior = BehaviorToken.NONE;
  /**
   * The focus group navigation axis limitation.
   * @type {("inline" | "block" | undefined)}
   */
  #axis = void 0;
  /**
   * Whether the focus group wraps. Defaults to `false`.
   * @type {boolean}
   */
  #wrap = false;
  /**
   * Whether the focus group remembers the previously focused element. Defaults
   * to `true`.
   * @type {boolean}
   */
  #memory = true;
  /**
   * The focus group start element.
   * @type {HTMLElement}
   */
  #start;
  /**
   * The TreeWalker to traverse all focus group items.
   * @type {ShadowTreeWalker!}
   */
  #itemWalker;
  /**
   * The memorized tab stop.
   * @type {HTMLElement|null}
   */
  #memorized = null;
  /**
   * Shadow host ancestors that have been given `tabindex=0` purely to keep
   * the real tab stop reachable via Tab. Cleared and rebuilt whenever the tab
   * stop changes.
   * @type {Set<HTMLElement>}
   */
  #proxyHosts = /* @__PURE__ */ new Set();
  /**
   * @param {HTMLElement!} owner - The focus group owner element.
   */
  constructor(owner) {
    if (supportsFocusGroup() || !owner || !owner.hasAttribute('focusgroup')) {
      return;
    }
    this.#owner = owner;
    this.#itemWalker = createTreeWalker(document, this.#owner, NodeFilter.SHOW_ELEMENT, node => {
      if (node.hasAttribute('focusgroup') && node.getAttribute(DatasetName.ITEM) !== this.#id) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.getAttribute(DatasetName.ITEM) === this.#id ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    });
    this.#updateDefinition();
    this.#decorateOwner();
    this.#decorateItems();
    while (this.#itemWalker.currentNode.tabIndex < 0) {
      if (!this.#itemWalker.nextNode()) {
        break;
      }
    }
    const observer = createMutationObserver(this.#processMutations.bind(this));
    observer.observe(owner, {
      attributes: true,
      attributeFilter: [
        'focusgroup',
        'focusgroupstart',
        'controls',
        'contenteditable',
        'disabled',
        'href',
        'hidden',
        'tabindex',
        'type',
      ],
      childList: true,
      subtree: true,
    });
    addObserver(observer);
    this.#owner.addEventListener('keydown', this.#handleKeydown.bind(this));
    this.#owner.addEventListener('focusin', this.#handleFocusin.bind(this));
    this.#owner.addEventListener('focusout', this.#handleFocusout.bind(this));
  }
  #updateDefinition() {
    const tokens = (this.#owner?.getAttribute('focusgroup') ?? '').split(' ');
    this.#behavior = BEHAVIOR_TOKENS.includes(tokens[0]) ? tokens[0] : BehaviorToken.NONE;
    this.#memory = !tokens.includes('nomemory');
    this.#wrap = BehaviorMap.get(this.#behavior)?.wrap ?? false;
    if (tokens.includes('wrap') && !this.#wrap) {
      this.#wrap = true;
    } else if (tokens.includes('nowrap') && this.#wrap) {
      this.#wrap = false;
    }
    this.#axis =
      tokens.includes('inline') && !tokens.includes('block')
        ? 'inline'
        : tokens.includes('block') && !tokens.includes('inline')
        ? 'block'
        : tokens.includes('inline') && tokens.includes('block')
        ? void 0
        : BehaviorMap.get(this.#behavior)?.axis;
    if (!this.#memory) {
      this.#memorized = null;
    }
  }
  #decorateOwner() {
    inferRole(this.#owner, this.#behavior, 'owner');
  }
  #decorateItems() {
    if (this.#behavior === BehaviorToken.NONE) {
      this.#undecorateItems();
      return;
    }
    const walker = createTreeWalker(document, this.#owner, NodeFilter.SHOW_ELEMENT, node => {
      if (this.#isItemCandidate(node) || this.#isNestedGroupOwner(node)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    });
    let firstItem = null;
    let startItem = null;
    let segment = 0;
    let shouldStartNewSegment = false;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (this.#isNestedGroupOwner(node)) {
        if (isSegmentor(node, this.#owner)) {
          segment++;
          shouldStartNewSegment = true;
        }
        const isOptedOut = node.getAttribute('focusgroup').includes('none');
        if (!isKeyboardFocusable(node, this.#owner) || isOptedOut) {
          continue;
        }
      }
      if (!firstItem) {
        firstItem = node;
      }
      node.setAttribute(DatasetName.ITEM, this.#id);
      if (segment > 0) {
        node.setAttribute(DatasetName.SEGMENT, segment.toString());
      }
      const isSegmentStart = shouldStartNewSegment;
      if (isSegmentStart) {
        node.setAttribute(DatasetName.SEGMENT_START, '');
        shouldStartNewSegment = false;
      }
      inferRole(node, this.#behavior, 'child');
      node.setAttribute(
        DatasetName.AUTHOR_TABINDEX,
        node.hasAttribute('tabindex') ? node.getAttribute('tabindex') : 'none',
      );
      if (!startItem && node.hasAttribute('focusgroupstart')) {
        startItem = node;
      } else {
        node.tabIndex = isSegmentStart ? 0 : -1;
      }
    }
    if (!startItem && firstItem) {
      startItem = firstItem;
    }
    if (!this.#memorized?.isConnected) {
      this.#memorized = null;
    }
    if (this.#memorized) {
      if (this.#memorized.getAttribute(DatasetName.ITEM) === this.#id) {
        startItem = this.#memorized;
      } else {
        startItem = firstItem || startItem;
        this.#memorized = null;
      }
    }
    if (startItem) {
      startItem.tabIndex = 0;
      this.#start = startItem;
      this.#disableKeyboardFocusabilityForProxyHosts();
      this.#enableKeyboardFocusabilityForProxyHost(startItem);
      this.#itemWalker.currentNode = startItem;
    }
    flushAllObservers();
  }
  #undecorateItems() {
    this.#disableKeyboardFocusabilityForProxyHosts();
    const first = this.#firstItem();
    if (!first) {
      return;
    }
    do {
      const item = this.#itemWalker.currentNode;
      inferRole(item, null, null);
      const authorTabIndex = item.getAttribute(DatasetName.AUTHOR_TABINDEX);
      if (authorTabIndex) {
        if (authorTabIndex === 'none') {
          item.removeAttribute('tabindex');
        } else {
          item.setAttribute('tabindex', authorTabIndex);
        }
        item.removeAttribute(DatasetName.AUTHOR_TABINDEX);
      }
      item.removeAttribute(DatasetName.ITEM);
    } while (this.#itemWalker.nextNode());
    flushAllObservers();
  }
  /** @returns {HTMLElement} The first item element. */
  #firstItem() {
    while (this.#itemWalker.previousNode()) {}
    return this.#itemWalker.currentNode;
  }
  /** @returns {HTMLElement} The last item element. */
  #lastItem() {
    while (this.#itemWalker.nextNode()) {}
    return this.#itemWalker.currentNode;
  }
  /** @param {KeyboardEvent} evt */
  #handleKeydown(evt) {
    const evtTarget = evt.composedPath()[0];
    if (evt.defaultPrevented || evtTarget === this.#owner) {
      return;
    }
    const closestGroup = getClosestElement(evtTarget, '[focusgroup]');
    if (closestGroup) {
      evt.stopPropagation();
    }
    if (closestGroup?.getAttribute('focusgroup').includes('none')) {
      return;
    }
    const current = this.#itemWalker.currentNode;
    let target;
    switch (getNavigationDirection(evt, evtTarget, this.#axis)) {
      case 'start':
        target = this.#firstItem();
        break;
      case 'end':
        target = this.#lastItem();
        break;
      case 'forward':
        target = this.#itemWalker.nextNode();
        if (!target && this.#wrap) {
          target = this.#firstItem();
        }
        break;
      case 'backward':
        target = this.#itemWalker.previousNode();
        if (!target && this.#wrap) {
          target = this.#lastItem();
        }
        break;
    }
    if (target && target !== current) {
      this.#setItemFocused(current, target, true);
      evt.preventDefault();
    }
  }
  /** @param {FocusEvent} evt */
  #handleFocusin(evt) {
    const target = evt.target.shadowRoot ? evt.composedPath()[0] : evt.target;
    if (!this.#itemWalker.filter(target)) {
      return;
    }
    const isExternalEntry = !evt.relatedTarget || !nodeContains(this.#owner, evt.relatedTarget);
    if (this.#proxyHosts.has(target) && isExternalEntry) {
      const tabStop = this.#memorized || this.#start;
      if (tabStop && tabStop !== target) {
        tabStop.focus();
        return;
      }
    }
    if (this.#proxyHosts.size > 0) {
      this.#disableKeyboardFocusabilityForProxyHosts();
      flushAllObservers();
    }
    this.#memorized = target;
    if (this.#itemWalker.currentNode === target) {
      return;
    }
    if (target.tabIndex < 0) {
      this.#setItemFocused(this.#itemWalker.currentNode, target);
    }
    this.#itemWalker.currentNode = target;
  }
  /** @param {FocusEvent} evt */
  #handleFocusout(evt) {
    const focusLeavingGroup = !evt.relatedTarget || !this.#owner.contains(evt.relatedTarget);
    if (focusLeavingGroup) {
      const tabStop = this.#memory ? this.#memorized || this.#start : this.#start;
      if (tabStop) {
        this.#enableKeyboardFocusabilityForProxyHost(tabStop);
        flushAllObservers();
      }
    }
    if ((evt.relatedTarget && this.#owner.contains(evt.relatedTarget)) || this.#memory || !this.#start) {
      return;
    }
    this.#memorized = null;
    this.#start.tabIndex = 0;
    this.#itemWalker.currentNode = this.#start;
    while (this.#itemWalker.nextNode()) {
      const current = this.#itemWalker.currentNode;
      current.tabIndex = current.hasAttribute(DatasetName.SEGMENT_START) ? 0 : -1;
    }
    flushAllObservers();
  }
  /**
   * @param {HTMLElement} node
   * @returns {boolean}
   */
  #isItemCandidate(node) {
    return (
      // if it’s already an item (useful when focusgroup definition changes)
      node.hasAttribute(DatasetName.ITEM) || // if the element is yet to be decorated
      (isKeyboardFocusable(node, this.#owner) &&
        (node.assignedSlot
          ? getClosestElement(node.assignedSlot, '[focusgroup]') === this.#owner
          : getClosestElement(node.parentNode, '[focusgroup]') === this.#owner))
    );
  }
  /**
   * @param {HTMLElement} node
   * @returns {boolean}
   */
  #isNestedGroupOwner(node) {
    return node.hasAttribute('focusgroup') && node !== this.#owner;
  }
  /**
   * Walks from `tabStop` up through shadow boundaries and slot assignments to
   * `this.#owner`. For each shadow host ancestor that is a decorated item of
   * this group, sets `tabindex=0` so the browser's sequential focus navigation
   * can Tab into the shadow root that contains the real tab stop. Adds each
   * such host to the `#proxyHosts` tracking set.
   * @param {HTMLElement} tabStop - The actual focusable tab stop element.
   */
  #enableKeyboardFocusabilityForProxyHost(tabStop) {
    let node = tabStop;
    while (node && node !== this.#owner) {
      const slot = node.assignedSlot;
      if (slot) {
        const slotRoot = slot.getRootNode();
        if (slotRoot instanceof ShadowRoot) {
          const host = slotRoot.host;
          if (host !== this.#owner && host.getAttribute(DatasetName.ITEM) === this.#id && host !== tabStop) {
            host.tabIndex = 0;
            this.#proxyHosts.add(host);
          }
          node = host;
          continue;
        }
      }
      const rootNode = node.getRootNode();
      if (rootNode instanceof ShadowRoot) {
        const host = rootNode.host;
        if (host !== this.#owner && host.getAttribute(DatasetName.ITEM) === this.#id && host !== tabStop) {
          host.tabIndex = 0;
          this.#proxyHosts.add(host);
        }
        node = host;
      } else {
        node = node.parentNode;
      }
    }
  }
  /**
   * Resets all proxy shadow hosts back to `tabindex=-1` (or `0` if they are
   * segment starts) so they no longer appear as extra Tab stops. Clears the
   * `#proxyHosts` tracking set.
   */
  #disableKeyboardFocusabilityForProxyHosts() {
    for (const host of this.#proxyHosts) {
      host.tabIndex = host.hasAttribute(DatasetName.SEGMENT_START) ? 0 : -1;
    }
    this.#proxyHosts.clear();
  }
  /**
   * Transfers the focusgroup's active tab stop from one item to another.
   * Sets the target's `tabindex` to `0` and optionally calls `focus()` on it.
   * The previous item's `tabindex` is set to `-1` unless it belongs to a
   * different segment (in which case it remains `0` as a segment tab stop).
   * Also clears proxy hosts and flushes observers.
   * @param {HTMLElement} current - The currently focused item.
   * @param {HTMLElement} target - The item to receive focus.
   * @param {boolean} [shouldCallFocus=false] - Whether to programmatically call
   *     `focus()` on the target element.
   */
  #setItemFocused(current, target, shouldCallFocus = false) {
    target.tabIndex = 0;
    if (shouldCallFocus) {
      target.focus();
    }
    current.tabIndex = current.getAttribute(DatasetName.SEGMENT) === target.getAttribute(DatasetName.SEGMENT) ? -1 : 0;
    this.#disableKeyboardFocusabilityForProxyHosts();
    flushAllObservers();
  }
  /**
   * Processes DOM mutation records observed on the owner's subtree. Handles
   * changes to the `focusgroup` attribute definition, removal of the memorized
   * tab stop, and author `tabindex` updates on decorated items. After
   * processing, fully undecorates and redecorates all items to reconcile state.
   * @param {MutationRecord[]} entries - The list of mutation records to process.
   */
  // TODO: Handle mutations more granularly than redecorating all items.
  #processMutations(entries) {
    const hasDefinitionChanged = entries.find(e => e.target === this.#owner && e.attributeName === 'focusgroup');
    if (hasDefinitionChanged) {
      this.#updateDefinition();
      this.#decorateOwner();
    }
    if (this.#memorized) {
      const memorizedRemoved = entries.some(
        e =>
          e.type === 'childList' &&
          Array.from(e.removedNodes).some(n => n === this.#memorized || nodeContains(n, this.#memorized)),
      );
      if (memorizedRemoved) {
        this.#memorized = null;
      }
    }
    for (const entry of entries) {
      if (
        entry.type === 'attributes' &&
        entry.attributeName === 'tabindex' &&
        entry.target.hasAttribute(DatasetName.AUTHOR_TABINDEX) &&
        entry.target.getAttribute(DatasetName.ITEM) === this.#id
      ) {
        entry.target.setAttribute(DatasetName.AUTHOR_TABINDEX, entry.target.getAttribute('tabindex') ?? 'none');
      }
    }
    this.#undecorateItems();
    this.#decorateItems();
  }
}
function polyfill(root) {
  if (supportsFocusGroup() || !hasDocument()) {
    return;
  }
  if (!root) {
    root = document.body;
  }
  const walker = createTreeWalker(document, root, NodeFilter.SHOW_ELEMENT, node =>
    node.hasAttribute('focusgroup') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
  );
  do {
    new FocusGroup(walker.currentNode);
  } while (walker.nextNode());
}
export { polyfill, supportsFocusGroup };
