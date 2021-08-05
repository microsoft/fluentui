import * as React from 'react';

// ========================================================
// react/packages/shared/ReactTypes.js
// ========================================================

type ReactEventResponder<E, C> = {
  $$typeof: Symbol | number;
  displayName: string;
  targetEventTypes: null | string[];
  rootEventTypes: null | string[];
  getInitialState: null | ((props: Object) => Object);
  onEvent: null | ((event: E, context: C, props: Object, state: Object) => void);
  onRootEvent: null | ((event: E, context: C, props: Object, state: Object) => void);
  onMount: null | ((context: C, props: Object, state: Object) => void);
  onUnmount: null | ((context: C, props: Object, state: Object) => void);
};

type ReactEventResponderInstance<E, C> = {
  fiber: Object;
  props: Object;
  responder: ReactEventResponder<E, C>;
  rootEventTypes: null | Set<string>;
  state: Object;
};

// ========================================================
// react/packages/react-reconciler/src/ReactFiberHooks.js
// ========================================================

export type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue'
  | 'useResponder';

type ReactProviderType<T> = {
  $$typeof: Symbol | number;
  _context: ReactContext<T>;
};

type ReactContext<T> = {
  $$typeof: Symbol | number;
  Consumer: ReactContext<T>;
  Provider: ReactProviderType<T>;

  _calculateChangedBits: ((a: T, b: T) => number) | null;

  _currentValue: T;
  _currentValue2: T;
  _threadCount: number;

  // DEV only
  _currentRenderer?: Object | null;
  _currentRenderer2?: Object | null;
};

type ContextDependency<T> = {
  context: ReactContext<T>;
  observedBits: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: ContextDependency<any> | null;
};

enum WorkTag {
  FunctionComponent = 0,
  ClassComponent = 1,
  IndeterminateComponent = 2, // Before we know whether it is function or class
  HostRoot = 3, // Root of a host tree. Could be nested inside another node.
  HostPortal = 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent = 5,
  HostText = 6,
  Fragment = 7,
  Mode = 8,
  ContextConsumer = 9,
  ContextProvider = 10,
  ForwardRef = 11,
  Profiler = 12,
  SuspenseComponent = 13,
  MemoComponent = 14,
  SimpleMemoComponent = 15,
  LazyComponent = 16,
  IncompleteClassComponent = 17,
  DehydratedFragment = 18,
  SuspenseListComponent = 19,
  FundamentalComponent = 20,
  ScopeComponent = 21,
}

type Source = {
  fileName: string;
  lineNumber: number;
};

type ExpirationTime = number;

type Dependencies = {
  expirationTime: ExpirationTime;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firstContext: ContextDependency<any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responders: Map<ReactEventResponder<any, any>, ReactEventResponderInstance<any, any>> | null;
};

// ========================================================
// react/packages/react-reconciler/src/ReactFiber.js
// ========================================================

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.

export type Fiber = {
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  tag: WorkTag;

  // Unique identifier of this child.
  key: null | string;

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementType: any;

  // The resolved function/class/ associated with this fiber.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;

  // The local state associated with this fiber.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateNode: any;

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null;

  // Singly Linked List Tree Structure.
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>;

  // Input is the data coming into process this fiber. Arguments. Props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingProps: any; // This type will be more specific once we overload the tag.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  memoizedProps: any; // The props used to create the output.

  // A queue of state updates and callbacks.
  // updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  memoizedState: any;

  // Dependencies (contexts, events) for this fiber, if it has any
  dependencies: Dependencies | null;

  // // Bitfield that describes properties about the fiber and its subtree. E.g.
  // // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // // default. When a fiber is created, it inherits the mode of its
  // // parent. Additional flags can be set at creation time, but after that the
  // // value should remain unchanged throughout the fiber's lifetime, particularly
  // // before its child fibers are created.
  // mode: TypeOfMode
  //
  // // Effect
  // effectTag: SideEffectTag

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null;

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null;
  lastEffect: Fiber | null;

  // Represents a time in the future by which this work should be completed.
  // Does not include work found in its subtree.
  expirationTime: ExpirationTime;

  // This is used to quickly determine if a subtree has no pending changes.
  childExpirationTime: ExpirationTime;

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null;

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number;

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number;

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number;

  // Sum of base times for all descendants of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number;

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number;
  _debugSource?: Source | null;
  _debugOwner?: Fiber | null;
  _debugIsCurrentlyTiming?: boolean;
  _debugNeedsRemount?: boolean;

  // Used to verify that the order of hooks does not change between renders.
  _debugHookTypes?: HookType[] | null;
};

export function getReactFiberFromNode(elm: Node | undefined): Fiber | null {
  if (!elm) {
    return null;
  }

  for (const k in elm) {
    // React 16 uses "__reactInternalInstance$" prefix
    // React 17 uses "__reactFiber$" prefix
    // https://github.com/facebook/react/pull/18377
    if (k.indexOf('__reactInternalInstance$') === 0 || k.indexOf('__reactFiber$') === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return elm[k];
    }
  }

  throw new Error('getReactFiber(): Failed to find a React Fiber on a node');
}
