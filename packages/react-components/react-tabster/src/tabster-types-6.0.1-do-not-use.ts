/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * WARNING! ATTENTION! WARNING! ATTENTION! WARNING! ATTENTION!
 * WARNING! ATTENTION! WARNING! ATTENTION! WARNING! ATTENTION!
 *
 * Do not use anything from this file. It is a snapshot of the older Tabster typings exposed by a mistake.
 * The exposed typings should have been removed, but we don't do it in minor versions to avoid breaking changes.
 * Everything reexported from this file as react-tabster/TabsterTypes is marked as deprecated and shouldn't
 * be used anywhre.
 *
 * WARNING! ATTENTION! WARNING! ATTENTION! WARNING! ATTENTION!
 * WARNING! ATTENTION! WARNING! ATTENTION! WARNING! ATTENTION!
 */

export const TabsterAttributeName = 'data-tabster';
export const TabsterDummyInputAttributeName = 'data-tabster-dummy';
export const DeloserEventName = 'tabster:deloser';
export const ModalizerActiveEventName = 'tabster:modalizer:active';
export const ModalizerInactiveEventName = 'tabster:modalizer:inactive';
export const ModalizerFocusInEventName = 'tabster:modalizer:focusin';
export const ModalizerFocusOutEventName = 'tabster:modalizer:focusout';
export const ModalizerBeforeFocusOutEventName = 'tabster:modalizer:beforefocusout';
export const MoverEventName = 'tabster:mover';
export const FocusInEventName = 'tabster:focusin';
export const FocusOutEventName = 'tabster:focusout';

// Event to be triggered when Tabster wants to move focus as the result of
// keyboard event. This allows to preventDefault() if you want to have
// some custom logic.
export const MoveFocusEventName = 'tabster:movefocus';

// Event that can be triggered by the application to programmatically move
// focus inside Mover.
export const MoverMoveFocusEventName = 'tabster:mover:movefocus';
// Event that can be triggered by the application to programmatically enter
// or escape Groupper.
export const GroupperMoveFocusEventName = 'tabster:groupper:movefocus';

export const FocusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]',
  '*[contenteditable]',
].join(', ');

// Trigger move focus event on a Mover element.
export type MoverMoveFocusEvent = CustomEvent<{ key: MoverKey } | undefined>;

export interface GroupperMoveFocusActions {
  Enter: 1;
  Escape: 2;
}
export type GroupperMoveFocusAction = GroupperMoveFocusActions[keyof GroupperMoveFocusActions];
export const GroupperMoveFocusActions: GroupperMoveFocusActions = {
  Enter: 1,
  Escape: 2,
};

// Enter or escape Groupper. Enter when `enter` is true, escape when `enter` is false.
export type GroupperMoveFocusEvent = CustomEvent<{ action: GroupperMoveFocusAction } | undefined>;

export type TabsterEventWithDetails<D> = CustomEvent<D | undefined>;

export interface TabsterMoveFocusEventDetails {
  by: 'mover' | 'groupper' | 'modalizer' | 'root';
  owner: HTMLElement; // Mover, Groupper, Modalizer or Root, the initiator.
  next: HTMLElement | null; // Next element to focus or null if Tabster wants to go outside of Root (i.e. to the address bar of the browser).
  relatedEvent?: KeyboardEvent; // The original keyboard event that triggered the move.
}

export type TabsterMoveFocusEvent = TabsterEventWithDetails<TabsterMoveFocusEventDetails>;

export interface TabsterDOMAttribute {
  [TabsterAttributeName]: string | undefined;
}

export interface TabsterCoreProps {
  autoRoot?: RootProps;
  /**
   * Allows all tab key presses under the tabster root to be controlled by tabster
   * @default true
   */
  controlTab?: boolean;
  /**
   * When controlTab is false, Root doesn't have dummy inputs by default.
   * This option allows to enable dummy inputs on Root.
   */
  rootDummyInputs?: boolean;
  /**
   * A callback that will be called for the uncontrolled areas when Tabster wants
   * to know is the uncontrolled element wants complete control (for example it
   * is trapping focus) and Tabster should not interfere with handling Tab.
   * If the callback returns undefined, then the default behaviour is to return
   * the uncontrolled.completely value from the element. If the callback returns
   * non-undefined value, the callback's value will dominate the element's
   * uncontrolled.completely value.
   */
  checkUncontrolledCompletely?: (
    element: HTMLElement,
    completely: boolean, // A uncontrolled.completely value from the element.
  ) => boolean | undefined;
  /**
   * @deprecated use checkUncontrolledCompletely.
   */
  checkUncontrolledTrappingFocus?: (element: HTMLElement) => boolean;
  /**
   * Custom getter for parent elements. Defaults to the default .parentElement call
   * Currently only used to detect tabster contexts
   */
  getParent?(el: Node): Node | null;
  /**
   * Ability to redefine all DOM API calls used by Tabster. For example, for
   * ShadowDOM support.
   */
  DOMAPI?: Partial<DOMAPI>;
}

export interface DOMAPI {
  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
  // eslint-disable-next-line no-restricted-globals
  createMutationObserver: (callback: MutationCallback) => MutationObserver;
  createTreeWalker(doc: Document, root: Node, whatToShow?: number, filter?: NodeFilter | null): TreeWalker;
  getParentNode(node: Node | null | undefined): ParentNode | null;
  getParentElement(element: HTMLElement | null | undefined): HTMLElement | null;
  nodeContains(parent: Node | null | undefined, child: Node | null | undefined): boolean;
  getActiveElement(doc: Document): Element | null;
  querySelector(element: ParentNode, selector: string): Element | null;
  querySelectorAll(element: ParentNode, selector: string): Element[];
  getElementById(doc: Document, id: string): HTMLElement | null;
  getFirstChild(node: Node | null | undefined): ChildNode | null;
  getLastChild(node: Node | null | undefined): ChildNode | null;
  getNextSibling(node: Node | null | undefined): ChildNode | null;
  getPreviousSibling(node: Node | null | undefined): ChildNode | null;
  getFirstElementChild(element: Element | null | undefined): Element | null;
  getLastElementChild(element: Element | null | undefined): Element | null;
  getNextElementSibling(element: Element | null | undefined): Element | null;
  getPreviousElementSibling(element: Element | null | undefined): Element | null;
  appendChild(parent: Node, child: Node): Node;
  insertBefore(parent: Node, child: Node, referenceChild: Node | null): Node;
  getSelection(ref: Node): Selection | null;
}

export type GetTabster = () => TabsterCore;
export type GetWindow = () => Window;

export type SubscribableCallback<A, B = undefined> = (val: A, details: B) => void;

export interface Disposable {
  /** @internal */
  dispose(): void;
}

export interface Subscribable<A, B = undefined> {
  subscribe(callback: SubscribableCallback<A, B>): void;
  /** @internal */
  subscribeFirst(callback: SubscribableCallback<A, B>): void;
  unsubscribe(callback: SubscribableCallback<A, B>): void;
}

export interface KeyboardNavigationState extends Subscribable<boolean>, Disposable {
  isNavigatingWithKeyboard(): boolean;
  setNavigatingWithKeyboard(isNavigatingWithKeyboard: boolean): void;
}

export interface FocusedElementDetails {
  relatedTarget?: HTMLElement;
  isFocusedProgrammatically?: boolean;
  modalizerId?: string;
}

export interface FocusedElementState extends Subscribable<HTMLElement | undefined, FocusedElementDetails>, Disposable {
  getFocusedElement(): HTMLElement | undefined;
  getLastFocusedElement(): HTMLElement | undefined;
  focus(element: HTMLElement, noFocusedProgrammaticallyFlag?: boolean, noAccessibleCheck?: boolean): boolean;
  focusDefault(container: HTMLElement): boolean;
  /** @internal */
  getFirstOrLastTabbable(
    isFirst: boolean,
    props: Pick<FindFocusableProps, 'container' | 'ignoreAccessibility'>,
  ): HTMLElement | undefined;
  focusFirst(props: FindFirstProps): boolean;
  focusLast(props: FindFirstProps): boolean;
  resetFocus(container: HTMLElement): boolean;
}

export interface WeakHTMLElement<D = undefined> {
  get(): HTMLElement | undefined;
  getData(): D | undefined;
}

export interface TabsterPart<P> {
  readonly id: string;
  getElement(): HTMLElement | undefined;
  getProps(): P;
  setProps(props: P): void;
}

export interface TabsterPartWithFindNextTabbable {
  findNextTabbable(
    current?: HTMLElement,
    reference?: HTMLElement,
    isBackward?: boolean,
    ignoreAccessibility?: boolean,
  ): NextTabbable | null;
}

export interface TabsterPartWithAcceptElement {
  acceptElement(element: HTMLElement, state: FocusableAcceptElementState): number | undefined;
}

export interface ObservedElementProps {
  names: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export interface ObservedElementDetails extends ObservedElementProps {
  accessibility?: ObservedElementAccesibility;
}

export interface ObservedElementAccesibilities {
  Any: 0;
  Accessible: 1;
  Focusable: 2;
}
export type ObservedElementAccesibility = ObservedElementAccesibilities[keyof ObservedElementAccesibilities];
export const ObservedElementAccesibilities: ObservedElementAccesibilities = {
  Any: 0,
  Accessible: 1,
  Focusable: 2,
};

export interface ObservedElementAsyncRequest<T> {
  result: Promise<T>;
  cancel(): void;
}

interface ObservedElementAPIInternal {
  /** @internal */
  onObservedElementUpdate(element: HTMLElement): void;
}

export interface ObservedElementAPI
  extends Subscribable<HTMLElement, ObservedElementDetails>,
    Disposable,
    ObservedElementAPIInternal {
  getElement(observedName: string, accessibility?: ObservedElementAccesibility): HTMLElement | null;
  waitElement(
    observedName: string,
    timeout: number,
    accessibility?: ObservedElementAccesibility,
  ): ObservedElementAsyncRequest<HTMLElement | null>;
  requestFocus(observedName: string, timeout: number): ObservedElementAsyncRequest<boolean>;
}

export interface CrossOriginElement {
  readonly uid: string;
  readonly ownerId: string;
  readonly id?: string;
  readonly rootId?: string;
  readonly observedName?: string;
  readonly observedDetails?: string;
  focus(noFocusedProgrammaticallyFlag?: boolean, noAccessibleCheck?: boolean): Promise<boolean>;
}

export interface CrossOriginSentTo {
  [id: string]: true;
}

export interface CrossOriginTransactionTypes {
  Bootstrap: 1;
  FocusElement: 2;
  State: 3;
  GetElement: 4;
  RestoreFocusInDeloser: 5;
  Ping: 6;
}
export type CrossOriginTransactionType = CrossOriginTransactionTypes[keyof CrossOriginTransactionTypes];

export interface CrossOriginTransactionData<I, O> {
  transaction: string;
  type: CrossOriginTransactionType;
  isResponse: boolean;
  timestamp: number;
  owner: string;
  sentto: CrossOriginSentTo;
  timeout?: number;
  target?: string;
  beginData?: I;
  endData?: O;
}

export type CrossOriginTransactionSend = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: CrossOriginTransactionData<any, any>,
) => void;

export interface CrossOriginMessage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: CrossOriginTransactionData<any, any>;
  send: CrossOriginTransactionSend;
}

export interface CrossOriginFocusedElementState
  extends Subscribable<CrossOriginElement | undefined, FocusedElementDetails>,
    Disposable {
  focus(
    element: CrossOriginElement,
    noFocusedProgrammaticallyFlag?: boolean,
    noAccessibleCheck?: boolean,
  ): Promise<boolean>;
  focusById(
    elementId: string,
    rootId?: string,
    noFocusedProgrammaticallyFlag?: boolean,
    noAccessibleCheck?: boolean,
  ): Promise<boolean>;
  focusByObservedName(
    observedName: string,
    timeout?: number,
    rootId?: string,
    noFocusedProgrammaticallyFlag?: boolean,
    noAccessibleCheck?: boolean,
  ): Promise<boolean>;
}

export interface CrossOriginObservedElementState
  extends Subscribable<CrossOriginElement, ObservedElementProps>,
    Disposable {
  getElement(observedName: string, accessibility?: ObservedElementAccesibility): Promise<CrossOriginElement | null>;
  waitElement(
    observedName: string,
    timeout: number,
    accessibility?: ObservedElementAccesibility,
  ): Promise<CrossOriginElement | null>;
  requestFocus(observedName: string, timeout: number): Promise<boolean>;
}

export interface CrossOriginAPI {
  focusedElement: CrossOriginFocusedElementState;
  observedElement: CrossOriginObservedElementState;

  setup(sendUp?: CrossOriginTransactionSend | null): (msg: CrossOriginMessage) => void;
  isSetUp(): boolean;
  dispose(): void;
}

export interface OutlineProps {
  areaClass: string;
  outlineClass: string;
  outlineColor: string;
  outlineWidth: number;
  zIndex: number;
}

export interface OutlinedElementProps {
  isIgnored?: boolean;
}

export interface OutlineAPI extends Disposable {
  setup(props?: Partial<OutlineProps>): void;
}

export interface DeloserElementActions {
  focusDefault: () => boolean;
  focusFirst: () => boolean;
  resetFocus: () => boolean;
  clearHistory: (preserveExisting?: boolean) => void;
  setSnapshot: (index: number) => void;
  isActive: () => boolean;
}

export interface RestoreFocusOrders {
  History: 0;
  DeloserDefault: 1;
  RootDefault: 2;
  DeloserFirst: 3;
  RootFirst: 4;
}
export type RestoreFocusOrder = RestoreFocusOrders[keyof RestoreFocusOrders];
export const RestoreFocusOrders: RestoreFocusOrders = {
  History: 0,
  DeloserDefault: 1,
  RootDefault: 2,
  DeloserFirst: 3,
  RootFirst: 4,
};

export interface DeloserProps {
  restoreFocusOrder?: RestoreFocusOrder;
  noSelectorCheck?: boolean;
}

export interface Deloser extends TabsterPart<DeloserProps> {
  readonly uid: string;
  dispose(): void;
  isActive(): boolean;
  setActive(active: boolean): void;
  getActions(): DeloserElementActions;
  setSnapshot(index: number): void;
  focusFirst(): boolean;
  unshift(element: HTMLElement): void;
  focusDefault(): boolean;
  resetFocus(): boolean;
  findAvailable(): HTMLElement | null;
  clearHistory(preserveExisting?: boolean): void;
  customFocusLostHandler(element: HTMLElement): boolean;
}

export type DeloserConstructor = (element: HTMLElement, props: DeloserProps) => Deloser;

interface DeloserInterfaceInternal {
  /** @internal */
  createDeloser(element: HTMLElement, props: DeloserProps): Deloser;
}

export interface DeloserAPI extends DeloserInterfaceInternal, Disposable {
  getActions(element: HTMLElement): DeloserElementActions | undefined;
  pause(): void;
  resume(restore?: boolean): void;
}

export interface FocusableProps {
  isDefault?: boolean;
  isIgnored?: boolean;
  /**
   * Do not determine an element's focusability based on aria-disabled.
   */
  ignoreAriaDisabled?: boolean;
  /**
   * Exclude element (and all subelements) from Mover navigation.
   */
  excludeFromMover?: boolean;
  /**
   * Prevents tabster from handling the keydown event
   */
  ignoreKeydown?: {
    Tab?: boolean;
    Escape?: boolean;
    Enter?: boolean;
    ArrowUp?: boolean;
    ArrowDown?: boolean;
    ArrowLeft?: boolean;
    ArrowRight?: boolean;
    PageUp?: boolean;
    PageDown?: boolean;
    Home?: boolean;
    End?: boolean;
  };
}

export interface FocusableAcceptElementState {
  container: HTMLElement;
  modalizerUserId?: string;
  currentCtx?: TabsterContext;
  from: HTMLElement;
  fromCtx?: TabsterContext;
  isBackward?: boolean;
  found?: boolean;
  foundElement?: HTMLElement;
  foundBackward?: HTMLElement;
  rejectElementsFrom?: HTMLElement;
  uncontrolled?: HTMLElement;
  acceptCondition: (el: HTMLElement) => boolean;
  hasCustomCondition?: boolean;
  includeProgrammaticallyFocusable?: boolean;
  ignoreAccessibility?: boolean;
  cachedGrouppers: {
    [id: string]: {
      isActive: boolean | undefined;
      first?: HTMLElement | null;
    };
  };
  isFindAll?: boolean;
  /**
   * A flag that indicates that some focusable elements were skipped
   * during the search and the found element is not the one the browser
   * would normally focus if the user pressed Tab.
   */
  skippedFocusable?: boolean;
}

export interface FindFocusableProps {
  /**
   * The container used for the search.
   */
  container: HTMLElement;
  /**
   * The elemet to start from.
   */
  currentElement?: HTMLElement;
  /**
   * See `referenceElement` of GetTabsterContextOptions for description.
   */
  referenceElement?: HTMLElement;
  /**
   * Includes elements that can be focused programmatically.
   */
  includeProgrammaticallyFocusable?: boolean;
  /**
   * Ignore accessibility check.
   */
  ignoreAccessibility?: boolean;
  /**
   * Take active modalizer into account when searching for elements
   * (the elements out of active modalizer will not be returned).
   */
  useActiveModalizer?: boolean;
  /**
   * Search withing the specified modality, null for everything outside of modalizers, string within
   * a specific id, undefined for search within the current application state.
   */
  modalizerId?: string | null;
  /**
   * If true, find previous element instead of the next one.
   */
  isBackward?: boolean;
  /**
   * @param el - element visited.
   * @returns if an element should be accepted.
   */
  acceptCondition?(el: HTMLElement): boolean;
  /**
   * A callback that will be called for every focusable element found during findAll().
   * If false is returned from this callback, the search will stop.
   */
  onElement?: FindElementCallback;
}

export interface FindFocusableOutputProps {
  /**
   * An output parameter. Will be true after the findNext/findPrev() call if some focusable
   * elements were skipped during the search and the result element not immediately next
   * focusable after the currentElement.
   */
  outOfDOMOrder?: boolean;
  /**
   * An output parameter. Will be true if the found element is uncontrolled.
   */
  uncontrolled?: HTMLElement | null;
}

export type FindFirstProps = Pick<
  FindFocusableProps,
  'container' | 'modalizerId' | 'includeProgrammaticallyFocusable' | 'useActiveModalizer' | 'ignoreAccessibility'
>;

export type FindNextProps = Pick<
  FindFocusableProps,
  | 'currentElement'
  | 'referenceElement'
  | 'container'
  | 'modalizerId'
  | 'includeProgrammaticallyFocusable'
  | 'useActiveModalizer'
  | 'ignoreAccessibility'
>;

export type FindDefaultProps = Pick<
  FindFocusableProps,
  'container' | 'modalizerId' | 'includeProgrammaticallyFocusable' | 'useActiveModalizer' | 'ignoreAccessibility'
>;

export type FindAllProps = Pick<
  FindFocusableProps,
  | 'container'
  | 'modalizerId'
  | 'currentElement'
  | 'isBackward'
  | 'includeProgrammaticallyFocusable'
  | 'useActiveModalizer'
  | 'acceptCondition'
  | 'ignoreAccessibility'
  | 'onElement'
>;

/**
 * A callback that is called for every found element during search. Returning false stops search.
 */
export type FindElementCallback = (element: HTMLElement) => boolean;

export interface FocusableAPI extends Disposable {
  getProps(element: HTMLElement): FocusableProps;

  isFocusable(
    element: HTMLElement,
    includeProgrammaticallyFocusable?: boolean,
    noVisibleCheck?: boolean,
    noAccessibleCheck?: boolean,
  ): boolean;
  isVisible(element: HTMLElement): boolean;
  isAccessible(element: HTMLElement): boolean;
  // find* return null when there is no element and undefined when there is an uncontrolled area.
  findFirst(options: FindFirstProps, out?: FindFocusableOutputProps): HTMLElement | null | undefined;
  findLast(options: FindFirstProps, out?: FindFocusableOutputProps): HTMLElement | null | undefined;
  findNext(options: FindNextProps, out?: FindFocusableOutputProps): HTMLElement | null | undefined;
  findPrev(options: FindNextProps, out?: FindFocusableOutputProps): HTMLElement | null | undefined;
  findDefault(options: FindDefaultProps, out?: FindFocusableOutputProps): HTMLElement | null;
  /**
   * @returns All focusables in a given context that satisfy an given condition
   */
  findAll(options: FindAllProps): HTMLElement[];
  findElement(options: FindFocusableProps, out?: FindFocusableOutputProps): HTMLElement | null | undefined;
}

export interface DummyInputManager {
  moveOut: (backwards: boolean) => void;
  moveOutWithDefaultAction: (backwards: boolean, relatedEvent: KeyboardEvent) => void;
}

export interface Visibilities {
  Invisible: 0;
  PartiallyVisible: 1;
  Visible: 2;
}
export const Visibilities: Visibilities = {
  Invisible: 0,
  PartiallyVisible: 1,
  Visible: 2,
};
export type Visibility = Visibilities[keyof Visibilities];

export interface MoverElementState {
  isCurrent: boolean | undefined; // Tri-state bool. Undefined when there is no current in the container.
  visibility: Visibility;
}

export interface MoverDirections {
  Both: 0; // Default, both left/up keys move to the previous, right/down move to the next.
  Vertical: 1; // Only up/down arrows move to the next/previous.
  Horizontal: 2; // Only left/right arrows move to the next/previous.
  Grid: 3; // Two-dimentional movement depending on the visual placement.
  GridLinear: 4; // Two-dimentional movement depending on the visual placement. Allows linear movement.
}

export const RestorerTypes = {
  Source: 0,
  Target: 1,
} as const;

export type RestorerType = (typeof RestorerTypes)[keyof typeof RestorerTypes];

export const MoverDirections: MoverDirections = {
  Both: 0,
  Vertical: 1,
  Horizontal: 2,
  Grid: 3,
  GridLinear: 4,
};
export type MoverDirection = MoverDirections[keyof MoverDirections];

export type NextTabbable = {
  element: HTMLElement | null | undefined;
  uncontrolled?: HTMLElement | null;
  outOfDOMOrder?: boolean;
};

export interface MoverProps {
  direction?: MoverDirection;
  memorizeCurrent?: boolean;
  tabbable?: boolean;
  /**
   * Whether to allow cyclic navigation in the mover
   * Can only be applied if navigationType is MoverKeys.Arrows
   *
   * @defaultValue false
   */
  cyclic?: boolean;
  /**
   * In case we need a rich state of the elements inside a Mover,
   * we can track it. It takes extra resourses and might affect
   * performance when a Mover has many elements inside, so make sure
   * you use this prop when it is really needed.
   */
  trackState?: boolean;
  /**
   * When set to Visibility.Visible or Visibility.PartiallyVisible,
   * uses the visibility part of the trackState prop to be able to
   * go to first/last visible element (instead of first/last focusable
   * element in DOM) when tabbing from outside of the mover.
   */
  visibilityAware?: Visibility;
  /**
   * When true, Mover will try to locate a focusable with Focusable.isDefault
   * property as a prioritized element to focus. True by default.
   */
  hasDefault?: boolean;
  /**
   * A value between 0 and 1 that specifies the tolerance allowed
   * when testing for visibility.
   *
   * @example
   * an element of height 100px has 10px that are above the viewport
   * hidden by scroll. This element is a valid visible element to focus.
   *
   * @default 0.8
   */
  visibilityTolerance?: number;
}

export type MoverEvent = TabsterEventWithDetails<MoverElementState>;

export interface Mover extends TabsterPart<MoverProps>, TabsterPartWithFindNextTabbable, TabsterPartWithAcceptElement {
  readonly id: string;
  readonly dummyManager: DummyInputManager | undefined;
  readonly visibilityTolerance: NonNullable<MoverProps['visibilityTolerance']>;
  dispose(): void;
  setCurrent(element: HTMLElement | undefined): void;
  getCurrent(): HTMLElement | null;
  getState(element: HTMLElement): MoverElementState | undefined;
}

export type MoverConstructor = (tabster: TabsterCore, element: HTMLElement, props: MoverProps) => Mover;

interface MoverAPIInternal {
  /** @internal */
  createMover(element: HTMLElement, props: MoverProps, sys: SysProps | undefined): Mover;
}

export interface MoverKeys {
  ArrowUp: 1;
  ArrowDown: 2;
  ArrowLeft: 3;
  ArrowRight: 4;
  PageUp: 5;
  PageDown: 6;
  Home: 7;
  End: 8;
}
export type MoverKey = MoverKeys[keyof MoverKeys];
export const MoverKeys: MoverKeys = {
  ArrowUp: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
  ArrowRight: 4,
  PageUp: 5,
  PageDown: 6,
  Home: 7,
  End: 8,
};

export interface MoverAPI extends MoverAPIInternal, Disposable {
  /** @internal (will likely be exposed once the API is fully stable) */
  moveFocus(fromElement: HTMLElement, key: MoverKey): HTMLElement | null;
}

export interface GroupperTabbabilities {
  Unlimited: 0;
  Limited: 1; // The tabbability is limited to the container and explicit Enter is needed to go inside.
  LimitedTrapFocus: 2; // The focus is limited as above, plus trapped when inside.
}
export const GroupperTabbabilities: GroupperTabbabilities = {
  Unlimited: 0,
  Limited: 1,
  LimitedTrapFocus: 2,
};
export type GroupperTabbability = GroupperTabbabilities[keyof GroupperTabbabilities];

export interface GroupperProps {
  tabbability?: GroupperTabbability;
  delegated?: boolean; // This allows to tweak the groupper behaviour for the cases when
  // the groupper container is not focusable and groupper has Limited or LimitedTrapFocus
  // tabbability. By default, the groupper will automatically become active once the focus
  // goes to first focusable element inside the groupper during tabbing. When true, the
  // groupper will become active only after Enter is pressed on first focusable element
  // inside the groupper.
}

export interface Groupper
  extends TabsterPart<GroupperProps>,
    TabsterPartWithFindNextTabbable,
    TabsterPartWithAcceptElement {
  readonly id: string;
  readonly dummyManager: DummyInputManager | undefined;
  dispose(): void;
  makeTabbable(isUnlimited: boolean): void;
  isActive(noIfFirstIsFocused?: boolean): boolean | undefined; // Tri-state boolean, undefined when parent is not active, false when parent is active.
  setFirst(element: HTMLElement | undefined): void;
  getFirst(orContainer: boolean): HTMLElement | undefined;
}

export type GroupperConstructor = (tabster: TabsterCore, element: HTMLElement, props: GroupperProps) => Groupper;

export interface GroupperAPIInternal {
  /** @internal */
  createGroupper(element: HTMLElement, props: GroupperProps, sys: SysProps | undefined): Groupper;
  /** @internal */
  handleKeyPress(element: HTMLElement, event: KeyboardEvent, fromModalizer?: boolean): void;
}

export interface GroupperAPI extends GroupperAPIInternal, Disposable {
  /** @internal (will likely be exposed once the API is fully stable) */
  moveFocus(element: HTMLElement, action: GroupperMoveFocusAction): HTMLElement | null;
}

export interface GroupperAPIInternal {
  forgetCurrentGrouppers(): void;
}

export interface ModalizerProps {
  id: string;
  isOthersAccessible?: boolean;
  isAlwaysAccessible?: boolean;
  isNoFocusFirst?: boolean;
  isNoFocusDefault?: boolean;
  /** A focus trap variant, keeps focus inside the modal when tabbing */
  isTrapped?: boolean;
}

export type ModalizerEventName =
  | typeof ModalizerActiveEventName
  | typeof ModalizerInactiveEventName
  | typeof ModalizerBeforeFocusOutEventName
  | typeof ModalizerFocusInEventName
  | typeof ModalizerFocusOutEventName;

export type ModalizerEventDetails = {
  id: string;
  element: HTMLElement;
  eventName: ModalizerEventName;
};

export type ModalizerEvent = TabsterEventWithDetails<ModalizerEventDetails>;

export interface Modalizer extends TabsterPart<ModalizerProps>, TabsterPartWithFindNextTabbable {
  readonly userId: string;
  readonly dummyManager: DummyInputManager | undefined;
  /**
   * @returns - Whether the element is inside the modalizer
   */
  contains(element: HTMLElement): boolean;
  dispose(): void;
  isActive(): boolean;
  makeActive(isActive: boolean): void;
  focused(noIncrement?: boolean): number;
  triggerFocusEvent(eventName: ModalizerEventName, allElements: boolean): boolean;
}

export type ModalizerConstructor = (tabster: TabsterCore, element: HTMLElement, props: ModalizerProps) => Modalizer;

export interface RootProps {
  restoreFocusOrder?: RestoreFocusOrder;
}

export interface Root extends TabsterPart<RootProps> {
  /**@internal*/
  addDummyInputs(): void;

  readonly uid: string;
  dispose(): void;
  moveOutWithDefaultAction(backwards: boolean, relatedEvent: KeyboardEvent): void;
}

export type RootConstructor = (tabster: TabsterCore, element: HTMLElement, props: RootProps) => Root;

export interface SysDummyInputsPositions {
  Auto: 0; // Tabster will place dummy inputs depending on the container tag name and on the default behaviour.
  Inside: 1; // Tabster will always place dummy inputs inside the container.
  Outside: 2; // Tabster will always place dummy inputs outside of the container.
}
export const SysDummyInputsPositions: SysDummyInputsPositions = {
  Auto: 0,
  Inside: 1,
  Outside: 2,
};
export type SysDummyInputsPosition = SysDummyInputsPositions[keyof SysDummyInputsPositions];
/**
 * Ability to fine-tune Tabster internal behaviour in rare cases of need.
 * Normally, should not be used. A deep understanding of the intention and the effect
 * is required.
 */
export interface SysProps {
  /**
   * Force dummy input position outside or inside of the element.
   * By default (when undefined), the position is determined dynamically
   * (for example inside for <li> elements and outside for <table> elements,
   * plus a default Groupper/Mover/Modalizer implementation position).
   * Setting to true will force the dummy inputs to be always outside of the element,
   * setting to false will force the dummy inputs to be always inside.
   */
  dummyInputsPosition?: SysDummyInputsPosition;
}

export interface GetTabsterContextOptions {
  /**
   * Should visit **all** element ancestors to verify if `dir='rtl'` is set
   */
  checkRtl?: boolean;
  /**
   * The element to start computing the context from. Useful when dealing
   * with nested structures. For example, if we have an element inside a groupper
   * inside another groupper, the `groupper` prop in this element's contexts will
   * be the inner groupper, but when we pass the inner groupper's parent element
   * as `referenceElement`, the context groupper will be the outer one. Having
   * this option simplifies searching for the next tabbable element in the
   * environment of nested movers and grouppers.
   */
  referenceElement?: HTMLElement;
}

export type TabsterContextMoverGroupper = { isMover: true; mover: Mover } | { isMover: false; groupper: Groupper };

export interface TabsterContext {
  root: Root;
  modalizer?: Modalizer;
  groupper?: Groupper;
  mover?: Mover;
  groupperBeforeMover?: boolean;
  modalizerInGroupper?: Groupper;
  /**
   * Whether `dir='rtl'` is set on an ancestor
   */
  rtl?: boolean;
  excludedFromMover?: boolean;
  uncontrolled?: HTMLElement | null;
  ignoreKeydown: (e: KeyboardEvent) => boolean;
}

export interface RootFocusEventDetails {
  element: HTMLElement;
}

interface RootAPIInternal {
  /**@internal*/
  createRoot(element: HTMLElement, props: RootProps, sys: SysProps | undefined): Root;
  /**@internal*/
  onRoot(root: Root, removed?: boolean): void;
  /**@internal*/
  addDummyInputs(): void;
}

export interface RootAPI extends Disposable, RootAPIInternal {
  eventTarget: EventTarget;
}

export interface UncontrolledAPI {
  isUncontrolledCompletely(element: HTMLElement, completely: boolean): boolean;
}

interface ModalizerAPIInternal extends TabsterPartWithAcceptElement {
  /** @internal */
  activeId: string | undefined; // currently active Modalizer user id.
  /** @internal */
  currentIsOthersAccessible: boolean | undefined; // isOthersAccessible value of the currently active Modalizer.
  /** @internal */
  activeElements: WeakHTMLElement<HTMLElement>[];
  /** @internal */
  createModalizer(element: HTMLElement, props: ModalizerProps, sys: SysProps | undefined): Modalizer;
  /**
   * Sets active modalizers.
   * When active, everything outside of the modalizers with the specific user
   * defined id gets `aria-hidden`.
   *
   * @param userId - user defined identifier or undefined (if nothing is modal).
   */
  /** @internal */
  setActive(modalizer: Modalizer | undefined): void;
  /** @internal */
  hiddenUpdate(): void;
  /** @internal */
  isAugmented(element: HTMLElement): boolean;
}

export interface ModalizerAPI extends ModalizerAPIInternal, Disposable {
  /**
   * Activates a Modalizer and focuses the first or default element within
   *
   * @param elementFromModalizer - An element that belongs to a Modalizer
   * @param noFocusFirst - Do not focus on the first element in the Modalizer
   * @param noFocusDefault - Do not focus the default element in the Modalizre
   */
  focus(elementFromModalizer: HTMLElement, noFocusFirst?: boolean, noFocusDefault?: boolean): boolean;
}

interface RestorerAPIInternal {
  /** @internal */
  createRestorer(element: HTMLElement, props: RestorerProps): Restorer;
}

export interface RestorerAPI extends RestorerAPIInternal, Disposable {}

export interface Restorer extends Disposable, TabsterPart<RestorerProps> {}
/**
 * A signature for the accessibleCheck callback from getModalizer().
 * It is called when active Modalizer sets aria-hidden on elements outsidef of it.
 *
 * @param element - The element that is about to receive aria-hidden.
 * @param activeModalizerElements - The container elements of the active modalizer.
 * @returns true if the element should remain accessible and should not receive
 * aria-hidden.
 */
export type ModalizerElementAccessibleCheck = (
  element: HTMLElement,
  activeModalizerElements?: HTMLElement[],
) => boolean;

export interface UncontrolledProps {
  // Normally, even uncontrolled areas should not be completely uncontrolled
  // to be able to interact with the rest of the application properly.
  // For example, if an uncontrolled area implements something like
  // roving tabindex, it should be uncontrolled inside the area, but it
  // still should be able to be an organic part of the application.
  // However, in some cases, third party component might want to be able
  // to gain full control of the area, for example, if it implements
  // some custom trap focus logic.
  // `completely` indicates that uncontrolled area must gain full control over
  // Tab handling. If not set, Tabster might still handle Tab in the
  // uncontrolled area, when, for example, there is an inactive Modalizer
  // (that needs to be skipped) after the last focusable element of the
  // uncontrolled area.
  // WARNING: Use with caution, as it might break the normal keyboard navigation
  // between the uncontrolled area and the rest of the application.
  completely?: boolean;
}

export interface DeloserOnElement {
  deloser: Deloser;
}

export interface RootOnElement {
  root: Root;
}

export interface ModalizerOnElement {
  modalizer: Modalizer;
}

export interface RestorerOnElement {
  restorer: Restorer;
}

export interface FocusableOnElement {
  focusable: FocusableProps;
}

export interface MoverOnElement {
  mover: Mover;
}

export interface GroupperOnElement {
  groupper: Groupper;
}

export interface UncontrolledOnElement {
  uncontrolled: UncontrolledProps;
}

export interface ObservedOnElement {
  observed: ObservedElementProps;
}

export interface OutlineOnElement {
  outline: OutlinedElementProps;
}

export interface SysOnElement {
  sys: SysProps;
}

export interface RestorerProps {
  type: RestorerType;
}

export type TabsterAttributeProps = Partial<{
  deloser: DeloserProps;
  root: RootProps;
  uncontrolled: UncontrolledProps;
  modalizer: ModalizerProps;
  focusable: FocusableProps;
  groupper: GroupperProps;
  mover: MoverProps;
  observed: ObservedElementProps;
  outline: OutlinedElementProps;
  sys: SysProps;
  restorer: RestorerProps;
}>;

export interface TabsterAttributeOnElement {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  string: string;
  object: TabsterAttributeProps;
}

export interface TabsterAugmentedAttributes {
  [name: string]: string | null;
}

export type TabsterOnElement = Partial<
  RootOnElement &
    DeloserOnElement &
    ModalizerOnElement &
    FocusableOnElement &
    MoverOnElement &
    GroupperOnElement &
    ObservedOnElement &
    OutlineOnElement &
    UncontrolledOnElement &
    SysOnElement &
    RestorerOnElement
>;

export interface OutlineElements {
  container: HTMLDivElement;
  left: HTMLDivElement;
  top: HTMLDivElement;
  right: HTMLDivElement;
  bottom: HTMLDivElement;
}

export interface TabsterElementStorageEntry {
  tabster?: TabsterOnElement;
  attr?: TabsterAttributeOnElement;
  aug?: TabsterAugmentedAttributes;
}

export interface TabsterElementStorage {
  [uid: string]: TabsterElementStorageEntry;
}

export type DisposeFunc = () => void;

export interface InternalAPI {
  stopObserver(): void;
  resumeObserver(syncState: boolean): void;
}

export interface DummyInputObserver {
  add(dummy: HTMLElement, callback: () => void): void;
  remove(dummy: HTMLElement): void;
  dispose(): void;
  domChanged?(parent: HTMLElement): void;
  updatePositions(
    compute: (scrollTopLeftCache: Map<HTMLElement, { scrollTop: number; scrollLeft: number } | null>) => () => void,
  ): void;
}

interface TabsterCoreInternal {
  /** @internal */
  groupper?: GroupperAPI;
  /** @internal */
  mover?: MoverAPI;
  /** @internal */
  outline?: OutlineAPI;
  /** @internal */
  deloser?: DeloserAPI;
  /** @internal */
  modalizer?: ModalizerAPI;
  /** @internal */
  observedElement?: ObservedElementAPI;
  /** @internal */
  crossOrigin?: CrossOriginAPI;
  /** @internal */
  internal: InternalAPI;
  /** @internal */
  restorer?: RestorerAPI;

  /** @internal */
  _dummyObserver: DummyInputObserver;

  // The version of the tabster package this instance is on
  /** @internal */
  _version: string;

  // No operation flag for the debugging purposes
  /** @internal */
  _noop: boolean;

  /** @internal */
  storageEntry(element: HTMLElement, addremove?: boolean): TabsterElementStorageEntry | undefined;
  /** @internal */
  getWindow: GetWindow;

  /** @internal */
  createTabster(noRefCount?: boolean, props?: TabsterCoreProps): Tabster;
  /** @internal */
  disposeTabster(wrapper: Tabster, allInstances?: boolean): void;
  /** @internal */
  forceCleanup(): void;

  /** @internal */
  queueInit(callback: () => void): void;
  /** @internal */
  drainInitQueue(): void;
  /** @internal */
  getParent: (el: Node) => Node | null;
}

export interface Tabster {
  keyboardNavigation: KeyboardNavigationState;
  focusedElement: FocusedElementState;
  focusable: FocusableAPI;
  root: RootAPI;
  uncontrolled: UncontrolledAPI;

  /** @internal */
  core: TabsterCore;
}

export interface TabsterCore
  extends Pick<TabsterCoreProps, 'controlTab' | 'rootDummyInputs'>,
    Disposable,
    TabsterCoreInternal,
    Omit<Tabster, 'core'> {}

export interface TabsterCompat {
  attributeTransform?: <P>(old: P) => TabsterAttributeProps;
}
