export function assign(target: any, ...args: any[]): any;

// WARNING: dispose has incomplete type information
// WARNING: clearImmediate has incomplete type information
// WARNING: clearInterval has incomplete type information
// WARNING: cancelAnimationFrame has incomplete type information
// WARNING: _logError has incomplete type information
// (undocumented)
class Async {
  // (undocumented)
  constructor(parent?: any, onError?: (e: any) => void);
  public clearTimeout(id: number): void;
  public debounce < T extends Function >(func: T, wait?: number, options?: {
      leading?: boolean;
      maxWait?: number;
      trailing?: boolean;
    }): T;
  // (undocumented)
  public requestAnimationFrame(callback: () => void): number;
  public setImmediate(callback: () => void): number;
  public setInterval(callback: () => void, duration: number): number;
  public setTimeout(callback: () => void, duration: number): number;
  public throttle < T extends Function >(func: T, wait?: number, options?: {
      leading?: boolean;
      trailing?: boolean;
    }): T;
}

// WARNING: dispose has incomplete type information
class AutoScroll {
  // (undocumented)
  constructor(element: HTMLElement);
}

// WARNING: componentWillReceiveProps has incomplete type information
// WARNING: componentDidMount has incomplete type information
// WARNING: componentWillUnmount has incomplete type information
// WARNING: className has incomplete type information
// WARNING: _updateComponentRef has incomplete type information
// WARNING: _warnDeprecations has incomplete type information
// WARNING: _warnMutuallyExclusive has incomplete type information
// (undocumented)
class BaseComponent<P extends IBaseProps, S> extends React.Component<P, S> {
  constructor(props?: P, context?: any);
  protected readonly _async: Async;
  protected readonly _disposables: IDisposable[];
  protected readonly _events: EventGroup;
  protected _resolveRef(refName: string): (ref: any) => any;
  protected _shouldUpdateComponentRef: boolean;
  public static onError: ((errorMessage?: string, ex?: any) => void);
}

// WARNING: contextTypes has incomplete type information
// WARNING: childContextTypes has incomplete type information
// WARNING: componentWillReceiveProps has incomplete type information
// WARNING: render has incomplete type information
class Customizer extends BaseComponent<ICustomizerProps, ICustomizerState> {
  // (undocumented)
  constructor(props: any, context: any);
  // (undocumented)
  public getChildContext(): any;
}

// WARNING: defaultProps has incomplete type information
// WARNING: componentDidMount has incomplete type information
// WARNING: componentWillUnmount has incomplete type information
// WARNING: render has incomplete type information
class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
  // (undocumented)
  constructor(props: IDelayedRenderProps);
}

export function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents: boolean = true): boolean;

// WARNING: raise has incomplete type information
// WARNING: stopPropagation has incomplete type information
// WARNING: dispose has incomplete type information
// WARNING: onAll has incomplete type information
// WARNING: on has incomplete type information
// WARNING: off has incomplete type information
// WARNING: declare has incomplete type information
class EventGroup {
  public constructor(parent: any);
  public static isDeclared(target: any, eventName: string): boolean;
  // (undocumented)
  public static isObserved(target: any, eventName: string): boolean;
}

// WARNING: measure has incomplete type information
// WARNING: reset has incomplete type information
// (undocumented)
class FabricPerformance {
  // (undocumented)
  public static setPeriodicReset(): void;
  // (undocumented)
  public static summary: IPerfSummary;
}

// (undocumented)
export function findIndex(array: any[], cb: (item: any, index?: number) => boolean): number;

export function findScrollableParent(startingElement: HTMLElement): HTMLElement | null;

export function focusFirstChild(rootElement: HTMLElement): boolean;

export function format(s: string, ...values: any[]): string;

// (undocumented)
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number;

// (undocumented)
export function getFirstFocusable(rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null;

export function getId(prefix?: string): string;

export function getInitials(displayName: string | undefined | null, isRtl: boolean): string;

export function getLanguage(): string | null;

// (undocumented)
export function getLastFocusable(rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null;

export function getNativeProps < T >(props: any, allowedPropNames: string[], excludedPropNames?: string[]): T;

export function getNextElement(rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean): HTMLElement | null;

export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement | null;

export function getPreviousElement(rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  traverseChildren?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean): HTMLElement | null;

export function getRect(element: HTMLElement | Window | null): IRectangle | undefined;

export function getRTL(): boolean;

export function getRTLSafeKeyCode(key: number): number;

export function getScrollbarWidth(): number;

// (undocumented)
export function getVirtualParent(child: HTMLElement): HTMLElement | undefined;

export function hasHorizontalOverflow(element: HTMLElement): boolean;

export function hasOverflow(element: HTMLElement): boolean;

export function hasVerticalOverflow(element: HTMLElement): boolean;

export function hoistMethods(destination: any, source: any, exclusions: string[] = REACT_LIFECYCLE_EXCLUSIONS): string[];

// (undocumented)
interface IBaseProps {
  // (undocumented)
  componentRef?: any;
}

// (undocumented)
interface ICustomizerProps {
  // (undocumented)
  settings: ISettings;
}

// (undocumented)
interface ICustomizerState {
  // (undocumented)
  injectedProps?: ISettings;
}

// (undocumented)
interface IDeclaredEventsByName {
  // (undocumented)
  [ eventName: string ]: boolean;
}

// (undocumented)
interface IDelayedRenderProps extends React.Props<any> {
  delay?: number;
}

// (undocumented)
interface IDelayedRenderState {
  isRendered: boolean;
}

// (undocumented)
interface IDictionary {
  // (undocumented)
  [ className: string ]: boolean;
}

// (undocumented)
interface IDisposable {
  // (undocumented)
  dispose: () => void;
}

// (undocumented)
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

// (undocumented)
interface IEventRecordList {
  // (undocumented)
  [ id: string ]: IEventRecord[] | number;
  // (undocumented)
  count: number;
}

// (undocumented)
interface IEventRecordsByName {
  // (undocumented)
  [ eventName: string ]: IEventRecordList;
}

// (undocumented)
interface IPerfData {
  // (undocumented)
  duration: number;
  // (undocumented)
  timeStamp: number;
}

// (undocumented)
interface IPerfMeasurement {
  // (undocumented)
  all: IPerfData[];
  // (undocumented)
  count: number;
  // (undocumented)
  totalDuration: number;
}

// (undocumented)
interface IPerfSummary {
  // (undocumented)
  [ key: string ]: IPerfMeasurement;
}

// (undocumented)
interface IPoint {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
}

// (undocumented)
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

// (undocumented)
interface IRenderFunction<P> {
  // (undocumented)
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}

// (undocumented)
export function isElementFocusSubZone(element?: HTMLElement): boolean;

// (undocumented)
export function isElementFocusZone(element?: HTMLElement): boolean;

// (undocumented)
export function isElementTabbable(element: HTMLElement): boolean;

// (undocumented)
export function isElementVisible(element: HTMLElement | undefined | null): boolean;

// (undocumented)
interface ISerializableObject {
  // (undocumented)
  toString?: () => string;
}

// (undocumented)
interface ISettings {
  // (undocumented)
  [ key: string ]: any;
}

// (undocumented)
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

export function memoizeFunction < T extends (...args: any[]) => RET_TYPE, RET_TYPE >(cb: T,
  maxCacheSize: number = 100): T;

export function nullRender(): JSX.Element | null;

// (undocumented)
class Rectangle {
  // (undocumented)
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

export function setMemoizeWeakMap(weakMap: any): void;

export function setWarningCallback(warningCallback?: (message: string) => void): void;

export function toMatrix < T >(items: T[], columnCount: number): T[][];

export function unhoistMethods(source: any, methodNames: string[]): void;

export function warn(message: string): void;

export function warnDeprecations < P >(componentName: string,
  props: P,
  deprecationMap: ISettingsMap<P>): void;

export function warnMutuallyExclusive < P >(componentName: string,
  props: P,
  exclusiveMap: ISettingsMap<P>): void;

// WARNING: createArray has incomplete type information
// WARNING: autobind has incomplete type information
// WARNING: Unsupported export: ICssInput
// WARNING: css has incomplete type information
// WARNING: customizable has incomplete type information
// WARNING: setVirtualParent has incomplete type information
// WARNING: setSSR has incomplete type information
// WARNING: getWindow has incomplete type information
// WARNING: getDocument has incomplete type information
// WARNING: doesElementContainFocus has incomplete type information
// WARNING: setLanguage has incomplete type information
// WARNING: shallowCompare has incomplete type information
// WARNING: filteredAssign has incomplete type information
// WARNING: Unsupported export: baseElementEvents
// WARNING: Unsupported export: baseElementProperties
// WARNING: Unsupported export: htmlElementProperties
// WARNING: Unsupported export: anchorProperties
// WARNING: Unsupported export: buttonProperties
// WARNING: Unsupported export: divProperties
// WARNING: Unsupported export: inputProperties
// WARNING: Unsupported export: textAreaProperties
// WARNING: Unsupported export: imageProperties
// WARNING: getResourceUrl has incomplete type information
// WARNING: setBaseUrl has incomplete type information
// WARNING: setRTL has incomplete type information
// WARNING: Unsupported export: DATA_IS_SCROLLABLE_ATTRIBUTE
// WARNING: disableBodyScroll has incomplete type information
// WARNING: enableBodyScroll has incomplete type information
// WARNING: Unsupported export: ISettingsMap
// WARNING: memoize has incomplete type information
// (No packageDescription for this package)
