import { ForwardRef } from 'react-is';
import { getReactFiberFromNode, Fiber } from '../../utils/getReactFiberFromNode';

const isDOMNode = e => e && typeof e.tagName === 'string' && e.nodeType === Node.ELEMENT_NODE;

export class FiberNavigator {
  __fiber: Fiber;

  // TODO: Fibers can become stale.
  //      The only current fiber is the one found on the DOM node.
  //      There is no way to start at a React Component fiber, go the DOM node,
  //      get the current fiber, and find your way back to the React Component fiber.
  //      Probably need to remove fromFiber and re-implement using only DOM node weak map.
  static fromFiber = fiber => {
    if (!fiber) return null;

    const fiberNavigator = new FiberNavigator();

    Object.defineProperty(fiberNavigator, '__fiber', {
      value: fiber,
      enumerable: false,
      writable: false,
      configurable: false,
    });

    return fiberNavigator;
  };

  static fromDOMNode = domNode => {
    const fiber = getReactFiberFromNode(domNode);

    if (!fiber) return null;

    const fiberNavigator = new FiberNavigator();

    Object.defineProperty(fiberNavigator, '__fiber', {
      value: fiber,
      enumerable: false,
      writable: false,
      configurable: false,
    });

    return fiberNavigator;
  };

  get key() {
    return this.__fiber.key;
  }

  get name() {
    if (this.isClassComponent || this.isFunctionComponent) {
      return this.__fiber.type.displayName || this.__fiber.type.name;
    }
    if (this.isForwardRef) {
      return (
        this.__fiber.type.displayName ||
        this.__fiber.type.name ||
        this.__fiber.type.return?.displayName ||
        this.__fiber.type.return?.name
      );
    }
    if (this.isHostComponent) {
      return this.__fiber.stateNode.constructor.name;
    }
    return null;
  }

  get parent(): FiberNavigator {
    return FiberNavigator.fromFiber(this.__fiber.return);
  }

  get owner() {
    return FiberNavigator.fromFiber(this.__fiber._debugOwner);
  }

  get domNode() {
    let fiber = this.__fiber;

    do {
      if (isDOMNode(fiber.stateNode)) {
        return fiber.stateNode;
      }
      fiber = fiber.child;
    } while (fiber);

    return null;
  }

  get instance() {
    if (this.isClassComponent) {
      return this.__fiber.stateNode;
    }

    if (this.isFunctionComponent || this.isForwardRef) {
      // assumes functional component w/useRef
      return this.findDebugHookState(this.__fiber.memoizedState);
    }

    return null;
  }

  get props() {
    return this.__fiber.memoizedProps;
  }

  get state() {
    return this.__fiber.memoizedState;
  }

  /**
   * Hooks state is represented by a recursive structure where:
   * - `memoizedState` is a current value if applicable
   * - `next` is next hook in order
   * @param node - fiber
   */
  findDebugHookState(node) {
    if (node && node.memoizedState && node.memoizedState.current && node.memoizedState.current.fluentUIDebug) {
      return node.memoizedState.current;
    }

    if (node === null || node.next === null) {
      return null;
    }

    return this.findDebugHookState(node.next);
  }

  get reactComponent() {
    return this.isHostComponent ? this.owner.elementType : this.elementType;
  }

  get elementType() {
    return this.__fiber.elementType;
  }

  get fluentUIDebug() {
    return this.instance && this.instance.fluentUIDebug ? this.instance.fluentUIDebug : null;
  }

  get jsxString() {
    return `<${this.name} />`;
  }

  //
  // Methods
  //

  isEqual(fiberNav: FiberNavigator) {
    // TODO: do equality check on __fiber instead, however, see fromFiber TODO :/
    return !!fiberNav && fiberNav.instance === this.instance;
  }

  find(condition, move) {
    let fiber: FiberNavigator = FiberNavigator.fromFiber(this.__fiber);

    while (fiber) {
      if (condition(fiber)) {
        return fiber;
      }
      fiber = move(fiber);
    }

    return null;
  }

  findOwner(condition) {
    return this.find(condition, fiber => fiber.owner);
  }

  findParent(condition) {
    return this.find(condition, fiber => fiber.parent);
  }

  //
  // Component Types
  //

  get isClassComponent() {
    // React.Component subclasses have this flag
    // https://reactjs.org/docs/implementation-notes.html
    return typeof this.__fiber.type === 'function' && !!this.__fiber.type.prototype?.isReactComponent;
  }

  get isFunctionComponent() {
    // React.Component subclasses have this flag
    // https://reactjs.org/docs/implementation-notes.html
    return typeof this.__fiber.type === 'function' && !this.__fiber.type.prototype?.isReactComponent;
  }

  get isForwardRef() {
    return this.__fiber.type?.$$typeof === ForwardRef;
  }

  get isHostComponent() {
    // Host components are platform components (i.e. 'div' on web)
    // https://github.com/acdlite/react-fiber-architecture#type-and-key
    return typeof this.__fiber.type === 'string';
  }

  //
  // What this fiber component renders
  //

  get isDOMComponent() {
    return !!this.__fiber.child && FiberNavigator.fromFiber(this.__fiber.child).isHostComponent;
  }

  // https://github.com/facebook/react/blob/16.8.6/packages/react-dom/src/test-utils/ReactTestUtils.js#L193
  get isCompositeComponent() {
    return this.isDOMComponent ? false : !!this.instance && !!this.instance.render && !!this.instance.setState;
  }
}
