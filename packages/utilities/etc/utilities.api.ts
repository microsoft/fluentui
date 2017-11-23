// @public
export function addElementAtIndex < T >(array: T[], index: number, itemToAdd: T): T[];

// @public
export function assertNever(x: never): never;

// @public
export function assign(target: any, ...args: any[]): any;

// @public
class Async {
  constructor(parent?: React.ReactNode, onError?: (e: any) => void);
  // (undocumented)
  protected _logError(e: any): void;
  // (undocumented)
  public cancelAnimationFrame(id: number): void;
  public clearImmediate(id: number): void;
  public clearInterval(id: number): void;
  public clearTimeout(id: number): void;
  public debounce < T extends Function >(func: T, wait?: number, options?: {
      leading?: boolean;
      maxWait?: number;
      trailing?: boolean;
    }): ICancelable<T> & (() => void);
  public dispose(): void;
  // (undocumented)
  public requestAnimationFrame(callback: () => void): number;
  public setImmediate(callback: () => void): number;
  public setInterval(callback: () => void, duration: number): number;
  public setTimeout(callback: () => void, duration: number): number;
  public throttle < T extends Function >(func: T, wait?: number, options?: {
      leading?: boolean;
      trailing?: boolean;
    }): T | (() => void);
}

// @public
export function autobind < T extends Function >(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
  configurable: boolean;
  get(): T;
  // tslint:disable-next-line:no-any
  set(newValue: any): void;
} | void;

// @public
class AutoScroll {
  constructor(element: HTMLElement);
  // (undocumented)
  public dispose(): void;
}

// @public
class BaseComponent<TProps extends IBaseProps, TState = {}> extends React.Component<TProps, TState> {
  constructor(props?: TProps, context?: any);
  protected readonly _async: Async;
  protected readonly _disposables: IDisposable[];
  protected readonly _events: EventGroup;
  protected _resolveRef(refName: string): (ref: React.ReactNode) => React.ReactNode;
  protected _shouldUpdateComponentRef: boolean;
  protected _updateComponentRef(currentProps: IBaseProps | undefined, newProps: IBaseProps = {}): void;
  protected _warnConditionallyRequiredProps(requiredProps: string[], conditionalPropName: string, condition: boolean): void;
  protected _warnDeprecations(deprecationMap: ISettingsMap<TProps>): void;
  protected _warnMutuallyExclusive(mutuallyExclusiveMap: ISettingsMap<TProps>): void;
  public readonly className: string;
  public componentDidMount(): void;
  public componentWillReceiveProps(newProps: TProps, newContext: any): void;
  public componentWillUnmount(): void;
  public static onError: ((errorMessage?: string, ex?: any) => void);
}

// @public
export function createArray < T >(size: number, getItem: (index: number) => T): T[];

// @public
export function css(...args: ICssInput[]): string;

// @public
export function customizable(scope: string,
  fields: string[]): <P, S>(ComposedComponent: new (props: P, ...args: any[]) => React.Component<P, S>) => any;

// @public
class Customizations {
  // (undocumented)
  public static applyScopedSettings(scopeName: string, settings: { [key: string]: any }): void;
  // (undocumented)
  public static applySettings(settings: { [key: string]: any }): void;
  // (undocumented)
  public static getSettings(properties: string[],
      scopeName?: string,
      localSettings: ICustomizations = NO_CUSTOMIZATIONS): any;
  // (undocumented)
  public static observe(onChange: () => void): void;
  // (undocumented)
  public static reset(): void;
  // (undocumented)
  public static unobserve(onChange: () => void): void;
}

// @public
class Customizer extends BaseComponent<ICustomizerProps, ICustomizerContext> {
  constructor(props: ICustomizerProps, context: any);
  // (undocumented)
  public static childContextTypes: {
    customizations: PropTypes.Requireable<{}>;
  }
  // (undocumented)
  public componentWillReceiveProps(newProps: any, newContext: any): void;
  // (undocumented)
  public static contextTypes: {
    customizations: PropTypes.Requireable<{}>;
  }
  // (undocumented)
  public getChildContext(): ICustomizerContext;
  // (undocumented)
  public render(): React.ReactElement<{}>;
}

// WARNING: defaultProps has incomplete type information
// @public
class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
  constructor(props: IDelayedRenderProps);
  // (undocumented)
  public componentDidMount(): void;
  // (undocumented)
  public componentWillUnmount(): void;
  // (undocumented)
  public render(): React.ReactElement<{}> | null;
}

// @public
export function disableBodyScroll(): void;

// @public
export function doesElementContainFocus(element: HTMLElement): boolean;

// @public
export function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents: boolean = true): boolean;

// @public
export function enableBodyScroll(): void;

// @public
class EventGroup {
  public constructor(parent: any);
  public declare(event: string | string[]): void;
  // (undocumented)
  public dispose(): void;
  public static isDeclared(target: any, eventName: string): boolean;
  // (undocumented)
  public static isObserved(target: any, eventName: string): boolean;
  // (undocumented)
  public off(target?: any, eventName?: string, callback?: (args?: any) => void, useCapture?: boolean): void;
  public on(target: any, eventName: string, callback: (args?: any) => void, useCapture?: boolean): void;
  public onAll(target: any, events: { [key: string]: (args?: any) => void; }, useCapture?: boolean): void;
  public static raise(target: any,
      eventName: string,
      // tslint:disable-next-line:no-any
      eventArgs?: any,
      bubbleEvent?: boolean): boolean | undefined;
  // (undocumented)
  public static stopPropagation(event: any): void;
}

// @public
class FabricPerformance {
  public static measure(name: string, func: () => void): void;
  // (undocumented)
  public static reset(): void;
  // (undocumented)
  public static setPeriodicReset(): void;
  // (undocumented)
  public static summary: IPerfSummary;
}

// @public
export function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any;

// @public
export function find < T >(array: T[], cb: (item: T, index: number) => boolean): T | undefined;

// @public
export function findIndex < T >(array: T[], cb: (item: T, index: number) => boolean): number;

// @public
export function findScrollableParent(startingElement: HTMLElement): HTMLElement | null;

// @public
export function fitContentToBounds(options: IFitContentToBoundsOptions): ISize;

// @public
export function flatten < T >(array: (T | T[])[]): T[];

// @public
export function focusFirstChild(rootElement: HTMLElement): boolean;

// @public
export function format(s: string, ...values: any[]): string;

// @public
export function getChildren(parent: HTMLElement, allowVirtualChildren: boolean = true): HTMLElement[];

// @public
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number;

// @public
export function getDocument(rootElement?: HTMLElement): Document | undefined;

// @public
export function getFirstFocusable(rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getId(prefix?: string): string;

// @public
export function getInitials(displayName: string | undefined | null, isRtl: boolean): string;

// @public
export function getLanguage(): string | null;

// @public
export function getLastFocusable(rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getLastTabbable(rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getNativeProps < T >(props: {}, allowedPropNames: string[], excludedPropNames?: string[]): T;

// @public
export function getNextElement(rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean): HTMLElement | null;

// @public
export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement | null;

// @public
export function getPreviousElement(rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  traverseChildren?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean,
  tabbable?: boolean): HTMLElement | null;

// @public
export function getRect(element: HTMLElement | Window | null): IRectangle | undefined;

// @public
export function getResourceUrl(url: string): string;

// @public
export function getRTL(): boolean;

// @public
export function getRTLSafeKeyCode(key: number): number;

// @public
export function getScrollbarWidth(): number;

// @public
export function getVirtualParent(child: HTMLElement): HTMLElement | undefined;

// @public
export function getWindow(rootElement?: HTMLElement): Window | undefined;

// @public
class GlobalSettings {
  // (undocumented)
  public static addChangeListener(cb: IChangeEventCallback): void;
  // (undocumented)
  public static getValue < T >(key: string, defaultValue?: T | (() => T)): T;
  // (undocumented)
  public static removeChangeListener(cb: IChangeEventCallback): void;
  // (undocumented)
  public static setValue < T >(key: string, value: T): T;
}

// @public
export function hasHorizontalOverflow(element: HTMLElement): boolean;

// @public
export function hasOverflow(element: HTMLElement): boolean;

// @public
export function hasVerticalOverflow(element: HTMLElement): boolean;

// @public
export function hoistMethods(destination: any, source: any, exclusions: string[] = REACT_LIFECYCLE_EXCLUSIONS): string[];

// @public
interface IBaseProps {
  // (undocumented)
  componentRef?: (ref: React.ReactNode | null) => (void | React.ReactNode);
}

// @public
interface IChangeDescription {
  // (undocumented)
  key: string;
  // (undocumented)
  oldValue: any;
  // (undocumented)
  value: any;
}

// @public
interface IChangeEventCallback {
  // (undocumented)
  ___id__?: string;
  // (undocumented)
  (changeDescription?: IChangeDescription): void;
}

// @public
interface ICustomizations {
  // (undocumented)
  scopedSettings: {
    __index: {
      [ key: string ]: any
    }
  }
  // (undocumented)
  settings: {
    [ key: string ]: any
  }
}

// @public
interface ICustomizerContext {
  // (undocumented)
  customizations: ICustomizations;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IDeclaredEventsByName {
  // (undocumented)
  [ eventName: string ]: boolean;
}

// @public
interface IDelayedRenderProps extends React.Props<{}> {
  delay?: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IDelayedRenderState {
  isRendered: boolean;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IDictionary {
  // (undocumented)
  [ className: string ]: boolean;
}

// @public
interface IDisposable {
  // (undocumented)
  dispose: () => void;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEventRecord {
  // (undocumented)
  callback: (args?: any) => void;
  // (undocumented)
  elementCallback?: (...args: any[]) => void;
  // (undocumented)
  eventName: string;
  // (undocumented)
  objectCallback?: (args?: any) => void;
  // (undocumented)
  parent: any;
  // (undocumented)
  target: any;
  // (undocumented)
  useCapture: boolean;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEventRecordList {
  // (undocumented)
  [ id: string ]: IEventRecord[] | number;
  // (undocumented)
  count: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEventRecordsByName {
  // (undocumented)
  [ eventName: string ]: IEventRecordList;
}

// @public
interface IFitContentToBoundsOptions {
  boundsSize: ISize;
  contentSize: ISize;
  maxScale?: number;
  mode: FitMode;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IPerfData {
  // (undocumented)
  duration: number;
  // (undocumented)
  timeStamp: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IPerfMeasurement {
  // (undocumented)
  all: IPerfData[];
  // (undocumented)
  count: number;
  // (undocumented)
  totalDuration: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IPerfSummary {
  // (undocumented)
  [ key: string ]: IPerfMeasurement;
}

// @public
interface IPoint {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
}

// @public
interface IRectangle {
  // (undocumented)
  bottom?: number;
  // (undocumented)
  height: number;
  // (undocumented)
  left: number;
  // (undocumented)
  right?: number;
  // (undocumented)
  top: number;
  // (undocumented)
  width: number;
}

// @public
interface IRenderFunction<P> {
  // (undocumented)
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}

// @public
export function isElementFocusSubZone(element?: HTMLElement): boolean;

// @public
export function isElementFocusZone(element?: HTMLElement): boolean;

// @public
export function isElementTabbable(element: HTMLElement, checkTabIndex?: boolean): boolean;

// @public
export function isElementVisible(element: HTMLElement | undefined | null): boolean;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ISerializableObject {
  // (undocumented)
  toString?: () => string;
}

// @public
interface ISize {
  // (undocumented)
  height: number;
  // (undocumented)
  width: number;
}

// @public
enum KeyCodes {
  // (undocumented)
  a = 65,
  // (undocumented)
  backspace = 8,
  // (undocumented)
  comma = 188,
  // (undocumented)
  del = 46,
  // (undocumented)
  down = 40,
  // (undocumented)
  end = 35,
  // (undocumented)
  enter = 13,
  // (undocumented)
  escape = 27,
  // (undocumented)
  home = 36,
  // (undocumented)
  left = 37,
  // (undocumented)
  pageDown = 34,
  // (undocumented)
  pageUp = 33,
  // (undocumented)
  right = 39,
  // (undocumented)
  semicolon = 186,
  // (undocumented)
  space = 32,
  // (undocumented)
  tab = 9,
  // (undocumented)
  up = 38
}

// @public
export function mapEnumByName < T >(theEnum: any,
  callback: (name?: string, value?: string | number) => T | undefined): (T | undefined)[] | undefined;

// @public
export function memoize < T extends Function >(target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<T>): {
    configurable: boolean;
    get(): T;
  };

// @public
export function memoizeFunction < T extends (...args: any[]) => RET_TYPE, RET_TYPE >(cb: T,
  maxCacheSize: number = 100): T;

// @public
export function nullRender(): JSX.Element | null;

// @public
class Rectangle {
  constructor(left: number = 0, right: number = 0, top: number = 0, bottom: number = 0);
  // (undocumented)
  public bottom: number;
  public equals(rect: Rectangle): boolean;
  readonly height: number;
  // (undocumented)
  public left: number;
  // (undocumented)
  public right: number;
  // (undocumented)
  public top: number;
  readonly width: number;
}

// @public
export function removeIndex < T >(array: T[], index: number): T[];

// @public
export function replaceElement < T >(array: T[], newElement: T, index: number): T[];

// @public
export function setBaseUrl(baseUrl: string): void;

// @public
export function setLanguage(language: string, avoidPersisting: boolean = false): void;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function setMemoizeWeakMap(weakMap: any): void;

// @public
export function setRTL(isRTL: boolean, persistSetting: boolean = false): void;

// @public
export function setSSR(isEnabled: boolean): void;

// @public
export function setVirtualParent(child: HTMLElement, parent: HTMLElement): void;

// @public
export function setWarningCallback(warningCallback?: (message: string) => void): void;

// @public
export function shallowCompare < TA, TB >(a: TA, b: TB): boolean;

// @public
export function toMatrix < T >(items: T[], columnCount: number): T[][];

// @public
export function unhoistMethods(source: any, methodNames: string[]): void;

// @public
export function warn(message: string): void;

// @public
export function warnConditionallyRequiredProps < P >(componentName: string,
  props: P,
  requiredProps: string[],
  conditionalPropName: string,
  condition: boolean): void;

// @public
export function warnDeprecations < P >(componentName: string,
  props: P,
  deprecationMap: ISettingsMap<P>): void;

// @public
export function warnMutuallyExclusive < P >(componentName: string,
  props: P,
  exclusiveMap: ISettingsMap<P>): void;

// WARNING: Unsupported export: ICancelable
// WARNING: Unsupported export: ICustomizerProps
// WARNING: Unsupported export: ICssInput
// WARNING: Unsupported export: FitMode
// WARNING: Unsupported export: baseElementEvents
// WARNING: Unsupported export: baseElementProperties
// WARNING: Unsupported export: htmlElementProperties
// WARNING: Unsupported export: anchorProperties
// WARNING: Unsupported export: buttonProperties
// WARNING: Unsupported export: divProperties
// WARNING: Unsupported export: inputProperties
// WARNING: Unsupported export: textAreaProperties
// WARNING: Unsupported export: imageProperties
// WARNING: Unsupported export: DATA_IS_SCROLLABLE_ATTRIBUTE
// WARNING: Unsupported export: ISettingsMap
// (No packageDescription for this package)
