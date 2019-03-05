// @public
export function addDirectionalKeyCode(which: number): void;

// @public
export function addElementAtIndex<T>(array: T[], index: number, itemToAdd: T): T[];

// @public
export function arraysEqual<T>(array1: T[], array2: T[]): boolean;

// @public
export function asAsync<TProps>(options: IAsAsyncOptions<TProps>): React.ComponentType<TProps & {
    asyncPlaceholder?: React.ReactType;
}>;

// @public
export function assertNever(x: never): never;

// @public
export function assign(target: any, ...args: any[]): any;

// @public
class Async {
  constructor(parent?: object, onError?: (e: any) => void);
  // (undocumented)
  protected _logError(e: any): void;
  // (undocumented)
  cancelAnimationFrame(id: number): void;
  clearImmediate(id: number): void;
  clearInterval(id: number): void;
  clearTimeout(id: number): void;
  debounce<T extends Function>(func: T, wait?: number, options?: {
          leading?: boolean;
          maxWait?: number;
          trailing?: boolean;
      }): ICancelable<T> & (() => void);
  dispose(): void;
  // (undocumented)
  requestAnimationFrame(callback: () => void): number;
  setImmediate(callback: () => void): number;
  setInterval(callback: () => void, duration: number): number;
  setTimeout(callback: () => void, duration: number): number;
  throttle<T extends Function>(func: T, wait?: number, options?: {
          leading?: boolean;
          trailing?: boolean;
      }): T | (() => void);
}

// @public @deprecated
export function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
    configurable: boolean;
    get(): T;
    set(newValue: any): void;
} | void;

// @public
class AutoScroll {
  constructor(element: HTMLElement);
  // (undocumented)
  dispose(): void;
}

// @public
class BaseComponent<TProps extends IBaseProps = {}, TState = {}> extends React.Component<TProps, TState> {
  constructor(props: TProps, context?: any);
  protected readonly _async: Async;
  protected readonly _disposables: IDisposable[];
  protected readonly _events: EventGroup;
  // @deprecated
  protected _resolveRef(refName: string): (ref: React.ReactNode) => React.ReactNode;
  protected _skipComponentRefResolution: boolean;
  protected _updateComponentRef(currentProps: IBaseProps, newProps?: IBaseProps): void;
  protected _warnConditionallyRequiredProps(requiredProps: string[], conditionalPropName: string, condition: boolean): void;
  protected _warnDeprecations(deprecationMap: ISettingsMap<TProps>): void;
  protected _warnMutuallyExclusive(mutuallyExclusiveMap: ISettingsMap<TProps>): void;
  readonly className: string;
  componentDidMount(): void;
  componentDidUpdate(prevProps: TProps, prevState: TState): void;
  componentWillUnmount(): void;
  // @deprecated (undocumented)
  static onError: (errorMessage?: string, ex?: any) => void;
}

// @public
export function calculatePrecision(value: number | string): number;

// @public
export function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(): (getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined, styleProps?: TStyleProps) => IProcessedStyleSet<TStyleSet>;

// @public
export function createArray<T>(size: number, getItem: (index: number) => T): T[];

// @public @deprecated (undocumented)
export function createRef<T>(): RefObject<T>;

// @public
export function css(...args: ICssInput[]): string;

// @public (undocumented)
export function customizable(scope: string, fields: string[], concatStyles?: boolean): <P>(ComposedComponent: React.ComponentType<P>) => any;

// @public (undocumented)
class Customizations {
  // (undocumented)
  static applyScopedSettings(scopeName: string, settings: ISettings): void;
  // (undocumented)
  static applySettings(settings: ISettings): void;
  // (undocumented)
  static getSettings(properties: string[], scopeName?: string, localSettings?: ICustomizations): any;
  // (undocumented)
  static observe(onChange: () => void): void;
  // (undocumented)
  static reset(): void;
  // (undocumented)
  static unobserve(onChange: () => void): void;
}

// @public
class Customizer extends BaseComponent<ICustomizerProps> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  render(): React.ReactElement<{}>;
}

// @public
class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
  constructor(props: IDelayedRenderProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: {
    delay: number;
  }
  // (undocumented)
  render(): React.ReactElement<{}> | null;
}

// @public
export function disableBodyScroll(): void;

// @public
export function doesElementContainFocus(element: HTMLElement): boolean;

// @public
export function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents?: boolean): boolean;

// @public
export function elementContainsAttribute(element: HTMLElement, attribute: string): string | null;

// @public
export function enableBodyScroll(): void;

// @public
class EventGroup {
  constructor(parent: any);
  declare(event: string | string[]): void;
  // (undocumented)
  dispose(): void;
  static isDeclared(target: any, eventName: string): boolean;
  // (undocumented)
  static isObserved(target: any, eventName: string): boolean;
  // (undocumented)
  off(target?: any, eventName?: string, callback?: (args?: any) => void, options?: boolean | AddEventListenerOptions): void;
  on(target: any, eventName: string, callback: (args?: any) => void, options?: boolean | AddEventListenerOptions): void;
  onAll(target: any, events: {
          [key: string]: (args?: any) => void;
      }, useCapture?: boolean): void;
  static raise(target: any, eventName: string, eventArgs?: any, bubbleEvent?: boolean): boolean | undefined;
  // (undocumented)
  static stopPropagation(event: any): void;
}

// @public
class FabricPerformance {
  static measure(name: string, func: () => void): void;
  // (undocumented)
  static reset(): void;
  // (undocumented)
  static setPeriodicReset(): void;
  // (undocumented)
  static summary: IPerfSummary;
}

// @public
export function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any;

// @public
export function find<T>(array: T[], cb: (item: T, index: number) => boolean): T | undefined;

// @public
export function findElementRecursive(element: HTMLElement | null, matchFunction: (element: HTMLElement) => boolean): HTMLElement | null;

// @public
export function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean): number;

// @public
export function findScrollableParent(startingElement: HTMLElement | null): HTMLElement | null;

// @public
export function fitContentToBounds(options: IFitContentToBoundsOptions): ISize;

// @public
export function flatten<T>(array: (T | T[])[]): T[];

// @public
export function focusAsync(element: HTMLElement | {
    focus: () => void;
} | undefined | null): void;

// @public
export function focusFirstChild(rootElement: HTMLElement): boolean;

// @public
export function format(s: string, ...values: any[]): string;

// @public
export function getChildren(parent: HTMLElement, allowVirtualChildren?: boolean): HTMLElement[];

// @public
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number;

// @public
export function getDocument(rootElement?: HTMLElement | null): Document | undefined;

// @public
export function getElementIndexPath(fromElement: HTMLElement, toElement: HTMLElement): number[];

// @public
export function getFirstFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getFirstTabbable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getFocusableByIndexPath(parent: HTMLElement, path: number[]): HTMLElement | undefined;

// @public
export function getId(prefix?: string): string;

// @public
export function getInitials(displayName: string | undefined | null, isRtl: boolean, allowPhoneInitials?: boolean): string;

// @public
export function getLanguage(): string | null;

// @public
export function getLastFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getLastTabbable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getNativeProps<T>(props: {}, allowedPropNames: string[], excludedPropNames?: string[]): T;

// @public
export function getNextElement(rootElement: HTMLElement, currentElement: HTMLElement | null, checkNode?: boolean, suppressParentTraversal?: boolean, suppressChildTraversal?: boolean, includeElementsInFocusZones?: boolean, allowFocusRoot?: boolean, tabbable?: boolean): HTMLElement | null;

// @public
export function getParent(child: HTMLElement, allowVirtualParents?: boolean): HTMLElement | null;

// @public
export function getPreviousElement(rootElement: HTMLElement, currentElement: HTMLElement | null, checkNode?: boolean, suppressParentTraversal?: boolean, traverseChildren?: boolean, includeElementsInFocusZones?: boolean, allowFocusRoot?: boolean, tabbable?: boolean): HTMLElement | null;

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
export function getWindow(rootElement?: Element | null): Window | undefined;

// @public
class GlobalSettings {
  // (undocumented)
  static addChangeListener(cb: IChangeEventCallback): void;
  // (undocumented)
  static getValue<T>(key: string, defaultValue?: T | (() => T)): T;
  // (undocumented)
  static removeChangeListener(cb: IChangeEventCallback): void;
  // (undocumented)
  static setValue<T>(key: string, value: T): T;
}

// @public
export function hasHorizontalOverflow(element: HTMLElement): boolean;

// @public
export function hasOverflow(element: HTMLElement): boolean;

// @public
export function hasVerticalOverflow(element: HTMLElement): boolean;

// @public
export function hoistMethods(destination: any, source: any, exclusions?: string[]): string[];

// @public
export function hoistStatics<TSource, TDest>(source: TSource, dest: TDest): TDest;

// @public (undocumented)
interface IAsAsyncOptions<TProps> {
  load: () => Promise<React.ReactType<TProps>>;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

// @public
interface IBaseProps<T = any> {
  // (undocumented)
  componentRef?: IRefObject<T>;
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
  (changeDescription?: IChangeDescription): void;
  // (undocumented)
  __id__?: string;
}

// @public (undocumented)
interface ICustomizableProps {
  fields?: string[];
  scope: string;
}

// @public (undocumented)
interface ICustomizations {
  // (undocumented)
  inCustomizerContext?: boolean;
  // (undocumented)
  scopedSettings: {
    [key: string]: ISettings;
  }
  // (undocumented)
  settings: ISettings;
}

// @public (undocumented)
interface ICustomizerContext {
  // (undocumented)
  customizations: ICustomizations;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IDeclaredEventsByName {
  // (undocumented)
  [eventName: string]: boolean;
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
  [className: string]: boolean;
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
  options?: boolean | AddEventListenerOptions;
  // (undocumented)
  parent: any;
  // (undocumented)
  target: any;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEventRecordList {
  // (undocumented)
  [id: string]: IEventRecord[] | number;
  // (undocumented)
  count: number;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEventRecordsByName {
  // (undocumented)
  [eventName: string]: IEventRecordList;
}

// @public
interface IFitContentToBoundsOptions {
  boundsSize: ISize;
  contentSize: ISize;
  maxScale?: number;
  mode: FitMode;
}

// @public
export function initializeFocusRects(window?: Window): void;

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
  [key: string]: IPerfMeasurement;
}

// @public
interface IPoint {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
}

// @public (undocumented)
interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
  // (undocumented)
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
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
interface IRenderComponent<TProps> {
  children: (props: TProps) => JSX.Element;
}

// @public
interface IRenderFunction<P> {
  // (undocumented)
  (props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}

// @public
export function isDirectionalKeyCode(which: number): boolean;

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

// @public (undocumented)
interface ISize {
  // (undocumented)
  height: number;
  // (undocumented)
  width: number;
}

// @public
export function isMac(reset?: boolean): boolean;

// @public
export function isVirtualElement(element: HTMLElement | IVirtualElement): element is IVirtualElement;

// @public
interface IVirtualElement extends HTMLElement {
  // (undocumented)
  _virtual: {
    children: IVirtualElement[];
    parent?: IVirtualElement;
  }
}

// @public (undocumented)
export function mapEnumByName<T>(theEnum: any, callback: (name?: string, value?: string | number) => T | undefined): (T | undefined)[] | undefined;

// @public
export function memoize<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
    configurable: boolean;
    get(): T;
};

// @public
export function memoizeFunction<T extends (...args: any[]) => RET_TYPE, RET_TYPE>(cb: T, maxCacheSize?: number): T;

// @public
export function merge<T = {}>(target: Partial<T>, ...args: (Partial<T> | null | undefined | false)[]): T;

// @public
export function mergeAriaAttributeValues(...ariaAttributes: (string | undefined)[]): string | undefined;

// @public
export function mergeCustomizations(props: ICustomizerProps, parentContext: ICustomizerContext): ICustomizerContext;

// @public (undocumented)
export function mergeScopedSettings(oldSettings?: ISettings, newSettings?: ISettings | ISettingsFunction): ISettings;

// @public
export function mergeSettings(oldSettings?: ISettings, newSettings?: ISettings | ISettingsFunction): ISettings;

// @public
export function nullRender(): JSX.Element | null;

// @public
export function portalContainsElement(target: HTMLElement, parent?: HTMLElement): boolean;

// @public
export function precisionRound(value: number, precision: number, base?: number): number;

// @public @deprecated (undocumented)
export function provideContext<TContext, TProps>(contextTypes: PropTypes.ValidationMap<TContext>, mapPropsToContext: (props: TProps) => TContext): React.ComponentType<TProps>;

// @public
class Rectangle {
  constructor(left?: number, right?: number, top?: number, bottom?: number);
  // (undocumented)
  bottom: number;
  equals(rect: Rectangle): boolean;
  readonly height: number;
  // (undocumented)
  left: number;
  // (undocumented)
  right: number;
  // (undocumented)
  top: number;
  readonly width: number;
}

// @public
export function removeIndex<T>(array: T[], index: number): T[];

// @public
export function replaceElement<T>(array: T[], newElement: T, index: number): T[];

// @public
export function resetIds(counter?: number): void;

// @public
export function resetMemoizations(): void;

// @public
export function setBaseUrl(baseUrl: string): void;

// @public
export function setLanguage(language: string, avoidPersisting?: boolean): void;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function setMemoizeWeakMap(weakMap: any): void;

// @public
export function setPortalAttribute(element: HTMLElement): void;

// @public
export function setRTL(isRTL: boolean, persistSetting?: boolean): void;

// @public
export function setSSR(isEnabled: boolean): void;

// @public
export function setVirtualParent(child: HTMLElement, parent: HTMLElement): void;

// @public
export function setWarningCallback(warningCallback?: (message: string) => void): void;

// @public
export function shallowCompare<TA, TB>(a: TA, b: TB): boolean;

// @public
export function shouldWrapFocus(element: HTMLElement, noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap'): boolean;

// @public
export function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>, TStyleProps, TStyleSet extends IStyleSet<TStyleSet>>(Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>, baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>, getProps?: (props: TComponentProps) => Partial<TComponentProps>, customizable?: ICustomizableProps): React.StatelessComponent<TComponentProps>;

// @public
export function toMatrix<T>(items: T[], columnCount: number): T[][];

// @public
export function unhoistMethods(source: any, methodNames: string[]): void;

// @public
export function values<T>(obj: any): T[];

// @public
export function warn(message: string): void;

// @public
export function warnConditionallyRequiredProps<P>(componentName: string, props: P, requiredProps: string[], conditionalPropName: string, condition: boolean): void;

// @public
export function warnDeprecations<P>(componentName: string, props: P, deprecationMap: ISettingsMap<P>): void;

// @public
export function warnMutuallyExclusive<P>(componentName: string, props: P, exclusiveMap: ISettingsMap<P>): void;

// WARNING: Unsupported export: IStyleFunctionOrObject
// WARNING: Unsupported export: ICancelable
// WARNING: Unsupported export: IClassNames
// WARNING: Unsupported export: IComponentAsProps
// WARNING: Unsupported export: IComponentAs
// WARNING: Unsupported export: IStyleFunction
// WARNING: Unsupported export: KeyCodes
// WARNING: Unsupported export: KeyCodes
// WARNING: Unsupported export: IRefObject
// WARNING: Unsupported export: RefObject
// WARNING: Unsupported export: ICssInput
// WARNING: Unsupported export: ISettings
// WARNING: Unsupported export: ISettingsFunction
// WARNING: Unsupported export: Settings
// WARNING: Unsupported export: SettingsFunction
// WARNING: Unsupported export: ICustomizerProps
// WARNING: Unsupported export: CustomizerContext
// WARNING: Unsupported export: DATA_PORTAL_ATTRIBUTE
// WARNING: Unsupported export: IsFocusVisibleClassName
// WARNING: Unsupported export: FitMode
// WARNING: Unsupported export: isIOS
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
// WARNING: Unsupported export: allowScrollOnElement
// WARNING: Unsupported export: ISettingsMap
// (No @packagedocumentation comment for this package)
