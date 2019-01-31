// @public (undocumented)
class ActionButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class ActivityItem extends BaseComponent<IActivityItemProps, {}> {
  constructor(props: IActivityItemProps);
  // (undocumented)
  render(): JSX.Element;
}

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

// @public (undocumented)
class Autofill extends BaseComponent<IAutofillProps, IAutofillState>, implements IAutofill {
  constructor(props: IAutofillProps);
  // (undocumented)
  clear(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: IAutofillProps): void;
  // (undocumented)
  readonly cursorLocation: number | null;
  // (undocumented)
  static defaultProps: {
    enableAutofillOnKeyPress: number[];
  }
  // (undocumented)
  focus(): void;
  // (undocumented)
  readonly inputElement: HTMLInputElement | null;
  // (undocumented)
  readonly isValueSelected: boolean;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  readonly selectionEnd: number | null;
  // (undocumented)
  readonly selectionStart: number | null;
  // (undocumented)
  readonly value: string;
}

// @public
class AutoScroll {
  constructor(element: HTMLElement);
  // (undocumented)
  dispose(): void;
}

// @public @deprecated (undocumented)
class BaseAutoFill extends Autofill {
}

// @public (undocumented)
class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState>, implements IButton {
  constructor(props: IBaseButtonProps, rootClassName: string);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IBaseButtonProps, prevState: IBaseButtonState): void;
  // (undocumented)
  static defaultProps: Partial<IBaseButtonProps>;
  // (undocumented)
  dismissMenu(): void;
  // (undocumented)
  focus(): void;
  // (undocumented)
  openMenu(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean): void;
  // (undocumented)
  render(): JSX.Element;
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
  static onError: ((errorMessage?: string, ex?: any) => void);
}

// @public (undocumented)
class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {
}

// @public (undocumented)
class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BaseComponent<P, IBaseExtendedPickerState<T>>, implements IBaseExtendedPicker<T> {
  constructor(basePickerProps: P);
  // (undocumented)
  protected _onSelectedItemsChanged: () => void;
  // (undocumented)
  protected _onSuggestionSelected: (item: T) => void;
  // (undocumented)
  protected canAddItems(): boolean;
  // (undocumented)
  clearInput(): void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: P): void;
  // (undocumented)
  floatingPicker: React.RefObject<BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>>;
  // (undocumented)
  protected floatingPickerProps: IBaseFloatingPickerProps<T>;
  // (undocumented)
  focus(): void;
  // (undocumented)
  readonly highlightedItems: T[];
  // (undocumented)
  protected input: React.RefObject<Autofill>;
  // (undocumented)
  readonly inputElement: HTMLInputElement | null;
  // (undocumented)
  readonly items: any;
  // (undocumented)
  protected onBackspace: (ev: React.KeyboardEvent<HTMLElement>) => void;
  // (undocumented)
  protected onCopy: (ev: React.ClipboardEvent<HTMLElement>) => void;
  // (undocumented)
  protected onInputChange: (value: string) => void;
  // (undocumented)
  protected onInputClick: (ev: React.MouseEvent<HTMLInputElement | Autofill>) => void;
  // (undocumented)
  protected onInputFocus: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
  // (undocumented)
  protected onPaste: (ev: React.ClipboardEvent<HTMLInputElement | Autofill>) => void;
  // (undocumented)
  protected onSelectionChange: () => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  protected renderSelectedItemsList(): JSX.Element;
  // (undocumented)
  protected renderSuggestions(): JSX.Element;
  // (undocumented)
  protected root: React.RefObject<HTMLDivElement>;
  // (undocumented)
  selectedItemsList: React.RefObject<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>;
  // (undocumented)
  protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;
  // (undocumented)
  protected selection: Selection;
}

// @public (undocumented)
class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {
}

// @public (undocumented)
class BaseFloatingPicker<T, P extends IBaseFloatingPickerProps<T>> extends BaseComponent<P, IBaseFloatingPickerState>, implements IBaseFloatingPicker {
  constructor(basePickerProps: P);
  // (undocumented)
  completeSuggestion: () => void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: P): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  protected currentPromise: PromiseLike<any>;
  // (undocumented)
  readonly currentSelectedSuggestionIndex: number;
  // (undocumented)
  forceResolveSuggestion(): void;
  // (undocumented)
  hidePicker: () => void;
  // (undocumented)
  readonly inputText: string;
  // (undocumented)
  readonly isSuggestionsShown: boolean;
  // (undocumented)
  protected onChange(item: T): void;
  // (undocumented)
  protected onKeyDown: (ev: MouseEvent) => void;
  // (undocumented)
  onQueryStringChanged: (queryString: string) => void;
  // (undocumented)
  protected onSelectionChange(): void;
  // (undocumented)
  protected onSuggestionClick: (ev: React.MouseEvent<HTMLElement>, item: T, index: number) => void;
  // (undocumented)
  protected onSuggestionRemove: (ev: React.MouseEvent<HTMLElement>, item: T, index: number) => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  protected renderSuggestions(): JSX.Element | null;
  // (undocumented)
  protected root: React.RefObject<HTMLDivElement>;
  // (undocumented)
  protected selection: Selection;
  // (undocumented)
  showPicker: (updateValue?: boolean) => void;
  // (undocumented)
  readonly suggestions: any[];
  // (undocumented)
  protected suggestionsControl: SuggestionsControl<T>;
  // (undocumented)
  protected SuggestionsControlOfProperType: new (props: ISuggestionsControlProps<T>) => SuggestionsControl<T>;
  // (undocumented)
  protected suggestionStore: SuggestionsStore<T>;
  // (undocumented)
  updateSuggestions(suggestions: T[], forceUpdate?: boolean): void;
  // (undocumented)
  protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>): void;
  // (undocumented)
  protected updateSuggestionWithZeroState(): void;
  // (undocumented)
  protected updateValue(updatedValue: string): void;
}

// @public (undocumented)
class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}

// @public (undocumented)
class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {
}

// @public (undocumented)
class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState>, implements IBasePicker<T> {
  constructor(basePickerProps: P);
  // (undocumented)
  protected _ariaMap: IPickerAriaIds;
  // (undocumented)
  protected _isFocusZoneInnerKeystroke: (ev: React.KeyboardEvent<HTMLElement>) => boolean;
  // (undocumented)
  protected addItem: (item: T) => void;
  // (undocumented)
  protected addItemByIndex: (index: number) => void;
  // (undocumented)
  protected canAddItems(): boolean;
  // (undocumented)
  completeSuggestion(): void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: P): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  componentWillUpdate(newProps: P, newState: IBasePickerState): void;
  // (undocumented)
  protected currentPromise: PromiseLike<any> | undefined;
  // (undocumented)
  dismissSuggestions: (ev?: any) => void;
  // (undocumented)
  focus(): void;
  // (undocumented)
  focusInput(): void;
  // (undocumented)
  protected focusZone: React.RefObject<IFocusZone>;
  // (undocumented)
  protected getActiveDescendant(): string | undefined;
  // (undocumented)
  protected getSuggestionsAlert(suggestionAlertClassName?: string): JSX.Element | undefined;
  // (undocumented)
  protected input: React.RefObject<IAutofill>;
  // (undocumented)
  readonly items: T[];
  // (undocumented)
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
  // (undocumented)
  protected onBlur: (ev: React.FocusEvent<HTMLElement | Autofill>) => void;
  // (undocumented)
  protected onChange(items?: T[]): void;
  // (undocumented)
  protected onEmptyInputFocus(): void;
  // (undocumented)
  protected onGetMoreResults: () => void;
  // (undocumented)
  protected onInputBlur: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
  // (undocumented)
  protected onInputChange: (value: string) => void;
  // (undocumented)
  protected onInputFocus: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
  // (undocumented)
  protected onItemChange: (changedItem: T, index: number) => void;
  // (undocumented)
  protected onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
  // (undocumented)
  protected onSelectionChange(): void;
  // (undocumented)
  protected onSuggestionClick: (ev: React.MouseEvent<HTMLElement>, item: any, index: number) => void;
  // (undocumented)
  protected onSuggestionRemove: (ev: React.MouseEvent<HTMLElement>, item: IPersonaProps, index: number) => void;
  // (undocumented)
  protected onSuggestionSelect(): void;
  // (undocumented)
  refocusSuggestions: (keyCode: number) => void;
  // (undocumented)
  protected removeItem: (item: IPickerItemProps<T>, focusNextItem?: boolean | undefined) => void;
  // (undocumented)
  protected removeItems: (itemsToRemove: any[]) => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  protected renderItems(): JSX.Element[];
  // (undocumented)
  protected renderSuggestions(): JSX.Element | null;
  // (undocumented)
  protected resetFocus(index?: number): void;
  // (undocumented)
  protected resolveNewValue(updatedValue: string, suggestions: T[]): void;
  // (undocumented)
  protected root: React.RefObject<HTMLDivElement>;
  // (undocumented)
  protected selection: Selection;
  // (undocumented)
  protected suggestionElement: React.RefObject<ISuggestions<T>>;
  // (undocumented)
  protected SuggestionOfProperType: new (props: ISuggestionsProps<T>) => Suggestions<T>;
  // (undocumented)
  protected suggestionStore: SuggestionsController<T>;
  // (undocumented)
  protected updateSuggestions(suggestions: any[]): void;
  // (undocumented)
  protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>, updatedValue?: string): void;
  // (undocumented)
  protected updateValue(updatedValue: string): void;
}

// @public (undocumented)
class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
  // (undocumented)
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class BaseSelectedItemsList<T, P extends IBaseSelectedItemsListProps<T>> extends BaseComponent<P, IBaseSelectedItemsListState>, implements IBaseSelectedItemsList<T> {
  constructor(basePickerProps: P);
  // (undocumented)
  addItems: (items: T[]) => void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: P): void;
  // (undocumented)
  componentWillUpdate(newProps: P, newState: IBaseSelectedItemsListState): void;
  // (undocumented)
  protected copyItems(items: T[]): void;
  // (undocumented)
  hasSelectedItems(): boolean;
  // (undocumented)
  highlightedItems(): T[];
  // (undocumented)
  readonly items: T[];
  // (undocumented)
  protected onChange(items?: T[]): void;
  // (undocumented)
  onCopy: (ev: React.ClipboardEvent<HTMLElement>) => void;
  // (undocumented)
  protected onItemChange: (changedItem: T, index: number) => void;
  // (undocumented)
  protected onSelectionChanged: () => void;
  // (undocumented)
  removeItem: (item: ISelectedItemProps<T>) => void;
  // (undocumented)
  removeItemAt: (index: number) => void;
  // (undocumented)
  removeItems: (itemsToRemove: any[]) => void;
  // (undocumented)
  removeSelectedItems(): void;
  // (undocumented)
  render(): any;
  // (undocumented)
  protected renderItems: () => JSX.Element[];
  // (undocumented)
  protected root: HTMLElement;
  // (undocumented)
  protected selection: Selection;
  // (undocumented)
  unselectAll(): void;
  updateItems(items: T[], focusIndex?: number): void;
}

// @public (undocumented)
enum BaseSlots {
  // (undocumented)
  backgroundColor = 1,
  // (undocumented)
  foregroundColor = 2,
  // (undocumented)
  primaryColor = 0
}

// @public (undocumented)
class BreadcrumbBase extends BaseComponent<IBreadcrumbProps, any> {
  constructor(props: IBreadcrumbProps);
  // (undocumented)
  componentWillReceiveProps(nextProps: IBreadcrumbProps): void;
  // (undocumented)
  static defaultProps: IBreadcrumbProps;
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function buildClassMap<T>(styles: T): {
    [key in keyof T]?: string;
};

// @public (undocumented)
export function buildColumns(items: any[], canResizeColumns?: boolean, onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any, sortedColumnKey?: string, isSortedDescending?: boolean, groupedColumnKey?: string, isMultiline?: boolean): IColumn[];

// @public @deprecated
class Button extends BaseComponent<IButtonProps, {}> {
  constructor(props: IButtonProps);
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum ButtonType {
  // (undocumented)
  command = 4,
  // (undocumented)
  compound = 3,
  // (undocumented)
  default = 6,
  // (undocumented)
  hero = 2,
  // (undocumented)
  icon = 5,
  // (undocumented)
  normal = 0,
  // (undocumented)
  primary = 1
}

// @public
export function calculatePrecision(value: number | string): number;

// @public (undocumented)
class Calendar extends BaseComponent<ICalendarProps, ICalendarState>, implements ICalendar {
  constructor(props: ICalendarProps);
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: ICalendarProps): void;
  // (undocumented)
  static defaultProps: ICalendarProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// WARNING: The type "ICalloutState" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
class Callout extends BaseComponent<ICalloutProps, ICalloutState> {
  constructor(props: ICalloutProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function canAnyMenuItemsCheck(items: IContextualMenuItem[]): boolean;

// @public (undocumented)
class CheckBase extends BaseComponent<ICheckProps, {}> {
  // (undocumented)
  static defaultProps: ICheckProps;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  shouldComponentUpdate(newProps: ICheckProps): boolean;
}

// @public (undocumented)
class CheckboxBase extends BaseComponent<ICheckboxProps, ICheckboxState>, implements ICheckbox {
  constructor(props: ICheckboxProps, context?: any);
  // (undocumented)
  readonly checked: boolean;
  // (undocumented)
  componentWillReceiveProps(newProps: ICheckboxProps): void;
  // (undocumented)
  static defaultProps: ICheckboxProps;
  // (undocumented)
  focus(): void;
  render(): JSX.Element;
}

// @public (undocumented)
enum CheckboxVisibility {
  always = 1,
  hidden = 2,
  onHover = 0
}

// @public (undocumented)
class ChoiceGroupBase extends BaseComponent<IChoiceGroupProps, IChoiceGroupState>, implements IChoiceGroup {
  constructor(props: IChoiceGroupProps);
  readonly checkedOption: IChoiceGroupOption | undefined;
  // (undocumented)
  componentWillReceiveProps(newProps: IChoiceGroupProps): void;
  // (undocumented)
  static defaultProps: IChoiceGroupProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function clamp(value: number, max: number, min?: number): number;

// @public
export function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(): (getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined, styleProps?: TStyleProps) => IProcessedStyleSet<TStyleSet>;

// @public (undocumented)
class CoachmarkBase extends BaseComponent<ICoachmarkProps, ICoachmarkState>, implements ICoachmark {
  constructor(props: ICoachmarkProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: ICoachmarkProps, prevState: ICoachmarkState): void;
  // (undocumented)
  componentWillReceiveProps(newProps: ICoachmarkProps): void;
  // (undocumented)
  static defaultProps: Partial<ICoachmarkProps>;
  // (undocumented)
  dismiss: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement> | undefined) => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  shouldComponentUpdate(newProps: ICoachmarkProps, newState: ICoachmarkState): boolean;
}

// @public (undocumented)
enum CollapseAllVisibility {
  // (undocumented)
  hidden = 0,
  // (undocumented)
  visible = 1
}

// @public (undocumented)
class ColorPickerBase extends BaseComponent<IColorPickerProps, IColorPickerState>, implements IColorPicker {
  constructor(props: IColorPickerProps);
  // (undocumented)
  readonly color: IColor;
  // (undocumented)
  componentWillReceiveProps(newProps: IColorPickerProps): void;
  // (undocumented)
  static defaultProps: {
    alphaLabel: string;
    blueLabel: string;
    greenLabel: string;
    hexLabel: string;
    redLabel: string;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class ColorPickerGridCellBase extends React.Component<IColorPickerGridCellProps, {}> {
  // (undocumented)
  static defaultProps: IColorPickerGridCellProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public
enum ColumnActionsMode {
  clickable = 1,
  disabled = 0,
  hasDropdown = 2
}

// @public
enum ColumnDragEndLocation {
  header = 2,
  outside = 0,
  surface = 1
}

// @public (undocumented)
class ComboBox extends BaseComponent<IComboBoxProps, IComboBoxState> {
  constructor(props: IComboBoxProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IComboBoxProps, prevState: IComboBoxState): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IComboBoxProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: IComboBoxProps;
  dismissMenu: () => void;
  // (undocumented)
  focus: (shouldOpenOnFocus?: boolean | undefined, useFocusAsync?: boolean | undefined) => void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class CommandBarBase extends BaseComponent<ICommandBarProps, {}>, implements ICommandBar {
  // (undocumented)
  static defaultProps: ICommandBarProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  remeasure(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class CommandBarButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public
class CompactPeoplePickerBase extends BasePeoplePicker {
  static defaultProps: {
    createGenericItem: typeof createGenericItem;
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps | undefined) => JSX.Element;
  }
}

// @public (undocumented)
class CompoundButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function concatStyleSets(...styleSets: (IStyleSet<any> | false | null | undefined)[]): IConcatenatedStyleSet<any>;

// @public (undocumented)
enum ConstrainMode {
  horizontalConstrained = 1,
  unconstrained = 0
}

// @public (undocumented)
class ContextualMenuBase extends BaseComponent<IContextualMenuProps, IContextualMenuState> {
  constructor(props: IContextualMenuProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  componentWillUpdate(newProps: IContextualMenuProps): void;
  // (undocumented)
  static defaultProps: IContextualMenuProps;
  // (undocumented)
  dismiss: (ev?: any, dismissAll?: boolean | undefined) => void;
  // (undocumented)
  render(): JSX.Element | null;
}

// @public (undocumented)
class ContextualMenuItemBase extends BaseComponent<IContextualMenuItemProps, {}> {
  // (undocumented)
  dismissMenu: (dismissAll?: boolean | undefined) => void;
  // (undocumented)
  dismissSubMenu: () => void;
  // (undocumented)
  openSubMenu: () => void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum ContextualMenuItemType {
  // (undocumented)
  Divider = 1,
  // (undocumented)
  Header = 2,
  // (undocumented)
  Normal = 0,
  // (undocumented)
  Section = 3
}

// @public
export function correctHSV(color: IHSV): IHSV;

// @public
export function correctRGB(color: IRGB): IRGB;

// @public
export function createArray<T>(size: number, getItem: (index: number) => T): T[];

// @public (undocumented)
export function createFontStyles(localeCode: string | null): IFontStyles;

// @public (undocumented)
export function createGenericItem(name: string, currentValidationState: ValidationState): IGenericItem & {
    key: React.Key;
};

// @public (undocumented)
export function createItem(name: string, isValid: boolean): ISuggestionModel<IPersonaProps>;

// @public @deprecated (undocumented)
export function createRef<T>(): RefObject<T>;

// @public
export function createTheme(theme: IPartialTheme, depComments?: boolean): ITheme;

// @public
export function css(...args: ICssInput[]): string;

// @public
export function cssColor(color: string): IRGB | undefined;

// @public (undocumented)
export function customizable(scope: string, fields: string[], concatStyles?: boolean): <P>(ComposedComponent: React.ComponentType<P>) => any;

// @public (undocumented)
class Customizations {
  // (undocumented)
  static applyScopedSettings(scopeName: string, settings: Settings): void;
  // (undocumented)
  static applySettings(settings: Settings): void;
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

// @public (undocumented)
class DatePickerBase extends BaseComponent<IDatePickerProps, IDatePickerState>, implements IDatePicker {
  constructor(props: IDatePickerProps);
  // (undocumented)
  componentDidUpdate(prevProps: IDatePickerProps, prevState: IDatePickerState): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: IDatePickerProps): void;
  // (undocumented)
  static defaultProps: IDatePickerProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  reset(): void;
}

// @public
enum DateRangeType {
  // (undocumented)
  Day = 0,
  // (undocumented)
  Month = 2,
  // (undocumented)
  Week = 1,
  // (undocumented)
  WorkWeek = 3
}

// @public
enum DayOfWeek {
  // (undocumented)
  Friday = 5,
  // (undocumented)
  Monday = 1,
  // (undocumented)
  Saturday = 6,
  // (undocumented)
  Sunday = 0,
  // (undocumented)
  Thursday = 4,
  // (undocumented)
  Tuesday = 2,
  // (undocumented)
  Wednesday = 3
}

// @public (undocumented)
class DefaultButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
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

// @public (undocumented)
class DetailsListBase extends BaseComponent<IDetailsListProps, IDetailsListState>, implements IDetailsList {
  constructor(props: IDetailsListProps);
  // (undocumented)
  protected _onRenderRow: (props: IDetailsRowProps, defaultRender?: any) => JSX.Element;
  // (undocumented)
  componentDidUpdate(prevProps: any, prevState: any): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IDetailsListProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  componentWillUpdate(): void;
  // (undocumented)
  static defaultProps: {
    checkboxVisibility: CheckboxVisibility;
    compact: boolean;
    constrainMode: ConstrainMode;
    enableShimmer: boolean;
    isHeaderVisible: boolean;
    layoutMode: DetailsListLayoutMode;
    selectionMode: SelectionMode;
  }
  // (undocumented)
  focusIndex(index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
  // (undocumented)
  forceUpdate(): void;
  // (undocumented)
  getStartItemIndexInView(): number;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
}

// @public (undocumented)
enum DetailsListLayoutMode {
  fixedColumns = 0,
  justified = 1
}

// @public (undocumented)
class DetailsRowBase extends BaseComponent<IDetailsRowBaseProps, IDetailsRowState> {
  constructor(props: IDetailsRowBaseProps);
  // (undocumented)
  protected _onRenderCheck(props: IDetailsRowCheckProps): JSX.Element;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(previousProps: IDetailsRowBaseProps): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IDetailsRowBaseProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  focus(forceIntoFirstElement?: boolean): boolean;
  measureCell(index: number, onMeasureDone: (width: number) => void): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean;
}

// @public (undocumented)
class DialogBase extends BaseComponent<IDialogProps, {}> {
  constructor(props: IDialogProps);
  // (undocumented)
  static defaultProps: IDialogProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class DialogContentBase extends BaseComponent<IDialogContentProps, {}> {
  constructor(props: IDialogContentProps);
  // (undocumented)
  static defaultProps: IDialogContentProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class DialogFooterBase extends BaseComponent<IDialogFooterProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum DialogType {
  close = 2,
  largeHeader = 1,
  normal = 0
}

// @public
export function disableBodyScroll(): void;

// @public (undocumented)
enum DocumentCardType {
  compact = 1,
  normal = 0
}

// @public
export function doesElementContainFocus(element: HTMLElement): boolean;

// @public (undocumented)
class DropdownBase extends BaseComponent<IDropdownInternalProps, IDropdownState> {
  constructor(props: IDropdownProps);
  // (undocumented)
  componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IDropdownProps): void;
  // (undocumented)
  static defaultProps: {
    options: any[];
  }
  // (undocumented)
  focus(shouldOpenOnFocus?: boolean): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  setSelectedIndex(event: React.FormEvent<HTMLDivElement>, index: number): void;
}

// @public (undocumented)
enum DropdownMenuItemType {
  // (undocumented)
  Divider = 1,
  // (undocumented)
  Header = 2,
  // (undocumented)
  Normal = 0
}

// @public
export function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents?: boolean): boolean;

// @public
export function elementContainsAttribute(element: HTMLElement, attribute: string): string | null;

// @public (undocumented)
enum ElementType {
  // (undocumented)
  anchor = 1,
  // (undocumented)
  button = 0
}

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

// @public (undocumented)
class ExpandingCardBase extends BaseComponent<IExpandingCardProps, IExpandingCardState> {
  constructor(props: IExpandingCardProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: {
    compactCardHeight: number;
    directionalHintFixed: boolean;
    expandedCardHeight: number;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum ExpandingCardMode {
  compact = 0,
  expanded = 1
}

// @public (undocumented)
class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
}

// @public (undocumented)
class ExtendedSelectedItem extends BaseComponent<ISelectedPeopleItemProps, IPeoplePickerItemState> {
  constructor(props: ISelectedPeopleItemProps);
  // (undocumented)
  protected persona: React.RefObject<HTMLDivElement>;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class FabricBase extends BaseComponent<IFabricProps, {
    isFocusVisible: boolean;
}> {
  constructor(props: IFabricProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  render(): JSX.Element;
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

// @public (undocumented)
enum FabricSlots {
  // (undocumented)
  black = 20,
  // (undocumented)
  neutralDark = 19,
  // (undocumented)
  neutralLight = 11,
  // (undocumented)
  neutralLighter = 10,
  // (undocumented)
  neutralLighterAlt = 9,
  // (undocumented)
  neutralPrimary = 18,
  // (undocumented)
  neutralPrimaryAlt = 17,
  // (undocumented)
  neutralQuaternary = 13,
  // (undocumented)
  neutralQuaternaryAlt = 12,
  // (undocumented)
  neutralSecondary = 16,
  // (undocumented)
  neutralTertiary = 15,
  // (undocumented)
  neutralTertiaryAlt = 14,
  // (undocumented)
  themeDark = 7,
  // (undocumented)
  themeDarkAlt = 6,
  // (undocumented)
  themeDarker = 8,
  // (undocumented)
  themeLight = 3,
  // (undocumented)
  themeLighter = 2,
  // (undocumented)
  themeLighterAlt = 1,
  // (undocumented)
  themePrimary = 0,
  // (undocumented)
  themeSecondary = 5,
  // (undocumented)
  themeTertiary = 4,
  // (undocumented)
  white = 21
}

// @public
class FacepileBase extends BaseComponent<IFacepileProps, {}> {
  constructor(props: IFacepileProps);
  // (undocumented)
  static defaultProps: IFacepileProps;
  // (undocumented)
  protected onRenderAriaDescription(): "" | JSX.Element | undefined;
  // (undocumented)
  render(): JSX.Element;
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
enum FirstWeekOfYear {
  // (undocumented)
  FirstDay = 0,
  // (undocumented)
  FirstFourDayWeek = 2,
  // (undocumented)
  FirstFullWeek = 1
}

// @public
export function fitContentToBounds(options: IFitContentToBoundsOptions): ISize;

// @public
export function flatten<T>(array: (T | T[])[]): T[];

// @public (undocumented)
class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
  // (undocumented)
  static defaultProps: any;
}

// @public
export function focusAsync(element: HTMLElement | {
    focus: () => void;
} | undefined | null): void;

// @public
export function focusClear(): IRawStyle;

// @public
export function focusFirstChild(rootElement: HTMLElement): boolean;

// @public (undocumented)
class FocusTrapZone extends BaseComponent<IFocusTrapZoneProps, {}>, implements IFocusTrapZone {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IFocusTrapZoneProps): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: IFocusTrapZoneProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class FocusZone extends BaseComponent<IFocusZoneProps, {}>, implements IFocusZone {
  constructor(props: IFocusZoneProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: IFocusZoneProps;
  focus(forceIntoFirstElement?: boolean): boolean;
  focusElement(element: HTMLElement): boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum FocusZoneDirection {
  bidirectional = 2,
  horizontal = 1,
  vertical = 0
}

// @public
export function fontFace(font: IFontFace): void;

// @public (undocumented)
module FontSizes {
  // (undocumented)
  icon: string;

  // (undocumented)
  large: string;

  // (undocumented)
  medium: string;

  // (undocumented)
  mediumPlus: string;

  // (undocumented)
  mega: string;

  // (undocumented)
  mini: string;

  // (undocumented)
  small: string;

  // (undocumented)
  smallPlus: string;

  // (undocumented)
  superLarge: string;

  // (undocumented)
  xLarge: string;

  // (undocumented)
  xSmall: string;

  // (undocumented)
  xxLarge: string;

}

// @public (undocumented)
module FontWeights {
  // (undocumented)
  bold: IFontWeight;

  // (undocumented)
  light: IFontWeight;

  // (undocumented)
  regular: IFontWeight;

  // (undocumented)
  semibold: IFontWeight;

  // (undocumented)
  semilight: IFontWeight;

}

// @public
export function format(s: string, ...values: any[]): string;

// @public (undocumented)
export function getBackgroundShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;

// @public
export function getChildren(parent: HTMLElement, allowVirtualChildren?: boolean): HTMLElement[];

// @public
export function getColorFromHSV(hsv: IHSV, a?: number): IColor;

// @public
export function getColorFromRGBA(rgba: IRGB): IColor;

// @public
export function getColorFromString(inputColor: string): IColor | undefined;

// @public (undocumented)
export function getContrastRatio(color1: IColor, color2: IColor): number;

// @public
export function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number;

// @public
export function getDocument(rootElement?: HTMLElement | null): Document | undefined;

// @public
export function getElementIndexPath(fromElement: HTMLElement, toElement: HTMLElement): number[];

// @public
export function getFadedOverflowStyle(theme: ITheme, color?: keyof ISemanticColors | keyof IPalette, direction?: 'horizontal' | 'vertical', width?: string | number, height?: string | number): IRawStyle;

// @public
export function getFirstFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getFirstTabbable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;

// @public
export function getFocusableByIndexPath(parent: HTMLElement, path: number[]): HTMLElement | undefined;

// @public
export function getFocusStyle(theme: ITheme, inset?: number, position?: 'relative' | 'absolute', highContrastStyle?: IRawStyle | undefined, borderColor?: string, outlineColor?: string, isFocusedOnly?: boolean): IRawStyle;

// @public
export function getFullColorString(color: IColor): string;

// @public
export function getGlobalClassNames<T>(classNames: GlobalClassNames<T>, theme: ITheme, disableGlobalClassNames?: boolean): Partial<GlobalClassNames<T>>;

// @public
export function getIcon(name?: string): IIconRecord | undefined;

// @public
export function getIconClassName(name: string): string;

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

// @public (undocumented)
export function getScreenSelector(min: number, max: number): string;

// @public
export function getScrollbarWidth(): number;

// @public
export function getShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;

// @public (undocumented)
export function getSubmenuItems(item: IContextualMenuItem): IContextualMenuItem[] | undefined;

// @public
export function getTheme(depComments?: boolean): ITheme;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
export function getThemedContext(context: ICustomizerContext, scheme?: ISchemeNames, theme?: ITheme): ICustomizerContext;

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

// @public (undocumented)
class GridCell<T, P extends IGridCellProps<T>> extends React.Component<P, {}> {
  // (undocumented)
  static defaultProps: {
    disabled: boolean;
    id: string;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class GroupedListBase extends BaseComponent<IGroupedListProps, IGroupedListState>, implements IGroupedList {
  constructor(props: IGroupedListProps);
  // (undocumented)
  componentWillReceiveProps(newProps: IGroupedListProps): void;
  // (undocumented)
  static defaultProps: {
    compact: boolean;
    groupProps: {
    }
    isHeaderVisible: boolean;
    selectionMode: SelectionMode;
  }
  // (undocumented)
  forceUpdate(): void;
  // (undocumented)
  getStartItemIndexInView(): number;
  // (undocumented)
  refs: {
    [key: string]: React.ReactInstance;
  }
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
  // (undocumented)
  toggleCollapseAll(allCollapsed: boolean): void;
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
class HoverCardBase extends BaseComponent<IHoverCardProps, IHoverCardState> {
  constructor(props: IHoverCardProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IHoverCardProps, prevState: IHoverCardState): void;
  // (undocumented)
  static defaultProps: {
    cardDismissDelay: number;
    cardOpenDelay: number;
    expandedCardOpenDelay: number;
    instantOpenOnClick: boolean;
    openHotKey: number;
    setInitialFocus: boolean;
    type: HoverCardType;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum HoverCardType {
  expanding = "ExpandingCard",
  plain = "PlainCard"
}

// @public
export function hsl2hsv(h: number, s: number, l: number): IHSV;

// @public
export function hsl2rgb(h: number, s: number, l: number): IRGB;

// @public
export function hsv2hex(h: number, s: number, v: number): string;

// @public
export function hsv2hsl(h: number, s: number, v: number): IHSL;

// @public
export function hsv2rgb(h: number, s: number, v: number): IRGB;

// @public (undocumented)
interface IActivityItemProps extends React.AllHTMLAttributes<HTMLElement> {
  activityDescription?: React.ReactNode[] | React.ReactNode;
  // @deprecated
  activityDescriptionText?: string;
  activityIcon?: React.ReactNode;
  activityPersonas?: Array<IPersonaSharedProps>;
  animateBeaconSignal?: boolean;
  beaconColorOne?: string;
  beaconColorTwo?: string;
  comments?: React.ReactNode[] | React.ReactNode;
  // @deprecated
  commentText?: string;
  componentRef?: IRefObject<{}>;
  isCompact?: boolean;
  onRenderActivityDescription?: IRenderFunction<IActivityItemProps>;
  onRenderComments?: IRenderFunction<IActivityItemProps>;
  onRenderIcon?: IRenderFunction<IActivityItemProps>;
  onRenderTimeStamp?: IRenderFunction<IActivityItemProps>;
  styles?: IActivityItemStyles;
  timeStamp?: string | React.ReactNode[] | React.ReactNode;
}

// @public (undocumented)
interface IActivityItemStyles {
  activityContent?: IStyle;
  activityPersona?: IStyle;
  activityText?: IStyle;
  activityTypeIcon?: IStyle;
  commentText?: IStyle;
  doublePersona?: IStyle;
  isCompactContent?: IStyle;
  isCompactIcon?: IStyle;
  isCompactPersona?: IStyle;
  isCompactPersonaContainer?: IStyle;
  isCompactRoot?: IStyle;
  isCompactTimeStamp?: IStyle;
  personaContainer?: IStyle;
  pulsingBeacon?: IStyle;
  root?: IStyle;
  timeStamp?: IStyle;
}

// @public
interface IAnimationStyles {
  // (undocumented)
  fadeIn100: IRawStyle;
  // (undocumented)
  fadeIn200: IRawStyle;
  // (undocumented)
  fadeIn400: IRawStyle;
  // (undocumented)
  fadeIn500: IRawStyle;
  // (undocumented)
  fadeOut100: IRawStyle;
  // (undocumented)
  fadeOut200: IRawStyle;
  // (undocumented)
  fadeOut400: IRawStyle;
  // (undocumented)
  fadeOut500: IRawStyle;
  // (undocumented)
  rotate90deg: IRawStyle;
  // (undocumented)
  rotateN90deg: IRawStyle;
  // (undocumented)
  scaleDownIn100: IRawStyle;
  // (undocumented)
  scaleDownOut98: IRawStyle;
  // (undocumented)
  scaleUpIn100: IRawStyle;
  // (undocumented)
  scaleUpOut103: IRawStyle;
  // (undocumented)
  slideDownIn10: IRawStyle;
  // (undocumented)
  slideDownIn20: IRawStyle;
  // (undocumented)
  slideDownOut10: IRawStyle;
  // (undocumented)
  slideDownOut20: IRawStyle;
  // (undocumented)
  slideLeftIn10: IRawStyle;
  // (undocumented)
  slideLeftIn20: IRawStyle;
  // (undocumented)
  slideLeftIn40: IRawStyle;
  // (undocumented)
  slideLeftIn400: IRawStyle;
  // (undocumented)
  slideLeftOut10: IRawStyle;
  // (undocumented)
  slideLeftOut20: IRawStyle;
  // (undocumented)
  slideLeftOut40: IRawStyle;
  // (undocumented)
  slideLeftOut400: IRawStyle;
  // (undocumented)
  slideRightIn10: IRawStyle;
  // (undocumented)
  slideRightIn20: IRawStyle;
  // (undocumented)
  slideRightIn40: IRawStyle;
  // (undocumented)
  slideRightIn400: IRawStyle;
  // (undocumented)
  slideRightOut10: IRawStyle;
  // (undocumented)
  slideRightOut20: IRawStyle;
  // (undocumented)
  slideRightOut40: IRawStyle;
  // (undocumented)
  slideRightOut400: IRawStyle;
  // (undocumented)
  slideUpIn10: IRawStyle;
  // (undocumented)
  slideUpIn20: IRawStyle;
  // (undocumented)
  slideUpOut10: IRawStyle;
  // (undocumented)
  slideUpOut20: IRawStyle;
}

// @public (undocumented)
interface IAnimationVariables {
  // (undocumented)
  durationValue1: string;
  // (undocumented)
  durationValue2: string;
  // (undocumented)
  durationValue3: string;
  // (undocumented)
  durationValue4: string;
  // (undocumented)
  easeFunction1: string;
  // (undocumented)
  easeFunction2: string;
}

// @public (undocumented)
interface IAsAsyncOptions<TProps> {
  load: () => Promise<React.ReactType<TProps>>;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

// @public (undocumented)
interface IAutofill {
  clear(): void;
  cursorLocation: number | null;
  focus(): void;
  inputElement: HTMLInputElement | null;
  isValueSelected: boolean;
  selectionEnd: number | null;
  selectionStart: number | null;
  value: string;
}

// @public (undocumented)
interface IAutofillProps extends React.InputHTMLAttributes<HTMLInputElement | Autofill> {
  componentRef?: IRefObject<IAutofill>;
  defaultVisibleValue?: string;
  enableAutofillOnKeyPress?: KeyCodes[];
  onInputChange?: (value: string) => string;
  onInputValueChange?: (newValue?: string) => void;
  preventValueSelection?: boolean;
  shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;
  suggestedDisplayValue?: string;
  updateValueInWillReceiveProps?: () => string | null;
}

// @public (undocumented)
interface IAutofillState {
  // (undocumented)
  displayValue?: string;
}

// @public @deprecated
interface IBaseAutoFill extends IAutofill {
}

// @public @deprecated
interface IBaseAutoFillProps extends IAutofillProps {
}

// @public (undocumented)
interface IBaseButtonProps extends IButtonProps {
  // (undocumented)
  baseClassName?: string;
  // (undocumented)
  variantClassName?: string;
}

// @public (undocumented)
interface IBaseButtonState {
  // (undocumented)
  menuProps?: IContextualMenuProps | null;
}

// @public (undocumented)
interface IBaseExtendedPicker<T> {
  focus: () => void;
  forceResolve?: () => void;
  items: T[] | undefined;
}

// @public (undocumented)
interface IBaseExtendedPickerProps<T> {
  className?: string;
  componentRef?: IRefObject<IBaseExtendedPicker<T>>;
  currentRenderedQueryString?: string;
  defaultSelectedItems?: T[];
  disabled?: boolean;
  floatingPickerProps: IBaseFloatingPickerProps<T>;
  focusZoneProps?: IFocusZoneProps;
  headerComponent?: JSX.Element;
  inputProps?: IInputProps;
  itemLimit?: number;
  onBlur?: React.FocusEventHandler<HTMLInputElement | Autofill>;
  onChange?: (items?: T[]) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement | Autofill>;
  onItemAdded?: (addedItem: T) => void;
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  onItemsRemoved?: (removedItems: T[]) => void;
  onPaste?: (pastedText: string) => T[];
  onRenderFloatingPicker: (props: IBaseFloatingPickerProps<T>) => JSX.Element;
  onRenderSelectedItems: (props: IBaseSelectedItemsListProps<T>) => JSX.Element;
  selectedItems?: T[];
  selectedItemsListProps: IBaseSelectedItemsListProps<T>;
  suggestionItems?: T[];
}

// @public (undocumented)
interface IBaseExtendedPickerState<T> {
  // (undocumented)
  queryString: string | null;
  // (undocumented)
  selectedItems: T[] | null;
  // (undocumented)
  suggestionItems: T[] | null;
}

// @public (undocumented)
interface IBaseFloatingPicker {
  hidePicker: () => void;
  inputText: string;
  isSuggestionsShown: boolean;
  onQueryStringChanged: (input: string) => void;
  showPicker: (updateValue?: boolean) => void;
  suggestions: any[];
}

// @public (undocumented)
interface IBaseFloatingPickerProps<T> extends React.ClassAttributes<any> {
  calloutWidth?: number;
  className?: string;
  // (undocumented)
  componentRef?: IRefObject<IBaseFloatingPicker>;
  createGenericItem?: (input: string, isValid: boolean) => ISuggestionModel<T>;
  getTextFromItem?: (item: T, currentValue?: string) => string;
  inputElement?: HTMLInputElement | null;
  onChange?: (item: T) => void;
  onInputChanged?: (filter: string) => void;
  onRemoveSuggestion?: (item: IPersonaProps) => void;
  onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
  onSuggestionsHidden?: () => void;
  onSuggestionsShown?: () => void;
  onValidateInput?: (input: string) => boolean;
  onZeroQuerySuggestion?: (selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
  pickerSuggestionsProps?: IBaseFloatingPickerSuggestionProps;
  resolveDelay?: number;
  searchingText?: ((props: {
          input: string;
      }) => string) | string;
  selectedItems?: T[];
  showForceResolve?: () => boolean;
  suggestionItems?: T[];
  suggestionsStore: SuggestionsStore<T>;
}

// @public (undocumented)
interface IBaseFloatingPickerState {
  // (undocumented)
  didBind: boolean;
  // (undocumented)
  queryString: string;
  // (undocumented)
  suggestionsVisible?: boolean;
}

// @public (undocumented)
interface IBaseFloatingPickerSuggestionProps {
  footerItemsProps?: ISuggestionsHeaderFooterProps[];
  headerItemsProps?: ISuggestionsHeaderFooterProps[];
  shouldSelectFirstItem?: () => boolean;
}

// @public
interface IBasePicker<T> {
  focus: () => void;
  focusInput: () => void;
  items: T[] | undefined;
}

// @public (undocumented)
interface IBasePickerProps<T> extends React.Props<any> {
  className?: string;
  componentRef?: IRefObject<IBasePicker<T>>;
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T> | T;
  defaultSelectedItems?: T[];
  disabled?: boolean;
  enableSelectedSuggestionAlert?: boolean;
  getTextFromItem?: (item: T, currentValue?: string) => string;
  inputProps?: IInputProps;
  itemLimit?: number;
  onBlur?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;
  onChange?: (items?: T[]) => void;
  onDismiss?: (ev?: any, selectedItem?: T) => void;
  onEmptyInputFocus?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;
  onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  onInputChange?: (input: string) => string;
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;
  onRemoveSuggestion?: (item: IPersonaProps) => void;
  onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;
  onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  onValidateInput?: (input: string) => ValidationState;
  pickerCalloutProps?: ICalloutProps;
  pickerSuggestionsProps?: IBasePickerSuggestionsProps;
  removeButtonAriaLabel?: string;
  resolveDelay?: number;
  searchingText?: ((props: {
          input: string;
      }) => string) | string;
  selectedItems?: T[];
  styles?: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IBasePickerState {
  // (undocumented)
  isFocused?: boolean;
  // (undocumented)
  isMostRecentlyUsedVisible?: boolean;
  // (undocumented)
  isResultsFooterVisible?: boolean;
  // (undocumented)
  isSearching?: boolean;
  // (undocumented)
  items?: any;
  // (undocumented)
  moreSuggestionsAvailable?: boolean;
  // (undocumented)
  selectedIndices?: number[];
  // (undocumented)
  suggestedDisplayValue?: string;
  // (undocumented)
  suggestionsLoading?: boolean;
  // (undocumented)
  suggestionsVisible?: boolean;
}

// @public
interface IBasePickerStyles {
  input: IStyle;
  itemsWrapper: IStyle;
  root: IStyle;
  screenReaderText: IStyle;
  text: IStyle;
}

// @public (undocumented)
interface IBasePickerSuggestionsProps {
  className?: string;
  forceResolveText?: string;
  loadingText?: string;
  mostRecentlyUsedHeaderText?: string;
  noResultsFoundText?: string;
  onRenderNoResultFound?: IRenderFunction<void>;
  resultsFooter?: () => JSX.Element;
  resultsFooterFull?: () => JSX.Element;
  resultsMaximumNumber?: number;
  searchForMoreText?: string;
  searchingText?: string;
  showRemoveButtons?: boolean;
  suggestionsAvailableAlertText?: string;
  suggestionsClassName?: string;
  suggestionsContainerAriaLabel?: string;
  suggestionsHeaderText?: string;
  suggestionsItemClassName?: string;
}

// @public
interface IBaseProps<T = any> {
  // (undocumented)
  componentRef?: IRefObject<T>;
}

// @public (undocumented)
interface IBaseSelectedItemsList<T> {
  // (undocumented)
  addItems: (items: T[]) => void;
  items: T[] | undefined;
}

// @public (undocumented)
interface IBaseSelectedItemsListProps<T> extends React.ClassAttributes<any> {
  canRemoveItem?: (item: T) => boolean;
  // (undocumented)
  componentRef?: IRefObject<IBaseSelectedItemsList<T>>;
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T>;
  defaultSelectedItems?: T[];
  onChange?: (items?: T[]) => void;
  onCopyItems?: (items: T[]) => string;
  // @deprecated
  onItemDeleted?: (deletedItem: T) => void;
  onItemsDeleted?: (deletedItems: T[]) => void;
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  onRenderItem?: (props: ISelectedItemProps<T>) => JSX.Element;
  removeButtonAriaLabel?: string;
  selectedItems?: T[];
  selection?: Selection;
}

// @public (undocumented)
interface IBaseSelectedItemsListState {
  // (undocumented)
  items?: any;
}

// @public (undocumented)
interface IBreadcrumb {
  focus(): void;
}

// @public (undocumented)
interface IBreadCrumbData {
  // (undocumented)
  props: IBreadcrumbProps;
  // (undocumented)
  renderedItems: IBreadcrumbItem[];
  // (undocumented)
  renderedOverflowItems: IBreadcrumbItem[];
}

// @public (undocumented)
interface IBreadcrumbItem {
  href?: string;
  isCurrentItem?: boolean;
  key: string;
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;
  text: string;
}

// @public (undocumented)
interface IBreadcrumbProps extends React.ClassAttributes<BreadcrumbBase> {
  ariaLabel?: string;
  className?: string;
  componentRef?: IRefObject<IBreadcrumb>;
  dividerAs?: IComponentAs<IDividerAsProps>;
  items: IBreadcrumbItem[];
  maxDisplayedItems?: number;
  onReduceData?: (data: IBreadCrumbData) => IBreadCrumbData | undefined;
  onRenderItem?: IRenderFunction<IBreadcrumbItem>;
  overflowAriaLabel?: string;
  overflowIndex?: number;
  // (undocumented)
  styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
  // (undocumented)
  theme?: ITheme;
}

// @public (undocumented)
interface IBreadcrumbStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IBreadcrumbStyles {
  // (undocumented)
  chevron: IStyle;
  // (undocumented)
  item: IStyle;
  // (undocumented)
  itemLink: IStyle;
  // (undocumented)
  list: IStyle;
  // (undocumented)
  listItem: IStyle;
  // (undocumented)
  overflow: IStyle;
  // (undocumented)
  overflowButton: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IButton {
  dismissMenu: () => void;
  focus: () => void;
  openMenu: (shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void;
}

// @public (undocumented)
interface IButtonProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button> {
  allowDisabledFocus?: boolean;
  ariaDescription?: string;
  ariaHidden?: boolean;
  ariaLabel?: string;
  // @deprecated
  buttonType?: ButtonType;
  checked?: boolean;
  className?: string;
  componentRef?: IRefObject<IButton>;
  data?: any;
  // @deprecated
  description?: IStyle;
  disabled?: boolean;
  getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, isSplit: boolean | undefined, allowDisabledFocus: boolean) => IButtonClassNames;
  getSplitButtonClassNames?: (disabled: boolean, expanded: boolean, checked: boolean, allowDisabledFocus: boolean) => ISplitButtonClassNames;
  href?: string;
  iconProps?: IIconProps;
  keytipProps?: IKeytipProps;
  menuAs?: IComponentAs<IContextualMenuProps>;
  menuIconProps?: IIconProps;
  menuProps?: IContextualMenuProps;
  menuTriggerKeyCode?: KeyCodes | null;
  onAfterMenuDismiss?: () => void;
  onMenuClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;
  onRenderAriaDescription?: IRenderFunction<IButtonProps>;
  onRenderChildren?: IRenderFunction<IButtonProps>;
  onRenderDescription?: IRenderFunction<IButtonProps>;
  onRenderIcon?: IRenderFunction<IButtonProps>;
  // @deprecated
  onRenderMenu?: IRenderFunction<IContextualMenuProps>;
  onRenderMenuIcon?: IRenderFunction<IButtonProps>;
  onRenderText?: IRenderFunction<IButtonProps>;
  persistMenu?: boolean;
  primary?: boolean;
  primaryDisabled?: boolean;
  // @deprecated
  rootProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;
  secondaryText?: string;
  split?: boolean;
  splitButtonAriaLabel?: string;
  styles?: IButtonStyles;
  text?: string;
  theme?: ITheme;
  toggle?: boolean;
  // @deprecated
  toggled?: boolean;
  uniqueId?: string | number;
}

// @public (undocumented)
interface IButtonStyles {
  description?: IStyle;
  descriptionChecked?: IStyle;
  descriptionDisabled?: IStyle;
  descriptionHovered?: IStyle;
  descriptionPressed?: IStyle;
  flexContainer?: IStyle;
  icon?: IStyle;
  iconChecked?: IStyle;
  iconDisabled?: IStyle;
  iconExpanded?: IStyle;
  iconExpandedHovered?: IStyle;
  iconHovered?: IStyle;
  iconPressed?: IStyle;
  label?: IStyle;
  labelChecked?: IStyle;
  labelDisabled?: IStyle;
  labelHovered?: IStyle;
  menuIcon?: IStyle;
  menuIconChecked?: IStyle;
  menuIconDisabled?: IStyle;
  menuIconExpanded?: IStyle;
  menuIconExpandedHovered?: IStyle;
  menuIconHovered?: IStyle;
  menuIconPressed?: IStyle;
  root?: IStyle;
  rootChecked?: IStyle;
  rootCheckedDisabled?: IStyle;
  rootCheckedHovered?: IStyle;
  rootCheckedPressed?: IStyle;
  rootDisabled?: IStyle;
  rootExpanded?: IStyle;
  rootExpandedHovered?: IStyle;
  rootFocused?: IStyle;
  rootHovered?: IStyle;
  rootPressed?: IStyle;
  screenReaderText?: IStyle;
  secondaryText?: IStyle;
  splitButtonContainer?: IStyle;
  splitButtonContainerChecked?: IStyle;
  splitButtonContainerCheckedHovered?: IStyle;
  splitButtonContainerDisabled?: IStyle;
  splitButtonContainerFocused?: IStyle;
  splitButtonContainerHovered?: IStyle;
  splitButtonDivider?: IStyle;
  splitButtonFlexContainer?: IStyle;
  splitButtonMenuButton?: IStyle;
  splitButtonMenuButtonChecked?: IStyle;
  splitButtonMenuButtonDisabled?: IStyle;
  splitButtonMenuButtonExpanded?: IStyle;
  splitButtonMenuIcon?: IStyle;
  splitButtonMenuIconDisabled?: IStyle;
  textContainer?: IStyle;
}

// @public (undocumented)
interface ICalendar {
  focus: () => void;
}

// @public (undocumented)
interface ICalendarFormatDateCallbacks {
  formatDay: (date: Date) => string;
  formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => string;
  formatMonthYear: (date: Date, strings?: ICalendarStrings) => string;
  formatYear: (date: Date) => string;
}

// @public (undocumented)
interface ICalendarIconStrings {
  // (undocumented)
  closeIcon?: string;
  leftNavigation?: string;
  rightNavigation?: string;
}

// @public (undocumented)
interface ICalendarProps extends IBaseProps<ICalendar>, React.HTMLAttributes<HTMLElement> {
  allFocusable?: boolean;
  autoNavigateOnSelection?: boolean;
  className?: string;
  componentRef?: IRefObject<ICalendar>;
  dateRangeType?: DateRangeType;
  dateTimeFormatter?: ICalendarFormatDateCallbacks;
  firstDayOfWeek?: DayOfWeek;
  firstWeekOfYear?: FirstWeekOfYear;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  isMonthPickerVisible?: boolean;
  maxDate?: Date;
  minDate?: Date;
  navigationIcons?: ICalendarIconStrings;
  onDismiss?: () => void;
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
  restrictedDates?: Date[];
  selectDateOnClick?: boolean;
  // @deprecated
  shouldFocusOnMount?: boolean;
  showCloseButton?: boolean;
  showGoToToday?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showSixWeeksByDefault?: boolean;
  showWeekNumbers?: boolean;
  strings: ICalendarStrings | null;
  today?: Date;
  value?: Date;
  workWeekDays?: DayOfWeek[];
  yearPickerHidden?: boolean;
}

// @public (undocumented)
interface ICalendarState {
  isDayPickerVisible?: boolean;
  isMonthPickerVisible?: boolean;
  navigatedDayDate?: Date;
  navigatedMonthDate?: Date;
  selectedDate?: Date;
}

// @public (undocumented)
interface ICalendarStrings {
  closeButtonAriaLabel?: string;
  days: string[];
  goToToday: string;
  months: string[];
  nextMonthAriaLabel?: string;
  nextYearAriaLabel?: string;
  prevMonthAriaLabel?: string;
  prevYearAriaLabel?: string;
  shortDays: string[];
  shortMonths: string[];
  weekNumberFormatString?: string;
}

// @public (undocumented)
interface ICallout {
}

// @public (undocumented)
interface ICalloutContentStyleProps {
  backgroundColor?: string;
  beakWidth?: number;
  calloutMaxWidth?: number;
  calloutWidth?: number;
  className?: string;
  overflowYHidden?: boolean;
  positions?: ICalloutPositionedInfo;
  theme: ITheme;
}

// @public (undocumented)
interface ICalloutContentStyles {
  beak: IStyle;
  beakCurtain: IStyle;
  calloutMain: IStyle;
  container: IStyle;
  root: IStyle;
}

// @public (undocumented)
interface ICalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  alignTargetEdge?: boolean;
  ariaDescribedBy?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  backgroundColor?: string;
  beakWidth?: number;
  bounds?: IRectangle;
  calloutMaxHeight?: number;
  calloutMaxWidth?: number;
  calloutWidth?: number;
  className?: string;
  componentRef?: IRefObject<ICallout>;
  coverTarget?: boolean;
  directionalHint?: DirectionalHint;
  directionalHintFixed?: boolean;
  directionalHintForRTL?: DirectionalHint;
  doNotLayer?: boolean;
  finalHeight?: number;
  gapSpace?: number;
  hidden?: boolean;
  hideOverflow?: boolean;
  isBeakVisible?: boolean;
  layerProps?: ILayerProps;
  minPagePadding?: number;
  onDismiss?: (ev?: any) => void;
  onLayerMounted?: () => void;
  onPositioned?: (positions?: ICalloutPositionedInfo) => void;
  onScroll?: () => void;
  preventDismissOnLostFocus?: boolean;
  preventDismissOnResize?: boolean;
  preventDismissOnScroll?: boolean;
  role?: string;
  setInitialFocus?: boolean;
  style?: React.CSSProperties;
  styles?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
  target?: Element | string | MouseEvent | IPoint | null;
  theme?: ITheme;
}

// @public (undocumented)
interface ICellStyleProps {
  // (undocumented)
  cellExtraRightPadding: number;
  // (undocumented)
  cellLeftPadding: number;
  // (undocumented)
  cellRightPadding: number;
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

// @public
interface ICheckbox {
  checked: boolean;
  focus: () => void;
}

// @public
interface ICheckboxProps extends React.ButtonHTMLAttributes<HTMLElement | HTMLInputElement> {
  ariaDescribedBy?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaPositionInSet?: number;
  ariaSetSize?: number;
  boxSide?: 'start' | 'end';
  checked?: boolean;
  checkmarkIconProps?: IIconProps;
  className?: string;
  componentRef?: IRefObject<ICheckbox>;
  defaultChecked?: boolean;
  disabled?: boolean;
  inputProps?: React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;
  keytipProps?: IKeytipProps;
  label?: string;
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
  onRenderLabel?: IRenderFunction<ICheckboxProps>;
  styles?: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ICheckboxState {
  isChecked?: boolean;
}

// @public (undocumented)
interface ICheckboxStyleProps {
  // (undocumented)
  checked?: boolean;
  // (undocumented)
  className?: string;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  isUsingCustomLabelRender: boolean;
  // (undocumented)
  reversed?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface ICheckboxStyles {
  checkbox?: IStyle;
  checkmark?: IStyle;
  input?: IStyle;
  label?: IStyle;
  root?: IStyle;
  text?: IStyle;
}

// @public (undocumented)
interface ICheckProps extends React.ClassAttributes<CheckBase> {
  alwaysShowCheck?: boolean;
  checked?: boolean;
  className?: string;
  componentRef?: IRefObject<ICheckProps>;
  styles?: IStyleFunctionOrObject<ICheckStyleProps, ICheckStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ICheckStyleProps {
  checkBoxHeight?: string;
  // (undocumented)
  checked?: boolean;
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface ICheckStyles {
  check: IStyle;
  checkHost: IStyle;
  circle: IStyle;
  root: IStyle;
}

// @public (undocumented)
interface IChoiceGroup {
  checkedOption: IChoiceGroupOption | undefined;
  focus: () => void;
}

// @public (undocumented)
interface IChoiceGroupOption extends React.HTMLAttributes<HTMLElement | HTMLInputElement> {
  ariaLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  iconProps?: IIconProps;
  id?: string;
  imageAlt?: string;
  imageSize?: {
    height: number;
    width: number;
  }
  imageSrc?: string;
  key: string;
  labelId?: string;
  onRenderField?: IRenderFunction<IChoiceGroupOption>;
  onRenderLabel?: (option: IChoiceGroupOption) => JSX.Element;
  selectedImageSrc?: string;
  text: string;
}

// @public (undocumented)
interface IChoiceGroupOptionProps extends IChoiceGroupOption {
  componentRef?: IRefObject<IChoiceGroupOption>;
  focused?: boolean;
  name?: string;
  onBlur?: (ev: React.FocusEvent<HTMLElement>, props?: IChoiceGroupOption) => void;
  onChange?: OnChangeCallback;
  onFocus?: OnFocusCallback;
  required?: boolean;
  styles?: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IChoiceGroupOptionStyleProps {
  // (undocumented)
  checked?: boolean;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  focused?: boolean;
  // (undocumented)
  hasIcon?: boolean;
  // (undocumented)
  hasImage?: boolean;
  // (undocumented)
  imageIsLarge?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IChoiceGroupOptionStyles {
  // (undocumented)
  choiceFieldWrapper?: IStyle;
  // (undocumented)
  field?: IStyle;
  // (undocumented)
  iconWrapper?: IStyle;
  // (undocumented)
  imageWrapper?: IStyle;
  // (undocumented)
  innerField?: IStyle;
  // (undocumented)
  input?: IStyle;
  // (undocumented)
  labelWrapper?: IStyle;
  // (undocumented)
  root?: IStyle;
  // (undocumented)
  selectedImageWrapper?: IStyle;
}

// @public (undocumented)
interface IChoiceGroupProps extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement> {
  ariaLabelledBy?: string;
  componentRef?: IRefObject<IChoiceGroup>;
  defaultSelectedKey?: string | number;
  label?: string;
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
  // @deprecated
  onChanged?: (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;
  options?: IChoiceGroupOption[];
  selectedKey?: string | number;
  styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IChoiceGroupState {
  // (undocumented)
  keyChecked: string | number;
  keyFocused?: string | number;
}

// @public (undocumented)
interface IChoiceGroupStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  optionsContainIconOrImage?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IChoiceGroupStyles {
  // (undocumented)
  applicationRole?: IStyle;
  // (undocumented)
  flexContainer?: IStyle;
  // (undocumented)
  label?: IStyle;
  // (undocumented)
  root?: IStyle;
}

// @public (undocumented)
interface ICircle extends IShimmerElement {
  height?: number;
}

// @public (undocumented)
interface ICoachmark {
  dismiss?: (ev?: any) => void;
}

// @public
interface ICoachmarkProps extends React.ClassAttributes<CoachmarkBase> {
  ariaAlertText?: string;
  ariaDescribedBy?: string;
  ariaDescribedByText?: string;
  ariaLabelledBy?: string;
  ariaLabelledByText?: string;
  beaconColorOne?: string;
  beaconColorTwo?: string;
  // @deprecated
  beakHeight?: number;
  // @deprecated
  beakWidth?: number;
  className?: string;
  // @deprecated
  collapsed?: boolean;
  color?: string;
  componentRef?: IRefObject<ICoachmark>;
  delayBeforeCoachmarkAnimation?: number;
  delayBeforeMouseOpen?: number;
  // @deprecated
  height?: number;
  isCollapsed?: boolean;
  isPositionForced?: boolean;
  mouseProximityOffset?: number;
  onAnimationOpenEnd?: () => void;
  onAnimationOpenStart?: () => void;
  onDismiss?: (ev?: any) => void;
  onMouseMove?: (e: MouseEvent) => void;
  positioningContainerProps?: IPositioningContainerProps;
  preventDismissOnLostFocus?: boolean;
  preventFocusOnMount?: boolean;
  styles?: IStyleFunctionOrObject<ICoachmarkStyleProps, ICoachmarkStyles>;
  target: HTMLElement | string | null;
  // @deprecated
  teachingBubbleRef?: ITeachingBubble;
  theme?: ITheme;
  // @deprecated
  width?: number;
}

// @public (undocumented)
interface ICoachmarkState {
  alertText?: string;
  beakBottom?: string;
  beakLeft?: string;
  beakRight?: string;
  beakTop?: string;
  entityInnerHostRect: IEntityRect;
  isBeaconAnimating: boolean;
  isCollapsed: boolean;
  isMeasured: boolean;
  isMeasuring: boolean;
  isMouseInProximity: boolean;
  targetAlignment?: RectangleEdge;
  targetPosition?: RectangleEdge;
  transformOrigin?: string;
}

// @public
interface ICoachmarkStyleProps {
  beaconColorOne?: string;
  beaconColorTwo?: string;
  className?: string;
  // @deprecated
  collapsed?: boolean;
  // (undocumented)
  color?: string;
  delayBeforeCoachmarkAnimation?: string;
  entityHostHeight?: string;
  entityHostWidth?: string;
  height?: string;
  isBeaconAnimating: boolean;
  isCollapsed: boolean;
  isMeasured: boolean;
  isMeasuring: boolean;
  theme?: ITheme;
  transformOrigin?: string;
  width?: string;
}

// @public
interface ICoachmarkStyles {
  ariaContainer?: IStyle;
  childrenContainer: IStyle;
  collapsed?: IStyle;
  entityHost?: IStyle;
  entityInnerHost: IStyle;
  pulsingBeacon?: IStyle;
  root?: IStyle;
  rotateAnimationLayer?: IStyle;
  scaleAnimationLayer?: IStyle;
  translateAnimationContainer?: IStyle;
}

// @public (undocumented)
interface IColor extends IRGB, IHSV {
  hex: string;
  str: string;
}

// @public (undocumented)
interface IColorCellProps {
  color?: string;
  id: string;
  index?: number;
  label?: string;
}

// @public (undocumented)
interface IColorPicker {
  color: IColor;
}

// @public (undocumented)
interface IColorPickerGridCellProps {
  borderWidth?: number;
  circle?: boolean;
  color?: string;
  disabled?: boolean;
  height?: number;
  id: string;
  index?: number;
  item: IColorCellProps;
  label?: string;
  onClick?: (item: IColorCellProps) => void;
  onFocus?: (item: IColorCellProps) => void;
  onHover?: (item?: IColorCellProps) => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
  styles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
  theme?: ITheme;
  width?: number;
}

// @public
interface IColorPickerGridCellStyleProps {
  borderWidth?: number;
  circle?: boolean;
  disabled?: boolean;
  height?: number;
  isWhite?: boolean;
  selected?: boolean;
  theme: ITheme;
  width?: number;
}

// @public
interface IColorPickerGridCellStyles {
  colorCell: IStyle;
  svg: IStyle;
}

// @public (undocumented)
interface IColorPickerProps extends IBaseProps<IColorPicker> {
  alphaLabel?: string;
  alphaSliderHidden?: boolean;
  blueLabel?: string;
  className?: string;
  color: string;
  componentRef?: IRefObject<IColorPicker>;
  greenLabel?: string;
  hexLabel?: string;
  onColorChanged?: (color: string, colorObject: IColor) => void;
  redLabel?: string;
  styles?: IStyleFunctionOrObject<IColorPickerStyleProps, IColorPickerStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IColorPickerState {
  // (undocumented)
  color: IColor;
}

// @public (undocumented)
interface IColorPickerStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IColorPickerStyles {
  input?: IStyle;
  panel?: IStyle;
  root?: IStyle;
  table?: IStyle;
  tableHeader?: IStyle;
  tableHexCell?: IStyle;
}

// @public (undocumented)
interface IColorRectangle {
}

// @public (undocumented)
interface IColorRectangleProps extends IBaseProps<IColorRectangle> {
  className?: string;
  color: IColor;
  componentRef?: IRefObject<IColorRectangle>;
  minSize?: number;
  onSVChanged?: (s: number, v: number) => void;
  styles?: IStyleFunctionOrObject<IColorRectangleStyleProps, IColorRectangleStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IColorRectangleStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IColorRectangleStyles {
  dark?: IStyle;
  light?: IStyle;
  root?: IStyle;
  thumb?: IStyle;
}

// @public (undocumented)
interface IColorSlider {
}

// @public (undocumented)
interface IColorSliderProps extends IBaseProps<IColorSlider> {
  className?: string;
  componentRef?: IRefObject<IColorSlider>;
  isAlpha?: boolean;
  maxValue?: number;
  minValue?: number;
  onChange?: (event: React.MouseEvent<HTMLElement>, newValue?: number) => void;
  // @deprecated
  onChanged?: (newValue: number) => void;
  overlayStyle?: any;
  styles?: IStyleFunctionOrObject<IColorSliderStyleProps, IColorSliderStyles>;
  theme?: ITheme;
  thumbColor?: string;
  value?: number;
}

// @public (undocumented)
interface IColorSliderStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IColorSliderStyles {
  root?: IStyle;
  sliderOverlay?: IStyle;
  sliderThumb?: IStyle;
}

// @public (undocumented)
interface IColumn {
  ariaLabel?: string;
  calculatedWidth?: number;
  className?: string;
  columnActionsMode?: ColumnActionsMode;
  currentWidth?: number;
  data?: any;
  fieldName?: string;
  filterAriaLabel?: string;
  groupAriaLabel?: string;
  headerClassName?: string;
  iconClassName?: string;
  iconName?: string;
  // @deprecated
  isCollapsable?: boolean;
  isCollapsible?: boolean;
  isFiltered?: boolean;
  isGrouped?: boolean;
  isIconOnly?: boolean;
  isMenuOpen?: boolean;
  isMultiline?: boolean;
  isPadded?: boolean;
  isResizable?: boolean;
  isRowHeader?: boolean;
  isSorted?: boolean;
  isSortedDescending?: boolean;
  key: string;
  maxWidth?: number;
  minWidth: number;
  name: string;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any;
  onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => any;
  onColumnResize?: (width?: number) => void;
  onRender?: (item?: any, index?: number, column?: IColumn) => any;
  onRenderDivider?: IRenderFunction<IDetailsColumnProps>;
  sortAscendingAriaLabel?: string;
  sortDescendingAriaLabel?: string;
}

// @public (undocumented)
interface IColumnDragDropDetails {
  draggedIndex: number;
  targetIndex: number;
}

// @public (undocumented)
interface IColumnReorderOptions {
  frozenColumnCountFromEnd?: number;
  frozenColumnCountFromStart?: number;
  // @deprecated
  handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;
  onColumnDragStart?: (dragStarted: boolean) => void;
  onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;
  onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}

// @public (undocumented)
interface IComboBox {
  dismissMenu: () => void;
  focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
}

// @public (undocumented)
interface IComboBoxOption extends ISelectableOption {
  styles?: Partial<IComboBoxOptionStyles>;
  useAriaLabelAsText?: boolean;
}

// @public (undocumented)
interface IComboBoxOptionStyles extends IButtonStyles {
  optionText: IStyle;
  optionTextWrapper: IStyle;
}

// @public (undocumented)
interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBox> {
  allowFreeform?: boolean;
  autoComplete?: 'on' | 'off';
  buttonIconProps?: IIconProps;
  caretDownButtonStyles?: Partial<IButtonStyles>;
  comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
  componentRef?: IRefObject<IComboBox>;
  dropdownMaxWidth?: number;
  dropdownWidth?: number;
  getClassNames?: (theme: ITheme, isOpen: boolean, disabled: boolean, required: boolean, focused: boolean, allowFreeForm: boolean, hasErrorMessage: boolean, className?: string) => IComboBoxClassNames;
  isButtonAriaHidden?: boolean;
  keytipProps?: IKeytipProps;
  multiSelect?: boolean;
  onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;
  // @deprecated
  onChanged?: (option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any) => void;
  onItemClick?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;
  onMenuDismissed?: () => void;
  onMenuOpen?: () => void;
  onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;
  onRenderLowerContent?: IRenderFunction<IComboBoxProps>;
  onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;
  onScrollToItem?: (itemIndex: number) => void;
  options: IComboBoxOption[];
  scrollSelectedToTop?: boolean;
  styles?: Partial<IComboBoxStyles>;
  text?: string;
  theme?: ITheme;
  useComboBoxAsMenuWidth?: boolean;
  // @deprecated
  value?: string;
}

// @public (undocumented)
interface IComboBoxState {
  currentOptions: IComboBoxOption[];
  currentPendingValue?: string;
  currentPendingValueValidIndex: number;
  currentPendingValueValidIndexOnHover: number;
  focused?: boolean;
  isOpen?: boolean;
  selectedIndices?: number[];
  suggestedDisplayValue?: string;
}

// @public (undocumented)
interface IComboBoxStyles {
  callout: IStyle;
  container: IStyle;
  divider: IStyle;
  errorMessage: IStyle;
  header: IStyle;
  input: IStyle;
  inputDisabled: IStyle;
  label: IStyle;
  labelDisabled: IStyle;
  optionsContainer: IStyle;
  optionsContainerWrapper: IStyle;
  root: IStyle;
  rootDisabled: IStyle;
  rootDisallowFreeForm: IStyle;
  rootError: IStyle;
  rootFocused: IStyle;
  rootHovered: IStyle;
  rootPressed: IStyle;
}

// @public (undocumented)
interface ICommandBar {
  focus(): void;
  remeasure(): void;
}

// @public (undocumented)
interface ICommandBarData {
  cacheKey: string;
  farItems: ICommandBarItemProps[] | undefined;
  minimumOverflowItems: number;
  overflowItems: ICommandBarItemProps[];
  primaryItems: ICommandBarItemProps[];
}

// @public (undocumented)
interface ICommandBarItemProps extends IContextualMenuItem {
  buttonStyles?: IButtonStyles;
  cacheKey?: string;
  commandBarButtonAs?: IComponentAs<ICommandBarItemProps>;
  iconOnly?: boolean;
  renderedInOverflow?: boolean;
  tooltipHostProps?: ITooltipHostProps;
}

// @public (undocumented)
interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string;
  buttonAs?: IComponentAs<IButtonProps>;
  className?: string;
  componentRef?: IRefObject<ICommandBar>;
  farItems?: ICommandBarItemProps[];
  items: ICommandBarItemProps[];
  onDataGrown?: (movedItem: ICommandBarItemProps) => void;
  onDataReduced?: (movedItem: ICommandBarItemProps) => void;
  onGrowData?: (data: ICommandBarData) => ICommandBarData;
  onReduceData?: (data: ICommandBarData) => ICommandBarData;
  overflowButtonAs?: IComponentAs<IButtonProps>;
  overflowButtonProps?: IButtonProps;
  overflowItems?: ICommandBarItemProps[];
  shiftOnReduce?: Boolean;
  styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ICommandBarStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface ICommandBarStyles {
  // (undocumented)
  primarySet?: IStyle;
  // (undocumented)
  root?: IStyle;
  // (undocumented)
  secondarySet?: IStyle;
}

// @public (undocumented)
class IconBase extends BaseComponent<IIconProps, IIconState> {
  constructor(props: IIconProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class IconButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
module IconFontSizes {
  // (undocumented)
  large: string;

  // (undocumented)
  medium: string;

  // (undocumented)
  small: string;

  // (undocumented)
  xSmall: string;

}

// @public (undocumented)
enum IconNames {
  // (undocumented)
  AADLogo = "AADLogo",
  // (undocumented)
  Accept = "Accept",
  // (undocumented)
  AccessibiltyChecker = "AccessibiltyChecker",
  // (undocumented)
  AccessLogo = "AccessLogo",
  // (undocumented)
  AccessLogoFill = "AccessLogoFill",
  // (undocumented)
  AccountManagement = "AccountManagement",
  // (undocumented)
  Accounts = "Accounts",
  // (undocumented)
  ActionCenter = "ActionCenter",
  // (undocumented)
  ActivateOrders = "ActivateOrders",
  // (undocumented)
  ActivityFeed = "ActivityFeed",
  // (undocumented)
  Add = "Add",
  // (undocumented)
  AddBookmark = "AddBookmark",
  // (undocumented)
  AddEvent = "AddEvent",
  // (undocumented)
  AddFavorite = "AddFavorite",
  // (undocumented)
  AddFavoriteFill = "AddFavoriteFill",
  // (undocumented)
  AddFriend = "AddFriend",
  // (undocumented)
  AddGroup = "AddGroup",
  // (undocumented)
  AddIn = "AddIn",
  // (undocumented)
  AddNotes = "AddNotes",
  // (undocumented)
  AddOnlineMeeting = "AddOnlineMeeting",
  // (undocumented)
  AddPhone = "AddPhone",
  // (undocumented)
  AddTo = "AddTo",
  // (undocumented)
  Admin = "Admin",
  // (undocumented)
  AdminALogo32 = "AdminALogo32",
  // (undocumented)
  AdminALogoFill32 = "AdminALogoFill32",
  // (undocumented)
  AdminALogoInverse32 = "AdminALogoInverse32",
  // (undocumented)
  AdminCLogoInverse32 = "AdminCLogoInverse32",
  // (undocumented)
  AdminDLogoInverse32 = "AdminDLogoInverse32",
  // (undocumented)
  AdminELogoInverse32 = "AdminELogoInverse32",
  // (undocumented)
  AdminLLogoInverse32 = "AdminLLogoInverse32",
  // (undocumented)
  AdminMLogoInverse32 = "AdminMLogoInverse32",
  // (undocumented)
  AdminOLogoInverse32 = "AdminOLogoInverse32",
  // (undocumented)
  AdminPLogoInverse32 = "AdminPLogoInverse32",
  // (undocumented)
  AdminSLogoInverse32 = "AdminSLogoInverse32",
  // (undocumented)
  AdminYLogoInverse32 = "AdminYLogoInverse32",
  // (undocumented)
  Airplane = "Airplane",
  // (undocumented)
  AirplaneSolid = "AirplaneSolid",
  // (undocumented)
  AirTickets = "AirTickets",
  // (undocumented)
  AlarmClock = "AlarmClock",
  // (undocumented)
  Album = "Album",
  // (undocumented)
  AlbumRemove = "AlbumRemove",
  // (undocumented)
  AlertSolid = "AlertSolid",
  // (undocumented)
  AlignCenter = "AlignCenter",
  // (undocumented)
  AlignHorizontalCenter = "AlignHorizontalCenter",
  // (undocumented)
  AlignHorizontalLeft = "AlignHorizontalLeft",
  // (undocumented)
  AlignHorizontalRight = "AlignHorizontalRight",
  // (undocumented)
  AlignJustify = "AlignJustify",
  // (undocumented)
  AlignLeft = "AlignLeft",
  // (undocumented)
  AlignRight = "AlignRight",
  // (undocumented)
  AlignVerticalBottom = "AlignVerticalBottom",
  // (undocumented)
  AlignVerticalCenter = "AlignVerticalCenter",
  // (undocumented)
  AlignVerticalTop = "AlignVerticalTop",
  // (undocumented)
  AllApps = "AllApps",
  // (undocumented)
  AllAppsMirrored = "AllAppsMirrored",
  // (undocumented)
  AllCurrency = "AllCurrency",
  // (undocumented)
  AnalyticsLogo = "AnalyticsLogo",
  // (undocumented)
  AnalyticsQuery = "AnalyticsQuery",
  // (undocumented)
  AnalyticsReport = "AnalyticsReport",
  // (undocumented)
  AnalyticsView = "AnalyticsView",
  // (undocumented)
  AnchorLock = "AnchorLock",
  // (undocumented)
  Annotation = "Annotation",
  // (undocumented)
  AppIconDefault = "AppIconDefault",
  // (undocumented)
  AppIconDefaultAdd = "AppIconDefaultAdd",
  // (undocumented)
  AppIconDefaultList = "AppIconDefaultList",
  // (undocumented)
  Archive = "Archive",
  // (undocumented)
  AreaChart = "AreaChart",
  // (undocumented)
  ArrangeBringForward = "ArrangeBringForward",
  // (undocumented)
  ArrangeBringToFront = "ArrangeBringToFront",
  // (undocumented)
  ArrangeByFrom = "ArrangeByFrom",
  // (undocumented)
  ArrangeSendBackward = "ArrangeSendBackward",
  // (undocumented)
  ArrangeSendToBack = "ArrangeSendToBack",
  // (undocumented)
  Arrivals = "Arrivals",
  // (undocumented)
  ArrowDownRight8 = "ArrowDownRight8",
  // (undocumented)
  ArrowDownRightMirrored8 = "ArrowDownRightMirrored8",
  // (undocumented)
  ArrowTallDownLeft = "ArrowTallDownLeft",
  // (undocumented)
  ArrowTallDownRight = "ArrowTallDownRight",
  // (undocumented)
  ArrowTallUpLeft = "ArrowTallUpLeft",
  // (undocumented)
  ArrowTallUpRight = "ArrowTallUpRight",
  // (undocumented)
  ArrowUpRight = "ArrowUpRight",
  // (undocumented)
  ArrowUpRight8 = "ArrowUpRight8",
  // (undocumented)
  ArrowUpRightMirrored8 = "ArrowUpRightMirrored8",
  // (undocumented)
  Articles = "Articles",
  // (undocumented)
  Ascending = "Ascending",
  // (undocumented)
  AspectRatio = "AspectRatio",
  // (undocumented)
  AssessmentGroup = "AssessmentGroup",
  // (undocumented)
  AssessmentGroupTemplate = "AssessmentGroupTemplate",
  // (undocumented)
  AssetLibrary = "AssetLibrary",
  // (undocumented)
  Assign = "Assign",
  // (undocumented)
  Asterisk = "Asterisk",
  // (undocumented)
  AsteriskSolid = "AsteriskSolid",
  // (undocumented)
  ATPLogo = "ATPLogo",
  // (undocumented)
  Attach = "Attach",
  // (undocumented)
  AustralianRules = "AustralianRules",
  // (undocumented)
  AutoEnhanceOff = "AutoEnhanceOff",
  // (undocumented)
  AutoEnhanceOn = "AutoEnhanceOn",
  // (undocumented)
  AutoFillTemplate = "AutoFillTemplate",
  // (undocumented)
  AutoHeight = "AutoHeight",
  // (undocumented)
  AutoRacing = "AutoRacing",
  // (undocumented)
  AwayStatus = "AwayStatus",
  // (undocumented)
  AzureAPIManagement = "AzureAPIManagement",
  // (undocumented)
  AzureKeyVault = "AzureKeyVault",
  // (undocumented)
  AzureLogo = "AzureLogo",
  // (undocumented)
  AzureServiceEndpoint = "AzureServiceEndpoint",
  // (undocumented)
  Back = "Back",
  // (undocumented)
  BackgroundColor = "BackgroundColor",
  // (undocumented)
  Backlog = "Backlog",
  // (undocumented)
  BacklogBoard = "BacklogBoard",
  // (undocumented)
  BacklogList = "BacklogList",
  // (undocumented)
  BackToWindow = "BackToWindow",
  // (undocumented)
  Badge = "Badge",
  // (undocumented)
  Balloons = "Balloons",
  // (undocumented)
  Bank = "Bank",
  // (undocumented)
  BankSolid = "BankSolid",
  // (undocumented)
  BarChart4 = "BarChart4",
  // (undocumented)
  BarChartHorizontal = "BarChartHorizontal",
  // (undocumented)
  BarChartVertical = "BarChartVertical",
  // (undocumented)
  BarChartVerticalFill = "BarChartVerticalFill",
  // (undocumented)
  BarChartVerticalFilter = "BarChartVerticalFilter",
  // (undocumented)
  BarChartVerticalFilterSolid = "BarChartVerticalFilterSolid",
  // (undocumented)
  Baseball = "Baseball",
  // (undocumented)
  BeerMug = "BeerMug",
  // (undocumented)
  BIDashboard = "BIDashboard",
  // (undocumented)
  BidiLtr = "BidiLtr",
  // (undocumented)
  BidiRtl = "BidiRtl",
  // (undocumented)
  BingLogo = "BingLogo",
  // (undocumented)
  BirthdayCake = "BirthdayCake",
  // (undocumented)
  BlockContact = "BlockContact",
  // (undocumented)
  Blocked = "Blocked",
  // (undocumented)
  Blocked12 = "Blocked12",
  // (undocumented)
  Blocked2 = "Blocked2",
  // (undocumented)
  Blocked2Solid = "Blocked2Solid",
  // (undocumented)
  BlockedSite = "BlockedSite",
  // (undocumented)
  BlockedSiteSolid12 = "BlockedSiteSolid12",
  // (undocumented)
  BlockedSolid = "BlockedSolid",
  // (undocumented)
  Blog = "Blog",
  // (undocumented)
  BlowingSnow = "BlowingSnow",
  // (undocumented)
  Blur = "Blur",
  // (undocumented)
  Boards = "Boards",
  // (undocumented)
  Bold = "Bold",
  // (undocumented)
  BookingsLogo = "BookingsLogo",
  // (undocumented)
  BookmarkReport = "BookmarkReport",
  // (undocumented)
  Bookmarks = "Bookmarks",
  // (undocumented)
  BookmarksMirrored = "BookmarksMirrored",
  // (undocumented)
  BorderDash = "BorderDash",
  // (undocumented)
  BorderDot = "BorderDot",
  // (undocumented)
  BoxAdditionSolid = "BoxAdditionSolid",
  // (undocumented)
  BoxCheckmarkSolid = "BoxCheckmarkSolid",
  // (undocumented)
  BoxMultiplySolid = "BoxMultiplySolid",
  // (undocumented)
  BoxPlaySolid = "BoxPlaySolid",
  // (undocumented)
  BoxSubtractSolid = "BoxSubtractSolid",
  // (undocumented)
  BranchCommit = "BranchCommit",
  // (undocumented)
  BranchCompare = "BranchCompare",
  // (undocumented)
  BranchFork = "BranchFork",
  // (undocumented)
  BranchFork2 = "BranchFork2",
  // (undocumented)
  BranchLocked = "BranchLocked",
  // (undocumented)
  BranchMerge = "BranchMerge",
  // (undocumented)
  BranchPullRequest = "BranchPullRequest",
  // (undocumented)
  BranchSearch = "BranchSearch",
  // (undocumented)
  BranchShelveset = "BranchShelveset",
  // (undocumented)
  Breadcrumb = "Breadcrumb",
  // (undocumented)
  Breakfast = "Breakfast",
  // (undocumented)
  Brightness = "Brightness",
  // (undocumented)
  Broom = "Broom",
  // (undocumented)
  BrowserScreenShot = "BrowserScreenShot",
  // (undocumented)
  BrowserTab = "BrowserTab",
  // (undocumented)
  BrowserTabScreenshot = "BrowserTabScreenshot",
  // (undocumented)
  Brunch = "Brunch",
  // (undocumented)
  Brush = "Brush",
  // (undocumented)
  BucketColor = "BucketColor",
  // (undocumented)
  BucketColorFill = "BucketColorFill",
  // (undocumented)
  BufferTimeAfter = "BufferTimeAfter",
  // (undocumented)
  BufferTimeBefore = "BufferTimeBefore",
  // (undocumented)
  BufferTimeBoth = "BufferTimeBoth",
  // (undocumented)
  Bug = "Bug",
  // (undocumented)
  BugSolid = "BugSolid",
  // (undocumented)
  Build = "Build",
  // (undocumented)
  BuildDefinition = "BuildDefinition",
  // (undocumented)
  BuildIssue = "BuildIssue",
  // (undocumented)
  BuildQueue = "BuildQueue",
  // (undocumented)
  BuildQueueNew = "BuildQueueNew",
  // (undocumented)
  BulkUpload = "BulkUpload",
  // (undocumented)
  BulletedList = "BulletedList",
  // (undocumented)
  BulletedList2 = "BulletedList2",
  // (undocumented)
  BulletedList2Mirrored = "BulletedList2Mirrored",
  // (undocumented)
  BulletedListBullet = "BulletedListBullet",
  // (undocumented)
  BulletedListBulletMirrored = "BulletedListBulletMirrored",
  // (undocumented)
  BulletedListMirrored = "BulletedListMirrored",
  // (undocumented)
  BulletedListText = "BulletedListText",
  // (undocumented)
  BulletedListTextMirrored = "BulletedListTextMirrored",
  // (undocumented)
  Bullseye = "Bullseye",
  // (undocumented)
  Bus = "Bus",
  // (undocumented)
  BusinessCenterLogo = "BusinessCenterLogo",
  // (undocumented)
  BusinessHoursSign = "BusinessHoursSign",
  // (undocumented)
  BusSolid = "BusSolid",
  // (undocumented)
  ButtonControl = "ButtonControl",
  // (undocumented)
  Cafe = "Cafe",
  // (undocumented)
  Cake = "Cake",
  // (undocumented)
  Calculator = "Calculator",
  // (undocumented)
  CalculatorAddition = "CalculatorAddition",
  // (undocumented)
  CalculatorEqualTo = "CalculatorEqualTo",
  // (undocumented)
  CalculatorMultiply = "CalculatorMultiply",
  // (undocumented)
  CalculatorNotEqualTo = "CalculatorNotEqualTo",
  // (undocumented)
  CalculatorSubtract = "CalculatorSubtract",
  // (undocumented)
  Calendar = "Calendar",
  // (undocumented)
  CalendarAgenda = "CalendarAgenda",
  // (undocumented)
  CalendarDay = "CalendarDay",
  // (undocumented)
  CalendarMirrored = "CalendarMirrored",
  // (undocumented)
  CalendarReply = "CalendarReply",
  // (undocumented)
  CalendarSettings = "CalendarSettings",
  // (undocumented)
  CalendarSettingsMirrored = "CalendarSettingsMirrored",
  // (undocumented)
  CalendarWeek = "CalendarWeek",
  // (undocumented)
  CalendarWorkWeek = "CalendarWorkWeek",
  // (undocumented)
  CaloriesAdd = "CaloriesAdd",
  // (undocumented)
  Camera = "Camera",
  // (undocumented)
  CampaignTemplate = "CampaignTemplate",
  // (undocumented)
  Cancel = "Cancel",
  // (undocumented)
  CannedChat = "CannedChat",
  // (undocumented)
  Car = "Car",
  // (undocumented)
  CaretBottomLeftCenter8 = "CaretBottomLeftCenter8",
  // (undocumented)
  CaretBottomLeftSolid8 = "CaretBottomLeftSolid8",
  // (undocumented)
  CaretBottomRightCenter8 = "CaretBottomRightCenter8",
  // (undocumented)
  CaretBottomRightSolid8 = "CaretBottomRightSolid8",
  // (undocumented)
  CaretDown8 = "CaretDown8",
  // (undocumented)
  CaretDownSolid8 = "CaretDownSolid8",
  // (undocumented)
  CaretHollow = "CaretHollow",
  // (undocumented)
  CaretHollowMirrored = "CaretHollowMirrored",
  // (undocumented)
  CaretLeft8 = "CaretLeft8",
  // (undocumented)
  CaretLeftSolid8 = "CaretLeftSolid8",
  // (undocumented)
  CaretRight = "CaretRight",
  // (undocumented)
  CaretRight8 = "CaretRight8",
  // (undocumented)
  CaretRightSolid8 = "CaretRightSolid8",
  // (undocumented)
  CaretSolid = "CaretSolid",
  // (undocumented)
  CaretSolid16 = "CaretSolid16",
  // (undocumented)
  CaretSolidDown = "CaretSolidDown",
  // (undocumented)
  CaretSolidLeft = "CaretSolidLeft",
  // (undocumented)
  CaretSolidMirrored = "CaretSolidMirrored",
  // (undocumented)
  CaretSolidRight = "CaretSolidRight",
  // (undocumented)
  CaretSolidUp = "CaretSolidUp",
  // (undocumented)
  CaretTopLeftCenter8 = "CaretTopLeftCenter8",
  // (undocumented)
  CaretTopLeftSolid8 = "CaretTopLeftSolid8",
  // (undocumented)
  CaretTopRightCenter8 = "CaretTopRightCenter8",
  // (undocumented)
  CaretTopRightSolid8 = "CaretTopRightSolid8",
  // (undocumented)
  CaretUp8 = "CaretUp8",
  // (undocumented)
  CaretUpSolid8 = "CaretUpSolid8",
  // (undocumented)
  Cat = "Cat",
  // (undocumented)
  CellPhone = "CellPhone",
  // (undocumented)
  Certificate = "Certificate",
  // (undocumented)
  CertifiedDatabase = "CertifiedDatabase",
  // (undocumented)
  Chart = "Chart",
  // (undocumented)
  ChartSeries = "ChartSeries",
  // (undocumented)
  ChartTemplate = "ChartTemplate",
  // (undocumented)
  ChartXAngle = "ChartXAngle",
  // (undocumented)
  ChartYAngle = "ChartYAngle",
  // (undocumented)
  Chat = "Chat",
  // (undocumented)
  ChatInviteFriend = "ChatInviteFriend",
  // (undocumented)
  ChatSolid = "ChatSolid",
  // (undocumented)
  Checkbox = "Checkbox",
  // (undocumented)
  CheckboxComposite = "CheckboxComposite",
  // (undocumented)
  CheckboxCompositeReversed = "CheckboxCompositeReversed",
  // (undocumented)
  CheckboxFill = "CheckboxFill",
  // (undocumented)
  CheckboxIndeterminate = "CheckboxIndeterminate",
  // (undocumented)
  CheckedOutByOther12 = "CheckedOutByOther12",
  // (undocumented)
  CheckedOutByYou12 = "CheckedOutByYou12",
  // (undocumented)
  CheckList = "CheckList",
  // (undocumented)
  CheckListCheck = "CheckListCheck",
  // (undocumented)
  CheckListCheckMirrored = "CheckListCheckMirrored",
  // (undocumented)
  CheckListText = "CheckListText",
  // (undocumented)
  CheckListTextMirrored = "CheckListTextMirrored",
  // (undocumented)
  CheckMark = "CheckMark",
  // (undocumented)
  ChevronDown = "ChevronDown",
  // (undocumented)
  ChevronDownEnd6 = "ChevronDownEnd6",
  // (undocumented)
  ChevronDownMed = "ChevronDownMed",
  // (undocumented)
  ChevronDownSmall = "ChevronDownSmall",
  // (undocumented)
  ChevronFold10 = "ChevronFold10",
  // (undocumented)
  ChevronLeft = "ChevronLeft",
  // (undocumented)
  ChevronLeftEnd6 = "ChevronLeftEnd6",
  // (undocumented)
  ChevronLeftMed = "ChevronLeftMed",
  // (undocumented)
  ChevronLeftSmall = "ChevronLeftSmall",
  // (undocumented)
  ChevronRight = "ChevronRight",
  // (undocumented)
  ChevronRightEnd6 = "ChevronRightEnd6",
  // (undocumented)
  ChevronRightMed = "ChevronRightMed",
  // (undocumented)
  ChevronRightSmall = "ChevronRightSmall",
  // (undocumented)
  ChevronUnfold10 = "ChevronUnfold10",
  // (undocumented)
  ChevronUp = "ChevronUp",
  // (undocumented)
  ChevronUpEnd6 = "ChevronUpEnd6",
  // (undocumented)
  ChevronUpMed = "ChevronUpMed",
  // (undocumented)
  ChevronUpSmall = "ChevronUpSmall",
  // (undocumented)
  Childof = "Childof",
  // (undocumented)
  Chopsticks = "Chopsticks",
  // (undocumented)
  ChromeBack = "ChromeBack",
  // (undocumented)
  ChromeBackMirrored = "ChromeBackMirrored",
  // (undocumented)
  ChromeClose = "ChromeClose",
  // (undocumented)
  ChromeFullScreen = "ChromeFullScreen",
  // (undocumented)
  ChromeMinimize = "ChromeMinimize",
  // (undocumented)
  ChromeRestore = "ChromeRestore",
  // (undocumented)
  CircleAddition = "CircleAddition",
  // (undocumented)
  CircleAdditionSolid = "CircleAdditionSolid",
  // (undocumented)
  CircleFill = "CircleFill",
  // (undocumented)
  CircleHalfFull = "CircleHalfFull",
  // (undocumented)
  CirclePause = "CirclePause",
  // (undocumented)
  CirclePauseSolid = "CirclePauseSolid",
  // (undocumented)
  CirclePlus = "CirclePlus",
  // (undocumented)
  CircleRing = "CircleRing",
  // (undocumented)
  CircleShapeSolid = "CircleShapeSolid",
  // (undocumented)
  CircleStop = "CircleStop",
  // (undocumented)
  CircleStopSolid = "CircleStopSolid",
  // (undocumented)
  CityNext = "CityNext",
  // (undocumented)
  CityNext2 = "CityNext2",
  // (undocumented)
  ClassNotebookLogo16 = "ClassNotebookLogo16",
  // (undocumented)
  ClassNotebookLogo32 = "ClassNotebookLogo32",
  // (undocumented)
  ClassNotebookLogoFill16 = "ClassNotebookLogoFill16",
  // (undocumented)
  ClassNotebookLogoFill32 = "ClassNotebookLogoFill32",
  // (undocumented)
  ClassNotebookLogoInverse = "ClassNotebookLogoInverse",
  // (undocumented)
  ClassNotebookLogoInverse16 = "ClassNotebookLogoInverse16",
  // (undocumented)
  ClassNotebookLogoInverse32 = "ClassNotebookLogoInverse32",
  // (undocumented)
  ClassroomLogo = "ClassroomLogo",
  // (undocumented)
  Clear = "Clear",
  // (undocumented)
  ClearFilter = "ClearFilter",
  // (undocumented)
  ClearFormatting = "ClearFormatting",
  // (undocumented)
  ClearFormattingA = "ClearFormattingA",
  // (undocumented)
  ClearFormattingEraser = "ClearFormattingEraser",
  // (undocumented)
  ClearNight = "ClearNight",
  // (undocumented)
  ClipboardSolid = "ClipboardSolid",
  // (undocumented)
  Clock = "Clock",
  // (undocumented)
  CloneToDesktop = "CloneToDesktop",
  // (undocumented)
  ClosedCaption = "ClosedCaption",
  // (undocumented)
  ClosePane = "ClosePane",
  // (undocumented)
  ClosePaneMirrored = "ClosePaneMirrored",
  // (undocumented)
  Cloud = "Cloud",
  // (undocumented)
  CloudAdd = "CloudAdd",
  // (undocumented)
  CloudDownload = "CloudDownload",
  // (undocumented)
  CloudUpload = "CloudUpload",
  // (undocumented)
  CloudWeather = "CloudWeather",
  // (undocumented)
  Cloudy = "Cloudy",
  // (undocumented)
  Cocktails = "Cocktails",
  // (undocumented)
  Code = "Code",
  // (undocumented)
  CodeEdit = "CodeEdit",
  // (undocumented)
  Coffee = "Coffee",
  // (undocumented)
  CoffeeScript = "CoffeeScript",
  // (undocumented)
  CollapseContent = "CollapseContent",
  // (undocumented)
  CollapseContentSingle = "CollapseContentSingle",
  // (undocumented)
  CollapseMenu = "CollapseMenu",
  // (undocumented)
  CollegeFootball = "CollegeFootball",
  // (undocumented)
  CollegeHoops = "CollegeHoops",
  // (undocumented)
  Color = "Color",
  // (undocumented)
  ColorSolid = "ColorSolid",
  // (undocumented)
  ColumnLeftTwoThirds = "ColumnLeftTwoThirds",
  // (undocumented)
  ColumnLeftTwoThirdsEdit = "ColumnLeftTwoThirdsEdit",
  // (undocumented)
  ColumnOptions = "ColumnOptions",
  // (undocumented)
  ColumnRightTwoThirds = "ColumnRightTwoThirds",
  // (undocumented)
  ColumnRightTwoThirdsEdit = "ColumnRightTwoThirdsEdit",
  // (undocumented)
  ColumnVerticalSection = "ColumnVerticalSection",
  // (undocumented)
  Combine = "Combine",
  // (undocumented)
  Combobox = "Combobox",
  // (undocumented)
  CommandPrompt = "CommandPrompt",
  // (undocumented)
  Comment = "Comment",
  // (undocumented)
  CommentAdd = "CommentAdd",
  // (undocumented)
  CommentNext = "CommentNext",
  // (undocumented)
  CommentPrevious = "CommentPrevious",
  // (undocumented)
  CommentUrgent = "CommentUrgent",
  // (undocumented)
  Commitments = "Commitments",
  // (undocumented)
  Communications = "Communications",
  // (undocumented)
  CompanyDirectory = "CompanyDirectory",
  // (undocumented)
  CompanyDirectoryMirrored = "CompanyDirectoryMirrored",
  // (undocumented)
  CompassNW = "CompassNW",
  // (undocumented)
  Completed = "Completed",
  // (undocumented)
  CompletedSolid = "CompletedSolid",
  // (undocumented)
  ConfigurationSolid = "ConfigurationSolid",
  // (undocumented)
  ConnectContacts = "ConnectContacts",
  // (undocumented)
  ConstructionCone = "ConstructionCone",
  // (undocumented)
  ConstructionConeSolid = "ConstructionConeSolid",
  // (undocumented)
  Contact = "Contact",
  // (undocumented)
  ContactCard = "ContactCard",
  // (undocumented)
  ContactCardSettings = "ContactCardSettings",
  // (undocumented)
  ContactCardSettingsMirrored = "ContactCardSettingsMirrored",
  // (undocumented)
  ContactInfo = "ContactInfo",
  // (undocumented)
  ContactLink = "ContactLink",
  // (undocumented)
  ContactList = "ContactList",
  // (undocumented)
  ContextMenu = "ContextMenu",
  // (undocumented)
  Contrast = "Contrast",
  // (undocumented)
  Copy = "Copy",
  // (undocumented)
  Cotton = "Cotton",
  // (undocumented)
  Coupon = "Coupon",
  // (undocumented)
  CPlusPlus = "CPlusPlus",
  // (undocumented)
  CPlusPlusLanguage = "CPlusPlusLanguage",
  // (undocumented)
  CreateMailRule = "CreateMailRule",
  // (undocumented)
  Cricket = "Cricket",
  // (undocumented)
  CRMCustomerInsightsApp = "CRMCustomerInsightsApp",
  // (undocumented)
  CRMProcesses = "CRMProcesses",
  // (undocumented)
  CRMReport = "CRMReport",
  // (undocumented)
  CRMServices = "CRMServices",
  // (undocumented)
  Crop = "Crop",
  // (undocumented)
  Crown = "Crown",
  // (undocumented)
  CrownSolid = "CrownSolid",
  // (undocumented)
  CSharp = "CSharp",
  // (undocumented)
  CSharpLanguage = "CSharpLanguage",
  // (undocumented)
  CSS = "CSS",
  // (undocumented)
  CustomizeToolbar = "CustomizeToolbar",
  // (undocumented)
  CustomList = "CustomList",
  // (undocumented)
  CustomListMirrored = "CustomListMirrored",
  // (undocumented)
  Cut = "Cut",
  // (undocumented)
  Cycling = "Cycling",
  // (undocumented)
  D365TalentHRCore = "D365TalentHRCore",
  // (undocumented)
  D365TalentInsight = "D365TalentInsight",
  // (undocumented)
  D365TalentLearn = "D365TalentLearn",
  // (undocumented)
  DashboardAdd = "DashboardAdd",
  // (undocumented)
  Database = "Database",
  // (undocumented)
  DatabaseSync = "DatabaseSync",
  // (undocumented)
  DataConnectionLibrary = "DataConnectionLibrary",
  // (undocumented)
  Dataflows = "Dataflows",
  // (undocumented)
  DateTime = "DateTime",
  // (undocumented)
  DateTime2 = "DateTime2",
  // (undocumented)
  DateTimeMirrored = "DateTimeMirrored",
  // (undocumented)
  DeactivateOrders = "DeactivateOrders",
  // (undocumented)
  Decimals = "Decimals",
  // (undocumented)
  DecisionSolid = "DecisionSolid",
  // (undocumented)
  DeclineCall = "DeclineCall",
  // (undocumented)
  DecreaseIndentArrow = "DecreaseIndentArrow",
  // (undocumented)
  DecreaseIndentArrowMirrored = "DecreaseIndentArrowMirrored",
  // (undocumented)
  DecreaseIndentLegacy = "DecreaseIndentLegacy",
  // (undocumented)
  DecreaseIndentText = "DecreaseIndentText",
  // (undocumented)
  DecreaseIndentTextMirrored = "DecreaseIndentTextMirrored",
  // (undocumented)
  DefaultRatio = "DefaultRatio",
  // (undocumented)
  DefectSolid = "DefectSolid",
  // (undocumented)
  Delete = "Delete",
  // (undocumented)
  DeleteColumns = "DeleteColumns",
  // (undocumented)
  DeleteRows = "DeleteRows",
  // (undocumented)
  DeleteRowsMirrored = "DeleteRowsMirrored",
  // (undocumented)
  DeleteTable = "DeleteTable",
  // (undocumented)
  DeliveryTruck = "DeliveryTruck",
  // (undocumented)
  DelveAnalytics = "DelveAnalytics",
  // (undocumented)
  DelveAnalyticsLogo = "DelveAnalyticsLogo",
  // (undocumented)
  DelveLogo = "DelveLogo",
  // (undocumented)
  DelveLogoFill = "DelveLogoFill",
  // (undocumented)
  DelveLogoInverse = "DelveLogoInverse",
  // (undocumented)
  Deploy = "Deploy",
  // (undocumented)
  Descending = "Descending",
  // (undocumented)
  Design = "Design",
  // (undocumented)
  DesktopScreenshot = "DesktopScreenshot",
  // (undocumented)
  DeveloperTools = "DeveloperTools",
  // (undocumented)
  Devices2 = "Devices2",
  // (undocumented)
  Devices3 = "Devices3",
  // (undocumented)
  Devices4 = "Devices4",
  // (undocumented)
  Diagnostic = "Diagnostic",
  // (undocumented)
  DiagnosticDataBarTooltip = "DiagnosticDataBarTooltip",
  // (undocumented)
  Dialpad = "Dialpad",
  // (undocumented)
  Diamond = "Diamond",
  // (undocumented)
  DiamondSolid = "DiamondSolid",
  // (undocumented)
  Dictionary = "Dictionary",
  // (undocumented)
  DictionaryRemove = "DictionaryRemove",
  // (undocumented)
  DietPlanNotebook = "DietPlanNotebook",
  // (undocumented)
  DiffInline = "DiffInline",
  // (undocumented)
  DiffSideBySide = "DiffSideBySide",
  // (undocumented)
  DisableUpdates = "DisableUpdates",
  // (undocumented)
  Dislike = "Dislike",
  // (undocumented)
  DislikeSolid = "DislikeSolid",
  // (undocumented)
  DistributeDown = "DistributeDown",
  // (undocumented)
  DockLeft = "DockLeft",
  // (undocumented)
  DockLeftMirrored = "DockLeftMirrored",
  // (undocumented)
  DockRight = "DockRight",
  // (undocumented)
  DocLibrary = "DocLibrary",
  // (undocumented)
  DocsLogoInverse = "DocsLogoInverse",
  // (undocumented)
  Document = "Document",
  // (undocumented)
  DocumentApproval = "DocumentApproval",
  // (undocumented)
  Documentation = "Documentation",
  // (undocumented)
  DocumentManagement = "DocumentManagement",
  // (undocumented)
  DocumentReply = "DocumentReply",
  // (undocumented)
  DocumentSearch = "DocumentSearch",
  // (undocumented)
  DocumentSet = "DocumentSet",
  // (undocumented)
  DOM = "DOM",
  // (undocumented)
  DonutChart = "DonutChart",
  // (undocumented)
  Door = "Door",
  // (undocumented)
  DoubleBookmark = "DoubleBookmark",
  // (undocumented)
  DoubleChevronDown = "DoubleChevronDown",
  // (undocumented)
  DoubleChevronDown12 = "DoubleChevronDown12",
  // (undocumented)
  DoubleChevronDown8 = "DoubleChevronDown8",
  // (undocumented)
  DoubleChevronLeft = "DoubleChevronLeft",
  // (undocumented)
  DoubleChevronLeft12 = "DoubleChevronLeft12",
  // (undocumented)
  DoubleChevronLeft8 = "DoubleChevronLeft8",
  // (undocumented)
  DoubleChevronLeftMed = "DoubleChevronLeftMed",
  // (undocumented)
  DoubleChevronLeftMedMirrored = "DoubleChevronLeftMedMirrored",
  // (undocumented)
  DoubleChevronRight = "DoubleChevronRight",
  // (undocumented)
  DoubleChevronRight12 = "DoubleChevronRight12",
  // (undocumented)
  DoubleChevronRight8 = "DoubleChevronRight8",
  // (undocumented)
  DoubleChevronUp = "DoubleChevronUp",
  // (undocumented)
  DoubleChevronUp12 = "DoubleChevronUp12",
  // (undocumented)
  DoubleChevronUp8 = "DoubleChevronUp8",
  // (undocumented)
  DoubleColumn = "DoubleColumn",
  // (undocumented)
  DoubleColumnEdit = "DoubleColumnEdit",
  // (undocumented)
  DoubleDownArrow = "DoubleDownArrow",
  // (undocumented)
  Down = "Down",
  // (undocumented)
  Download = "Download",
  // (undocumented)
  DownloadDocument = "DownloadDocument",
  // (undocumented)
  DragObject = "DragObject",
  // (undocumented)
  DrillDown = "DrillDown",
  // (undocumented)
  DrillDownSolid = "DrillDownSolid",
  // (undocumented)
  DrillExpand = "DrillExpand",
  // (undocumented)
  DrillShow = "DrillShow",
  // (undocumented)
  DrillThrough = "DrillThrough",
  // (undocumented)
  DRM = "DRM",
  // (undocumented)
  Drop = "Drop",
  // (undocumented)
  Dropdown = "Dropdown",
  // (undocumented)
  DropShapeSolid = "DropShapeSolid",
  // (undocumented)
  DuplicateRow = "DuplicateRow",
  // (undocumented)
  Duststorm = "Duststorm",
  // (undocumented)
  Dynamics365Logo = "Dynamics365Logo",
  // (undocumented)
  DynamicSMBLogo = "DynamicSMBLogo",
  // (undocumented)
  EaseOfAccess = "EaseOfAccess",
  // (undocumented)
  EatDrink = "EatDrink",
  // (undocumented)
  EdgeLogo = "EdgeLogo",
  // (undocumented)
  Edit = "Edit",
  // (undocumented)
  EditContact = "EditContact",
  // (undocumented)
  EditCreate = "EditCreate",
  // (undocumented)
  EditMail = "EditMail",
  // (undocumented)
  EditMirrored = "EditMirrored",
  // (undocumented)
  EditNote = "EditNote",
  // (undocumented)
  EditPhoto = "EditPhoto",
  // (undocumented)
  EditSolid12 = "EditSolid12",
  // (undocumented)
  EditSolidMirrored12 = "EditSolidMirrored12",
  // (undocumented)
  EditStyle = "EditStyle",
  // (undocumented)
  Education = "Education",
  // (undocumented)
  Ellipse = "Ellipse",
  // (undocumented)
  Embed = "Embed",
  // (undocumented)
  EMI = "EMI",
  // (undocumented)
  Emoji = "Emoji",
  // (undocumented)
  Emoji2 = "Emoji2",
  // (undocumented)
  EmojiDisappointed = "EmojiDisappointed",
  // (undocumented)
  EmojiNeutral = "EmojiNeutral",
  // (undocumented)
  EmojiTabSymbols = "EmojiTabSymbols",
  // (undocumented)
  EmptyRecycleBin = "EmptyRecycleBin",
  // (undocumented)
  Encryption = "Encryption",
  // (undocumented)
  EngineeringGroup = "EngineeringGroup",
  // (undocumented)
  EntryDecline = "EntryDecline",
  // (undocumented)
  EntryView = "EntryView",
  // (undocumented)
  Equalizer = "Equalizer",
  // (undocumented)
  EraseTool = "EraseTool",
  // (undocumented)
  Error = "Error",
  // (undocumented)
  ErrorBadge = "ErrorBadge",
  // (undocumented)
  Event = "Event",
  // (undocumented)
  Event12 = "Event12",
  // (undocumented)
  EventAccepted = "EventAccepted",
  // (undocumented)
  EventDate = "EventDate",
  // (undocumented)
  EventDateMissed12 = "EventDateMissed12",
  // (undocumented)
  EventDeclined = "EventDeclined",
  // (undocumented)
  EventInfo = "EventInfo",
  // (undocumented)
  EventTentative = "EventTentative",
  // (undocumented)
  EventTentativeMirrored = "EventTentativeMirrored",
  // (undocumented)
  ExcelDocument = "ExcelDocument",
  // (undocumented)
  ExcelLogo = "ExcelLogo",
  // (undocumented)
  ExcelLogo16 = "ExcelLogo16",
  // (undocumented)
  ExcelLogoFill = "ExcelLogoFill",
  // (undocumented)
  ExcelLogoFill16 = "ExcelLogoFill16",
  // (undocumented)
  ExcelLogoInverse = "ExcelLogoInverse",
  // (undocumented)
  ExcelLogoInverse16 = "ExcelLogoInverse16",
  // (undocumented)
  ExchangeLogo = "ExchangeLogo",
  // (undocumented)
  ExchangeLogoFill = "ExchangeLogoFill",
  // (undocumented)
  ExchangeLogoInverse = "ExchangeLogoInverse",
  // (undocumented)
  ExerciseTracker = "ExerciseTracker",
  // (undocumented)
  ExpandMenu = "ExpandMenu",
  // (undocumented)
  ExploreContent = "ExploreContent",
  // (undocumented)
  ExploreContentSingle = "ExploreContentSingle",
  // (undocumented)
  ExploreData = "ExploreData",
  // (undocumented)
  Export = "Export",
  // (undocumented)
  ExportMirrored = "ExportMirrored",
  // (undocumented)
  ExternalBuild = "ExternalBuild",
  // (undocumented)
  ExternalTFVC = "ExternalTFVC",
  // (undocumented)
  ExternalXAML = "ExternalXAML",
  // (undocumented)
  Eyedropper = "Eyedropper",
  // (undocumented)
  EyeShadow = "EyeShadow",
  // (undocumented)
  F12DevTools = "F12DevTools",
  // (undocumented)
  FabricAssetLibrary = "FabricAssetLibrary",
  // (undocumented)
  FabricDataConnectionLibrary = "FabricDataConnectionLibrary",
  // (undocumented)
  FabricDocLibrary = "FabricDocLibrary",
  // (undocumented)
  FabricFolder = "FabricFolder",
  // (undocumented)
  FabricFolderFill = "FabricFolderFill",
  // (undocumented)
  FabricFolderSearch = "FabricFolderSearch",
  // (undocumented)
  FabricFormLibrary = "FabricFormLibrary",
  // (undocumented)
  FabricFormLibraryMirrored = "FabricFormLibraryMirrored",
  // (undocumented)
  FabricMovetoFolder = "FabricMovetoFolder",
  // (undocumented)
  FabricNetworkFolder = "FabricNetworkFolder",
  // (undocumented)
  FabricNewFolder = "FabricNewFolder",
  // (undocumented)
  FabricOpenFolderHorizontal = "FabricOpenFolderHorizontal",
  // (undocumented)
  FabricPictureLibrary = "FabricPictureLibrary",
  // (undocumented)
  FabricPublicFolder = "FabricPublicFolder",
  // (undocumented)
  FabricReportLibrary = "FabricReportLibrary",
  // (undocumented)
  FabricReportLibraryMirrored = "FabricReportLibraryMirrored",
  // (undocumented)
  FabricSyncFolder = "FabricSyncFolder",
  // (undocumented)
  FabricTextHighlight = "FabricTextHighlight",
  // (undocumented)
  FabricTextHighlightComposite = "FabricTextHighlightComposite",
  // (undocumented)
  FabricUnsyncFolder = "FabricUnsyncFolder",
  // (undocumented)
  FabricUserFolder = "FabricUserFolder",
  // (undocumented)
  Family = "Family",
  // (undocumented)
  FangBody = "FangBody",
  // (undocumented)
  FastForward = "FastForward",
  // (undocumented)
  FastMode = "FastMode",
  // (undocumented)
  Favicon = "Favicon",
  // (undocumented)
  FavoriteList = "FavoriteList",
  // (undocumented)
  FavoriteStar = "FavoriteStar",
  // (undocumented)
  FavoriteStarFill = "FavoriteStarFill",
  // (undocumented)
  Fax = "Fax",
  // (undocumented)
  Feedback = "Feedback",
  // (undocumented)
  FeedbackRequestMirroredSolid = "FeedbackRequestMirroredSolid",
  // (undocumented)
  FeedbackRequestSolid = "FeedbackRequestSolid",
  // (undocumented)
  FeedbackResponseSolid = "FeedbackResponseSolid",
  // (undocumented)
  Ferry = "Ferry",
  // (undocumented)
  FerrySolid = "FerrySolid",
  // (undocumented)
  FieldChanged = "FieldChanged",
  // (undocumented)
  FieldEmpty = "FieldEmpty",
  // (undocumented)
  FieldFilled = "FieldFilled",
  // (undocumented)
  FieldNotChanged = "FieldNotChanged",
  // (undocumented)
  FieldReadOnly = "FieldReadOnly",
  // (undocumented)
  FieldRequired = "FieldRequired",
  // (undocumented)
  FileASPX = "FileASPX",
  // (undocumented)
  FileBug = "FileBug",
  // (undocumented)
  FileCode = "FileCode",
  // (undocumented)
  FileComment = "FileComment",
  // (undocumented)
  FileCSS = "FileCSS",
  // (undocumented)
  FileHTML = "FileHTML",
  // (undocumented)
  FileImage = "FileImage",
  // (undocumented)
  FileJAVA = "FileJAVA",
  // (undocumented)
  FileLess = "FileLess",
  // (undocumented)
  FilePDB = "FilePDB",
  // (undocumented)
  FileRequest = "FileRequest",
  // (undocumented)
  FileSass = "FileSass",
  // (undocumented)
  FileSQL = "FileSQL",
  // (undocumented)
  FileSymlink = "FileSymlink",
  // (undocumented)
  FileTemplate = "FileTemplate",
  // (undocumented)
  FileTypeSolution = "FileTypeSolution",
  // (undocumented)
  FileYML = "FileYML",
  // (undocumented)
  Filter = "Filter",
  // (undocumented)
  Filters = "Filters",
  // (undocumented)
  FilterSettings = "FilterSettings",
  // (undocumented)
  FilterSolid = "FilterSolid",
  // (undocumented)
  FiltersSolid = "FiltersSolid",
  // (undocumented)
  Financial = "Financial",
  // (undocumented)
  FinancialMirroredSolid = "FinancialMirroredSolid",
  // (undocumented)
  FinancialSolid = "FinancialSolid",
  // (undocumented)
  Fingerprint = "Fingerprint",
  // (undocumented)
  FitPage = "FitPage",
  // (undocumented)
  FitWidth = "FitWidth",
  // (undocumented)
  FiveTileGrid = "FiveTileGrid",
  // (undocumented)
  Flag = "Flag",
  // (undocumented)
  FlameSolid = "FlameSolid",
  // (undocumented)
  Flashlight = "Flashlight",
  // (undocumented)
  FlickDown = "FlickDown",
  // (undocumented)
  FlickLeft = "FlickLeft",
  // (undocumented)
  FlickRight = "FlickRight",
  // (undocumented)
  FlickUp = "FlickUp",
  // (undocumented)
  Flow = "Flow",
  // (undocumented)
  FlowChart = "FlowChart",
  // (undocumented)
  Flower = "Flower",
  // (undocumented)
  FocalPoint = "FocalPoint",
  // (undocumented)
  Focus = "Focus",
  // (undocumented)
  Fog = "Fog",
  // (undocumented)
  Folder = "Folder",
  // (undocumented)
  FolderFill = "FolderFill",
  // (undocumented)
  FolderHorizontal = "FolderHorizontal",
  // (undocumented)
  FolderList = "FolderList",
  // (undocumented)
  FolderListMirrored = "FolderListMirrored",
  // (undocumented)
  FolderOpen = "FolderOpen",
  // (undocumented)
  FolderQuery = "FolderQuery",
  // (undocumented)
  FolderSearch = "FolderSearch",
  // (undocumented)
  FollowUser = "FollowUser",
  // (undocumented)
  Font = "Font",
  // (undocumented)
  FontColor = "FontColor",
  // (undocumented)
  FontColorA = "FontColorA",
  // (undocumented)
  FontColorSwatch = "FontColorSwatch",
  // (undocumented)
  FontDecrease = "FontDecrease",
  // (undocumented)
  FontIncrease = "FontIncrease",
  // (undocumented)
  FontSize = "FontSize",
  // (undocumented)
  Footer = "Footer",
  // (undocumented)
  FormLibrary = "FormLibrary",
  // (undocumented)
  FormLibraryMirrored = "FormLibraryMirrored",
  // (undocumented)
  Forward = "Forward",
  // (undocumented)
  ForwardEvent = "ForwardEvent",
  // (undocumented)
  Freezing = "Freezing",
  // (undocumented)
  Frigid = "Frigid",
  // (undocumented)
  FrontCamera = "FrontCamera",
  // (undocumented)
  FSharp = "FSharp",
  // (undocumented)
  FSharpLanguage = "FSharpLanguage",
  // (undocumented)
  FullCircleMask = "FullCircleMask",
  // (undocumented)
  FullHistory = "FullHistory",
  // (undocumented)
  FullScreen = "FullScreen",
  // (undocumented)
  FullWidth = "FullWidth",
  // (undocumented)
  FullWidthEdit = "FullWidthEdit",
  // (undocumented)
  FunctionalManagerDashboard = "FunctionalManagerDashboard",
  // (undocumented)
  FunnelChart = "FunnelChart",
  // (undocumented)
  GallatinLogo = "GallatinLogo",
  // (undocumented)
  Game = "Game",
  // (undocumented)
  Generate = "Generate",
  // (undocumented)
  GenericScan = "GenericScan",
  // (undocumented)
  GenericScanFilled = "GenericScanFilled",
  // (undocumented)
  Giftbox = "Giftbox",
  // (undocumented)
  GiftboxOpen = "GiftboxOpen",
  // (undocumented)
  GiftBoxSolid = "GiftBoxSolid",
  // (undocumented)
  GiftCard = "GiftCard",
  // (undocumented)
  GitGraph = "GitGraph",
  // (undocumented)
  Glasses = "Glasses",
  // (undocumented)
  Glimmer = "Glimmer",
  // (undocumented)
  GlobalNavButton = "GlobalNavButton",
  // (undocumented)
  Globe = "Globe",
  // (undocumented)
  Globe2 = "Globe2",
  // (undocumented)
  GlobeFavorite = "GlobeFavorite",
  // (undocumented)
  Go = "Go",
  // (undocumented)
  Golf = "Golf",
  // (undocumented)
  GoMirrored = "GoMirrored",
  // (undocumented)
  GotoToday = "GotoToday",
  // (undocumented)
  GridViewLarge = "GridViewLarge",
  // (undocumented)
  GridViewMedium = "GridViewMedium",
  // (undocumented)
  GridViewSmall = "GridViewSmall",
  // (undocumented)
  GripperBarHorizontal = "GripperBarHorizontal",
  // (undocumented)
  GripperBarVertical = "GripperBarVertical",
  // (undocumented)
  GripperDotsVertical = "GripperDotsVertical",
  // (undocumented)
  GripperTool = "GripperTool",
  // (undocumented)
  Group = "Group",
  // (undocumented)
  GroupedAscending = "GroupedAscending",
  // (undocumented)
  GroupedDescending = "GroupedDescending",
  // (undocumented)
  GroupedList = "GroupedList",
  // (undocumented)
  GroupObject = "GroupObject",
  // (undocumented)
  GUID = "GUID",
  // (undocumented)
  Guitar = "Guitar",
  // (undocumented)
  HailDay = "HailDay",
  // (undocumented)
  HailNight = "HailNight",
  // (undocumented)
  HalfAlpha = "HalfAlpha",
  // (undocumented)
  HalfCircle = "HalfCircle",
  // (undocumented)
  HandsFree = "HandsFree",
  // (undocumented)
  Handwriting = "Handwriting",
  // (undocumented)
  HardDrive = "HardDrive",
  // (undocumented)
  HardDriveGroup = "HardDriveGroup",
  // (undocumented)
  HardDriveLock = "HardDriveLock",
  // (undocumented)
  HardDriveUnlock = "HardDriveUnlock",
  // (undocumented)
  Header = "Header",
  // (undocumented)
  Header1 = "Header1",
  // (undocumented)
  Header2 = "Header2",
  // (undocumented)
  Header3 = "Header3",
  // (undocumented)
  Header4 = "Header4",
  // (undocumented)
  Headset = "Headset",
  // (undocumented)
  HeadsetSolid = "HeadsetSolid",
  // (undocumented)
  Health = "Health",
  // (undocumented)
  HealthSolid = "HealthSolid",
  // (undocumented)
  Heart = "Heart",
  // (undocumented)
  HeartBroken = "HeartBroken",
  // (undocumented)
  HeartFill = "HeartFill",
  // (undocumented)
  Help = "Help",
  // (undocumented)
  HelpMirrored = "HelpMirrored",
  // (undocumented)
  Hexagon = "Hexagon",
  // (undocumented)
  Hide = "Hide",
  // (undocumented)
  Hide2 = "Hide2",
  // (undocumented)
  Highlight = "Highlight",
  // (undocumented)
  HighlightMappedShapes = "HighlightMappedShapes",
  // (undocumented)
  HintText = "HintText",
  // (undocumented)
  HistoricalWeather = "HistoricalWeather",
  // (undocumented)
  History = "History",
  // (undocumented)
  Home = "Home",
  // (undocumented)
  HomeGroup = "HomeGroup",
  // (undocumented)
  HomeSolid = "HomeSolid",
  // (undocumented)
  HorizontalDistributeCenter = "HorizontalDistributeCenter",
  // (undocumented)
  Hospital = "Hospital",
  // (undocumented)
  Hotel = "Hotel",
  // (undocumented)
  HourGlass = "HourGlass",
  // (undocumented)
  IconSetsFlag = "IconSetsFlag",
  // (undocumented)
  IDBadge = "IDBadge",
  // (undocumented)
  ImageCrosshair = "ImageCrosshair",
  // (undocumented)
  ImageDiff = "ImageDiff",
  // (undocumented)
  ImagePixel = "ImagePixel",
  // (undocumented)
  ImageSearch = "ImageSearch",
  // (undocumented)
  Import = "Import",
  // (undocumented)
  ImportAllMirrored = "ImportAllMirrored",
  // (undocumented)
  Important = "Important",
  // (undocumented)
  ImportMirrored = "ImportMirrored",
  // (undocumented)
  Inbox = "Inbox",
  // (undocumented)
  InboxCheck = "InboxCheck",
  // (undocumented)
  IncidentTriangle = "IncidentTriangle",
  // (undocumented)
  IncreaseIndentArrow = "IncreaseIndentArrow",
  // (undocumented)
  IncreaseIndentArrowMirrored = "IncreaseIndentArrowMirrored",
  // (undocumented)
  IncreaseIndentLegacy = "IncreaseIndentLegacy",
  // (undocumented)
  IncreaseIndentText = "IncreaseIndentText",
  // (undocumented)
  IncreaseIndentTextMirrored = "IncreaseIndentTextMirrored",
  // (undocumented)
  Info = "Info",
  // (undocumented)
  Info2 = "Info2",
  // (undocumented)
  InfoSolid = "InfoSolid",
  // (undocumented)
  InsertColumnsLeft = "InsertColumnsLeft",
  // (undocumented)
  InsertColumnsRight = "InsertColumnsRight",
  // (undocumented)
  InsertRowsAbove = "InsertRowsAbove",
  // (undocumented)
  InsertRowsBelow = "InsertRowsBelow",
  // (undocumented)
  InsertSignatureLine = "InsertSignatureLine",
  // (undocumented)
  InsertTextBox = "InsertTextBox",
  // (undocumented)
  InstallToDrive = "InstallToDrive",
  // (undocumented)
  InternetSharing = "InternetSharing",
  // (undocumented)
  IRMForward = "IRMForward",
  // (undocumented)
  IRMForwardMirrored = "IRMForwardMirrored",
  // (undocumented)
  IRMReply = "IRMReply",
  // (undocumented)
  IRMReplyMirrored = "IRMReplyMirrored",
  // (undocumented)
  IssueSolid = "IssueSolid",
  // (undocumented)
  IssueTracking = "IssueTracking",
  // (undocumented)
  IssueTrackingMirrored = "IssueTrackingMirrored",
  // (undocumented)
  Italic = "Italic",
  // (undocumented)
  JavaScriptLanguage = "JavaScriptLanguage",
  // (undocumented)
  JoinOnlineMeeting = "JoinOnlineMeeting",
  // (undocumented)
  JS = "JS",
  // (undocumented)
  KaizalaLogo = "KaizalaLogo",
  // (undocumented)
  KeyboardClassic = "KeyboardClassic",
  // (undocumented)
  KnowledgeArticle = "KnowledgeArticle",
  // (undocumented)
  Label = "Label",
  // (undocumented)
  LadybugSolid = "LadybugSolid",
  // (undocumented)
  Lamp = "Lamp",
  // (undocumented)
  LandscapeOrientation = "LandscapeOrientation",
  // (undocumented)
  LaptopSecure = "LaptopSecure",
  // (undocumented)
  LaptopSelected = "LaptopSelected",
  // (undocumented)
  LargeGrid = "LargeGrid",
  // (undocumented)
  Leave = "Leave",
  // (undocumented)
  Library = "Library",
  // (undocumented)
  Lifesaver = "Lifesaver",
  // (undocumented)
  LifesaverLock = "LifesaverLock",
  // (undocumented)
  Light = "Light",
  // (undocumented)
  Lightbulb = "Lightbulb",
  // (undocumented)
  LightningBolt = "LightningBolt",
  // (undocumented)
  LightWeight = "LightWeight",
  // (undocumented)
  Like = "Like",
  // (undocumented)
  LikeSolid = "LikeSolid",
  // (undocumented)
  Line = "Line",
  // (undocumented)
  LineChart = "LineChart",
  // (undocumented)
  LineSpacing = "LineSpacing",
  // (undocumented)
  LineStyle = "LineStyle",
  // (undocumented)
  LineThickness = "LineThickness",
  // (undocumented)
  Link = "Link",
  // (undocumented)
  Link12 = "Link12",
  // (undocumented)
  LinkedDatabase = "LinkedDatabase",
  // (undocumented)
  LinkedInLogo = "LinkedInLogo",
  // (undocumented)
  List = "List",
  // (undocumented)
  ListMirrored = "ListMirrored",
  // (undocumented)
  LocaleLanguage = "LocaleLanguage",
  // (undocumented)
  Location = "Location",
  // (undocumented)
  LocationCircle = "LocationCircle",
  // (undocumented)
  LocationDot = "LocationDot",
  // (undocumented)
  LocationFill = "LocationFill",
  // (undocumented)
  LocationOutline = "LocationOutline",
  // (undocumented)
  Lock = "Lock",
  // (undocumented)
  Lock12 = "Lock12",
  // (undocumented)
  LockSolid = "LockSolid",
  // (undocumented)
  LogRemove = "LogRemove",
  // (undocumented)
  LookupEntities = "LookupEntities",
  // (undocumented)
  LowerBrightness = "LowerBrightness",
  // (undocumented)
  LyncLogo = "LyncLogo",
  // (undocumented)
  M365InvoicingLogo = "M365InvoicingLogo",
  // (undocumented)
  Mail = "Mail",
  // (undocumented)
  MailAlert = "MailAlert",
  // (undocumented)
  MailAttached = "MailAttached",
  // (undocumented)
  MailCheck = "MailCheck",
  // (undocumented)
  MailFill = "MailFill",
  // (undocumented)
  MailForward = "MailForward",
  // (undocumented)
  MailForwardMirrored = "MailForwardMirrored",
  // (undocumented)
  MailLowImportance = "MailLowImportance",
  // (undocumented)
  MailOptions = "MailOptions",
  // (undocumented)
  MailPause = "MailPause",
  // (undocumented)
  MailReminder = "MailReminder",
  // (undocumented)
  MailRepeat = "MailRepeat",
  // (undocumented)
  MailReply = "MailReply",
  // (undocumented)
  MailReplyAll = "MailReplyAll",
  // (undocumented)
  MailReplyAllMirrored = "MailReplyAllMirrored",
  // (undocumented)
  MailReplyMirrored = "MailReplyMirrored",
  // (undocumented)
  MailSchedule = "MailSchedule",
  // (undocumented)
  MailSolid = "MailSolid",
  // (undocumented)
  MailTentative = "MailTentative",
  // (undocumented)
  MailTentativeMirrored = "MailTentativeMirrored",
  // (undocumented)
  MailUndelivered = "MailUndelivered",
  // (undocumented)
  ManagerSelfService = "ManagerSelfService",
  // (undocumented)
  Manufacturing = "Manufacturing",
  // (undocumented)
  MapDirections = "MapDirections",
  // (undocumented)
  MapLayers = "MapLayers",
  // (undocumented)
  MapPin = "MapPin",
  // (undocumented)
  MapPinSolid = "MapPinSolid",
  // (undocumented)
  MarkDownLanguage = "MarkDownLanguage",
  // (undocumented)
  Market = "Market",
  // (undocumented)
  MarketDown = "MarketDown",
  // (undocumented)
  MasterDatabase = "MasterDatabase",
  // (undocumented)
  MaximumValue = "MaximumValue",
  // (undocumented)
  Medal = "Medal",
  // (undocumented)
  Media = "Media",
  // (undocumented)
  MediaAdd = "MediaAdd",
  // (undocumented)
  Medical = "Medical",
  // (undocumented)
  Megaphone = "Megaphone",
  // (undocumented)
  MegaphoneSolid = "MegaphoneSolid",
  // (undocumented)
  Memo = "Memo",
  // (undocumented)
  Merge = "Merge",
  // (undocumented)
  MergeDuplicate = "MergeDuplicate",
  // (undocumented)
  Message = "Message",
  // (undocumented)
  MessageFill = "MessageFill",
  // (undocumented)
  MicOff = "MicOff",
  // (undocumented)
  Microphone = "Microphone",
  // (undocumented)
  MicrosoftFlowLogo = "MicrosoftFlowLogo",
  // (undocumented)
  MicrosoftStaffhubLogo = "MicrosoftStaffhubLogo",
  // (undocumented)
  MiniContract = "MiniContract",
  // (undocumented)
  MiniContractMirrored = "MiniContractMirrored",
  // (undocumented)
  MiniExpand = "MiniExpand",
  // (undocumented)
  MiniExpandMirrored = "MiniExpandMirrored",
  // (undocumented)
  MiniLink = "MiniLink",
  // (undocumented)
  MinimumValue = "MinimumValue",
  // (undocumented)
  MobileReport = "MobileReport",
  // (undocumented)
  MobileSelected = "MobileSelected",
  // (undocumented)
  Money = "Money",
  // (undocumented)
  More = "More",
  // (undocumented)
  MoreSports = "MoreSports",
  // (undocumented)
  MoreVertical = "MoreVertical",
  // (undocumented)
  MountainClimbing = "MountainClimbing",
  // (undocumented)
  Move = "Move",
  // (undocumented)
  Movers = "Movers",
  // (undocumented)
  MoveToFolder = "MoveToFolder",
  // (undocumented)
  MSNLogo = "MSNLogo",
  // (undocumented)
  MSNVideos = "MSNVideos",
  // (undocumented)
  MSNVideosSolid = "MSNVideosSolid",
  // (undocumented)
  MultiSelect = "MultiSelect",
  // (undocumented)
  MultiSelectMirrored = "MultiSelectMirrored",
  // (undocumented)
  MusicInCollection = "MusicInCollection",
  // (undocumented)
  MusicInCollectionFill = "MusicInCollectionFill",
  // (undocumented)
  MusicNote = "MusicNote",
  // (undocumented)
  MyMoviesTV = "MyMoviesTV",
  // (undocumented)
  Nav2DMapView = "Nav2DMapView",
  // (undocumented)
  NavigateBack = "NavigateBack",
  // (undocumented)
  NavigateBackMirrored = "NavigateBackMirrored",
  // (undocumented)
  NavigateExternalInline = "NavigateExternalInline",
  // (undocumented)
  NavigateForward = "NavigateForward",
  // (undocumented)
  NavigateForwardMirrored = "NavigateForwardMirrored",
  // (undocumented)
  NavigationFlipper = "NavigationFlipper",
  // (undocumented)
  NetworkTower = "NetworkTower",
  // (undocumented)
  NewAnalyticsQuery = "NewAnalyticsQuery",
  // (undocumented)
  NewFolder = "NewFolder",
  // (undocumented)
  NewMail = "NewMail",
  // (undocumented)
  News = "News",
  // (undocumented)
  NewsSearch = "NewsSearch",
  // (undocumented)
  NewTeamProject = "NewTeamProject",
  // (undocumented)
  Next = "Next",
  // (undocumented)
  NormalWeight = "NormalWeight",
  // (undocumented)
  NoteForward = "NoteForward",
  // (undocumented)
  NotePinned = "NotePinned",
  // (undocumented)
  NoteReply = "NoteReply",
  // (undocumented)
  NotExecuted = "NotExecuted",
  // (undocumented)
  NotImpactedSolid = "NotImpactedSolid",
  // (undocumented)
  NugetLogo = "NugetLogo",
  // (undocumented)
  NumberedList = "NumberedList",
  // (undocumented)
  NumberedListNumber = "NumberedListNumber",
  // (undocumented)
  NumberedListNumberMirrored = "NumberedListNumberMirrored",
  // (undocumented)
  NumberedListText = "NumberedListText",
  // (undocumented)
  NumberedListTextMirrored = "NumberedListTextMirrored",
  // (undocumented)
  NumberField = "NumberField",
  // (undocumented)
  NumberSequence = "NumberSequence",
  // (undocumented)
  NumberSymbol = "NumberSymbol",
  // (undocumented)
  Octagon = "Octagon",
  // (undocumented)
  OEM = "OEM",
  // (undocumented)
  OfficeAddinsLogo = "OfficeAddinsLogo",
  // (undocumented)
  OfficeAssistantLogo = "OfficeAssistantLogo",
  // (undocumented)
  OfficeChat = "OfficeChat",
  // (undocumented)
  OfficeChatSolid = "OfficeChatSolid",
  // (undocumented)
  OfficeFormsLogo = "OfficeFormsLogo",
  // (undocumented)
  OfficeFormsLogo16 = "OfficeFormsLogo16",
  // (undocumented)
  OfficeFormsLogo24 = "OfficeFormsLogo24",
  // (undocumented)
  OfficeFormsLogoFill = "OfficeFormsLogoFill",
  // (undocumented)
  OfficeFormsLogoFill16 = "OfficeFormsLogoFill16",
  // (undocumented)
  OfficeFormsLogoFill24 = "OfficeFormsLogoFill24",
  // (undocumented)
  OfficeFormsLogoInverse = "OfficeFormsLogoInverse",
  // (undocumented)
  OfficeFormsLogoInverse16 = "OfficeFormsLogoInverse16",
  // (undocumented)
  OfficeFormsLogoInverse24 = "OfficeFormsLogoInverse24",
  // (undocumented)
  OfficeLogo = "OfficeLogo",
  // (undocumented)
  OfficeStoreLogo = "OfficeStoreLogo",
  // (undocumented)
  OfficeVideoLogo = "OfficeVideoLogo",
  // (undocumented)
  OfficeVideoLogoFill = "OfficeVideoLogoFill",
  // (undocumented)
  OfficeVideoLogoInverse = "OfficeVideoLogoInverse",
  // (undocumented)
  OfflineOneDriveParachute = "OfflineOneDriveParachute",
  // (undocumented)
  OfflineOneDriveParachuteDisabled = "OfflineOneDriveParachuteDisabled",
  // (undocumented)
  OfflineStorage = "OfflineStorage",
  // (undocumented)
  OfflineStorageSolid = "OfflineStorageSolid",
  // (undocumented)
  Onboarding = "Onboarding",
  // (undocumented)
  OneDriveAdd = "OneDriveAdd",
  // (undocumented)
  OneDriveFolder16 = "OneDriveFolder16",
  // (undocumented)
  OneDriveLogo = "OneDriveLogo",
  // (undocumented)
  OneNoteEduLogoInverse = "OneNoteEduLogoInverse",
  // (undocumented)
  OneNoteLogo = "OneNoteLogo",
  // (undocumented)
  OneNoteLogo16 = "OneNoteLogo16",
  // (undocumented)
  OneNoteLogoFill = "OneNoteLogoFill",
  // (undocumented)
  OneNoteLogoFill16 = "OneNoteLogoFill16",
  // (undocumented)
  OneNoteLogoInverse = "OneNoteLogoInverse",
  // (undocumented)
  OneNoteLogoInverse16 = "OneNoteLogoInverse16",
  // (undocumented)
  OpenEnrollment = "OpenEnrollment",
  // (undocumented)
  OpenFile = "OpenFile",
  // (undocumented)
  OpenFolderHorizontal = "OpenFolderHorizontal",
  // (undocumented)
  OpenInNewWindow = "OpenInNewWindow",
  // (undocumented)
  OpenPane = "OpenPane",
  // (undocumented)
  OpenPaneMirrored = "OpenPaneMirrored",
  // (undocumented)
  OpenSource = "OpenSource",
  // (undocumented)
  Org = "Org",
  // (undocumented)
  Orientation = "Orientation",
  // (undocumented)
  Orientation2 = "Orientation2",
  // (undocumented)
  OutlookLogo = "OutlookLogo",
  // (undocumented)
  OutlookLogo16 = "OutlookLogo16",
  // (undocumented)
  OutlookLogoFill = "OutlookLogoFill",
  // (undocumented)
  OutlookLogoFill16 = "OutlookLogoFill16",
  // (undocumented)
  OutlookLogoInverse = "OutlookLogoInverse",
  // (undocumented)
  OutlookLogoInverse16 = "OutlookLogoInverse16",
  // (undocumented)
  OutOfOffice = "OutOfOffice",
  // (undocumented)
  Package = "Package",
  // (undocumented)
  Packages = "Packages",
  // (undocumented)
  Padding = "Padding",
  // (undocumented)
  PaddingBottom = "PaddingBottom",
  // (undocumented)
  PaddingLeft = "PaddingLeft",
  // (undocumented)
  PaddingRight = "PaddingRight",
  // (undocumented)
  PaddingTop = "PaddingTop",
  // (undocumented)
  Page = "Page",
  // (undocumented)
  PageAdd = "PageAdd",
  // (undocumented)
  PageArrowRight = "PageArrowRight",
  // (undocumented)
  PageCheckedin = "PageCheckedin",
  // (undocumented)
  PageCheckedOut = "PageCheckedOut",
  // (undocumented)
  PageEdit = "PageEdit",
  // (undocumented)
  PageHeader = "PageHeader",
  // (undocumented)
  PageLeft = "PageLeft",
  // (undocumented)
  PageList = "PageList",
  // (undocumented)
  PageListFilter = "PageListFilter",
  // (undocumented)
  PageListMirroredSolid = "PageListMirroredSolid",
  // (undocumented)
  PageListSolid = "PageListSolid",
  // (undocumented)
  PageLock = "PageLock",
  // (undocumented)
  PageRemove = "PageRemove",
  // (undocumented)
  PageRight = "PageRight",
  // (undocumented)
  PageSolid = "PageSolid",
  // (undocumented)
  PanoIndicator = "PanoIndicator",
  // (undocumented)
  Parachute = "Parachute",
  // (undocumented)
  ParachuteSolid = "ParachuteSolid",
  // (undocumented)
  Parameter = "Parameter",
  // (undocumented)
  ParkingLocation = "ParkingLocation",
  // (undocumented)
  ParkingLocationMirrored = "ParkingLocationMirrored",
  // (undocumented)
  ParkingMirroredSolid = "ParkingMirroredSolid",
  // (undocumented)
  ParkingSolid = "ParkingSolid",
  // (undocumented)
  PartlyCloudyDay = "PartlyCloudyDay",
  // (undocumented)
  PartlyCloudyNight = "PartlyCloudyNight",
  // (undocumented)
  PartyLeader = "PartyLeader",
  // (undocumented)
  PassiveAuthentication = "PassiveAuthentication",
  // (undocumented)
  Paste = "Paste",
  // (undocumented)
  PasteAsCode = "PasteAsCode",
  // (undocumented)
  PasteAsText = "PasteAsText",
  // (undocumented)
  Pause = "Pause",
  // (undocumented)
  PaymentCard = "PaymentCard",
  // (undocumented)
  PC1 = "PC1",
  // (undocumented)
  PDF = "PDF",
  // (undocumented)
  PencilReply = "PencilReply",
  // (undocumented)
  Pentagon = "Pentagon",
  // (undocumented)
  PenWorkspace = "PenWorkspace",
  // (undocumented)
  People = "People",
  // (undocumented)
  PeopleAdd = "PeopleAdd",
  // (undocumented)
  PeopleAlert = "PeopleAlert",
  // (undocumented)
  PeopleBlock = "PeopleBlock",
  // (undocumented)
  PeoplePause = "PeoplePause",
  // (undocumented)
  PeopleRepeat = "PeopleRepeat",
  // (undocumented)
  Permissions = "Permissions",
  // (undocumented)
  PermissionsSolid = "PermissionsSolid",
  // (undocumented)
  Personalize = "Personalize",
  // (undocumented)
  Phishing = "Phishing",
  // (undocumented)
  Phone = "Phone",
  // (undocumented)
  Photo = "Photo",
  // (undocumented)
  Photo2 = "Photo2",
  // (undocumented)
  Photo2Add = "Photo2Add",
  // (undocumented)
  Photo2Fill = "Photo2Fill",
  // (undocumented)
  Photo2Remove = "Photo2Remove",
  // (undocumented)
  PhotoCollection = "PhotoCollection",
  // (undocumented)
  Picture = "Picture",
  // (undocumented)
  PictureCenter = "PictureCenter",
  // (undocumented)
  PictureFill = "PictureFill",
  // (undocumented)
  PictureLibrary = "PictureLibrary",
  // (undocumented)
  PicturePosition = "PicturePosition",
  // (undocumented)
  PictureStretch = "PictureStretch",
  // (undocumented)
  PictureTile = "PictureTile",
  // (undocumented)
  PieDouble = "PieDouble",
  // (undocumented)
  PieSingle = "PieSingle",
  // (undocumented)
  PieSingleSolid = "PieSingleSolid",
  // (undocumented)
  Pill = "Pill",
  // (undocumented)
  Pin = "Pin",
  // (undocumented)
  Pinned = "Pinned",
  // (undocumented)
  PinnedFill = "PinnedFill",
  // (undocumented)
  PivotChart = "PivotChart",
  // (undocumented)
  PlainText = "PlainText",
  // (undocumented)
  PlannerLogo = "PlannerLogo",
  // (undocumented)
  PlanView = "PlanView",
  // (undocumented)
  Play = "Play",
  // (undocumented)
  PlayerSettings = "PlayerSettings",
  // (undocumented)
  PlayResume = "PlayResume",
  // (undocumented)
  Plug = "Plug",
  // (undocumented)
  PlugConnected = "PlugConnected",
  // (undocumented)
  PlugDisconnected = "PlugDisconnected",
  // (undocumented)
  PlugSolid = "PlugSolid",
  // (undocumented)
  POI = "POI",
  // (undocumented)
  POISolid = "POISolid",
  // (undocumented)
  PostUpdate = "PostUpdate",
  // (undocumented)
  PowerApps = "PowerApps",
  // (undocumented)
  PowerApps2Logo = "PowerApps2Logo",
  // (undocumented)
  PowerAppsLogo = "PowerAppsLogo",
  // (undocumented)
  PowerBILogo = "PowerBILogo",
  // (undocumented)
  PowerBILogo16 = "PowerBILogo16",
  // (undocumented)
  PowerBILogoBackplate16 = "PowerBILogoBackplate16",
  // (undocumented)
  PowerButton = "PowerButton",
  // (undocumented)
  PowerPointDocument = "PowerPointDocument",
  // (undocumented)
  PowerPointLogo = "PowerPointLogo",
  // (undocumented)
  PowerPointLogo16 = "PowerPointLogo16",
  // (undocumented)
  PowerPointLogoFill = "PowerPointLogoFill",
  // (undocumented)
  PowerPointLogoFill16 = "PowerPointLogoFill16",
  // (undocumented)
  PowerPointLogoInverse = "PowerPointLogoInverse",
  // (undocumented)
  PowerPointLogoInverse16 = "PowerPointLogoInverse16",
  // (undocumented)
  Precipitation = "Precipitation",
  // (undocumented)
  PresenceChickletVideo = "PresenceChickletVideo",
  // (undocumented)
  Presentation = "Presentation",
  // (undocumented)
  Presentation12 = "Presentation12",
  // (undocumented)
  Preview = "Preview",
  // (undocumented)
  PreviewLink = "PreviewLink",
  // (undocumented)
  Previous = "Previous",
  // (undocumented)
  PrimaryCalendar = "PrimaryCalendar",
  // (undocumented)
  Print = "Print",
  // (undocumented)
  PrintfaxPrinterFile = "PrintfaxPrinterFile",
  // (undocumented)
  Processing = "Processing",
  // (undocumented)
  ProcessMetaTask = "ProcessMetaTask",
  // (undocumented)
  Product = "Product",
  // (undocumented)
  ProductRelease = "ProductRelease",
  // (undocumented)
  ProfileSearch = "ProfileSearch",
  // (undocumented)
  ProFootball = "ProFootball",
  // (undocumented)
  ProgressLoopInner = "ProgressLoopInner",
  // (undocumented)
  ProgressLoopOuter = "ProgressLoopOuter",
  // (undocumented)
  ProgressRingDots = "ProgressRingDots",
  // (undocumented)
  ProHockey = "ProHockey",
  // (undocumented)
  ProjectCollection = "ProjectCollection",
  // (undocumented)
  ProjectDocument = "ProjectDocument",
  // (undocumented)
  ProjectLogo16 = "ProjectLogo16",
  // (undocumented)
  ProjectLogo32 = "ProjectLogo32",
  // (undocumented)
  ProjectLogoFill16 = "ProjectLogoFill16",
  // (undocumented)
  ProjectLogoFill32 = "ProjectLogoFill32",
  // (undocumented)
  ProjectLogoInverse = "ProjectLogoInverse",
  // (undocumented)
  PromotedDatabase = "PromotedDatabase",
  // (undocumented)
  ProtectedDocument = "ProtectedDocument",
  // (undocumented)
  ProtectionCenterLogo32 = "ProtectionCenterLogo32",
  // (undocumented)
  ProtectRestrict = "ProtectRestrict",
  // (undocumented)
  PublicCalendar = "PublicCalendar",
  // (undocumented)
  PublicContactCard = "PublicContactCard",
  // (undocumented)
  PublicContactCardMirrored = "PublicContactCardMirrored",
  // (undocumented)
  PublicEmail = "PublicEmail",
  // (undocumented)
  PublicFolder = "PublicFolder",
  // (undocumented)
  PublishContent = "PublishContent",
  // (undocumented)
  PublishCourse = "PublishCourse",
  // (undocumented)
  PublisherLogo = "PublisherLogo",
  // (undocumented)
  PublisherLogo16 = "PublisherLogo16",
  // (undocumented)
  PublisherLogoFill = "PublisherLogoFill",
  // (undocumented)
  PublisherLogoFill16 = "PublisherLogoFill16",
  // (undocumented)
  PublisherLogoInverse16 = "PublisherLogoInverse16",
  // (undocumented)
  Puzzle = "Puzzle",
  // (undocumented)
  PY = "PY",
  // (undocumented)
  PythonLanguage = "PythonLanguage",
  // (undocumented)
  QRCode = "QRCode",
  // (undocumented)
  QuadColumn = "QuadColumn",
  // (undocumented)
  Quantity = "Quantity",
  // (undocumented)
  QuarterCircle = "QuarterCircle",
  // (undocumented)
  QueryList = "QueryList",
  // (undocumented)
  Questionnaire = "Questionnaire",
  // (undocumented)
  QuestionnaireMirrored = "QuestionnaireMirrored",
  // (undocumented)
  QuickNote = "QuickNote",
  // (undocumented)
  QuickNoteSolid = "QuickNoteSolid",
  // (undocumented)
  R = "R",
  // (undocumented)
  RadioBtnOff = "RadioBtnOff",
  // (undocumented)
  RadioBtnOn = "RadioBtnOn",
  // (undocumented)
  RadioBullet = "RadioBullet",
  // (undocumented)
  Rain = "Rain",
  // (undocumented)
  RainShowersDay = "RainShowersDay",
  // (undocumented)
  RainShowersNight = "RainShowersNight",
  // (undocumented)
  RainSnow = "RainSnow",
  // (undocumented)
  RawSource = "RawSource",
  // (undocumented)
  Read = "Read",
  // (undocumented)
  ReadingMode = "ReadingMode",
  // (undocumented)
  ReadingModeSolid = "ReadingModeSolid",
  // (undocumented)
  ReadOutLoud = "ReadOutLoud",
  // (undocumented)
  RealEstate = "RealEstate",
  // (undocumented)
  ReceiptCheck = "ReceiptCheck",
  // (undocumented)
  ReceiptForward = "ReceiptForward",
  // (undocumented)
  ReceiptReply = "ReceiptReply",
  // (undocumented)
  ReceiptTentative = "ReceiptTentative",
  // (undocumented)
  ReceiptTentativeMirrored = "ReceiptTentativeMirrored",
  // (undocumented)
  ReceiptUndelivered = "ReceiptUndelivered",
  // (undocumented)
  Recent = "Recent",
  // (undocumented)
  Record2 = "Record2",
  // (undocumented)
  RecruitmentManagement = "RecruitmentManagement",
  // (undocumented)
  RectangleShape = "RectangleShape",
  // (undocumented)
  RectangleShapeSolid = "RectangleShapeSolid",
  // (undocumented)
  RectangularClipping = "RectangularClipping",
  // (undocumented)
  RecurringEvent = "RecurringEvent",
  // (undocumented)
  RecurringTask = "RecurringTask",
  // (undocumented)
  RecycleBin = "RecycleBin",
  // (undocumented)
  Redeploy = "Redeploy",
  // (undocumented)
  RedEye = "RedEye",
  // (undocumented)
  Redo = "Redo",
  // (undocumented)
  Refresh = "Refresh",
  // (undocumented)
  Relationship = "Relationship",
  // (undocumented)
  ReleaseDefinition = "ReleaseDefinition",
  // (undocumented)
  ReleaseGate = "ReleaseGate",
  // (undocumented)
  ReleaseGateCheck = "ReleaseGateCheck",
  // (undocumented)
  ReleaseGateError = "ReleaseGateError",
  // (undocumented)
  ReminderGroup = "ReminderGroup",
  // (undocumented)
  ReminderPerson = "ReminderPerson",
  // (undocumented)
  Remote = "Remote",
  // (undocumented)
  Remove = "Remove",
  // (undocumented)
  RemoveEvent = "RemoveEvent",
  // (undocumented)
  RemoveFilter = "RemoveFilter",
  // (undocumented)
  RemoveFromTrash = "RemoveFromTrash",
  // (undocumented)
  RemoveLink = "RemoveLink",
  // (undocumented)
  RemoveLinkChain = "RemoveLinkChain",
  // (undocumented)
  RemoveLinkX = "RemoveLinkX",
  // (undocumented)
  RemoveOccurrence = "RemoveOccurrence",
  // (undocumented)
  Rename = "Rename",
  // (undocumented)
  RenewalCurrent = "RenewalCurrent",
  // (undocumented)
  RenewalFuture = "RenewalFuture",
  // (undocumented)
  ReopenPages = "ReopenPages",
  // (undocumented)
  Repair = "Repair",
  // (undocumented)
  RepeatAll = "RepeatAll",
  // (undocumented)
  Reply = "Reply",
  // (undocumented)
  ReplyAll = "ReplyAll",
  // (undocumented)
  ReplyAllAlt = "ReplyAllAlt",
  // (undocumented)
  ReplyAllMirrored = "ReplyAllMirrored",
  // (undocumented)
  ReplyAlt = "ReplyAlt",
  // (undocumented)
  ReplyMirrored = "ReplyMirrored",
  // (undocumented)
  Repo = "Repo",
  // (undocumented)
  ReportAdd = "ReportAdd",
  // (undocumented)
  ReportDocument = "ReportDocument",
  // (undocumented)
  ReportHacked = "ReportHacked",
  // (undocumented)
  ReportLibrary = "ReportLibrary",
  // (undocumented)
  ReportLibraryMirrored = "ReportLibraryMirrored",
  // (undocumented)
  RepoSolid = "RepoSolid",
  // (undocumented)
  ResponsesMenu = "ResponsesMenu",
  // (undocumented)
  ReturnToSession = "ReturnToSession",
  // (undocumented)
  ReviewRequestMirroredSolid = "ReviewRequestMirroredSolid",
  // (undocumented)
  ReviewRequestSolid = "ReviewRequestSolid",
  // (undocumented)
  ReviewResponseSolid = "ReviewResponseSolid",
  // (undocumented)
  ReviewSolid = "ReviewSolid",
  // (undocumented)
  RevToggleKey = "RevToggleKey",
  // (undocumented)
  Rewind = "Rewind",
  // (undocumented)
  Ribbon = "Ribbon",
  // (undocumented)
  RibbonSolid = "RibbonSolid",
  // (undocumented)
  RightDoubleQuote = "RightDoubleQuote",
  // (undocumented)
  RightTriangle = "RightTriangle",
  // (undocumented)
  Ringer = "Ringer",
  // (undocumented)
  RingerOff = "RingerOff",
  // (undocumented)
  RingerRemove = "RingerRemove",
  // (undocumented)
  Robot = "Robot",
  // (undocumented)
  Rocket = "Rocket",
  // (undocumented)
  Room = "Room",
  // (undocumented)
  Rotate = "Rotate",
  // (undocumented)
  RowsChild = "RowsChild",
  // (undocumented)
  RowsGroup = "RowsGroup",
  // (undocumented)
  Rugby = "Rugby",
  // (undocumented)
  Running = "Running",
  // (undocumented)
  Sad = "Sad",
  // (undocumented)
  SadSolid = "SadSolid",
  // (undocumented)
  Save = "Save",
  // (undocumented)
  SaveAll = "SaveAll",
  // (undocumented)
  SaveAndClose = "SaveAndClose",
  // (undocumented)
  SaveAs = "SaveAs",
  // (undocumented)
  SaveTemplate = "SaveTemplate",
  // (undocumented)
  SaveToMobile = "SaveToMobile",
  // (undocumented)
  Savings = "Savings",
  // (undocumented)
  ScaleUp = "ScaleUp",
  // (undocumented)
  ScaleVolume = "ScaleVolume",
  // (undocumented)
  ScheduleEventAction = "ScheduleEventAction",
  // (undocumented)
  ScopeTemplate = "ScopeTemplate",
  // (undocumented)
  ScreenCast = "ScreenCast",
  // (undocumented)
  Script = "Script",
  // (undocumented)
  ScrollUpDown = "ScrollUpDown",
  // (undocumented)
  Search = "Search",
  // (undocumented)
  SearchAndApps = "SearchAndApps",
  // (undocumented)
  SearchBookmark = "SearchBookmark",
  // (undocumented)
  SearchCalendar = "SearchCalendar",
  // (undocumented)
  SearchIssue = "SearchIssue",
  // (undocumented)
  SearchIssueMirrored = "SearchIssueMirrored",
  // (undocumented)
  SearchNearby = "SearchNearby",
  // (undocumented)
  SecondaryNav = "SecondaryNav",
  // (undocumented)
  Section = "Section",
  // (undocumented)
  Sections = "Sections",
  // (undocumented)
  SecurityGroup = "SecurityGroup",
  // (undocumented)
  SeeDo = "SeeDo",
  // (undocumented)
  SelectAll = "SelectAll",
  // (undocumented)
  Sell = "Sell",
  // (undocumented)
  SemiboldWeight = "SemiboldWeight",
  // (undocumented)
  Send = "Send",
  // (undocumented)
  SendMirrored = "SendMirrored",
  // (undocumented)
  Separator = "Separator",
  // (undocumented)
  Server = "Server",
  // (undocumented)
  ServerEnviroment = "ServerEnviroment",
  // (undocumented)
  ServerProcesses = "ServerProcesses",
  // (undocumented)
  SetAction = "SetAction",
  // (undocumented)
  Settings = "Settings",
  // (undocumented)
  Shapes = "Shapes",
  // (undocumented)
  Share = "Share",
  // (undocumented)
  ShareiOS = "ShareiOS",
  // (undocumented)
  SharepointLogo = "SharepointLogo",
  // (undocumented)
  SharepointLogoFill = "SharepointLogoFill",
  // (undocumented)
  SharepointLogoInverse = "SharepointLogoInverse",
  // (undocumented)
  Shield = "Shield",
  // (undocumented)
  ShieldSolid = "ShieldSolid",
  // (undocumented)
  Shirt = "Shirt",
  // (undocumented)
  Shop = "Shop",
  // (undocumented)
  ShoppingCart = "ShoppingCart",
  // (undocumented)
  ShoppingCartSolid = "ShoppingCartSolid",
  // (undocumented)
  ShopServer = "ShopServer",
  // (undocumented)
  ShowGrid = "ShowGrid",
  // (undocumented)
  ShowResults = "ShowResults",
  // (undocumented)
  ShowResultsMirrored = "ShowResultsMirrored",
  // (undocumented)
  ShowTimeAs = "ShowTimeAs",
  // (undocumented)
  SidePanel = "SidePanel",
  // (undocumented)
  SidePanelMirrored = "SidePanelMirrored",
  // (undocumented)
  SignOut = "SignOut",
  // (undocumented)
  SingleBookmark = "SingleBookmark",
  // (undocumented)
  SingleBookmarkSolid = "SingleBookmarkSolid",
  // (undocumented)
  SingleColumn = "SingleColumn",
  // (undocumented)
  SingleColumnEdit = "SingleColumnEdit",
  // (undocumented)
  SIPMove = "SIPMove",
  // (undocumented)
  SiteScan = "SiteScan",
  // (undocumented)
  SixPointStar = "SixPointStar",
  // (undocumented)
  SizeLegacy = "SizeLegacy",
  // (undocumented)
  SkiResorts = "SkiResorts",
  // (undocumented)
  SkypeArrow = "SkypeArrow",
  // (undocumented)
  SkypeCheck = "SkypeCheck",
  // (undocumented)
  SkypeCircleArrow = "SkypeCircleArrow",
  // (undocumented)
  SkypeCircleCheck = "SkypeCircleCheck",
  // (undocumented)
  SkypeCircleClock = "SkypeCircleClock",
  // (undocumented)
  SkypeCircleMinus = "SkypeCircleMinus",
  // (undocumented)
  SkypeCircleSlash = "SkypeCircleSlash",
  // (undocumented)
  SkypeClock = "SkypeClock",
  // (undocumented)
  SkypeForBusinessLogo = "SkypeForBusinessLogo",
  // (undocumented)
  SkypeForBusinessLogo16 = "SkypeForBusinessLogo16",
  // (undocumented)
  SkypeForBusinessLogoFill = "SkypeForBusinessLogoFill",
  // (undocumented)
  SkypeForBusinessLogoFill16 = "SkypeForBusinessLogoFill16",
  // (undocumented)
  SkypeLogo = "SkypeLogo",
  // (undocumented)
  SkypeLogo16 = "SkypeLogo16",
  // (undocumented)
  SkypeMessage = "SkypeMessage",
  // (undocumented)
  SkypeMinus = "SkypeMinus",
  // (undocumented)
  SkypeSlash = "SkypeSlash",
  // (undocumented)
  Slider = "Slider",
  // (undocumented)
  SliderHandleSize = "SliderHandleSize",
  // (undocumented)
  SliderThumb = "SliderThumb",
  // (undocumented)
  Slideshow = "Slideshow",
  // (undocumented)
  SnapToGrid = "SnapToGrid",
  // (undocumented)
  Snooze = "Snooze",
  // (undocumented)
  Snow = "Snow",
  // (undocumented)
  Snowflake = "Snowflake",
  // (undocumented)
  SnowShowerDay = "SnowShowerDay",
  // (undocumented)
  SnowShowerNight = "SnowShowerNight",
  // (undocumented)
  Soccer = "Soccer",
  // (undocumented)
  SocialListeningLogo = "SocialListeningLogo",
  // (undocumented)
  Sort = "Sort",
  // (undocumented)
  SortDown = "SortDown",
  // (undocumented)
  SortLines = "SortLines",
  // (undocumented)
  SortUp = "SortUp",
  // (undocumented)
  Source = "Source",
  // (undocumented)
  Spacer = "Spacer",
  // (undocumented)
  Speakers = "Speakers",
  // (undocumented)
  SpecialEvent = "SpecialEvent",
  // (undocumented)
  SpeedHigh = "SpeedHigh",
  // (undocumented)
  Split = "Split",
  // (undocumented)
  SplitObject = "SplitObject",
  // (undocumented)
  Sprint = "Sprint",
  // (undocumented)
  Squalls = "Squalls",
  // (undocumented)
  SquareShapeSolid = "SquareShapeSolid",
  // (undocumented)
  Stack = "Stack",
  // (undocumented)
  StackColumnChart = "StackColumnChart",
  // (undocumented)
  StackedBarChart = "StackedBarChart",
  // (undocumented)
  StackedColumnChart2 = "StackedColumnChart2",
  // (undocumented)
  StackedColumnChart2Fill = "StackedColumnChart2Fill",
  // (undocumented)
  StackedLineChart = "StackedLineChart",
  // (undocumented)
  StackIndicator = "StackIndicator",
  // (undocumented)
  StaffNotebookLogo16 = "StaffNotebookLogo16",
  // (undocumented)
  StaffNotebookLogo32 = "StaffNotebookLogo32",
  // (undocumented)
  StaffNotebookLogoFill16 = "StaffNotebookLogoFill16",
  // (undocumented)
  StaffNotebookLogoFill32 = "StaffNotebookLogoFill32",
  // (undocumented)
  StaffNotebookLogoInverted16 = "StaffNotebookLogoInverted16",
  // (undocumented)
  StaffNotebookLogoInverted32 = "StaffNotebookLogoInverted32",
  // (undocumented)
  Starburst = "Starburst",
  // (undocumented)
  StarburstSolid = "StarburstSolid",
  // (undocumented)
  StatusCircleBlock = "StatusCircleBlock",
  // (undocumented)
  StatusCircleBlock2 = "StatusCircleBlock2",
  // (undocumented)
  StatusCircleCheckmark = "StatusCircleCheckmark",
  // (undocumented)
  StatusCircleErrorX = "StatusCircleErrorX",
  // (undocumented)
  StatusCircleExclamation = "StatusCircleExclamation",
  // (undocumented)
  StatusCircleInfo = "StatusCircleInfo",
  // (undocumented)
  StatusCircleInner = "StatusCircleInner",
  // (undocumented)
  StatusCircleOuter = "StatusCircleOuter",
  // (undocumented)
  StatusCircleQuestionMark = "StatusCircleQuestionMark",
  // (undocumented)
  StatusCircleRing = "StatusCircleRing",
  // (undocumented)
  StatusCircleSync = "StatusCircleSync",
  // (undocumented)
  StatusErrorFull = "StatusErrorFull",
  // (undocumented)
  StatusTriangle = "StatusTriangle",
  // (undocumented)
  StatusTriangleExclamation = "StatusTriangleExclamation",
  // (undocumented)
  StatusTriangleInner = "StatusTriangleInner",
  // (undocumented)
  StatusTriangleOuter = "StatusTriangleOuter",
  // (undocumented)
  Step = "Step",
  // (undocumented)
  StepInsert = "StepInsert",
  // (undocumented)
  StepShared = "StepShared",
  // (undocumented)
  StepSharedAdd = "StepSharedAdd",
  // (undocumented)
  StepSharedInsert = "StepSharedInsert",
  // (undocumented)
  StockDown = "StockDown",
  // (undocumented)
  StockUp = "StockUp",
  // (undocumented)
  Stop = "Stop",
  // (undocumented)
  StopSolid = "StopSolid",
  // (undocumented)
  Stopwatch = "Stopwatch",
  // (undocumented)
  StorageOptical = "StorageOptical",
  // (undocumented)
  StoreLogo16 = "StoreLogo16",
  // (undocumented)
  StoreLogoMed20 = "StoreLogoMed20",
  // (undocumented)
  Storyboard = "Storyboard",
  // (undocumented)
  Streaming = "Streaming",
  // (undocumented)
  StreamingOff = "StreamingOff",
  // (undocumented)
  StreamLogo = "StreamLogo",
  // (undocumented)
  Street = "Street",
  // (undocumented)
  StreetsideSplitMinimize = "StreetsideSplitMinimize",
  // (undocumented)
  Strikethrough = "Strikethrough",
  // (undocumented)
  Subscribe = "Subscribe",
  // (undocumented)
  Subscript = "Subscript",
  // (undocumented)
  SubstitutionsIn = "SubstitutionsIn",
  // (undocumented)
  Suitcase = "Suitcase",
  // (undocumented)
  SunAdd = "SunAdd",
  // (undocumented)
  Sunny = "Sunny",
  // (undocumented)
  SunQuestionMark = "SunQuestionMark",
  // (undocumented)
  Superscript = "Superscript",
  // (undocumented)
  SurveyQuestions = "SurveyQuestions",
  // (undocumented)
  SwayLogo16 = "SwayLogo16",
  // (undocumented)
  SwayLogo32 = "SwayLogo32",
  // (undocumented)
  SwayLogoFill16 = "SwayLogoFill16",
  // (undocumented)
  SwayLogoFill32 = "SwayLogoFill32",
  // (undocumented)
  SwayLogoInverse = "SwayLogoInverse",
  // (undocumented)
  Switch = "Switch",
  // (undocumented)
  SwitcherStartEnd = "SwitcherStartEnd",
  // (undocumented)
  Sync = "Sync",
  // (undocumented)
  SyncFolder = "SyncFolder",
  // (undocumented)
  SyncOccurence = "SyncOccurence",
  // (undocumented)
  SyncStatus = "SyncStatus",
  // (undocumented)
  SyncStatusSolid = "SyncStatusSolid",
  // (undocumented)
  SyncToPC = "SyncToPC",
  // (undocumented)
  System = "System",
  // (undocumented)
  Tab = "Tab",
  // (undocumented)
  TabCenter = "TabCenter",
  // (undocumented)
  Table = "Table",
  // (undocumented)
  TableGroup = "TableGroup",
  // (undocumented)
  Tablet = "Tablet",
  // (undocumented)
  TabletMode = "TabletMode",
  // (undocumented)
  TabletSelected = "TabletSelected",
  // (undocumented)
  TabOneColumn = "TabOneColumn",
  // (undocumented)
  TabThreeColumn = "TabThreeColumn",
  // (undocumented)
  TabTwoColumn = "TabTwoColumn",
  // (undocumented)
  Tag = "Tag",
  // (undocumented)
  TagSolid = "TagSolid",
  // (undocumented)
  TagUnknown = "TagUnknown",
  // (undocumented)
  TagUnknown12 = "TagUnknown12",
  // (undocumented)
  TagUnknown12Mirror = "TagUnknown12Mirror",
  // (undocumented)
  TagUnknownMirror = "TagUnknownMirror",
  // (undocumented)
  Taskboard = "Taskboard",
  // (undocumented)
  TaskGroup = "TaskGroup",
  // (undocumented)
  TaskGroupMirrored = "TaskGroupMirrored",
  // (undocumented)
  TaskLogo = "TaskLogo",
  // (undocumented)
  TaskManager = "TaskManager",
  // (undocumented)
  TaskManagerMirrored = "TaskManagerMirrored",
  // (undocumented)
  TaskSolid = "TaskSolid",
  // (undocumented)
  Taxi = "Taxi",
  // (undocumented)
  TeamFavorite = "TeamFavorite",
  // (undocumented)
  TeamsLogo = "TeamsLogo",
  // (undocumented)
  TeamsLogo16 = "TeamsLogo16",
  // (undocumented)
  TeamsLogoFill = "TeamsLogoFill",
  // (undocumented)
  TeamsLogoFill16 = "TeamsLogoFill16",
  // (undocumented)
  TeamsLogoInverse = "TeamsLogoInverse",
  // (undocumented)
  Teamwork = "Teamwork",
  // (undocumented)
  Teeth = "Teeth",
  // (undocumented)
  Telemarketer = "Telemarketer",
  // (undocumented)
  TemporaryUser = "TemporaryUser",
  // (undocumented)
  Tennis = "Tennis",
  // (undocumented)
  TestAutoSolid = "TestAutoSolid",
  // (undocumented)
  TestBeaker = "TestBeaker",
  // (undocumented)
  TestBeakerSolid = "TestBeakerSolid",
  // (undocumented)
  TestCase = "TestCase",
  // (undocumented)
  TestExploreSolid = "TestExploreSolid",
  // (undocumented)
  TestImpactSolid = "TestImpactSolid",
  // (undocumented)
  TestParameter = "TestParameter",
  // (undocumented)
  TestPlan = "TestPlan",
  // (undocumented)
  TestStep = "TestStep",
  // (undocumented)
  TestSuite = "TestSuite",
  // (undocumented)
  TestUserSolid = "TestUserSolid",
  // (undocumented)
  TextBox = "TextBox",
  // (undocumented)
  TextCallout = "TextCallout",
  // (undocumented)
  TextDocument = "TextDocument",
  // (undocumented)
  TextDocumentShared = "TextDocumentShared",
  // (undocumented)
  TextField = "TextField",
  // (undocumented)
  TextOverflow = "TextOverflow",
  // (undocumented)
  TFVCLogo = "TFVCLogo",
  // (undocumented)
  ThisPC = "ThisPC",
  // (undocumented)
  ThreeQuarterCircle = "ThreeQuarterCircle",
  // (undocumented)
  ThumbnailView = "ThumbnailView",
  // (undocumented)
  ThumbnailViewMirrored = "ThumbnailViewMirrored",
  // (undocumented)
  Thunderstorms = "Thunderstorms",
  // (undocumented)
  Ticket = "Ticket",
  // (undocumented)
  Tiles = "Tiles",
  // (undocumented)
  Tiles2 = "Tiles2",
  // (undocumented)
  TimeEntry = "TimeEntry",
  // (undocumented)
  Timeline = "Timeline",
  // (undocumented)
  TimelineDelivery = "TimelineDelivery",
  // (undocumented)
  TimelineMatrixView = "TimelineMatrixView",
  // (undocumented)
  TimelineProgress = "TimelineProgress",
  // (undocumented)
  Timer = "Timer",
  // (undocumented)
  TimeSheet = "TimeSheet",
  // (undocumented)
  ToDoLogoBottom = "ToDoLogoBottom",
  // (undocumented)
  ToDoLogoInverse = "ToDoLogoInverse",
  // (undocumented)
  ToDoLogoOutline = "ToDoLogoOutline",
  // (undocumented)
  ToDoLogoTop = "ToDoLogoTop",
  // (undocumented)
  ToggleBorder = "ToggleBorder",
  // (undocumented)
  ToggleFilled = "ToggleFilled",
  // (undocumented)
  ToggleLeft = "ToggleLeft",
  // (undocumented)
  ToggleRight = "ToggleRight",
  // (undocumented)
  ToggleThumb = "ToggleThumb",
  // (undocumented)
  Toll = "Toll",
  // (undocumented)
  Touch = "Touch",
  // (undocumented)
  TouchPointer = "TouchPointer",
  // (undocumented)
  Trackers = "Trackers",
  // (undocumented)
  TrackersMirrored = "TrackersMirrored",
  // (undocumented)
  Train = "Train",
  // (undocumented)
  TrainSolid = "TrainSolid",
  // (undocumented)
  TransferCall = "TransferCall",
  // (undocumented)
  Transition = "Transition",
  // (undocumented)
  TransitionEffect = "TransitionEffect",
  // (undocumented)
  TransitionPop = "TransitionPop",
  // (undocumented)
  TransitionPush = "TransitionPush",
  // (undocumented)
  Translate = "Translate",
  // (undocumented)
  Trending12 = "Trending12",
  // (undocumented)
  TriangleDown12 = "TriangleDown12",
  // (undocumented)
  TriangleLeft12 = "TriangleLeft12",
  // (undocumented)
  TriangleRight12 = "TriangleRight12",
  // (undocumented)
  TriangleShape = "TriangleShape",
  // (undocumented)
  TriangleShapeSolid = "TriangleShapeSolid",
  // (undocumented)
  TriangleSolid = "TriangleSolid",
  // (undocumented)
  TriangleSolidDown12 = "TriangleSolidDown12",
  // (undocumented)
  TriangleSolidLeft12 = "TriangleSolidLeft12",
  // (undocumented)
  TriangleSolidRight12 = "TriangleSolidRight12",
  // (undocumented)
  TriangleSolidUp12 = "TriangleSolidUp12",
  // (undocumented)
  TriangleUp12 = "TriangleUp12",
  // (undocumented)
  TriggerApproval = "TriggerApproval",
  // (undocumented)
  TriggerAuto = "TriggerAuto",
  // (undocumented)
  TriggerUser = "TriggerUser",
  // (undocumented)
  TripleColumn = "TripleColumn",
  // (undocumented)
  TripleColumnEdit = "TripleColumnEdit",
  // (undocumented)
  TripleColumnWide = "TripleColumnWide",
  // (undocumented)
  Trophy = "Trophy",
  // (undocumented)
  Trophy2 = "Trophy2",
  // (undocumented)
  Trophy2Solid = "Trophy2Solid",
  // (undocumented)
  TurnRight = "TurnRight",
  // (undocumented)
  TVMonitor = "TVMonitor",
  // (undocumented)
  TVMonitorSelected = "TVMonitorSelected",
  // (undocumented)
  TwelvePointStar = "TwelvePointStar",
  // (undocumented)
  TypeScriptLanguage = "TypeScriptLanguage",
  // (undocumented)
  Umbrella = "Umbrella",
  // (undocumented)
  Underline = "Underline",
  // (undocumented)
  Undo = "Undo",
  // (undocumented)
  Uneditable = "Uneditable",
  // (undocumented)
  UneditableMirrored = "UneditableMirrored",
  // (undocumented)
  UneditableSolid12 = "UneditableSolid12",
  // (undocumented)
  UneditableSolidMirrored12 = "UneditableSolidMirrored12",
  // (undocumented)
  Unfavorite = "Unfavorite",
  // (undocumented)
  UngroupObject = "UngroupObject",
  // (undocumented)
  Unknown = "Unknown",
  // (undocumented)
  UnknownCall = "UnknownCall",
  // (undocumented)
  UnknownMirrored = "UnknownMirrored",
  // (undocumented)
  UnknownMirroredSolid = "UnknownMirroredSolid",
  // (undocumented)
  UnknownSolid = "UnknownSolid",
  // (undocumented)
  Unlock = "Unlock",
  // (undocumented)
  UnlockSolid = "UnlockSolid",
  // (undocumented)
  Unpin = "Unpin",
  // (undocumented)
  UnSetColor = "UnSetColor",
  // (undocumented)
  UnstackSelected = "UnstackSelected",
  // (undocumented)
  Unsubscribe = "Unsubscribe",
  // (undocumented)
  UnsyncFolder = "UnsyncFolder",
  // (undocumented)
  UnsyncOccurence = "UnsyncOccurence",
  // (undocumented)
  Up = "Up",
  // (undocumented)
  UpgradeAnalysis = "UpgradeAnalysis",
  // (undocumented)
  Upload = "Upload",
  // (undocumented)
  UserEvent = "UserEvent",
  // (undocumented)
  UserFollowed = "UserFollowed",
  // (undocumented)
  UserGauge = "UserGauge",
  // (undocumented)
  UserOptional = "UserOptional",
  // (undocumented)
  UserPause = "UserPause",
  // (undocumented)
  UserRemove = "UserRemove",
  // (undocumented)
  UserSync = "UserSync",
  // (undocumented)
  Vacation = "Vacation",
  // (undocumented)
  Variable = "Variable",
  // (undocumented)
  VariableGroup = "VariableGroup",
  // (undocumented)
  VB = "VB",
  // (undocumented)
  VennDiagram = "VennDiagram",
  // (undocumented)
  VerifiedBrand = "VerifiedBrand",
  // (undocumented)
  VersionControlPush = "VersionControlPush",
  // (undocumented)
  VerticalDistributeCenter = "VerticalDistributeCenter",
  // (undocumented)
  Video = "Video",
  // (undocumented)
  Video360Generic = "Video360Generic",
  // (undocumented)
  VideoLightOff = "VideoLightOff",
  // (undocumented)
  VideoOff = "VideoOff",
  // (undocumented)
  VideoSearch = "VideoSearch",
  // (undocumented)
  VideoSolid = "VideoSolid",
  // (undocumented)
  View = "View",
  // (undocumented)
  ViewAll = "ViewAll",
  // (undocumented)
  ViewAll2 = "ViewAll2",
  // (undocumented)
  ViewDashboard = "ViewDashboard",
  // (undocumented)
  ViewList = "ViewList",
  // (undocumented)
  ViewListGroup = "ViewListGroup",
  // (undocumented)
  ViewListTree = "ViewListTree",
  // (undocumented)
  VisioDiagram = "VisioDiagram",
  // (undocumented)
  VisioDiagramSync = "VisioDiagramSync",
  // (undocumented)
  VisioDocument = "VisioDocument",
  // (undocumented)
  VisioLogo = "VisioLogo",
  // (undocumented)
  VisioLogo16 = "VisioLogo16",
  // (undocumented)
  VisioLogoFill = "VisioLogoFill",
  // (undocumented)
  VisioLogoFill16 = "VisioLogoFill16",
  // (undocumented)
  VisioLogoInverse = "VisioLogoInverse",
  // (undocumented)
  VisioLogoInverse16 = "VisioLogoInverse16",
  // (undocumented)
  VisioOnlineLogo32 = "VisioOnlineLogo32",
  // (undocumented)
  VisioOnlineLogoCloud32 = "VisioOnlineLogoCloud32",
  // (undocumented)
  VisioOnlineLogoFill32 = "VisioOnlineLogoFill32",
  // (undocumented)
  VisualBasicLanguage = "VisualBasicLanguage",
  // (undocumented)
  VisualsFolder = "VisualsFolder",
  // (undocumented)
  VisualsStore = "VisualsStore",
  // (undocumented)
  VisualStudioIDELogo32 = "VisualStudioIDELogo32",
  // (undocumented)
  VisualStudioLogo = "VisualStudioLogo",
  // (undocumented)
  VoicemailForward = "VoicemailForward",
  // (undocumented)
  VoicemailIRM = "VoicemailIRM",
  // (undocumented)
  VoicemailReply = "VoicemailReply",
  // (undocumented)
  Volume0 = "Volume0",
  // (undocumented)
  Volume1 = "Volume1",
  // (undocumented)
  Volume2 = "Volume2",
  // (undocumented)
  Volume3 = "Volume3",
  // (undocumented)
  VolumeDisabled = "VolumeDisabled",
  // (undocumented)
  VSTSAltLogo1 = "VSTSAltLogo1",
  // (undocumented)
  VSTSAltLogo2 = "VSTSAltLogo2",
  // (undocumented)
  VSTSLogo = "VSTSLogo",
  // (undocumented)
  Waffle = "Waffle",
  // (undocumented)
  WaffleOffice365 = "WaffleOffice365",
  // (undocumented)
  WaitlistConfirm = "WaitlistConfirm",
  // (undocumented)
  WaitlistConfirmMirrored = "WaitlistConfirmMirrored",
  // (undocumented)
  Warning = "Warning",
  // (undocumented)
  Warning12 = "Warning12",
  // (undocumented)
  WarningSolid = "WarningSolid",
  // (undocumented)
  WebComponents = "WebComponents",
  // (undocumented)
  WebPublish = "WebPublish",
  // (undocumented)
  Website = "Website",
  // (undocumented)
  Weights = "Weights",
  // (undocumented)
  WhiteBoardApp16 = "WhiteBoardApp16",
  // (undocumented)
  WhiteBoardApp32 = "WhiteBoardApp32",
  // (undocumented)
  WifiEthernet = "WifiEthernet",
  // (undocumented)
  WifiWarning4 = "WifiWarning4",
  // (undocumented)
  WindDirection = "WindDirection",
  // (undocumented)
  WindowEdit = "WindowEdit",
  // (undocumented)
  WindowsLogo = "WindowsLogo",
  // (undocumented)
  Wines = "Wines",
  // (undocumented)
  WipePhone = "WipePhone",
  // (undocumented)
  WordDocument = "WordDocument",
  // (undocumented)
  WordLogo = "WordLogo",
  // (undocumented)
  WordLogo16 = "WordLogo16",
  // (undocumented)
  WordLogoFill = "WordLogoFill",
  // (undocumented)
  WordLogoFill16 = "WordLogoFill16",
  // (undocumented)
  WordLogoInverse = "WordLogoInverse",
  // (undocumented)
  WordLogoInverse16 = "WordLogoInverse16",
  // (undocumented)
  Work = "Work",
  // (undocumented)
  WorkFlow = "WorkFlow",
  // (undocumented)
  WorkforceManagement = "WorkforceManagement",
  // (undocumented)
  WorkItem = "WorkItem",
  // (undocumented)
  WorkItemAlert = "WorkItemAlert",
  // (undocumented)
  WorkItemBar = "WorkItemBar",
  // (undocumented)
  WorkItemBarSolid = "WorkItemBarSolid",
  // (undocumented)
  WorkItemBug = "WorkItemBug",
  // (undocumented)
  World = "World",
  // (undocumented)
  WorldClock = "WorldClock",
  // (undocumented)
  YammerLogo = "YammerLogo",
  // (undocumented)
  ZipFolder = "ZipFolder",
  // (undocumented)
  Zoom = "Zoom",
  // (undocumented)
  ZoomIn = "ZoomIn",
  // (undocumented)
  ZoomOut = "ZoomOut",
  // (undocumented)
  ZoomToFit = "ZoomToFit"
}

// @public (undocumented)
interface IContextualMenu {
}

// @public (undocumented)
interface IContextualMenuItem {
  [propertyName: string]: any;
  ariaLabel?: string;
  canCheck?: boolean;
  checked?: boolean;
  className?: string;
  componentRef?: IRefObject<IContextualMenuRenderItem>;
  customOnRenderListLength?: number;
  data?: any;
  disabled?: boolean;
  // @deprecated
  getItemClassNames?: (theme: ITheme, disabled: boolean, expanded: boolean, checked: boolean, isAnchorLink: boolean, knownIcon: boolean, itemClassName?: string, dividerClassName?: string, iconClassName?: string, subMenuClassName?: string, primaryDisabled?: boolean) => IMenuItemClassNames;
  getSplitButtonVerticalDividerClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
  href?: string;
  iconProps?: IIconProps;
  // @deprecated
  inactive?: boolean;
  itemProps?: Partial<IContextualMenuItemProps>;
  // (undocumented)
  itemType?: ContextualMenuItemType;
  key: string;
  keytipProps?: IKeytipProps;
  // @deprecated
  name?: string;
  onClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
  onMouseDown?: (item: IContextualMenuItem, event: any) => void;
  onRender?: (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void) => React.ReactNode;
  onRenderIcon?: IRenderFunction<IContextualMenuItemProps>;
  primaryDisabled?: boolean;
  rel?: string;
  role?: string;
  secondaryText?: string;
  sectionProps?: IContextualMenuSection;
  shortCut?: string;
  split?: boolean;
  // @deprecated
  style?: React.CSSProperties;
  submenuIconProps?: IIconProps;
  subMenuProps?: IContextualMenuProps;
  target?: string;
  text?: string;
  title?: string;
}

// @public (undocumented)
interface IContextualMenuItemProps extends React.HTMLAttributes<IContextualMenuItemProps> {
  className?: string;
  classNames: IMenuItemClassNames;
  componentRef?: IRefObject<IContextualMenuRenderItem>;
  dismissMenu?: (ev?: any, dismissAll?: boolean) => void;
  dismissSubMenu?: () => void;
  getSubmenuTarget?: () => HTMLElement | undefined;
  hasIcons: boolean | undefined;
  index: number;
  item: IContextualMenuItem;
  onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);
  openSubMenu?: (item: any, target: HTMLElement) => void;
  styles?: IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IContextualMenuItemStyleProps {
  checked: boolean;
  className?: string;
  disabled: boolean;
  dividerClassName?: string;
  expanded: boolean;
  iconClassName?: string;
  isAnchorLink: boolean;
  itemClassName?: string;
  knownIcon: boolean;
  primaryDisabled?: boolean;
  subMenuClassName?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IContextualMenuItemStyles extends IButtonStyles {
  anchorLink: IStyle;
  checkmarkIcon: IStyle;
  divider: IStyle;
  icon: IStyle;
  iconColor: IStyle;
  item: IStyle;
  label: IStyle;
  linkContent: IStyle;
  linkContentMenu: IStyle;
  root: IStyle;
  secondaryText: IStyle;
  splitContainer: IStyle;
  splitMenu: IStyle;
  splitPrimary: IStyle;
  subMenuIcon: IStyle;
}

// @public (undocumented)
interface IContextualMenuListProps {
  // (undocumented)
  hasCheckmarks: boolean;
  // (undocumented)
  hasIcons: boolean;
  // (undocumented)
  items: IContextualMenuItem[];
  // (undocumented)
  totalItemCount: number;
}

// @public
interface IContextualMenuProps extends IBaseProps<IContextualMenu>, IWithResponsiveModeState {
  alignTargetEdge?: boolean;
  ariaLabel?: string;
  beakWidth?: number;
  bounds?: IRectangle;
  calloutProps?: ICalloutProps;
  className?: string;
  componentRef?: IRefObject<IContextualMenu>;
  contextualMenuItemAs?: React.ComponentClass<IContextualMenuItemProps> | React.StatelessComponent<IContextualMenuItemProps>;
  coverTarget?: boolean;
  delayUpdateFocusOnHover?: boolean;
  directionalHint?: DirectionalHint;
  directionalHintFixed?: boolean;
  directionalHintForRTL?: DirectionalHint;
  doNotLayer?: boolean;
  focusZoneProps?: IFocusZoneProps;
  gapSpace?: number;
  // @deprecated
  getMenuClassNames?: (theme: ITheme, className?: string) => IContextualMenuClassNames;
  hidden?: boolean;
  id?: string;
  isBeakVisible?: boolean;
  isSubMenu?: boolean;
  items: IContextualMenuItem[];
  labelElementId?: string;
  onDismiss?: (ev?: any, dismissAll?: boolean) => void;
  onItemClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
  onMenuDismissed?: (contextualMenu?: IContextualMenuProps) => void;
  onMenuOpened?: (contextualMenu?: IContextualMenuProps) => void;
  onRenderMenuList?: IRenderFunction<IContextualMenuListProps>;
  onRenderSubMenu?: IRenderFunction<IContextualMenuProps>;
  shouldFocusOnContainer?: boolean;
  shouldFocusOnMount?: boolean;
  styles?: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles>;
  subMenuHoverDelay?: number;
  target?: Element | string | MouseEvent | IPoint | null;
  theme?: ITheme;
  title?: string;
  useTargetAsMinWidth?: boolean;
  useTargetWidth?: boolean;
}

// @public (undocumented)
interface IContextualMenuRenderItem {
  dismissMenu: (dismissAll?: boolean) => void;
  dismissSubMenu: () => void;
  openSubMenu: () => void;
}

// @public
interface IContextualMenuSection extends React.ClassAttributes<any> {
  bottomDivider?: boolean;
  items: IContextualMenuItem[];
  title?: string;
  topDivider?: boolean;
}

// @public (undocumented)
interface IContextualMenuState {
  // (undocumented)
  contextualMenuItems?: IContextualMenuItem[];
  // (undocumented)
  contextualMenuTarget?: Element;
  // (undocumented)
  dismissedMenuItemKey?: string;
  expandedByMouseClick?: boolean;
  // (undocumented)
  expandedMenuItemKey?: string;
  // (undocumented)
  positions?: any;
  // (undocumented)
  slideDirectionalClassName?: string;
  // (undocumented)
  submenuDirection?: DirectionalHint;
  // (undocumented)
  subMenuId?: string;
  // (undocumented)
  submenuTarget?: Element;
}

// @public (undocumented)
interface IContextualMenuStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IContextualMenuStyles {
  container: IStyle;
  header: IStyle;
  list: IStyle;
  root: IStyle;
  subComponentStyles: IContextualMenuSubComponentStyles;
  title: IStyle;
}

// @public (undocumented)
interface IContextualMenuSubComponentStyles {
  callout: IStyleFunctionOrObject<ICalloutContentStyleProps, any>;
  menuItem: IStyleFunctionOrObject<IContextualMenuItemStyleProps, any>;
}

// @public (undocumented)
enum IconType {
  default = 0,
  // @deprecated
  Default = 100000,
  image = 1,
  // @deprecated
  Image = 100001
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
    [key: string]: Settings;
  }
  // (undocumented)
  settings: Settings;
}

// @public (undocumented)
interface ICustomizerContext {
  // (undocumented)
  customizations: ICustomizations;
}

// @public (undocumented)
interface IDatePicker {
  focus(): void;
  reset(): void;
}

// @public (undocumented)
interface IDatePickerProps extends IBaseProps<IDatePicker>, React.HTMLAttributes<HTMLElement> {
  allFocusable?: boolean;
  allowTextInput?: boolean;
  ariaLabel?: string;
  borderless?: boolean;
  calendarAs?: IComponentAs<ICalendarProps>;
  calendarProps?: ICalendarProps;
  calloutProps?: ICalloutProps;
  className?: string;
  componentRef?: IRefObject<IDatePicker>;
  dateTimeFormatter?: ICalendarFormatDateCallbacks;
  disableAutoFocus?: boolean;
  disabled?: boolean;
  firstDayOfWeek?: DayOfWeek;
  firstWeekOfYear?: FirstWeekOfYear;
  formatDate?: (date?: Date) => string;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  initialPickerDate?: Date;
  isMonthPickerVisible?: boolean;
  isRequired?: boolean;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  onAfterMenuDismiss?: () => void;
  onSelectDate?: (date: Date | null | undefined) => void;
  parseDateFromString?: (dateStr: string) => Date | null;
  pickerAriaLabel?: string;
  placeholder?: string;
  showCloseButton?: boolean;
  showGoToToday?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  strings?: IDatePickerStrings;
  styles?: IStyleFunction<IDatePickerStyleProps, IDatePickerStyles>;
  tabIndex?: number;
  theme?: ITheme;
  today?: Date;
  underlined?: boolean;
  value?: Date;
}

// @public (undocumented)
interface IDatePickerState {
  // (undocumented)
  errorMessage?: string;
  // (undocumented)
  formattedDate?: string;
  // (undocumented)
  isDatePickerShown?: boolean;
  // (undocumented)
  selectedDate?: Date;
}

// @public (undocumented)
interface IDatePickerStrings {
  closeButtonAriaLabel?: string;
  days: string[];
  goToToday: string;
  invalidInputErrorMessage?: string;
  isOutOfBoundsErrorMessage?: string;
  isRequiredErrorMessage?: string;
  months: string[];
  nextMonthAriaLabel?: string;
  nextYearAriaLabel?: string;
  prevMonthAriaLabel?: string;
  prevYearAriaLabel?: string;
  shortDays: string[];
  shortMonths: string[];
}

// @public (undocumented)
interface IDatePickerStyleProps {
  className?: string;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  isDatePickerShown?: boolean;
  // (undocumented)
  label?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDatePickerStyles {
  // (undocumented)
  callout: IStyle;
  // (undocumented)
  icon: IStyle;
  root: IStyle;
  // (undocumented)
  textField: IStyle;
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

// @public (undocumented)
interface IDetailsFooterBaseProps extends IDetailsItemProps {
}

// @public (undocumented)
interface IDetailsFooterProps extends IDetailsFooterBaseProps {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
}

// @public (undocumented)
interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {
}

// @public (undocumented)
interface IDetailsGroupRenderProps extends IGroupRenderProps {
  // (undocumented)
  onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
  // (undocumented)
  onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
}

// WARNING: The type "DetailsHeaderBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDetailsHeaderBaseProps extends React.ClassAttributes<DetailsHeaderBase>, IDetailsItemProps {
  ariaLabel?: string;
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  className?: string;
  collapseAllVisibility?: CollapseAllVisibility;
  columnReorderOptions?: IColumnReorderOptions;
  columnReorderProps?: IColumnReorderHeaderProps;
  componentRef?: IRefObject<IDetailsHeader>;
  isAllCollapsed?: boolean;
  layoutMode: DetailsListLayoutMode;
  minimumPixelsForDrag?: number;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  selectAllVisibility?: SelectAllVisibility;
  styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDetailsHeaderProps extends IDetailsHeaderBaseProps {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
}

// @public (undocumented)
interface IDetailsItemProps {
  cellStyleProps?: ICellStyleProps;
  checkboxVisibility?: CheckboxVisibility | undefined;
  columns?: IColumn[];
  groupNestingDepth?: number;
  indentWidth?: number | undefined;
  selection?: ISelection | undefined;
  selectionMode?: SelectionMode | undefined;
  viewport?: IViewport | undefined;
}

// @public (undocumented)
interface IDetailsList extends IList {
  focusIndex: (index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
  forceUpdate: () => void;
  getStartItemIndexInView: () => number;
}

// @public (undocumented)
interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
  ariaLabel?: string;
  ariaLabelForGrid?: string;
  ariaLabelForListHeader?: string;
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  cellStyleProps?: ICellStyleProps;
  checkboxCellClassName?: string;
  checkboxVisibility?: CheckboxVisibility;
  checkButtonAriaLabel?: string;
  className?: string;
  columnReorderOptions?: IColumnReorderOptions;
  columns?: IColumn[];
  compact?: boolean;
  componentRef?: IRefObject<IDetailsList>;
  constrainMode?: ConstrainMode;
  disableSelectionZone?: boolean;
  dragDropEvents?: IDragDropEvents;
  enableShimmer?: boolean;
  enterModalSelectionOnTouch?: boolean;
  getGroupHeight?: (group: IGroup, groupIndex: number) => number;
  getKey?: (item: any, index?: number) => string;
  getRowAriaDescribedBy?: (item: any) => string;
  getRowAriaLabel?: (item: any) => string;
  groupProps?: IDetailsGroupRenderProps;
  groups?: IGroup[];
  indentWidth?: number;
  initialFocusedIndex?: number;
  isHeaderVisible?: boolean;
  items: any[];
  layoutMode?: DetailsListLayoutMode;
  listProps?: IListProps;
  minimumPixelsForDrag?: number;
  onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
  onColumnHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;
  onColumnHeaderContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;
  onColumnResize?: (column?: IColumn, newWidth?: number, columnIndex?: number) => void;
  onDidUpdate?: (detailsList?: DetailsListBase) => any;
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
  onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;
  onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;
  onRenderRow?: IRenderFunction<IDetailsRowProps>;
  onRowDidMount?: (item?: any, index?: number) => void;
  onRowWillUnmount?: (item?: any, index?: number) => void;
  onShouldVirtualize?: (props: IListProps) => boolean;
  rowElementEventMap?: {
          eventName: string;
          callback: (context: IDragDropContext, event?: any) => void;
      }[];
  selection?: ISelection;
  selectionMode?: SelectionMode;
  selectionPreservedOnEmptyClick?: boolean;
  selectionZoneProps?: ISelectionZoneProps;
  setKey?: string;
  shouldApplyApplicationRole?: boolean;
  styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;
  theme?: ITheme;
  usePageCache?: boolean;
  useReducedRowRenderer?: boolean;
  viewport?: IViewport;
}

// @public (undocumented)
interface IDetailsListState {
  // (undocumented)
  adjustedColumns: IColumn[];
  // (undocumented)
  focusedItemIndex: number;
  // (undocumented)
  isCollapsed?: boolean;
  // (undocumented)
  isDropping?: boolean;
  // (undocumented)
  isSizing?: boolean;
  // (undocumented)
  isSomeGroupExpanded?: boolean;
  // (undocumented)
  lastSelectionMode?: SelectionMode;
  // (undocumented)
  lastWidth?: number;
}

// @public (undocumented)
interface IDetailsListStyles {
  // (undocumented)
  contentWrapper: IStyle;
  // (undocumented)
  focusZone: IStyle;
  // (undocumented)
  headerWrapper: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDetailsRow {
}

// @public (undocumented)
interface IDetailsRowBaseProps extends IBaseProps<IDetailsRow>, IDetailsItemProps {
  checkboxCellClassName?: string;
  checkButtonAriaLabel?: string;
  className?: string;
  collapseAllVisibility?: CollapseAllVisibility;
  compact?: boolean;
  componentRef?: IRefObject<IDetailsRow>;
  dragDropEvents?: IDragDropEvents;
  dragDropHelper?: IDragDropHelper;
  eventsToRegister?: {
          eventName: string;
          callback: (item?: any, index?: number, event?: any) => void;
      }[];
  getRowAriaDescribedBy?: (item: any) => string;
  getRowAriaLabel?: (item: any) => string;
  item: any;
  itemIndex: number;
  onDidMount?: (row?: DetailsRowBase) => void;
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  onWillUnmount?: (row?: DetailsRowBase) => void;
  rowFieldsAs?: React.StatelessComponent<IDetailsRowFieldsProps> | React.ComponentClass<IDetailsRowFieldsProps>;
  shimmer?: boolean;
  styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;
  theme?: ITheme;
  useReducedRowRenderer?: boolean;
}

// @public (undocumented)
interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
  anySelected?: boolean;
  canSelect: boolean;
  checkClassName?: string;
  className?: string;
  compact?: boolean;
  isHeader?: boolean;
  // @deprecated
  isSelected?: boolean;
  isVisible?: boolean;
  selected?: boolean;
  styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDetailsRowCheckStyles {
  // (undocumented)
  check: IStyle;
  // (undocumented)
  isDisabled: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDetailsRowProps extends IDetailsRowBaseProps {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
}

// @public (undocumented)
interface IDetailsRowSelectionState {
  // (undocumented)
  isSelected: boolean;
  // (undocumented)
  isSelectionModal: boolean;
}

// @public (undocumented)
interface IDetailsRowState {
  // (undocumented)
  columnMeasureInfo?: {
    column: IColumn;
    index: number;
    onMeasureDone: (measuredWidth: number) => void;
  }
  // (undocumented)
  groupNestingDepth?: number;
  // (undocumented)
  isDropping?: boolean;
  // (undocumented)
  selectionState?: IDetailsRowSelectionState;
}

// @public (undocumented)
interface IDetailsRowStyles {
  // (undocumented)
  cell: IStyle;
  // (undocumented)
  cellMeasurer: IStyle;
  // (undocumented)
  cellPadded: IStyle;
  // (undocumented)
  cellUnpadded: IStyle;
  // (undocumented)
  check: IStyle;
  // (undocumented)
  checkCell: IStyle;
  // (undocumented)
  checkCover: IStyle;
  // (undocumented)
  fields: IStyle;
  // (undocumented)
  isMultiline: IStyle;
  // (undocumented)
  isRowHeader: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  shimmer: IStyle;
  // (undocumented)
  shimmerBottomBorder: IStyle;
  // (undocumented)
  shimmerIconPlaceholder: IStyle;
  // (undocumented)
  shimmerLeftBorder: IStyle;
}

// @public (undocumented)
interface IDialog {
}

// @public (undocumented)
interface IDialogContent {
}

// @public (undocumented)
interface IDialogContentProps extends React.ClassAttributes<DialogContentBase> {
  className?: string;
  closeButtonAriaLabel?: string;
  componentRef?: IRefObject<IDialogContent>;
  isMultiline?: boolean;
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
  responsiveMode?: ResponsiveMode;
  showCloseButton?: boolean;
  styles?: IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles>;
  subText?: string;
  subTextId?: string;
  theme?: ITheme;
  title?: string;
  titleId?: string;
  topButtonsProps?: IButtonProps[];
  type?: DialogType;
}

// @public (undocumented)
interface IDialogContentStyleProps {
  className?: string;
  // (undocumented)
  hidden?: boolean;
  // (undocumented)
  isClose?: boolean;
  // (undocumented)
  isLargeHeader?: boolean;
  isMultiline?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDialogContentStyles {
  // (undocumented)
  button: IStyle;
  content: IStyle;
  // (undocumented)
  header: IStyle;
  // (undocumented)
  inner: IStyle;
  // (undocumented)
  innerContent: IStyle;
  // (undocumented)
  subText: IStyle;
  // (undocumented)
  title: IStyle;
  // (undocumented)
  topButton: IStyle;
}

// @public (undocumented)
interface IDialogFooter {
}

// @public (undocumented)
interface IDialogFooterProps extends React.Props<DialogFooterBase> {
  className?: string;
  componentRef?: IRefObject<IDialogFooter>;
  styles?: IStyleFunctionOrObject<IDialogFooterStyleProps, IDialogFooterStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDialogFooterStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDialogFooterStyles {
  // (undocumented)
  action: IStyle;
  actions: IStyle;
  // (undocumented)
  actionsRight: IStyle;
}

// @public (undocumented)
interface IDialogProps extends React.ClassAttributes<DialogBase>, IWithResponsiveModeState, IAccessiblePopupProps {
  // @deprecated
  ariaDescribedById?: string;
  // @deprecated
  ariaLabelledById?: string;
  // @deprecated
  className?: string;
  componentRef?: IRefObject<IDialog>;
  // @deprecated
  containerClassName?: string;
  // @deprecated
  contentClassName?: string;
  dialogContentProps?: IDialogContentProps;
  hidden?: boolean;
  // @deprecated
  isBlocking?: boolean;
  // @deprecated
  isDarkOverlay?: boolean;
  // @deprecated
  isOpen?: boolean;
  maxWidth?: ICSSRule | ICSSPixelUnitRule;
  minWidth?: ICSSRule | ICSSPixelUnitRule;
  modalProps?: IModalProps;
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
  // @deprecated
  onDismissed?: () => any;
  // @deprecated
  onLayerDidMount?: () => void;
  // @deprecated
  onLayerMounted?: () => void;
  styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;
  // @deprecated
  subText?: string;
  theme?: ITheme;
  // @deprecated
  title?: string;
  // @deprecated
  topButtonsProps?: IButtonProps[];
  // @deprecated
  type?: DialogType;
}

// @public (undocumented)
interface IDialogState {
  // (undocumented)
  hasBeenOpened?: boolean;
  // (undocumented)
  id?: string;
  // (undocumented)
  isOpen?: boolean;
  // (undocumented)
  isVisible?: boolean;
  // (undocumented)
  isVisibleClose?: boolean;
  // (undocumented)
  modalRectangleTop?: number;
}

// @public (undocumented)
interface IDialogStyleProps {
  className?: string;
  // @deprecated
  containerClassName?: string;
  // @deprecated
  contentClassName?: string;
  dialogDefaultMaxWidth?: string | ICSSRule | ICSSPixelUnitRule;
  dialogDefaultMinWidth?: string | ICSSRule | ICSSPixelUnitRule;
  hidden?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDialogStyles {
  // (undocumented)
  main: IStyle;
  root: IStyle;
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

// @public (undocumented)
interface IDividerAsProps extends IIconProps {
  item?: IBreadcrumbItem;
}

// @public (undocumented)
interface IDocumentCard {
  focus: () => void;
}

// @public (undocumented)
interface IDocumentCardActions {
}

// WARNING: The type "DocumentCardActionsBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardActionsProps extends React.ClassAttributes<DocumentCardActionsBase> {
  actions: IButtonProps[];
  className?: string;
  componentRef?: IRefObject<IDocumentCardActions>;
  styles?: IStyleFunctionOrObject<IDocumentCardActionsStyleProps, IDocumentCardActionsStyles>;
  theme?: ITheme;
  views?: Number;
}

// @public (undocumented)
interface IDocumentCardActionsStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardActionsStyles {
  // (undocumented)
  action: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  views: IStyle;
  // (undocumented)
  viewsIcon: IStyle;
}

// @public (undocumented)
interface IDocumentCardActivity {
}

// @public (undocumented)
interface IDocumentCardActivityPerson {
  allowPhoneInitials?: boolean;
  initials?: string;
  initialsColor?: PersonaInitialsColor;
  name: string;
  profileImageSrc: string;
}

// WARNING: The type "DocumentCardActivityBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardActivityProps extends React.ClassAttributes<DocumentCardActivityBase> {
  activity: string;
  className?: string;
  componentRef?: IRefObject<IDocumentCardActivity>;
  people: IDocumentCardActivityPerson[];
  styles?: IStyleFunctionOrObject<IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardActivityStyleProps {
  className?: string;
  multiplePeople?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardActivityStyles {
  // (undocumented)
  activity: IStyle;
  // (undocumented)
  avatar: IStyle;
  // (undocumented)
  avatars: IStyle;
  // (undocumented)
  details: IStyle;
  // (undocumented)
  name: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardDetails {
}

// WARNING: The type "DocumentCardDetailsBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardDetailsProps extends React.Props<DocumentCardDetailsBase> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardDetails>;
  styles?: IStyleFunctionOrObject<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardDetailsStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardDetailsStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardImage {
}

// @public (undocumented)
interface IDocumentCardImageProps extends IBaseProps<{}> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardImage>;
  height?: number;
  iconProps?: IIconProps;
  imageFit?: ImageFit;
  imageSrc?: string;
  styles?: IStyleFunctionOrObject<IDocumentCardImageStyleProps, IDocumentCardImageStyles>;
  theme?: ITheme;
  width?: number;
}

// @public (undocumented)
interface IDocumentCardImageStyleProps extends IDocumentCardImageProps {
}

// @public (undocumented)
interface IDocumentCardImageStyles {
  // (undocumented)
  centeredIcon: IStyle;
  // (undocumented)
  centeredIconWrapper: IStyle;
  // (undocumented)
  cornerIcon: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardLocation {
}

// WARNING: The type "DocumentCardLocationBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardLocationProps extends React.ClassAttributes<DocumentCardLocationBase> {
  ariaLabel?: string;
  className?: string;
  componentRef?: IRefObject<IDocumentCardLocation>;
  location: string;
  locationHref?: string;
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;
  styles?: IStyleFunctionOrObject<IDocumentCardLocationStyleProps, IDocumentCardLocationStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardLocationStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardLocationStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardLogo {
}

// WARNING: The type "DocumentCardLogoBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardLogoProps extends React.ClassAttributes<DocumentCardLogoBase> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardLogo>;
  logoIcon: string;
  logoName?: string;
  styles?: IStyleFunctionOrObject<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardLogoStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardLogoStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardPreview {
}

// @public (undocumented)
interface IDocumentCardPreviewImage {
  // @deprecated
  accentColor?: string;
  componentRef?: IRefObject<{}>;
  // @deprecated
  errorImageSrc?: string;
  height?: number;
  iconSrc?: string;
  imageFit?: ImageFit;
  linkProps?: ILinkProps;
  name?: string;
  previewIconContainerClass?: string;
  previewIconProps?: IIconProps;
  previewImageSrc?: string;
  // @deprecated
  url?: string;
  width?: number;
}

// @public (undocumented)
interface IDocumentCardPreviewProps extends IBaseProps<{}> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardPreview>;
  getOverflowDocumentCountText?: (overflowCount: number) => string;
  previewImages: IDocumentCardPreviewImage[];
  styles?: IStyleFunctionOrObject<IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardPreviewStyleProps {
  className?: string;
  isFileList?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardPreviewStyles {
  // (undocumented)
  fileList: IStyle;
  // (undocumented)
  fileListIcon: IStyle;
  // (undocumented)
  fileListOverflowText: IStyle;
  // (undocumented)
  icon: IStyle;
  // (undocumented)
  previewIcon: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardProps extends IBaseProps<IDocumentCard>, React.HTMLAttributes<HTMLDivElement> {
  // @deprecated
  accentColor?: string;
  children?: React.ReactNode;
  className?: string;
  componentRef?: IRefObject<IDocumentCard>;
  onClick?: (ev?: React.SyntheticEvent<HTMLElement>) => void;
  onClickHref?: string;
  role?: string;
  styles?: IStyleFunctionOrObject<IDocumentCardStyleProps, IDocumentCardStyles>;
  theme?: ITheme;
  type?: DocumentCardType;
}

// @public (undocumented)
interface IDocumentCardStatus {
}

// WARNING: The type "DocumentCardStatusBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardStatusProps extends React.Props<DocumentCardStatusBase> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardStatus>;
  status: string;
  statusIcon?: string;
  styles?: IStyleFunctionOrObject<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDocumentCardStatusStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardStatusStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardStyleProps {
  actionable?: boolean;
  className?: string;
  compact?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDocumentCardTitle {
}

// WARNING: The type "DocumentCardTitleBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IDocumentCardTitleProps extends React.ClassAttributes<DocumentCardTitleBase> {
  className?: string;
  componentRef?: IRefObject<IDocumentCardTitle>;
  shouldTruncate?: boolean;
  showAsSecondaryTitle?: boolean;
  styles?: IStyleFunctionOrObject<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>;
  theme?: ITheme;
  title: string;
}

// @public (undocumented)
interface IDocumentCardTitleStyleProps {
  className?: string;
  showAsSecondaryTitle?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IDocumentCardTitleStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IDropdown {
  // (undocumented)
  focus: (shouldOpenOnFocus?: boolean) => void;
}

// @public
interface IDropdownInternalProps extends IDropdownProps, IWithResponsiveModeState {
}

// @public (undocumented)
interface IDropdownOption extends ISelectableOption {
  // @deprecated
  isSelected?: boolean;
}

// @public (undocumented)
interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement> {
  defaultSelectedKeys?: string[] | number[];
  dropdownWidth?: number;
  // @deprecated
  isDisabled?: boolean;
  keytipProps?: IKeytipProps;
  multiSelect?: boolean;
  multiSelectDelimiter?: string;
  notifyOnReselect?: boolean;
  onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
  // @deprecated (undocumented)
  onChanged?: (option: IDropdownOption, index?: number) => void;
  onDismiss?: () => void;
  onRenderCaretDown?: IRenderFunction<IDropdownProps>;
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;
  onRenderTitle?: IRenderFunction<IDropdownOption | IDropdownOption[]>;
  options: IDropdownOption[];
  // @deprecated
  placeHolder?: string;
  responsiveMode?: ResponsiveMode;
  selectedKeys?: string[] | number[];
  styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IDropdownState {
  // (undocumented)
  calloutRenderEdge?: RectangleEdge;
  hasFocus: boolean;
  // (undocumented)
  isOpen: boolean;
  // (undocumented)
  selectedIndices: number[];
}

// @public
interface IDropdownStyles {
  callout: IStyle;
  caretDown: IStyle;
  caretDownWrapper: IStyle;
  dropdown: IStyle;
  dropdownDivider: IStyle;
  dropdownItem: IStyle;
  dropdownItemDisabled: IStyle;
  dropdownItemHeader: IStyle;
  dropdownItems: IStyle;
  dropdownItemSelected: IStyle;
  dropdownItemSelectedAndDisabled: IStyle;
  dropdownItemsWrapper: IStyle;
  dropdownOptionText: IStyle;
  errorMessage: IStyle;
  label: IStyle;
  panel: IStyle;
  root: IStyle;
  subComponentStyles: IDropdownSubComponentStyles;
  title: IStyle;
}

// @public (undocumented)
interface IDropdownSubComponentStyles {
  label: IStyleFunctionOrObject<ILabelStyleProps, any>;
  panel: IStyleFunctionOrObject<IPanelStyleProps, any>;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface IEffects {
  elevation16: IRawStyle;
  elevation4: IRawStyle;
  elevation64: IRawStyle;
  elevation8: IRawStyle;
  roundedCorner2: number;
}

// @public
interface IEntityRect {
  // (undocumented)
  height: number;
  // (undocumented)
  width: number;
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

// @public (undocumented)
interface IExpandingCard {
}

// @public
interface IExpandingCardProps extends IBaseCardProps<IExpandingCard, IExpandingCardStyles, IExpandingCardStyleProps> {
  compactCardHeight?: number;
  expandedCardHeight?: number;
  mode?: ExpandingCardMode;
  onRenderCompactCard?: IRenderFunction<any>;
  onRenderExpandedCard?: IRenderFunction<any>;
}

// @public (undocumented)
interface IExpandingCardState {
  // (undocumented)
  firstFrameRendered: boolean;
  // (undocumented)
  needsScroll: boolean;
}

// @public (undocumented)
interface IExpandingCardStyleProps extends IBaseCardStyleProps {
  compactCardHeight?: number;
  expandedCardFirstFrameRendered?: boolean;
  expandedCardHeight?: number;
  needsScroll?: boolean;
}

// @public (undocumented)
interface IExpandingCardStyles extends IBaseCardStyles {
  compactCard?: IStyle;
  expandedCard?: IStyle;
  expandedCardScroll?: IStyle;
}

// @public (undocumented)
interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {
}

// @public (undocumented)
interface IExtendedPersonaProps extends IPersonaProps {
  // (undocumented)
  blockRecipientRemoval?: boolean;
  // (undocumented)
  canExpand?: boolean;
  // (undocumented)
  isEditing?: boolean;
  // (undocumented)
  isValid: boolean;
  // (undocumented)
  shouldBlockSelection?: boolean;
}

// @public (undocumented)
interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
  // (undocumented)
  componentRef?: IRefObject<{}>;
  // (undocumented)
  styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;
  // (undocumented)
  theme?: ITheme;
}

// @public (undocumented)
interface IFabricStyleProps extends IFabricProps {
  // (undocumented)
  isFocusVisible: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IFabricStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IFacepile {
}

// @public (undocumented)
interface IFacepilePersona extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  allowPhoneInitials?: boolean;
  data?: any;
  imageInitials?: string;
  imageUrl?: string;
  initialsColor?: PersonaInitialsColor;
  keytipProps?: IKeytipProps;
  onClick?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
  onMouseMove?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
  onMouseOut?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
  personaName?: string;
}

// @public (undocumented)
interface IFacepileProps extends React.ClassAttributes<FacepileBase> {
  addButtonProps?: IButtonProps;
  ariaDescription?: string;
  // @deprecated
  chevronButtonProps?: IButtonProps;
  className?: string;
  componentRef?: IRefObject<IFacepile>;
  getPersonaProps?: (persona: IFacepilePersona) => IPersonaSharedProps;
  maxDisplayablePersonas?: number;
  overflowButtonProps?: IButtonProps;
  overflowButtonType?: OverflowButtonType;
  overflowPersonas?: IFacepilePersona[];
  personas: IFacepilePersona[];
  personaSize?: PersonaSize;
  showAddButton?: boolean;
  styles?: IStyleFunctionOrObject<IFacepileStyleProps, IFacepileStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IFacepileStyleProps {
  className?: string;
  spacingAroundItemButton?: number;
  theme: ITheme;
}

// @public (undocumented)
interface IFacepileStyles {
  // (undocumented)
  addButton: IStyle;
  // (undocumented)
  descriptiveOverflowButton: IStyle;
  // (undocumented)
  itemButton: IStyle;
  // (undocumented)
  itemContainer: IStyle;
  // (undocumented)
  member: IStyle;
  // (undocumented)
  members: IStyle;
  // (undocumented)
  overflowButton: IStyle;
  // (undocumented)
  overflowInitialsIcon: IStyle;
  root: IStyle;
  // (undocumented)
  screenReaderOnly: IStyle;
}

// @public
interface IFitContentToBoundsOptions {
  boundsSize: ISize;
  contentSize: ISize;
  maxScale?: number;
  mode: FitMode;
}

// @public (undocumented)
interface IFocusTrapCalloutProps extends ICalloutProps {
  focusTrapProps?: IFocusTrapZoneProps;
}

// @public (undocumented)
interface IFocusTrapZone {
  focus: () => void;
}

// @public (undocumented)
interface IFocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  ariaLabelledBy?: string;
  componentRef?: IRefObject<IFocusTrapZone>;
  disableFirstFocus?: boolean;
  elementToFocusOnDismiss?: HTMLElement;
  firstFocusableSelector?: string | (() => string);
  focusPreviouslyFocusedInnerElement?: boolean;
  forceFocusInsideTrap?: boolean;
  ignoreExternalFocusing?: boolean;
  isClickableOutsideFocusTrap?: boolean;
}

// @public
interface IFocusZone {
  focus(forceIntoFirstElement?: boolean): boolean;
  focusElement(childElement?: HTMLElement): boolean;
}

// @public
interface IFocusZoneProps extends React.HTMLAttributes<HTMLElement | FocusZone> {
  allowFocusRoot?: boolean;
  // @deprecated
  allowTabKey?: boolean;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  checkForNoWrap?: boolean;
  className?: string;
  componentRef?: IRefObject<IFocusZone>;
  defaultActiveElement?: string;
  direction?: FocusZoneDirection;
  disabled?: boolean;
  doNotAllowFocusEventToPropagate?: boolean;
  elementType?: keyof React.ReactHTML;
  handleTabKey?: FocusZoneTabbableElements;
  isCircularNavigation?: boolean;
  isInnerZoneKeystroke?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;
  onBeforeFocus?: (childElement?: HTMLElement) => boolean;
  onFocusNotification?: () => void;
  // @deprecated
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean;
}

// @public
interface IFontFace extends IRawFontStyle {
  fontFeatureSettings?: string;
  src?: string;
  unicodeRange?: ICSSRule | string;
}

// @public
interface IFontStyles {
  // (undocumented)
  large: IRawStyle;
  // (undocumented)
  medium: IRawStyle;
  // (undocumented)
  mediumPlus: IRawStyle;
  // (undocumented)
  mega: IRawStyle;
  // (undocumented)
  small: IRawStyle;
  // (undocumented)
  smallPlus: IRawStyle;
  // (undocumented)
  superLarge: IRawStyle;
  // (undocumented)
  tiny: IRawStyle;
  // (undocumented)
  xLarge: IRawStyle;
  // (undocumented)
  xSmall: IRawStyle;
  // (undocumented)
  xxLarge: IRawStyle;
}

// @public (undocumented)
interface IGap extends IShimmerElement {
  height?: number;
  width?: number | string;
}

// @public (undocumented)
interface IGenericItem {
  // (undocumented)
  imageInitials: string;
  // (undocumented)
  primaryText: string;
  // (undocumented)
  ValidationState: ValidationState;
}

// @public (undocumented)
interface IGrid {
}

// @public (undocumented)
interface IGridCellProps<T> {
  cellDisabledStyle?: string[];
  cellIsSelectedStyle?: string[];
  className?: string;
  disabled?: boolean;
  getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, isSplit: boolean | undefined) => IButtonClassNames;
  id: string;
  index?: number;
  item: T;
  label?: string;
  onClick?: (item: T) => void;
  onFocus?: (item: T) => void;
  onHover?: (item?: T) => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
  onRenderItem: (item: T) => JSX.Element;
  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  role?: string;
  selected?: boolean;
}

// @public (undocumented)
interface IGridProps {
  columnCount: number;
  componentRef?: IRefObject<IGrid>;
  // @deprecated
  containerClassName?: string;
  doNotContainWithinFocusZone?: boolean;
  items: any[];
  onBlur?: () => void;
  onRenderItem: (item: any, index: number) => JSX.Element;
  positionInSet?: number;
  setSize?: number;
  shouldFocusCircularNavigate?: boolean;
  styles?: IStyleFunctionOrObject<IGridStyleProps, IGridStyles>;
  theme?: ITheme;
}

// @public
interface IGridStyleProps {
  theme: ITheme;
}

// @public
interface IGridStyles {
  focusedContainer?: IStyle;
  root: IStyle;
  tableCell: IStyle;
}

// @public (undocumented)
interface IGroup {
  ariaLabel?: string;
  children?: IGroup[];
  count: number;
  data?: any;
  hasMoreData?: boolean;
  isCollapsed?: boolean;
  isDropEnabled?: boolean;
  // @deprecated
  isSelected?: boolean;
  isShowingAll?: boolean;
  key: string;
  level?: number;
  name: string;
  startIndex: number;
}

// @public (undocumented)
interface IGroupDividerProps {
  className?: string;
  compact?: boolean;
  // (undocumented)
  componentRef?: IRefObject<{}>;
  expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
  footerText?: string;
  group?: IGroup;
  groupIndex?: number;
  groupLevel?: number;
  groups?: IGroup[];
  indentWidth?: number;
  isCollapsedGroupSelectVisible?: boolean;
  isGroupLoading?: (group: IGroup) => boolean;
  // @deprecated
  isSelected?: boolean;
  loadingText?: string;
  onGroupHeaderClick?: (group: IGroup) => void;
  onRenderTitle?: IRenderFunction<IGroupHeaderProps>;
  onToggleCollapse?: (group: IGroup) => void;
  onToggleSelectGroup?: (group: IGroup) => void;
  onToggleSummarize?: (group: IGroup) => void;
  selected?: boolean;
  selectionMode?: SelectionMode;
  showAllLinkText?: string;
  theme?: ITheme;
  viewport?: IViewport;
}

// @public (undocumented)
interface IGroupedList extends IList {
  forceUpdate: () => void;
  toggleCollapseAll: (allCollapsed: boolean) => void;
}

// @public (undocumented)
interface IGroupedListProps extends React.ClassAttributes<GroupedListBase> {
  className?: string;
  compact?: boolean;
  componentRef?: IRefObject<IGroupedList>;
  dragDropEvents?: IDragDropEvents;
  dragDropHelper?: IDragDropHelper;
  eventsToRegister?: {
          eventName: string;
          callback: (context: IDragDropContext, event?: any) => void;
      }[];
  getGroupHeight?: (group: IGroup, groupIndex: number) => number;
  groupProps?: IGroupRenderProps;
  groups?: IGroup[];
  items: any[];
  listProps?: IListProps;
  onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;
  onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;
  onShouldVirtualize?: (props: IListProps) => boolean;
  selection?: ISelection;
  selectionMode?: SelectionMode;
  styles?: IStyleFunctionOrObject<IGroupedListStyleProps, IGroupedListStyles>;
  theme?: ITheme;
  usePageCache?: boolean;
  viewport?: IViewport;
}

// @public (undocumented)
interface IGroupedListState {
  // (undocumented)
  groups?: IGroup[];
  // (undocumented)
  lastSelectionMode?: SelectionMode;
  // (undocumented)
  lastWidth?: number;
}

// @public (undocumented)
interface IGroupedListStyles {
  // (undocumented)
  group: IStyle;
  // (undocumented)
  groupIsDropping: IStyle;
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IGroupFooterProps extends IGroupDividerProps {
  styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;
}

// @public (undocumented)
interface IGroupFooterStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IGroupHeaderProps extends IGroupDividerProps {
  groupedListId?: string;
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;
}

// @public (undocumented)
interface IGroupHeaderStyles {
  // (undocumented)
  check: IStyle;
  // (undocumented)
  dropIcon: IStyle;
  // (undocumented)
  expand: IStyle;
  // (undocumented)
  expandIsCollapsed: IStyle;
  // (undocumented)
  groupHeaderContainer: IStyle;
  // (undocumented)
  headerCount: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  title: IStyle;
}

// @public (undocumented)
interface IGroupRenderProps {
  collapseAllVisibility?: CollapseAllVisibility;
  footerProps?: IGroupFooterProps;
  getGroupItemLimit?: (group: IGroup) => number;
  headerProps?: IGroupHeaderProps;
  isAllGroupsCollapsed?: boolean;
  onRenderFooter?: IRenderFunction<IGroupFooterProps>;
  onRenderHeader?: IRenderFunction<IGroupHeaderProps>;
  onRenderShowAll?: IRenderFunction<IGroupShowAllProps>;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  showAllProps?: IGroupShowAllProps;
  showEmptyGroups?: boolean;
}

// @public (undocumented)
interface IGroupShowAllProps extends IGroupDividerProps {
  showAllLinkText?: string;
  styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;
}

// @public (undocumented)
interface IGroupShowAllStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IGroupSpacerProps {
  count: number;
  indentWidth?: number;
  styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IGroupSpacerStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IHoverCard {
}

// @public
interface IHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardDismissDelay?: number;
  cardOpenDelay?: number;
  className?: string;
  componentRef?: IRefObject<IHoverCard>;
  expandedCardOpenDelay?: number;
  expandingCardProps?: IExpandingCardProps;
  instantOpenOnClick?: boolean;
  onCardExpand?: () => void;
  onCardHide?: () => void;
  onCardVisible?: () => void;
  openHotKey?: KeyCodes;
  plainCardProps?: IPlainCardProps;
  setAriaDescribedBy?: boolean;
  setInitialFocus?: boolean;
  shouldBlockHoverCard?: () => void;
  sticky?: boolean;
  styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;
  target?: HTMLElement | string;
  theme?: ITheme;
  trapFocus?: boolean;
  type?: HoverCardType;
}

// @public (undocumented)
interface IHoverCardState {
  // (undocumented)
  isHoverCardVisible?: boolean;
  // (undocumented)
  mode?: ExpandingCardMode;
  // (undocumented)
  openMode?: OpenCardMode;
}

// @public (undocumented)
interface IHoverCardStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IHoverCardStyles {
  host?: IStyle;
}

// @public (undocumented)
interface IHSL {
  h: number;
  l: number;
  s: number;
}

// @public (undocumented)
interface IHSV {
  h: number;
  s: number;
  v: number;
}

// @public (undocumented)
interface IIconOptions {
  disableWarnings: boolean;
  // @deprecated (undocumented)
  warnOnMissingIcons?: boolean;
}

// @public (undocumented)
interface IIconProps extends IBaseProps, React.HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  iconName?: string;
  iconType?: IconType;
  imageErrorAs?: React.StatelessComponent<IImageProps> | React.ComponentClass<IImageProps>;
  imageProps?: IImageProps;
  styles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
  // (undocumented)
  theme?: ITheme;
}

// @public (undocumented)
interface IIconRecord {
  // (undocumented)
  code: string | undefined;
  // (undocumented)
  subset: IIconSubsetRecord;
}

// @public (undocumented)
interface IIconState {
  // (undocumented)
  imageLoadError: boolean;
}

// @public (undocumented)
interface IIconStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  iconClassName?: string;
  // (undocumented)
  isImage: boolean;
  // (undocumented)
  isPlaceholder: boolean;
  // (undocumented)
  styles?: Partial<IIconStyles>;
  // (undocumented)
  theme?: ITheme;
}

// @public (undocumented)
interface IIconStyles {
  // @deprecated
  imageContainer?: IStyle;
  // (undocumented)
  root?: IStyle;
}

// @public (undocumented)
interface IIconSubset {
  // (undocumented)
  fontFace?: IFontFace;
  // (undocumented)
  icons: {
    [key: string]: string | JSX.Element;
  }
  // (undocumented)
  style?: IRawStyle;
}

// @public (undocumented)
interface IImage {
}

// @public (undocumented)
interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  componentRef?: IRefObject<IImage>;
  coverStyle?: ImageCoverStyle;
  // @deprecated
  errorSrc?: string;
  imageFit?: ImageFit;
  maximizeFrame?: boolean;
  onLoadingStateChange?: (loadState: ImageLoadState) => void;
  shouldFadeIn?: boolean;
  shouldStartVisible?: boolean;
  styles?: IStyleFunctionOrObject<IImageStyleProps, IImageStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IImageState {
  // (undocumented)
  loadState?: ImageLoadState;
}

// @public (undocumented)
interface IImageStyleProps {
  className?: string;
  height?: number | string;
  isCenter?: boolean;
  // (undocumented)
  isCenterCover?: boolean;
  // (undocumented)
  isContain?: boolean;
  // (undocumented)
  isCover?: boolean;
  isError?: boolean;
  isLandscape?: boolean;
  isLoaded?: boolean;
  // (undocumented)
  isNone?: boolean;
  isNotImageFit?: boolean;
  maximizeFrame?: boolean;
  shouldFadeIn?: boolean;
  shouldStartVisible?: boolean;
  theme: ITheme;
  width?: number | string;
}

// @public (undocumented)
interface IImageStyles {
  image: IStyle;
  root: IStyle;
}

// @public
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // WARNING: The name "aria-label" contains unsupported characters; API names should use only letters, numbers, and underscores
  aria-label?: string;
  defaultVisibleValue?: string;
}

// @public (undocumented)
interface IKeytip {
}

// @public (undocumented)
interface IKeytipLayer {
}

// @public (undocumented)
interface IKeytipLayerProps extends React.ClassAttributes<IKeytipLayer> {
  componentRef?: IRefObject<IKeytipLayer>;
  content: string;
  keytipExitSequences?: IKeytipTransitionKey[];
  keytipReturnSequences?: IKeytipTransitionKey[];
  keytipStartSequences?: IKeytipTransitionKey[];
  onEnterKeytipMode?: () => void;
  onExitKeytipMode?: (ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => void;
  styles?: IStyleFunctionOrObject<IKeytipLayerStyleProps, IKeytipLayerStyles>;
}

// @public (undocumented)
interface IKeytipLayerState {
  // (undocumented)
  inKeytipMode: boolean;
  // (undocumented)
  keytips: IKeytipProps[];
  // (undocumented)
  visibleKeytips: IKeytipProps[];
}

// @public (undocumented)
interface IKeytipLayerStyleProps {
}

// @public (undocumented)
interface IKeytipLayerStyles {
  // (undocumented)
  innerContent: IStyle;
}

// @public (undocumented)
interface IKeytipProps {
  calloutProps?: ICalloutProps;
  componentRef?: IRefObject<IKeytip>;
  content: string;
  disabled?: boolean;
  hasDynamicChildren?: boolean;
  hasMenu?: boolean;
  keySequences: string[];
  offset?: IPoint;
  onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
  onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
  overflowSetSequence?: string[];
  styles?: IStyleFunctionOrObject<IKeytipStyleProps, IKeytipStyles>;
  theme?: ITheme;
  visible?: boolean;
}

// @public
interface IKeytipStyleProps {
  disabled?: boolean;
  theme: ITheme;
  visible?: boolean;
}

// @public (undocumented)
interface IKeytipStyles {
  container: IStyle;
  root: IStyle;
}

// @public (undocumented)
interface ILabel {
}

// @public (undocumented)
interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: IComponentAs<React.AllHTMLAttributes<HTMLElement>>;
  componentRef?: IRefObject<ILabel>;
  disabled?: boolean;
  required?: boolean;
  styles?: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ILabelStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  required?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface ILabelStyles {
  root: IStyle;
}

// @public (undocumented)
interface ILayer {
}

// @public (undocumented)
interface ILayerProps extends React.HTMLAttributes<HTMLDivElement | LayerBase> {
  className?: string;
  componentRef?: IRefObject<ILayer>;
  eventBubblingEnabled?: boolean;
  hostId?: string;
  onLayerDidMount?: () => void;
  onLayerMounted?: () => void;
  onLayerWillUnmount?: () => void;
  styles?: IStyleFunctionOrObject<ILayerStyleProps, ILayerStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ILayerStyleProps {
  className?: string;
  isNotHost?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface ILayerStyles {
  content?: IStyle;
  root?: IStyle;
}

// @public (undocumented)
interface ILine extends IShimmerElement {
  height?: number;
  width?: number | string;
}

// @public (undocumented)
interface ILink {
  focus(): void;
}

// @public (undocumented)
interface ILinkHTMLAttributes<T> extends React.HTMLAttributes<T> {
  // (undocumented)
  [index: string]: any;
  // (undocumented)
  autoFocus?: boolean;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  download?: any;
  // (undocumented)
  form?: string;
  // (undocumented)
  formAction?: string;
  // (undocumented)
  formEncType?: string;
  // (undocumented)
  formMethod?: string;
  // (undocumented)
  formNoValidate?: boolean;
  // (undocumented)
  formTarget?: string;
  // (undocumented)
  href?: string;
  // (undocumented)
  hrefLang?: string;
  // (undocumented)
  media?: string;
  // (undocumented)
  name?: string;
  // (undocumented)
  rel?: string;
  // (undocumented)
  target?: string;
  // (undocumented)
  type?: string;
  // (undocumented)
  value?: string | string[] | number;
}

// @public (undocumented)
interface ILinkProps extends ILinkHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | LinkBase> {
  as?: string | React.ComponentClass | React.StatelessComponent;
  componentRef?: IRefObject<ILink>;
  disabled?: boolean;
  keytipProps?: IKeytipProps;
  styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ILinkStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  isButton?: boolean;
  // (undocumented)
  isDisabled?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface ILinkStyles {
  // (undocumented)
  root: IStyle;
}

// @public (undocumented)
interface IList {
  forceUpdate: () => void;
  getStartItemIndexInView: () => number;
  scrollToIndex: (index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
}

// @public (undocumented)
interface IListProps extends React.HTMLAttributes<List | HTMLDivElement> {
  className?: string;
  componentRef?: IRefObject<IList>;
  getItemCountForPage?: (itemIndex?: number, visibleRect?: IRectangle) => number;
  getKey?: (item: any, index?: number) => string;
  getPageHeight?: (itemIndex?: number, visibleRect?: IRectangle) => number;
  getPageSpecification?: (itemIndex?: number, visibleRect?: IRectangle) => IPageSpecification;
  getPageStyle?: (page: IPage) => any;
  items?: any[];
  onPageAdded?: (page: IPage) => void;
  onPageRemoved?: (page: IPage) => void;
  onPagesUpdated?: (pages: IPage[]) => void;
  onRenderCell?: (item?: any, index?: number, isScrolling?: boolean) => React.ReactNode;
  onRenderPage?: (pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) => React.ReactNode;
  onShouldVirtualize?: (props: IListProps) => boolean;
  renderCount?: number;
  renderedWindowsAhead?: number;
  renderedWindowsBehind?: number;
  role?: string;
  startIndex?: number;
  usePageCache?: boolean;
}

// @public (undocumented)
interface IListState {
  // (undocumented)
  isScrolling?: boolean;
  measureVersion?: number;
  // (undocumented)
  pages?: IPage[];
}

// @public (undocumented)
class ImageBase extends BaseComponent<IImageProps, IImageState> {
  constructor(props: IImageProps);
  // (undocumented)
  componentDidUpdate(prevProps: IImageProps, prevState: IImageState): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: IImageProps): void;
  // (undocumented)
  static defaultProps: {
    shouldFadeIn: boolean;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public
enum ImageCoverStyle {
  landscape = 0,
  portrait = 1
}

// @public
enum ImageFit {
  center = 0,
  centerCover = 4,
  contain = 1,
  cover = 2,
  none = 3
}

// @public (undocumented)
enum ImageLoadState {
  error = 2,
  // @deprecated
  errorLoaded = 3,
  loaded = 1,
  notLoaded = 0
}

// @public (undocumented)
interface IMarqueeSelection {
}

// @public (undocumented)
interface IMarqueeSelectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  componentRef?: IRefObject<IMarqueeSelection>;
  isDraggingConstrainedToRoot?: boolean;
  isEnabled?: boolean;
  onShouldStartSelection?: (ev: MouseEvent) => boolean;
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
  selection: ISelection;
  styles?: IStyleFunction<IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IMarqueeSelectionStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IMarqueeSelectionStyles {
  // (undocumented)
  box?: IStyle;
  // (undocumented)
  boxFill?: IStyle;
  // (undocumented)
  dragMask?: IStyle;
  // (undocumented)
  root?: IStyle;
}

// @public
interface IMaskedTextFieldState {
  displayValue: string;
  maskCursorPosition?: number;
}

// @public (undocumented)
interface IMenuItemStyles extends IButtonStyles {
  anchorLink: IStyle;
  checkmarkIcon: IStyle;
  divider: IStyle;
  iconColor: IStyle;
  item: IStyle;
  linkContent: IStyle;
  subMenuIcon: IStyle;
}

// @public (undocumented)
interface IMessageBar {
}

// @public (undocumented)
interface IMessageBarProps extends React.HTMLAttributes<HTMLElement> {
  actions?: JSX.Element;
  ariaLabel?: string;
  className?: string;
  componentRef?: IRefObject<IMessageBar>;
  dismissButtonAriaLabel?: string;
  isMultiline?: boolean;
  messageBarType?: MessageBarType;
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement | BaseButton | HTMLAnchorElement | HTMLDivElement | Button>) => any;
  overflowButtonAriaLabel?: string;
  styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
  theme?: ITheme;
  truncated?: boolean;
}

// @public (undocumented)
interface IMessageBarState {
  // (undocumented)
  expandSingleLine?: boolean;
  // (undocumented)
  labelId?: string;
  // (undocumented)
  showContent?: boolean;
}

// @public (undocumented)
interface IMessageBarStyleProps {
  actions?: boolean;
  className?: string;
  expandSingleLine?: boolean;
  isMultiline?: boolean;
  messageBarType?: MessageBarType;
  onDismiss?: boolean;
  theme: ITheme;
  truncated?: boolean;
}

// @public (undocumented)
interface IMessageBarStyles {
  actions?: IStyle;
  content?: IStyle;
  dismissal?: IStyle;
  dismissSingleLine?: IStyle;
  expand?: IStyle;
  expandSingleLine?: IStyle;
  icon?: IStyle;
  iconContainer?: IStyle;
  innerText?: IStyle;
  root?: IStyle;
  text?: IStyle;
}

// @public (undocumented)
interface IModal {
  focus: () => void;
}

// @public (undocumented)
interface IModalProps extends React.ClassAttributes<ModalBase>, IWithResponsiveModeState, IAccessiblePopupProps {
  className?: string;
  componentRef?: IRefObject<IModal>;
  containerClassName?: string;
  isBlocking?: boolean;
  isDarkOverlay?: boolean;
  isOpen?: boolean;
  layerProps?: ILayerProps;
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
  onDismissed?: () => any;
  // @deprecated
  onLayerDidMount?: () => void;
  scrollableContentClassName?: string;
  styles?: IStyleFunctionOrObject<IModalStyleProps, IModalStyles>;
  subtitleAriaId?: string;
  theme?: ITheme;
  titleAriaId?: string;
  topOffsetFixed?: boolean;
}

// @public (undocumented)
interface IModalStyles {
  // (undocumented)
  main: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  scrollableContent: IStyle;
}

// @public (undocumented)
interface INav {
  selectedKey: string | undefined;
}

// @public (undocumented)
interface INavLink {
  [propertyName: string]: any;
  // @deprecated
  altText?: string;
  ariaLabel?: string;
  automationId?: string;
  // @deprecated
  engagementName?: string;
  forceAnchor?: boolean;
  icon?: string;
  // @deprecated
  iconClassName?: string;
  iconProps?: IIconProps;
  isExpanded?: boolean;
  key?: string;
  links?: INavLink[];
  name: string;
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
  // @deprecated (undocumented)
  parentId?: string;
  target?: string;
  title?: string;
  url: string;
}

// @public (undocumented)
interface INavLinkGroup {
  automationId?: string;
  collapseByDefault?: boolean;
  links: INavLink[];
  name?: string;
  onHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, isCollapsing?: boolean) => void;
}

// @public (undocumented)
interface INavProps {
  ariaLabel?: string;
  className?: string;
  // @deprecated
  collapsedStateText?: string;
  componentRef?: IRefObject<INav>;
  expandButtonAriaLabel?: string;
  // @deprecated
  expandedStateText?: string;
  groups: INavLinkGroup[] | null;
  initialSelectedKey?: string;
  isOnTop?: boolean;
  linkAs?: IComponentAs<IButtonProps>;
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
  onLinkExpandClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
  onRenderGroupHeader?: IRenderFunction<INavLinkGroup>;
  onRenderLink?: IRenderFunction<INavLink>;
  selectedKey?: string;
  styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface INavState {
  // (undocumented)
  isGroupCollapsed?: {
    [key: string]: boolean;
  }
  // (undocumented)
  isLinkExpandStateChanged?: boolean;
  // (undocumented)
  selectedKey?: string;
}

// @public (undocumented)
interface INavStyleProps {
  className?: string;
  groups: INavLinkGroup[] | null;
  // (undocumented)
  isButtonEntry?: boolean;
  isExpanded?: boolean;
  isGroup?: boolean;
  isLink?: boolean;
  isOnTop?: boolean;
  isSelected?: boolean;
  leftPadding?: number;
  leftPaddingExpanded?: number;
  navHeight?: number;
  position?: number;
  rightPadding?: number;
  theme: ITheme;
}

// @public (undocumented)
interface INavStyles {
  chevronButton: IStyle;
  chevronIcon: IStyle;
  compositeLink: IStyle;
  group: IStyle;
  groupContent: IStyle;
  link: IStyle;
  linkText: IStyle;
  navItem: IStyle;
  navItems: IStyle;
  root: IStyle;
}

// @public
export function initializeFocusRects(window?: Window): void;

// @public (undocumented)
export function initializeIcons(baseUrl?: string, options?: IIconOptions): void;

// @public (undocumented)
interface IObjectWithKey {
  // (undocumented)
  key?: string | number;
}

// @public (undocumented)
interface IOverflowSet {
  focus(forceIntoFirstElement?: boolean): boolean;
  focusElement(childElement?: HTMLElement): boolean;
}

// @public (undocumented)
interface IOverflowSetItemProps {
  [propertyName: string]: any;
  key: string;
  keytipProps?: IKeytipProps;
}

// @public (undocumented)
interface IOverflowSetProps extends React.ClassAttributes<OverflowSetBase> {
  // (undocumented)
  className?: string;
  componentRef?: IRefObject<IOverflowSet>;
  doNotContainWithinFocusZone?: boolean;
  focusZoneProps?: IFocusZoneProps;
  items?: IOverflowSetItemProps[];
  itemSubMenuProvider?: (item: IOverflowSetItemProps) => any[] | undefined;
  keytipSequences?: string[];
  onRenderItem: (item: IOverflowSetItemProps) => any;
  onRenderOverflowButton: IRenderFunction<any[]>;
  overflowItems?: IOverflowSetItemProps[];
  role?: string;
  styles?: IStyleFunctionOrObject<IOverflowSetProps, IOverflowSetStyles>;
  vertical?: boolean;
}

// @public (undocumented)
interface IOverflowSetStyles {
  item?: IStyle;
  overflowButton?: IStyle;
  root?: IStyle;
}

// @public (undocumented)
interface IOverlay {
}

// @public (undocumented)
interface IOverlayProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  componentRef?: IRefObject<IOverlay>;
  isDarkThemed?: boolean;
  // (undocumented)
  onClick?: () => void;
  styles?: IStyleFunctionOrObject<IOverlayStyleProps, IOverlayStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IOverlayStyleProps {
  className?: string;
  isDark?: boolean;
  isNone?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IOverlayStyles {
  root: IStyle;
}

// @public (undocumented)
interface IPage {
  // (undocumented)
  data?: any;
  // (undocumented)
  height: number;
  // (undocumented)
  isSpacer?: boolean;
  // (undocumented)
  itemCount: number;
  // (undocumented)
  items: any[] | undefined;
  // (undocumented)
  key: string;
  // (undocumented)
  startIndex: number;
  // (undocumented)
  style: any;
  // (undocumented)
  top: number;
}

// @public (undocumented)
interface IPageProps extends React.HTMLAttributes<HTMLDivElement>, React.ClassAttributes<HTMLDivElement> {
  page: IPage;
  role?: string;
}

// @public (undocumented)
interface IPageSpecification {
  data?: any;
  height?: number;
  itemCount?: number;
  key?: string;
}

// @public
interface IPalette {
  accent: string;
  black: string;
  blackTranslucent40: string;
  blue: string;
  blueDark: string;
  blueLight: string;
  blueMid: string;
  green: string;
  greenDark: string;
  greenLight: string;
  magenta: string;
  magentaDark: string;
  magentaLight: string;
  neutralDark: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLighterAlt: string;
  neutralPrimary: string;
  neutralPrimaryAlt: string;
  neutralQuaternary: string;
  neutralQuaternaryAlt: string;
  neutralSecondary: string;
  neutralSecondaryAlt: string;
  neutralTertiary: string;
  neutralTertiaryAlt: string;
  orange: string;
  orangeLight: string;
  orangeLighter: string;
  purple: string;
  purpleDark: string;
  purpleLight: string;
  red: string;
  redDark: string;
  teal: string;
  tealDark: string;
  tealLight: string;
  themeDark: string;
  themeDarkAlt: string;
  themeDarker: string;
  themeLight: string;
  themeLighter: string;
  themeLighterAlt: string;
  themePrimary: string;
  themeSecondary: string;
  themeTertiary: string;
  white: string;
  whiteTranslucent40: string;
  yellow: string;
  yellowLight: string;
}

// @public (undocumented)
interface IPanel {
  dismiss: (ev?: React.KeyboardEvent<HTMLElement>) => void;
  open: () => void;
}

// @public
interface IPanelHeaderRenderer extends IRenderFunction<IPanelProps> {
  // (undocumented)
  (props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element | null;
}

// WARNING: The type "PanelBase" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
interface IPanelProps extends React.HTMLAttributes<PanelBase> {
  className?: string;
  closeButtonAriaLabel?: string;
  // @deprecated
  componentId?: string;
  componentRef?: IRefObject<IPanel>;
  customWidth?: string;
  elementToFocusOnDismiss?: HTMLElement;
  // @deprecated
  firstFocusableSelector?: string;
  focusTrapZoneProps?: IFocusTrapZoneProps;
  // @deprecated
  forceFocusInsideTrap?: boolean;
  hasCloseButton?: boolean;
  headerClassName?: string;
  headerText?: string;
  // @deprecated
  ignoreExternalFocusing?: boolean;
  isBlocking?: boolean;
  isFooterAtBottom?: boolean;
  isHiddenOnDismiss?: boolean;
  isLightDismiss?: boolean;
  isOpen?: boolean;
  layerProps?: ILayerProps;
  onDismiss?: (ev?: React.SyntheticEvent<HTMLElement>) => void;
  onDismissed?: () => void;
  onLightDismissClick?: () => void;
  onOuterClick?: () => void;
  onRenderBody?: IRenderFunction<IPanelProps>;
  onRenderFooter?: IRenderFunction<IPanelProps>;
  onRenderFooterContent?: IRenderFunction<IPanelProps>;
  onRenderHeader?: IPanelHeaderRenderer;
  onRenderNavigation?: IRenderFunction<IPanelProps>;
  styles?: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;
  theme?: ITheme;
  type?: PanelType;
}

// @public (undocumented)
interface IPanelStyleProps {
  className?: string;
  focusTrapZoneClassName?: string;
  hasCloseButton?: boolean;
  headerClassName?: string;
  isAnimating?: boolean;
  isFooterAtBottom?: boolean;
  isFooterSticky?: boolean;
  isHiddenOnDismiss?: boolean;
  isOnRightSide?: boolean;
  isOpen?: boolean;
  theme: ITheme;
  type?: PanelType;
}

// @public (undocumented)
interface IPanelStyles {
  closeButton: IStyle;
  commands: IStyle;
  content: IStyle;
  contentInner: IStyle;
  footer: IStyle;
  footerInner: IStyle;
  header: IStyle;
  headerText: IStyle;
  hiddenPanel: IStyle;
  main: IStyle;
  navigation: IStyle;
  overlay: IStyle;
  root: IStyle;
  scrollableContent: IStyle;
}

// @public (undocumented)
interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {
}

// @public (undocumented)
interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps> {
}

// @public
interface IPeoplePickerItemSelectedProps extends IPickerItemProps<IPersonaProps & {
    ValidationState: ValidationState;
}>, IPeoplePickerItemSharedProps {
  styles?: IStyleFunctionOrObject<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>;
}

// @public
interface IPeoplePickerItemSelectedStyles {
  itemContent: IStyle;
  removeButton: IStyle;
  root: IStyle;
  subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}

// @public
interface IPeoplePickerItemSelectedSubComponentStyles {
  persona: IStyleFunctionOrObject<IPersonaStyleProps, any>;
  personaCoin: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>;
}

// @public
interface IPeoplePickerItemSharedProps {
  className?: string;
  theme?: ITheme;
}

// @public (undocumented)
interface IPeoplePickerItemState {
  // (undocumented)
  contextualMenuVisible: boolean;
}

// @public
interface IPeoplePickerItemSuggestionProps extends IPeoplePickerItemSharedProps {
  compact?: boolean;
  personaProps?: IPersonaProps;
  styles?: IStyleFunctionOrObject<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>;
  suggestionsProps?: IBasePickerSuggestionsProps;
}

// @public
interface IPeoplePickerItemSuggestionStyles {
  personaWrapper: IStyle;
  root: IStyle;
}

// @public @deprecated
interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
}

// @public
interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
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
  [key: string]: IPerfMeasurement;
}

// @public (undocumented)
interface IPersona {
}

// @public (undocumented)
interface IPersonaCoinProps extends IPersonaSharedProps {
  className?: string;
  componentRef?: IRefObject<{}>;
  styles?: IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>;
}

// @public (undocumented)
interface IPersonaCoinStyleProps {
  className?: string;
  coinSize?: number;
  showUnknownPersonaCoin?: boolean;
  size?: PersonaSize;
  theme: ITheme;
}

// @public (undocumented)
interface IPersonaCoinStyles {
  // (undocumented)
  coin: IStyle;
  // (undocumented)
  image: IStyle;
  // (undocumented)
  imageArea: IStyle;
  // (undocumented)
  initials: IStyle;
  // (undocumented)
  size10WithoutPresenceIcon: IStyle;
}

// @public (undocumented)
interface IPersonaPresenceProps extends IPersonaSharedProps {
  componentRef?: IRefObject<{}>;
  styles?: IStyleFunctionOrObject<IPersonaPresenceStyleProps, IPersonaPresenceStyles>;
}

// @public (undocumented)
interface IPersonaPresenceStyleProps {
  className?: string;
  presence?: PersonaPresence;
  size?: PersonaSize;
  theme: ITheme;
}

// @public (undocumented)
interface IPersonaPresenceStyles {
  // (undocumented)
  presence: IStyle;
  // (undocumented)
  presenceIcon: IStyle;
}

// @public (undocumented)
interface IPersonaProps extends IPersonaSharedProps {
  className?: string;
  componentRef?: IRefObject<IPersona>;
  onRenderOptionalText?: IRenderFunction<IPersonaProps>;
  onRenderPrimaryText?: IRenderFunction<IPersonaProps>;
  onRenderSecondaryText?: IRenderFunction<IPersonaProps>;
  onRenderTertiaryText?: IRenderFunction<IPersonaProps>;
  styles?: IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>;
}

// @public (undocumented)
interface IPersonaSharedProps extends React.HTMLAttributes<PersonaBase | PersonaCoinBase | HTMLDivElement> {
  allowPhoneInitials?: boolean;
  coinProps?: IPersonaCoinProps;
  coinSize?: number;
  hidePersonaDetails?: boolean;
  imageAlt?: string;
  imageInitials?: string;
  imageShouldFadeIn?: boolean;
  imageShouldStartVisible?: boolean;
  imageUrl?: string;
  initialsColor?: PersonaInitialsColor | string;
  onPhotoLoadingStateChange?: (newImageLoadState: ImageLoadState) => void;
  onRenderCoin?: IRenderFunction<IPersonaSharedProps>;
  onRenderInitials?: IRenderFunction<IPersonaSharedProps>;
  optionalText?: string;
  presence?: PersonaPresence;
  // @deprecated
  primaryText?: string;
  secondaryText?: string;
  showInitialsUntilImageLoads?: boolean;
  // (undocumented)
  showSecondaryText?: boolean;
  showUnknownPersonaCoin?: boolean;
  size?: PersonaSize;
  tertiaryText?: string;
  text?: string;
  theme?: ITheme;
}

// @public (undocumented)
interface IPersonaState {
  // (undocumented)
  isImageError?: boolean;
  // (undocumented)
  isImageLoaded?: boolean;
}

// @public (undocumented)
interface IPersonaStyleProps {
  className?: string;
  coinSize?: number;
  presence?: PersonaPresence;
  // (undocumented)
  showSecondaryText?: boolean;
  size?: PersonaSize;
  theme: ITheme;
}

// @public (undocumented)
interface IPersonaStyles {
  // (undocumented)
  details: IStyle;
  // (undocumented)
  optionalText: IStyle;
  // (undocumented)
  primaryText: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  secondaryText: IStyle;
  // (undocumented)
  tertiaryText: IStyle;
  // (undocumented)
  textContent: IStyle;
}

// @public @deprecated
interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}

// @public
interface IPickerItem {
}

// @public
interface IPickerItemProps<T> extends React.AllHTMLAttributes<HTMLElement> {
  componentRef?: IRefObject<IPickerItem>;
  index: number;
  item: T;
  key?: string | number;
  onItemChange?: (item: T, index: number) => void;
  onRemoveItem?: () => void;
  removeButtonAriaLabel?: string;
  selected?: boolean;
}

// @public (undocumented)
interface IPivot {
  focus(): void;
}

// @public (undocumented)
interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  ariaLabel?: string;
  componentRef?: IRefObject<{}>;
  headerButtonProps?: {
    [key: string]: string | number | boolean;
  }
  headerText?: string;
  itemCount?: number;
  itemIcon?: string;
  itemKey?: string;
  keytipProps?: IKeytipProps;
  // @deprecated
  linkText?: string;
  onRenderItemLink?: IRenderFunction<IPivotItemProps>;
}

// @public (undocumented)
interface IPivotProps extends React.ClassAttributes<PivotBase>, React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  componentRef?: IRefObject<IPivot>;
  getTabId?: (itemKey: string, index: number) => string;
  headersOnly?: boolean;
  initialSelectedIndex?: number;
  initialSelectedKey?: string;
  linkFormat?: PivotLinkFormat;
  linkSize?: PivotLinkSize;
  onLinkClick?: (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => void;
  selectedKey?: string;
  styles?: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles>;
  theme?: ITheme;
}

// @public
interface IPivotState {
  // (undocumented)
  links: IPivotItemProps[];
  // (undocumented)
  selectedKey: string;
  // (undocumented)
  selectedTabId: string;
}

// @public (undocumented)
interface IPivotStyles {
  // (undocumented)
  count: IStyle;
  // (undocumented)
  icon: IStyle;
  // (undocumented)
  link: IStyle;
  // (undocumented)
  linkContent: IStyle;
  // (undocumented)
  linkIsSelected: IStyle;
  root: IStyle;
  // (undocumented)
  text: IStyle;
}

// @public (undocumented)
interface IPlainCard {
}

// @public
interface IPlainCardProps extends IBaseCardProps<IPlainCard, IPlainCardStyles, IPlainCardStyleProps> {
  onRenderPlainCard?: IRenderFunction<any>;
}

// @public (undocumented)
interface IPlainCardStyleProps extends IBaseCardStyleProps {
}

// @public (undocumented)
interface IPlainCardStyles extends IBaseCardStyles {
}

// @public
interface IPoint {
  // (undocumented)
  x: number;
  // (undocumented)
  y: number;
}

// @public (undocumented)
interface IPopup {
}

// @public (undocumented)
interface IPopupProps extends React.HTMLAttributes<Popup> {
  ariaDescribedBy?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  componentRef?: IRefObject<IPopup>;
  onDismiss?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => any;
  role?: string;
  shouldRestoreFocus?: boolean;
}

// @public (undocumented)
interface IPopupState {
  // (undocumented)
  needsVerticalScrollBar?: boolean;
}

// @public (undocumented)
interface IPositioningContainer {
}

// @public (undocumented)
interface IPositioningContainerProps extends IBaseProps<IPositioningContainer> {
  ariaDescribedBy?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  backgroundColor?: string;
  bounds?: IRectangle;
  className?: string;
  componentRef?: IRefObject<IPositioningContainer>;
  coverTarget?: boolean;
  directionalHint?: DirectionalHint;
  directionalHintFixed?: boolean;
  directionalHintForRTL?: DirectionalHint;
  doNotLayer?: boolean;
  finalHeight?: number;
  minPagePadding?: number;
  offsetFromTarget?: number;
  onDismiss?: (ev?: any) => void;
  onLayerMounted?: () => void;
  onPositioned?: (positions?: IPositionedData) => void;
  positioningContainerMaxHeight?: number;
  positioningContainerWidth?: number;
  preventDismissOnScroll?: boolean;
  role?: string;
  setInitialFocus?: boolean;
  target?: HTMLElement | string | MouseEvent | IPoint | null;
  // @deprecated
  targetPoint?: IPoint;
  // @deprecated
  useTargetPoint?: boolean;
}

// @public (undocumented)
interface IPositioningContainerState {
  heightOffset?: number;
  positions?: IPositionedData;
}

// @public (undocumented)
interface IProgressIndicator {
  // (undocumented)
  focus: () => void;
}

// @public (undocumented)
interface IProgressIndicatorProps extends React.ClassAttributes<ProgressIndicatorBase> {
  ariaValueText?: string;
  barHeight?: number;
  className?: string;
  componentRef?: IRefObject<IProgressIndicator>;
  description?: React.ReactNode;
  label?: React.ReactNode;
  onRenderProgress?: IRenderFunction<IProgressIndicatorProps>;
  percentComplete?: number;
  progressHidden?: boolean;
  styles?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;
  theme?: ITheme;
  // @deprecated
  title?: string;
}

// @public (undocumented)
interface IProgressIndicatorStyleProps {
  // (undocumented)
  barHeight?: number;
  className?: string;
  // (undocumented)
  indeterminate?: boolean;
  theme: ITheme;
}

// @public (undocumented)
interface IProgressIndicatorStyles {
  // (undocumented)
  itemDescription: IStyle;
  // (undocumented)
  itemName: IStyle;
  // (undocumented)
  itemProgress: IStyle;
  // (undocumented)
  progressBar: IStyle;
  // (undocumented)
  progressTrack: IStyle;
  root: IStyle;
}

// @public (undocumented)
interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
  // (undocumented)
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}

// @public (undocumented)
interface IRating {
}

// @public
interface IRatingProps extends React.AllHTMLAttributes<HTMLElement> {
  allowZeroStars?: boolean;
  ariaLabelFormat?: string;
  // @deprecated
  ariaLabelId?: string;
  componentRef?: IRefObject<IRating>;
  // (undocumented)
  getAriaLabel?: (rating: number, max: number) => string;
  icon?: string;
  max?: number;
  // @deprecated
  min?: number;
  onChange?: (event: React.FocusEvent<HTMLElement>, rating?: number) => void;
  // @deprecated (undocumented)
  onChanged?: (rating: number) => void;
  rating?: number;
  readOnly?: boolean;
  size?: RatingSize;
  styles?: IStyleFunctionOrObject<IRatingStyleProps, IRatingStyles>;
  theme?: ITheme;
  unselectedIcon?: string;
}

// @public (undocumented)
interface IRatingState {
  // (undocumented)
  rating: number | null | undefined;
}

// @public (undocumented)
interface IRatingStyleProps {
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  readOnly?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IRatingStyles {
  // (undocumented)
  labelText: IStyle;
  // (undocumented)
  ratingButton: IStyle;
  // (undocumented)
  ratingFocusZone: IStyle;
  // (undocumented)
  ratingStar: IStyle;
  // (undocumented)
  ratingStarBack: IStyle;
  // (undocumented)
  ratingStarFront: IStyle;
  // (undocumented)
  ratingStarIsLarge: IStyle;
  // (undocumented)
  ratingStarIsSmall: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  rootIsLarge: IStyle;
  // (undocumented)
  rootIsSmall: IStyle;
}

// @public
interface IRawStyle extends IRawStyleBase {
  displayName?: string;
  selectors?: {
    [key: string]: IStyle;
  }
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

// @public (undocumented)
interface IResizeGroup {
  remeasure(): void;
}

// @public (undocumented)
interface IResizeGroupProps extends React.HTMLAttributes<ResizeGroupBase | HTMLElement> {
  className?: string;
  componentRef?: IRefObject<IResizeGroup>;
  data: any;
  dataDidRender?: (renderedData: any) => void;
  onGrowData?: (prevData: any) => any;
  onReduceData: (prevData: any) => any;
  onRenderData: (data: any) => JSX.Element;
  // @deprecated
  styles?: IStyleFunctionOrObject<IResizeGroupStyleProps, IResizeGroupStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IResizeGroupState {
  dataToMeasure?: any;
  measureContainer?: boolean;
  renderedData?: any;
  resizeDirection?: 'grow' | 'shrink';
}

// @public (undocumented)
interface IResizeGroupStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface IResizeGroupStyles {
  root: IStyle;
}

// @public
interface IRGB {
  a?: number;
  b: number;
  g: number;
  r: number;
}

// @public (undocumented)
interface IScheme {
  disableGlobalClassNames: boolean;
  // (undocumented)
  effects: IEffects;
  // (undocumented)
  fonts: IFontStyles;
  // (undocumented)
  isInverted: boolean;
  // (undocumented)
  palette: IPalette;
  // (undocumented)
  semanticColors: ISemanticColors;
  // WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
  // @internal
  spacing: ISpacing;
}

// @public (undocumented)
interface IScrollablePane {
  forceLayoutUpdate(): void;
  getScrollPosition(): number;
}

// @public (undocumented)
interface IScrollablePaneContext {
  // (undocumented)
  scrollablePane?: {
    addSticky: (sticky: Sticky) => void;
    notifySubscribers: (sort?: boolean) => void;
    removeSticky: (sticky: Sticky) => void;
    sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
    subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    syncScrollSticky: (sticky: Sticky) => void;
    unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
    updateStickyRefHeights: () => void;
  }
}

// @public (undocumented)
interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePaneBase> {
  className?: string;
  componentRef?: IRefObject<IScrollablePane>;
  initialScrollPosition?: number;
  // (undocumented)
  scrollbarVisibility?: ScrollbarVisibility;
  styles?: IStyleFunctionOrObject<IScrollablePaneStyleProps, IScrollablePaneStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IScrollablePaneState {
  // (undocumented)
  scrollbarHeight: number | undefined;
  // (undocumented)
  scrollbarWidth: number | undefined;
  // (undocumented)
  stickyBottomHeight: number;
  // (undocumented)
  stickyTopHeight: number;
}

// @public (undocumented)
interface IScrollablePaneStyleProps {
  className?: string;
  // (undocumented)
  scrollbarVisibility?: IScrollablePaneProps['scrollbarVisibility'];
  theme: ITheme;
}

// @public (undocumented)
interface IScrollablePaneStyles {
  contentContainer: IStyle;
  root: IStyle;
  stickyAbove: IStyle;
  stickyBelow: IStyle;
  stickyBelowItems: IStyle;
}

// @public (undocumented)
export function isDark(color: IColor): boolean;

// @public
export function isDirectionalKeyCode(which: number): boolean;

// @public (undocumented)
interface ISearchBox {
  focus(): void;
  hasFocus(): boolean;
}

// @public (undocumented)
interface ISearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string;
  className?: string;
  clearButtonProps?: IButtonProps;
  componentRef?: IRefObject<ISearchBox>;
  // @deprecated
  defaultValue?: string;
  disableAnimation?: boolean;
  iconProps?: Pick<IIconProps, Exclude<keyof IIconProps, 'className'>>;
  // @deprecated
  labelText?: string;
  onChange?: (newValue: any) => void;
  // @deprecated
  onChanged?: (newValue: any) => void;
  onClear?: (ev?: any) => void;
  onEscape?: (ev?: any) => void;
  onSearch?: (newValue: any) => void;
  placeholder?: string;
  styles?: IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles>;
  theme?: ITheme;
  underlined?: boolean;
  value?: string;
}

// @public (undocumented)
interface ISearchBoxState {
  // (undocumented)
  hasFocus?: boolean;
  // (undocumented)
  id?: string;
  // (undocumented)
  value?: string;
}

// @public (undocumented)
interface ISearchBoxStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  disableAnimation?: boolean;
  // (undocumented)
  disabled?: boolean;
  // (undocumented)
  hasFocus?: boolean;
  // (undocumented)
  hasInput?: boolean;
  // (undocumented)
  theme: ITheme;
  // (undocumented)
  underlined?: boolean;
}

// @public (undocumented)
interface ISearchBoxStyles {
  // (undocumented)
  clearButton?: IStyle;
  // (undocumented)
  field?: IStyle;
  // (undocumented)
  icon?: IStyle;
  // (undocumented)
  iconContainer?: IStyle;
  // (undocumented)
  root?: IStyle;
}

// @public
interface ISelectableDroppableTextProps<TComponent, TListenerElement = TComponent> extends React.HTMLAttributes<TListenerElement> {
  ariaLabel?: string;
  calloutProps?: ICalloutProps;
  className?: string;
  componentRef?: IRefObject<TComponent>;
  defaultSelectedKey?: string | number | string[] | number[];
  disabled?: boolean;
  errorMessage?: string;
  id?: string;
  label?: string;
  onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<TComponent>>;
  onRenderItem?: IRenderFunction<ISelectableOption>;
  onRenderList?: IRenderFunction<ISelectableDroppableTextProps<TComponent>>;
  onRenderOption?: IRenderFunction<ISelectableOption>;
  options?: any;
  panelProps?: IPanelProps;
  placeholder?: string;
  required?: boolean;
  selectedKey?: string | number | string[] | number[];
}

// @public (undocumented)
interface ISelectableOption {
  ariaLabel?: string;
  data?: any;
  disabled?: boolean;
  index?: number;
  itemType?: SelectableOptionMenuItemType;
  key: string | number;
  selected?: boolean;
  text: string;
  title?: string;
}

// @public (undocumented)
interface ISelectedItemProps<T> extends IPickerItemProps<T> {
  // (undocumented)
  onCopyItem: (item: T) => void;
}

// @public (undocumented)
interface ISelectedPeopleItemProps extends ISelectedItemProps<IExtendedPersonaProps> {
  // (undocumented)
  onExpandItem?: () => void;
  // (undocumented)
  renderPersonaCoin?: IRenderFunction<IPersonaProps>;
  // (undocumented)
  renderPrimaryText?: IRenderFunction<IPersonaProps>;
}

// @public (undocumented)
interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
  // (undocumented)
  copyMenuItemText?: string;
  // (undocumented)
  editMenuItemText?: string;
  // (undocumented)
  floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
  // (undocumented)
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
  // (undocumented)
  onExpandGroup?: (item: IExtendedPersonaProps) => void;
  // (undocumented)
  onRenderFloatingPicker?: (props: IBaseFloatingPickerProps<IPersonaProps>) => JSX.Element;
  // (undocumented)
  removeMenuItemText?: string;
}

// @public (undocumented)
interface ISelection {
  // (undocumented)
  canSelectItem: (item: IObjectWithKey, index?: number) => boolean;
  // (undocumented)
  count: number;
  // (undocumented)
  getItems(): IObjectWithKey[];
  // (undocumented)
  getSelectedCount(): number;
  // (undocumented)
  getSelectedIndices(): number[];
  // (undocumented)
  getSelection(): IObjectWithKey[];
  // (undocumented)
  isAllSelected(): boolean;
  // (undocumented)
  isIndexSelected(index: number): boolean;
  // (undocumented)
  isKeySelected(key: string): boolean;
  // (undocumented)
  isModal?(): boolean;
  // (undocumented)
  isRangeSelected(fromIndex: number, count: number): boolean;
  // (undocumented)
  mode: SelectionMode;
  // (undocumented)
  selectToIndex(index: number, clearSelection?: boolean): void;
  // (undocumented)
  selectToKey(key: string, clearSelection?: boolean): void;
  // (undocumented)
  setAllSelected(isAllSelected: boolean): void;
  // (undocumented)
  setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;
  // (undocumented)
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;
  // (undocumented)
  setItems(items: IObjectWithKey[], shouldClear: boolean): void;
  // (undocumented)
  setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
  // (undocumented)
  setModal?(isModal: boolean): void;
  // (undocumented)
  toggleAllSelected(): void;
  // (undocumented)
  toggleIndexSelected(index: number): void;
  // (undocumented)
  toggleKeySelected(key: string): void;
  // (undocumented)
  toggleRangeSelected(fromIndex: number, count: number): void;
}

// @public (undocumented)
interface ISelectionOptions {
  // (undocumented)
  canSelectItem?: (item: IObjectWithKey, index?: number) => boolean;
  // (undocumented)
  getKey?: (item: IObjectWithKey, index?: number) => string | number;
  // (undocumented)
  onSelectionChanged?: () => void;
  // (undocumented)
  selectionMode?: SelectionMode;
}

// @public (undocumented)
interface ISelectionZone {
  // (undocumented)
  ignoreNextFocus: () => void;
}

// @public (undocumented)
interface ISelectionZoneProps extends React.ClassAttributes<SelectionZone> {
  // (undocumented)
  componentRef?: () => void;
  // (undocumented)
  disableAutoSelectOnInputElements?: boolean;
  // (undocumented)
  enterModalOnTouch?: boolean;
  // (undocumented)
  isSelectedOnFocus?: boolean;
  // @deprecated (undocumented)
  layout?: {
  }
  // (undocumented)
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
  // (undocumented)
  onItemInvoked?: (item?: IObjectWithKey, index?: number, ev?: Event) => void;
  // (undocumented)
  selection: ISelection;
  // (undocumented)
  selectionMode?: SelectionMode;
  // (undocumented)
  selectionPreservedOnEmptyClick?: boolean;
}

// @public
export function isElementFocusSubZone(element?: HTMLElement): boolean;

// @public
export function isElementFocusZone(element?: HTMLElement): boolean;

// @public
export function isElementTabbable(element: HTMLElement, checkTabIndex?: boolean): boolean;

// @public
export function isElementVisible(element: HTMLElement | undefined | null): boolean;

// @public
interface ISemanticColors extends ISemanticTextColors {
  accentButtonBackground: string;
  blockingBackground: string;
  bodyBackground: string;
  bodyDivider: string;
  bodyFrameBackground: string;
  bodyFrameDivider: string;
  bodyStandoutBackground: string;
  buttonBackground: string;
  buttonBackgroundChecked: string;
  buttonBackgroundCheckedHovered: string;
  buttonBackgroundDisabled: string;
  buttonBackgroundHovered: string;
  buttonBackgroundPressed: string;
  buttonBorder: string;
  buttonBorderDisabled: string;
  defaultStateBackground: string;
  disabledBackground: string;
  errorBackground: string;
  focusBorder: string;
  inputBackground: string;
  inputBackgroundChecked: string;
  inputBackgroundCheckedHovered: string;
  inputBorder: string;
  inputBorderHovered: string;
  inputFocusBorderAlt: string;
  inputForegroundChecked: string;
  listBackground: string;
  listHeaderBackgroundHovered: string;
  listHeaderBackgroundPressed: string;
  listItemBackgroundChecked: string;
  listItemBackgroundCheckedHovered: string;
  listItemBackgroundHovered: string;
  listText: string;
  menuBackground: string;
  menuDivider: string;
  menuHeader: string;
  menuIcon: string;
  // @deprecated (undocumented)
  menuItemBackgroundChecked: string;
  menuItemBackgroundHovered: string;
  menuItemBackgroundPressed: string;
  menuItemText: string;
  menuItemTextHovered: string;
  primaryButtonBackground: string;
  primaryButtonBackgroundDisabled: string;
  primaryButtonBackgroundHovered: string;
  primaryButtonBackgroundPressed: string;
  primaryButtonBorder: string;
  smallInputBorder: string;
  successBackground: string;
  variantBorder: string;
  variantBorderHovered: string;
  warningBackground: string;
  warningHighlight: string;
}

// @public (undocumented)
interface ISemanticTextColors {
  accentButtonText: string;
  actionLink: string;
  actionLinkHovered: string;
  bodySubtext: string;
  bodyText: string;
  bodyTextChecked: string;
  buttonText: string;
  buttonTextChecked: string;
  buttonTextCheckedHovered: string;
  buttonTextDisabled: string;
  buttonTextHovered: string;
  buttonTextPressed: string;
  disabledBodySubtext: string;
  disabledBodyText: string;
  disabledSubtext: string;
  disabledText: string;
  errorText: string;
  inputPlaceholderText: string;
  inputText: string;
  inputTextHovered: string;
  link: string;
  linkHovered: string;
  listText: string;
  // @deprecated (undocumented)
  listTextColor: string;
  primaryButtonText: string;
  primaryButtonTextDisabled: string;
  primaryButtonTextHovered: string;
  primaryButtonTextPressed: string;
  warningText: string;
}

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ISerializableObject {
  // (undocumented)
  toString?: () => string;
}

// @public (undocumented)
interface IShimmer {
}

// @public (undocumented)
interface IShimmerCircle {
}

// @public
interface IShimmerCircleProps extends React.AllHTMLAttributes<HTMLElement> {
  // @deprecated
  borderStyle?: IRawStyle;
  componentRef?: IRefObject<IShimmerCircle>;
  height?: number;
  styles?: IStyleFunctionOrObject<IShimmerCircleStyleProps, IShimmerCircleStyles>;
  theme?: ITheme;
}

// @public
interface IShimmerCircleStyles {
  root?: IStyle;
  svg?: IStyle;
}

// @public
interface IShimmerElement {
  height?: number;
  type: ShimmerElementType;
  verticalAlign?: 'top' | 'center' | 'bottom';
  width?: number | string;
}

// @public (undocumented)
interface IShimmerElementsGroup {
}

// @public
interface IShimmerElementsGroupProps extends React.AllHTMLAttributes<HTMLElement> {
  componentRef?: IRefObject<IShimmerElementsGroup>;
  flexWrap?: boolean;
  rowHeight?: number;
  shimmerElements?: IShimmerElement[];
  styles?: IStyleFunctionOrObject<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>;
  theme?: ITheme;
  width?: string;
}

// @public (undocumented)
interface IShimmerElementsGroupStyleProps {
  // (undocumented)
  flexWrap?: boolean;
  // (undocumented)
  theme: ITheme;
}

// @public (undocumented)
interface IShimmerElementsGroupStyles {
  // (undocumented)
  root?: IStyle;
}

// @public (undocumented)
interface IShimmerGap {
}

// @public
interface IShimmerGapProps extends React.AllHTMLAttributes<HTMLElement> {
  // @deprecated
  borderStyle?: IRawStyle;
  componentRef?: IRefObject<IShimmerGap>;
  height?: number;
  styles?: IStyleFunctionOrObject<IShimmerGapStyleProps, IShimmerGapStyles>;
  theme?: ITheme;
  width?: number | string;
}

// @public
interface IShimmerGapStyles {
  root?: IStyle;
}

// @public (undocumented)
interface IShimmerLine {
}

// @public
interface IShimmerLineProps extends React.AllHTMLAttributes<HTMLElement> {
  // @deprecated
  borderStyle?: IRawStyle;
  componentRef?: IRefObject<IShimmerLine>;
  height?: number;
  styles?: IStyleFunctionOrObject<IShimmerLineStyleProps, IShimmerLineStyles>;
  theme?: ITheme;
  width?: number | string;
}

// @public
interface IShimmerLineStyles {
  bottomLeftCorner?: IStyle;
  bottomRightCorner?: IStyle;
  root?: IStyle;
  topLeftCorner?: IStyle;
  topRightCorner?: IStyle;
}

// @public
interface IShimmerProps extends React.AllHTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  className?: string;
  componentRef?: IRefObject<IShimmer>;
  customElementsGroup?: React.ReactNode;
  isDataLoaded?: boolean;
  shimmerElements?: IShimmerElement[];
  styles?: IStyleFunctionOrObject<IShimmerStyleProps, IShimmerStyles>;
  theme?: ITheme;
  width?: number | string;
}

// @public (undocumented)
interface IShimmerState {
  contentLoaded?: boolean;
}

// @public (undocumented)
interface IShimmerStyleProps {
  // (undocumented)
  className?: string;
  // (undocumented)
  isDataLoaded?: boolean;
  // (undocumented)
  theme: ITheme;
  // (undocumented)
  transitionAnimationInterval?: number;
}

// @public (undocumented)
interface IShimmerStyles {
  // (undocumented)
  dataWrapper?: IStyle;
  // (undocumented)
  root?: IStyle;
  // (undocumented)
  screenReaderText?: IStyle;
  // (undocumented)
  shimmerWrapper?: IStyle;
}

// @public (undocumented)
interface ISize {
  // (undocumented)
  height: number;
  // (undocumented)
  width: number;
}

// @public (undocumented)
interface ISlider {
  // (undocumented)
  focus: () => void;
  // (undocumented)
  value: number | undefined;
}

// @public (undocumented)
interface ISliderProps extends React.ClassAttributes<SliderBase> {
  ariaLabel?: string;
  ariaValueText?: (value: number) => string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
  className?: string;
  componentRef?: IRefObject<ISlider>;
  defaultValue?: number;
  disabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  onChanged?: (event: MouseEvent | TouchEvent, value: number) => void;
  showValue?: boolean;
  step?: number;
  styles?: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;
  theme?: ITheme;
  value?: number;
  valueFormat?: (value: number) => string;
  vertical?: boolean;
}

// @public (undocumented)
interface ISliderState {
  // (undocumented)
  renderedValue?: number;
  // (undocumented)
  value?: number;
}

// @public (undocumented)
interface ISliderStyles {
  // (undocumented)
  activeSection: IStyle;
  // (undocumented)
  container: IStyle;
  // (undocumented)
  inactiveSection: IStyle;
  // (undocumented)
  line: IStyle;
  // (undocumented)
  lineContainer: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  slideBox: IStyle;
  // (undocumented)
  thumb: IStyle;
  // (undocumented)
  titleLabel: IStyle;
  // (undocumented)
  valueLabel: IStyle;
}

// @public
export function isMac(reset?: boolean): boolean;

// WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
// @internal
interface ISpacing {
  // (undocumented)
  l1: string;
  // (undocumented)
  l2: string;
  // (undocumented)
  m: string;
  // (undocumented)
  s1: string;
  // (undocumented)
  s2: string;
}

// @public (undocumented)
interface ISpinButton {
  focus: () => void;
  value?: string;
}

// @public (undocumented)
interface ISpinButtonProps {
  ariaLabel?: string;
  ariaPositionInSet?: number;
  ariaSetSize?: number;
  ariaValueNow?: number;
  // (undocumented)
  ariaValueText?: string;
  className?: string;
  componentRef?: (component?: ISpinButton | null) => void;
  decrementButtonAriaLabel?: string;
  decrementButtonIcon?: IIconProps;
  defaultValue?: string;
  disabled?: boolean;
  downArrowButtonStyles?: Partial<IButtonStyles>;
  getClassNames?: (theme: ITheme, disabled: boolean, isFocused: boolean, keyboardSpinDirection: KeyboardSpinDirection, labelPosition?: Position, className?: string) => ISpinButtonClassNames;
  iconProps?: IIconProps;
  incrementButtonAriaLabel?: string;
  incrementButtonIcon?: IIconProps;
  keytipProps?: IKeytipProps;
  label: string;
  // (undocumented)
  labelPosition?: Position;
  max?: number;
  min?: number;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onDecrement?: (value: string) => string | void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onIncrement?: (value: string) => string | void;
  onValidate?: (value: string, event?: React.SyntheticEvent<HTMLElement>) => string | void;
  precision?: number;
  step?: number;
  styles?: Partial<ISpinButtonStyles>;
  theme?: ITheme;
  title?: string;
  upArrowButtonStyles?: Partial<IButtonStyles>;
  value?: string;
}

// @public (undocumented)
interface ISpinButtonState {
  isFocused: boolean;
  keyboardSpinDirection: KeyboardSpinDirection;
  precision: number;
  value: string;
}

// @public (undocumented)
interface ISpinButtonStyles {
  arrowButtonsContainer: IStyle;
  arrowButtonsContainerDisabled: IStyle;
  icon: IStyle;
  iconDisabled: IStyle;
  input: IStyle;
  inputDisabled: IStyle;
  inputTextSelected: IStyle;
  label: IStyle;
  labelDisabled: IStyle;
  labelWrapper: IStyle;
  labelWrapperBottom: IStyle;
  labelWrapperEnd: IStyle;
  labelWrapperStart: IStyle;
  labelWrapperTop: IStyle;
  root: IStyle;
  spinButtonWrapper: IStyle;
  spinButtonWrapperDisabled: IStyle;
  spinButtonWrapperFocused: IStyle;
  spinButtonWrapperHovered: IStyle;
  spinButtonWrapperTopBottom: IStyle;
}

// @public (undocumented)
interface ISpinner {
}

// @public
interface ISpinnerProps extends React.HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  ariaLive?: 'assertive' | 'polite' | 'off';
  className?: string;
  componentRef?: IRefObject<ISpinner>;
  label?: string;
  labelPosition?: SpinnerLabelPosition;
  size?: SpinnerSize;
  styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;
  theme?: ITheme;
  // @deprecated
  type?: SpinnerType;
}

// @public
interface ISpinnerStyleProps {
  className?: string;
  labelPosition?: SpinnerLabelPosition;
  size?: SpinnerSize;
  theme: ITheme;
}

// @public
interface ISpinnerStyles {
  circle?: IStyle;
  label?: IStyle;
  root?: IStyle;
  screenReaderText?: IStyle;
}

// @public (undocumented)
export function isRelativeUrl(url: string): boolean;

// @public (undocumented)
interface IStickyContext {
  // (undocumented)
  scrollablePane: PropTypes.Requireable<object>;
}

// @public (undocumented)
interface IStickyProps extends React.Props<Sticky> {
  componentRef?: IRefObject<IStickyProps>;
  isScrollSynced?: boolean;
  stickyBackgroundColor?: string;
  stickyClassName?: string;
  stickyPosition?: StickyPositionType;
}

// @public (undocumented)
interface IStickyState {
  // (undocumented)
  isStickyBottom: boolean;
  // (undocumented)
  isStickyTop: boolean;
}

// @public
interface IStyleSheetConfig {
  defaultPrefix?: string;
  injectionMode?: InjectionMode;
  namespace?: string;
  onInsertRule?: (rule: string) => void;
}

// @public
interface ISuggestionItemProps<T> {
  className?: string;
  componentRef?: IRefObject<ISuggestionsItem>;
  id?: string;
  isSelectedOverride?: boolean;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveItem: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  removeButtonAriaLabel?: string;
  RenderSuggestion: (item: T, suggestionItemProps?: ISuggestionItemProps<T>) => JSX.Element;
  showRemoveButton?: boolean;
  styles?: IStyleFunctionOrObject<ISuggestionsItemStyleProps, ISuggestionsItemStyles>;
  suggestionModel: ISuggestionModel<T>;
  theme?: ITheme;
}

// @public
interface ISuggestionModel<T> {
  ariaLabel?: string;
  item: T;
  selected: boolean;
}

// @public
interface ISuggestions<T> {
  executeSelectedAction: () => void;
  focusAboveSuggestions: () => void;
  focusBelowSuggestions: () => void;
  focusSearchForMoreButton: () => void;
  hasSuggestedAction: () => boolean;
  hasSuggestedActionSelected: () => boolean;
  tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
}

// @public (undocumented)
interface ISuggestionsControlProps<T> extends React.ClassAttributes<any>, ISuggestionsCoreProps<T> {
  className?: string;
  completeSuggestion: () => void;
  footerItemsProps?: ISuggestionsHeaderFooterProps[];
  headerItemsProps?: ISuggestionsHeaderFooterProps[];
  shouldSelectFirstItem?: () => boolean;
  suggestionsFooterContainerAriaLabel?: string;
  suggestionsHeaderContainerAriaLabel?: string;
}

// @public (undocumented)
interface ISuggestionsControlState<T> {
  // (undocumented)
  selectedFooterIndex: number;
  // (undocumented)
  selectedHeaderIndex: number;
  // (undocumented)
  suggestions: ISuggestionModel<T>[];
}

// @public (undocumented)
interface ISuggestionsCoreProps<T> extends React.ClassAttributes<any> {
  componentRef?: IRefObject<{}>;
  onRenderSuggestion?: (props: T, suggestionItemProps: T) => JSX.Element;
  onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
  onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
  resultsMaximumNumber?: number;
  shouldLoopSelection: boolean;
  showRemoveButtons?: boolean;
  suggestions: ISuggestionModel<T>[];
  suggestionsAvailableAlertText?: string;
  suggestionsContainerAriaLabel?: string;
  suggestionsItemClassName?: string;
}

// @public (undocumented)
interface ISuggestionsHeaderFooterItemProps {
  // (undocumented)
  className: string | undefined;
  // (undocumented)
  componentRef?: IRefObject<{}>;
  // (undocumented)
  id: string;
  // (undocumented)
  isSelected: boolean;
  // (undocumented)
  onExecute?: () => void;
  // (undocumented)
  renderItem: () => JSX.Element;
}

// @public (undocumented)
interface ISuggestionsHeaderFooterProps {
  // (undocumented)
  ariaLabel?: string;
  // (undocumented)
  className?: string;
  // (undocumented)
  onExecute?: () => void;
  // (undocumented)
  renderItem: () => JSX.Element;
  // (undocumented)
  shouldShow: () => boolean;
}

// @public
interface ISuggestionsItem {
}

// @public
interface ISuggestionsItemStyles {
  closeButton: IStyle;
  itemButton: IStyle;
  root: IStyle;
}

// @public
interface ISuggestionsProps<T> extends React.Props<any> {
  className?: string;
  componentRef?: IRefObject<ISuggestions<T>>;
  createGenericItem?: () => void;
  forceResolveText?: string;
  isLoading?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  isResultsFooterVisible?: boolean;
  isSearching?: boolean;
  loadingText?: string;
  moreSuggestionsAvailable?: boolean;
  mostRecentlyUsedHeaderText?: string;
  noResultsFoundText?: string;
  onGetMoreResults?: () => void;
  onRenderNoResultFound?: IRenderFunction<void>;
  onRenderSuggestion?: (props: T, suggestionItemProps: T) => JSX.Element;
  onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
  onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
  refocusSuggestions?: (keyCode: KeyCodes) => void;
  removeSuggestionAriaLabel?: string;
  resultsFooter?: (props: ISuggestionsProps<T>) => JSX.Element;
  resultsFooterFull?: (props: ISuggestionsProps<T>) => JSX.Element;
  resultsMaximumNumber?: number;
  searchErrorText?: string;
  searchForMoreText?: string;
  searchingText?: string;
  showForceResolve?: () => boolean;
  showRemoveButtons?: boolean;
  styles?: IStyleFunctionOrObject<{}, {}>;
  suggestions: ISuggestionModel<T>[];
  suggestionsAvailableAlertText?: string;
  suggestionsClassName?: string;
  suggestionsContainerAriaLabel?: string;
  suggestionsHeaderText?: string;
  suggestionsItemClassName?: string;
  suggestionsListId?: string;
  theme?: ITheme;
}

// @public (undocumented)
interface ISuggestionsState {
  // (undocumented)
  selectedActionType: SuggestionActionType;
}

// @public
interface ISuggestionsStyles {
  forceResolveButton: IStyle;
  noSuggestions: IStyle;
  root: IStyle;
  searchForMoreButton: IStyle;
  subComponentStyles: ISuggestionsSubComponentStyles;
  suggestionsAvailable: IStyle;
  suggestionsContainer: IStyle;
  title: IStyle;
}

// @public
interface ISuggestionsSubComponentStyles {
  spinner: IStyleFunctionOrObject<ISpinnerStyleProps, any>;
}

// @public
export function isValidShade(shade?: Shade): boolean;

// @public (undocumented)
interface ISwatchColorPicker {
}

// @public (undocumented)
interface ISwatchColorPickerProps {
  cellBorderWidth?: number;
  cellHeight?: number;
  cellMargin?: number;
  cellShape?: 'circle' | 'square';
  cellWidth?: number;
  className?: string;
  colorCells: IColorCellProps[];
  columnCount: number;
  componentRef?: IRefObject<ISwatchColorPicker>;
  disabled?: boolean;
  doNotContainWithinFocusZone?: boolean;
  focusOnHover?: boolean;
  getColorGridCellStyles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
  id?: string;
  mouseLeaveParentSelector?: string | undefined;
  onCellFocused?: (id?: string, color?: string) => void;
  onCellHovered?: (id?: string, color?: string) => void;
  onColorChanged?: (id?: string, color?: string) => void;
  positionInSet?: number;
  selectedId?: string;
  setSize?: number;
  shouldFocusCircularNavigate?: boolean;
  styles?: IStyleFunctionOrObject<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface ISwatchColorPickerState {
  // (undocumented)
  selectedIndex?: number;
}

// @public
interface ISwatchColorPickerStyleProps {
  cellMargin?: number;
  className?: string;
  theme: ITheme;
}

// @public
interface ISwatchColorPickerStyles {
  focusedContainer?: IStyle;
  root: IStyle;
  tableCell: IStyle;
}

// @public
interface ITag {
  key: string;
  name: string;
}

// @public
interface ITagItemProps extends IPickerItemProps<ITag> {
  className?: string;
  enableTagFocusInDisabledPicker?: boolean;
  styles?: IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles>;
  theme?: ITheme;
}

// @public
interface ITagItemStyles {
  close: IStyle;
  root: IStyle;
  text: IStyle;
}

// @public
interface ITagItemSuggestionProps extends React.AllHTMLAttributes<HTMLElement> {
  className?: string;
  styles?: IStyleFunctionOrObject<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>;
  theme?: ITheme;
}

// @public
interface ITagItemSuggestionStyles {
  suggestionTextOverflow?: IStyle;
}

// @public
interface ITagPickerProps extends IBasePickerProps<ITag> {
}

// @public (undocumented)
interface ITeachingBubble {
  focus(): void;
}

// @public
interface ITeachingBubbleProps extends React.ClassAttributes<TeachingBubbleBase | TeachingBubbleContentBase>, IAccessiblePopupProps {
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  calloutProps?: ICalloutProps;
  componentRef?: IRefObject<ITeachingBubble>;
  hasCloseIcon?: boolean;
  hasCondensedHeadline?: boolean;
  hasSmallHeadline?: boolean;
  headline?: string;
  illustrationImage?: IImageProps;
  isWide?: boolean;
  onDismiss?: (ev?: any) => void;
  primaryButtonProps?: IButtonProps;
  secondaryButtonProps?: IButtonProps;
  styles?: IStyleFunctionOrObject<ITeachingBubbleStyleProps, ITeachingBubbleStyles>;
  targetElement?: HTMLElement;
  theme?: ITheme;
}

// @public (undocumented)
interface ITeachingBubbleState {
  // (undocumented)
  isTeachingBubbleVisible?: boolean;
}

// @public (undocumented)
interface ITeachingBubbleStyles {
  // (undocumented)
  body: IStyle;
  // (undocumented)
  bodyContent: IStyle;
  // (undocumented)
  closeButton: IStyle;
  // (undocumented)
  content: IStyle;
  // (undocumented)
  footer: IStyle;
  // (undocumented)
  header: IStyle;
  // (undocumented)
  headline: IStyle;
  // (undocumented)
  imageContent: IStyle;
  // (undocumented)
  primaryButton: IStyle;
  // (undocumented)
  root: IStyle;
  // (undocumented)
  secondaryButton: IStyle;
  // (undocumented)
  subComponentStyles?: ITeachingBubbleSubComponentStyles;
  // (undocumented)
  subText: IStyle;
}

// @public (undocumented)
interface ITeachingBubbleSubComponentStyles {
  callout: IStyleFunctionOrObject<any, any>;
}

// @public (undocumented)
interface ITextField {
  blur: () => void;
  focus: () => void;
  select: () => void;
  selectionEnd: number | null;
  selectionStart: number | null;
  setSelectionEnd: (value: number) => void;
  setSelectionRange: (start: number, end: number) => void;
  setSelectionStart: (value: number) => void;
  value: string | undefined;
}

// @public
interface ITextFieldProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  // @deprecated (undocumented)
  addonString?: string;
  ariaLabel?: string;
  autoAdjustHeight?: boolean;
  autoComplete?: string;
  borderless?: boolean;
  className?: string;
  // @deprecated (undocumented)
  componentId?: string;
  componentRef?: IRefObject<ITextField>;
  defaultValue?: string;
  deferredValidationTime?: number;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  // @deprecated (undocumented)
  iconClass?: string;
  iconProps?: IIconProps;
  inputClassName?: string;
  label?: string;
  mask?: string;
  maskChar?: string;
  maskFormat?: {
    [key: string]: RegExp;
  }
  multiline?: boolean;
  onBeforeChange?: (newValue: any) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  // @deprecated (undocumented)
  onChanged?: (newValue: any) => void;
  onGetErrorMessage?: (value: string) => string | PromiseLike<string> | undefined;
  onNotifyValidationResult?: (errorMessage: string, value: string | undefined) => void;
  // @deprecated (undocumented)
  onRenderAddon?: IRenderFunction<ITextFieldProps>;
  onRenderDescription?: IRenderFunction<ITextFieldProps>;
  onRenderLabel?: IRenderFunction<ITextFieldProps>;
  onRenderPrefix?: IRenderFunction<ITextFieldProps>;
  onRenderSuffix?: IRenderFunction<ITextFieldProps>;
  prefix?: string;
  readOnly?: boolean;
  resizable?: boolean;
  styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
  suffix?: string;
  theme?: ITheme;
  underlined?: boolean;
  validateOnFocusIn?: boolean;
  validateOnFocusOut?: boolean;
  validateOnLoad?: boolean;
  value?: string;
}

// @public (undocumented)
interface ITextFieldState {
  errorMessage: string;
  isFocused: boolean;
  // (undocumented)
  value: string;
}

// @public (undocumented)
interface ITextFieldStyles extends IStyleSet<ITextFieldStyles> {
  description: IStyle;
  errorMessage: IStyle;
  field: IStyle;
  fieldGroup: IStyle;
  icon: IStyle;
  prefix: IStyle;
  root: IStyle;
  subComponentStyles: ITextFieldSubComponentStyles;
  suffix: IStyle;
  wrapper: IStyle;
}

// @public (undocumented)
interface ITextFieldSubComponentStyles {
  label: IStyleFunctionOrObject<any, any>;
}

// @public (undocumented)
interface ITheme extends IScheme {
  // WARNING: Because this definition is explicitly marked as @internal, an underscore prefix ("_") should be added to its name
  // @internal
  schemes?: {
          [P in ISchemeNames]?: IScheme;
      };
}

// @public (undocumented)
interface IThemeRules {
  // (undocumented)
  [key: string]: IThemeSlotRule;
}

// @public (undocumented)
interface IThemeSlotRule {
  // (undocumented)
  asShade?: Shade;
  // (undocumented)
  color?: IColor;
  // (undocumented)
  dependentRules: IThemeSlotRule[];
  // (undocumented)
  inherits?: IThemeSlotRule;
  // (undocumented)
  isBackgroundShade?: boolean;
  // (undocumented)
  isCustomized?: boolean;
  // (undocumented)
  name: string;
  // (undocumented)
  value?: string;
}

// @public (undocumented)
interface IToggle {
  // (undocumented)
  focus: () => void;
}

// @public
interface IToggleProps extends React.HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;
  checked?: boolean;
  componentRef?: IRefObject<IToggle>;
  defaultChecked?: boolean;
  disabled?: boolean;
  inlineLabel?: boolean;
  keytipProps?: IKeytipProps;
  label?: string;
  // @deprecated (undocumented)
  offAriaLabel?: string;
  offText?: string;
  // @deprecated (undocumented)
  onAriaLabel?: string;
  onChange?: (event: React.MouseEvent<HTMLElement>, checked?: boolean) => void;
  // @deprecated (undocumented)
  onChanged?: (checked: boolean) => void;
  onText?: string;
  styles?: IStyleFunctionOrObject<IToggleStyleProps, IToggleStyles>;
  theme?: ITheme;
}

// @public (undocumented)
interface IToggleState {
  // (undocumented)
  checked: boolean;
}

// @public
interface IToggleStyleProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  inlineLabel?: boolean;
  onOffMissing?: boolean;
  theme: ITheme;
}

// @public
interface IToggleStyles {
  container: IStyle;
  label: IStyle;
  pill: IStyle;
  root: IStyle;
  text: IStyle;
  thumb: IStyle;
}

// @public (undocumented)
interface ITooltip {
}

// @public (undocumented)
interface ITooltipHost {
  dismiss: () => void;
  show: () => void;
}

// @public
interface ITooltipHostProps extends React.HTMLAttributes<HTMLDivElement | TooltipHostBase> {
  calloutProps?: ICalloutProps;
  closeDelay?: number;
  componentRef?: IRefObject<ITooltipHost>;
  content?: string;
  delay?: TooltipDelay;
  directionalHint?: DirectionalHint;
  directionalHintForRTL?: DirectionalHint;
  hostClassName?: string;
  onTooltipToggle?(isTooltipVisible: boolean): void;
  overflowMode?: TooltipOverflowMode;
  setAriaDescribedBy?: boolean;
  styles?: IStyleFunctionOrObject<ITooltipHostStyleProps, ITooltipHostStyles>;
  theme?: ITheme;
  tooltipProps?: ITooltipProps;
}

// @public (undocumented)
interface ITooltipHostState {
  // (undocumented)
  isTooltipVisible: boolean;
}

// @public (undocumented)
interface ITooltipHostStyleProps {
  className?: string;
  theme: ITheme;
}

// @public (undocumented)
interface ITooltipHostStyles {
  root: IStyle;
}

// @public
interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement | TooltipBase> {
  calloutProps?: ICalloutProps;
  componentRef?: IRefObject<ITooltip>;
  content?: string;
  delay?: TooltipDelay;
  directionalHint?: DirectionalHint;
  directionalHintForRTL?: DirectionalHint;
  maxWidth?: string | null;
  onRenderContent?: IRenderFunction<ITooltipProps>;
  styles?: IStyleFunctionOrObject<ITooltipStyleProps, ITooltipStyles>;
  targetElement?: HTMLElement;
  theme?: ITheme;
}

// @public (undocumented)
interface ITooltipStyleProps {
  className?: string;
  delay?: TooltipDelay;
  maxWidth?: string;
  theme: ITheme;
}

// @public (undocumented)
interface ITooltipStyles {
  content: IStyle;
  root: IStyle;
  subText: IStyle;
}

// @public (undocumented)
interface IVerticalDividerClassNames {
  // (undocumented)
  divider: string;
  // (undocumented)
  wrapper: string;
}

// @public (undocumented)
interface IVerticalDividerProps {
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
}

// @public (undocumented)
enum KeyboardSpinDirection {
  // (undocumented)
  down = -1,
  // (undocumented)
  notSpinning = 0,
  // (undocumented)
  up = 1
}

// @public
export function keyframes(timeline: {
    [key: string]: {};
}): string;

// @public
class Keytip extends BaseComponent<IKeytipProps, {}>, implements IKeytip {
  // (undocumented)
  render(): JSX.Element;
}

// WARNING: The type "IKeytipDataProps" needs to be exported by the package (e.g. added to index.ts)
// @public
class KeytipData extends BaseComponent<IKeytipDataProps & IRenderComponent<{}>, {}> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
class KeytipLayerBase extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  constructor(props: IKeytipLayerProps, context: any);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: IKeytipLayerProps;
  // (undocumented)
  getCurrentSequence(): string;
  // WARNING: The type "KeytipTree" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  getKeytipTree(): KeytipTree;
  processInput(key: string, ev?: React.KeyboardEvent<HTMLElement>): void;
  // WARNING: The type "IKeytipTransitionKey" needs to be exported by the package (e.g. added to index.ts)
  processTransitionInput(transitionKey: IKeytipTransitionKey, ev?: React.KeyboardEvent<HTMLElement>): void;
  // (undocumented)
  render(): JSX.Element;
  showKeytips(ids: string[]): void;
}

// @public (undocumented)
class LabelBase extends BaseComponent<ILabelProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class LayerBase extends BaseComponent<ILayerProps, ILayerBaseState> {
  constructor(props: ILayerProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  componentWillUpdate(): void;
  // (undocumented)
  static defaultProps: ILayerProps;
  // (undocumented)
  render(): React.ReactNode;
}

// WARNING: The type "ILayerHostProps" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
class LayerHost extends BaseComponent<ILayerHostProps> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  shouldComponentUpdate(): boolean;
}

// @public (undocumented)
class LinkBase extends BaseComponent<ILinkProps, any>, implements ILink {
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
class List extends BaseComponent<IListProps, IListState>, implements IList {
  constructor(props: IListProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IListProps): void;
  // (undocumented)
  static defaultProps: {
    onRenderCell: (item: any, index: number, containsFocus: boolean) => JSX.Element;
    renderedWindowsAhead: number;
    renderedWindowsBehind: number;
    startIndex: number;
  }
  // (undocumented)
  forceUpdate(): void;
  // (undocumented)
  getStartItemIndexInView(measureItem?: (itemIndex: number) => number): number;
  // (undocumented)
  refs: {
    [key: string]: React.ReactInstance;
  }
  // (undocumented)
  render(): JSX.Element;
  scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
  // (undocumented)
  shouldComponentUpdate(newProps: IListProps, newState: IListState): boolean;
}

// @public
class ListPeoplePickerBase extends MemberListPeoplePicker {
  static defaultProps: {
    createGenericItem: typeof createGenericItem;
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps | undefined) => JSX.Element;
  }
}

// @public
export function loadTheme(theme: IPartialTheme, depComments?: boolean): ITheme;

// @public (undocumented)
export function mapEnumByName<T>(theEnum: any, callback: (name?: string, value?: string | number) => T | undefined): (T | undefined)[] | undefined;

// @public (undocumented)
class MaskedTextField extends BaseComponent<ITextFieldProps, IMaskedTextFieldState>, implements ITextField {
  constructor(props: ITextFieldProps);
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  blur(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: ITextFieldProps): void;
  // (undocumented)
  static defaultProps: ITextFieldProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  select(): void;
  // (undocumented)
  readonly selectionEnd: number | null;
  // (undocumented)
  readonly selectionStart: number | null;
  // (undocumented)
  setSelectionEnd(value: number): void;
  // (undocumented)
  setSelectionRange(start: number, end: number): void;
  // (undocumented)
  setSelectionStart(value: number): void;
  // (undocumented)
  setValue(newValue: string): void;
  // (undocumented)
  readonly value: string | undefined;
}

// @public (undocumented)
class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}

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

// @public
export function mergeSettings(oldSettings?: Settings, newSettings?: Settings | SettingsFunction): Settings;

// @public
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;

// @public
export function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;

// @public (undocumented)
class MessageBarBase extends BaseComponent<IMessageBarProps, IMessageBarState> {
  constructor(props: IMessageBarProps);
  // (undocumented)
  static defaultProps: IMessageBarProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class MessageBarButton extends BaseComponent<IButtonProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum MessageBarType {
  blocked = 2,
  error = 1,
  info = 0,
  // @deprecated
  remove = 90000,
  severeWarning = 3,
  success = 4,
  warning = 5
}

// @public (undocumented)
class ModalBase extends BaseComponent<IModalProps, IDialogState>, implements IModal {
  constructor(props: IModalProps);
  // (undocumented)
  componentDidUpdate(prevProps: IModalProps, prevState: IDialogState): void;
  // (undocumented)
  componentWillReceiveProps(newProps: IModalProps): void;
  // (undocumented)
  static defaultProps: IModalProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element | null;
}

// @public (undocumented)
class NavBase extends BaseComponent<INavProps, INavState>, implements INav {
  constructor(props: INavProps);
  // (undocumented)
  componentWillReceiveProps(newProps: INavProps): void;
  // (undocumented)
  static defaultProps: INavProps;
  // (undocumented)
  render(): JSX.Element | null;
  // (undocumented)
  readonly selectedKey: string | undefined;
}

// @public
class NormalPeoplePickerBase extends BasePeoplePicker {
  static defaultProps: {
    createGenericItem: typeof createGenericItem;
    onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
    onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps | undefined) => JSX.Element;
  }
}

// @public
export function nullRender(): JSX.Element | null;

// @public (undocumented)
enum OpenCardMode {
  hotKey = 1,
  hover = 0
}

// @public (undocumented)
enum OverflowButtonType {
  descriptive = 1,
  downArrow = 3,
  more = 2,
  none = 0
}

// @public (undocumented)
class OverflowSetBase extends BaseComponent<IOverflowSetProps, {}>, implements IOverflowSet {
  constructor(props: IOverflowSetProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  componentWillUpdate(): void;
  // (undocumented)
  static defaultProps: Pick<IOverflowSetProps, 'vertical' | 'role'>;
  focus(forceIntoFirstElement?: boolean): boolean;
  focusElement(childElement?: HTMLElement): boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class OverlayBase extends BaseComponent<IOverlayProps, {}> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum PanelType {
  custom = 7,
  extraLarge = 6,
  large = 4,
  largeFixed = 5,
  medium = 3,
  smallFixedFar = 1,
  smallFixedNear = 2,
  smallFluid = 0
}

// @public
class PersonaBase extends BaseComponent<IPersonaProps, {}> {
  constructor(props: IPersonaProps);
  // (undocumented)
  static defaultProps: IPersonaProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public
class PersonaCoinBase extends BaseComponent<IPersonaCoinProps, IPersonaState> {
  constructor(props: IPersonaCoinProps);
  // (undocumented)
  componentWillReceiveProps(nextProps: IPersonaCoinProps): void;
  // (undocumented)
  static defaultProps: IPersonaCoinProps;
  // (undocumented)
  render(): JSX.Element | null;
}

// @public (undocumented)
enum PersonaInitialsColor {
  black = 11,
  // (undocumented)
  blue = 1,
  // (undocumented)
  darkBlue = 2,
  // (undocumented)
  darkGreen = 6,
  // (undocumented)
  darkRed = 14,
  // (undocumented)
  green = 5,
  // (undocumented)
  lightBlue = 0,
  // (undocumented)
  lightGreen = 4,
  // (undocumented)
  lightPink = 7,
  // (undocumented)
  magenta = 9,
  // (undocumented)
  orange = 12,
  // (undocumented)
  pink = 8,
  // (undocumented)
  purple = 10,
  red = 13,
  // (undocumented)
  teal = 3,
  transparent = 15,
  // (undocumented)
  violet = 16
}

// @public (undocumented)
enum PersonaPresence {
  // (undocumented)
  away = 3,
  // (undocumented)
  blocked = 5,
  // (undocumented)
  busy = 6,
  // (undocumented)
  dnd = 4,
  // (undocumented)
  none = 0,
  // (undocumented)
  offline = 1,
  // (undocumented)
  online = 2
}

// WARNING: Export "size6" must specify a type
// WARNING: Export "size8" must specify a type
// WARNING: Export "size12" must specify a type
// WARNING: Export "size20" must specify a type
// WARNING: Export "size28" must specify a type
// WARNING: Export "border" must specify a type
// @public (undocumented)
module personaPresenceSize {
}

// WARNING: Export "size10" must specify a type
// WARNING: Export "size16" must specify a type
// WARNING: Export "size24" must specify a type
// WARNING: Export "size28" must specify a type
// WARNING: Export "size32" must specify a type
// WARNING: Export "size40" must specify a type
// WARNING: Export "size48" must specify a type
// WARNING: Export "size72" must specify a type
// WARNING: Export "size100" must specify a type
// @public (undocumented)
module personaSize {
}

// @public (undocumented)
enum PersonaSize {
  // @deprecated
  extraExtraSmall = 1,
  // @deprecated
  extraLarge = 6,
  // @deprecated
  extraSmall = 2,
  // @deprecated
  large = 5,
  // @deprecated
  regular = 4,
  // (undocumented)
  size10 = 9,
  // (undocumented)
  size100 = 15,
  // (undocumented)
  size16 = 8,
  // (undocumented)
  size24 = 10,
  // (undocumented)
  size28 = 7,
  // (undocumented)
  size32 = 11,
  // (undocumented)
  size40 = 12,
  // (undocumented)
  size48 = 13,
  // (undocumented)
  size72 = 14,
  // @deprecated
  small = 3,
  // @deprecated
  tiny = 0
}

// @public (undocumented)
class PivotBase extends BaseComponent<IPivotProps, IPivotState> {
  constructor(props: IPivotProps);
  // (undocumented)
  componentWillReceiveProps(nextProps: IPivotProps): void;
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class PivotItem extends BaseComponent<IPivotItemProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum PivotLinkFormat {
  links = 0,
  tabs = 1
}

// @public (undocumented)
enum PivotLinkSize {
  large = 1,
  normal = 0
}

// @public (undocumented)
class PlainCardBase extends BaseComponent<IPlainCardProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public
class Popup extends BaseComponent<IPopupProps, IPopupState> {
  constructor(props: IPopupProps);
  // (undocumented)
  _root: React.RefObject<HTMLDivElement>;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: IPopupProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function portalContainsElement(target: HTMLElement, parent?: HTMLElement): boolean;

// @public (undocumented)
class PositioningContainer extends BaseComponent<IPositioningContainerProps, IPositioningContainerState>, implements PositioningContainer {
  constructor(props: IPositioningContainerProps);
  // (undocumented)
  protected _dismissOnLostFocus(ev: Event): void;
  // (undocumented)
  protected _dismissOnScroll(ev: Event): void;
  // (undocumented)
  protected _onComponentDidMount: () => void;
  // (undocumented)
  protected _setInitialFocus: () => void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillMount(): void;
  // (undocumented)
  componentWillUpdate(newProps: IPositioningContainerProps): void;
  // (undocumented)
  static defaultProps: IPositioningContainerProps;
  // @deprecated
  dismiss: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement> | undefined) => void;
  // (undocumented)
  onResize: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement> | undefined) => void;
  // (undocumented)
  render(): JSX.Element | null;
}

// @public
export function precisionRound(value: number, precision: number, base?: number): number;

// @public (undocumented)
class PrimaryButton extends BaseComponent<IButtonProps, {}> {
  protected _skipComponentRefResolution: boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public
class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, {}> {
  constructor(props: IProgressIndicatorProps);
  // (undocumented)
  static defaultProps: {
    description: string;
    label: string;
    width: number;
  }
  // (undocumented)
  render(): JSX.Element;
}

// @public @deprecated (undocumented)
export function provideContext<TContext, TProps>(contextTypes: PropTypes.ValidationMap<TContext>, mapPropsToContext: (props: TProps) => TContext): React.ComponentType<TProps>;

// @public (undocumented)
class RatingBase extends BaseComponent<IRatingProps, IRatingState> {
  constructor(props: IRatingProps);
  // (undocumented)
  componentWillReceiveProps(nextProps: IRatingProps): void;
  // (undocumented)
  static defaultProps: IRatingProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum RatingSize {
  // (undocumented)
  Large = 1,
  // (undocumented)
  Small = 0
}

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

// @public (undocumented)
export function registerDefaultFontFaces(baseUrl: string): void;

// @public
export function registerIconAlias(iconName: string, mappedToName: string): void;

// @public
export function registerIcons(iconSubset: IIconSubset, options?: Partial<IIconOptions>): void;

// @public
export function registerOnThemeChangeCallback(callback: (theme: ITheme) => void): void;

// @public
export function removeIndex<T>(array: T[], index: number): T[];

// @public
export function removeOnThemeChangeCallback(callback: (theme: ITheme) => void): void;

// @public
export function replaceElement<T>(array: T[], newElement: T, index: number): T[];

// @public
export function resetIds(counter?: number): void;

// @public
export function resetMemoizations(): void;

// @public (undocumented)
class ResizeGroupBase extends BaseComponent<IResizeGroupProps, IResizeGroupState> {
  constructor(props: IResizeGroupProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IResizeGroupProps): void;
  // (undocumented)
  componentWillReceiveProps(nextProps: IResizeGroupProps): void;
  // (undocumented)
  remeasure(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function rgb2hex(r: number, g: number, b: number): string;

// @public
export function rgb2hsv(r: number, g: number, b: number): IHSV;

// @public (undocumented)
class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, IScrollablePaneState>, implements IScrollablePane {
  constructor(props: IScrollablePaneProps);
  // (undocumented)
  addSticky: (sticky: Sticky) => void;
  // (undocumented)
  static childContextTypes: React.ValidationMap<IScrollablePaneContext>;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  readonly contentContainer: HTMLDivElement | null;
  // (undocumented)
  forceLayoutUpdate(): void;
  // (undocumented)
  getChildContext(): IScrollablePaneContext;
  // (undocumented)
  getScrollPosition: () => number;
  // (undocumented)
  notifySubscribers: () => void;
  // (undocumented)
  removeSticky: (sticky: Sticky) => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  readonly root: HTMLDivElement | null;
  // (undocumented)
  setStickiesDistanceFromTop(): void;
  // (undocumented)
  shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean;
  // (undocumented)
  sortSticky: (sticky: Sticky, sortAgain?: boolean | undefined) => void;
  // (undocumented)
  readonly stickyAbove: HTMLDivElement | null;
  // (undocumented)
  readonly stickyBelow: HTMLDivElement | null;
  // (undocumented)
  subscribe: (handler: Function) => void;
  // (undocumented)
  syncScrollSticky: (sticky: Sticky) => void;
  // (undocumented)
  unsubscribe: (handler: Function) => void;
  // (undocumented)
  updateStickyRefHeights: () => void;
}

// @public (undocumented)
class SearchBoxBase extends BaseComponent<ISearchBoxProps, ISearchBoxState> {
  constructor(props: ISearchBoxProps);
  // (undocumented)
  componentWillReceiveProps(newProps: ISearchBoxProps): void;
  // (undocumented)
  static defaultProps: Pick<ISearchBoxProps, 'disableAnimation' | 'clearButtonProps'>;
  focus(): void;
  hasFocus(): boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum SelectableOptionMenuItemType {
  // (undocumented)
  Divider = 1,
  // (undocumented)
  Header = 2,
  // (undocumented)
  Normal = 0
}

// @public
class SelectedPeopleList extends BasePeopleSelectedItemsList {
  // (undocumented)
  static defaultProps: any;
  // (undocumented)
  protected renderItems: () => JSX.Element[];
  // (undocumented)
  replaceItem: (itemToReplace: IExtendedPersonaProps, itemsToReplaceWith: IExtendedPersonaProps[]) => void;
}

// @public (undocumented)
class Selection implements ISelection {
  constructor(options?: ISelectionOptions);
  // (undocumented)
  canSelectItem(item: IObjectWithKey, index?: number): boolean;
  // (undocumented)
  count: number;
  // (undocumented)
  getItems(): IObjectWithKey[];
  // (undocumented)
  getKey(item: IObjectWithKey, index?: number): string;
  // (undocumented)
  getSelectedCount(): number;
  // (undocumented)
  getSelectedIndices(): number[];
  // (undocumented)
  getSelection(): IObjectWithKey[];
  // (undocumented)
  isAllSelected(): boolean;
  // (undocumented)
  isIndexSelected(index: number): boolean;
  // (undocumented)
  isKeySelected(key: string): boolean;
  // (undocumented)
  isModal(): boolean;
  // (undocumented)
  isRangeSelected(fromIndex: number, count: number): boolean;
  // (undocumented)
  readonly mode: SelectionMode;
  // (undocumented)
  selectToIndex(index: number, clearSelection?: boolean): void;
  // (undocumented)
  selectToKey(key: string, clearSelection?: boolean): void;
  // (undocumented)
  setAllSelected(isAllSelected: boolean): void;
  // (undocumented)
  setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;
  // (undocumented)
  setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;
  setItems(items: IObjectWithKey[], shouldClear?: boolean): void;
  // (undocumented)
  setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
  // (undocumented)
  setModal(isModal: boolean): void;
  // (undocumented)
  toggleAllSelected(): void;
  // (undocumented)
  toggleIndexSelected(index: number): void;
  // (undocumented)
  toggleKeySelected(key: string): void;
  // (undocumented)
  toggleRangeSelected(fromIndex: number, count: number): void;
}

// @public (undocumented)
enum SelectionDirection {
  // (undocumented)
  horizontal = 0,
  // (undocumented)
  vertical = 1
}

// @public (undocumented)
enum SelectionMode {
  // (undocumented)
  multiple = 2,
  // (undocumented)
  none = 0,
  // (undocumented)
  single = 1
}

// @public (undocumented)
class SelectionZone extends BaseComponent<ISelectionZoneProps, {}> {
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  static defaultProps: {
    isMultiSelectEnabled: boolean;
    isSelectedOnFocus: boolean;
    selectionMode: SelectionMode;
  }
  ignoreNextFocus: () => void;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum SemanticColorSlots {
  // (undocumented)
  bodyBackground = 0,
  // (undocumented)
  bodyText = 1,
  // (undocumented)
  disabledBackground = 2,
  // (undocumented)
  disabledText = 3
}

// @public
export function setBaseUrl(baseUrl: string): void;

// @public
export function setIconOptions(options: Partial<IIconOptions>): void;

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
enum Shade {
  // (undocumented)
  Shade1 = 1,
  // (undocumented)
  Shade2 = 2,
  // (undocumented)
  Shade3 = 3,
  // (undocumented)
  Shade4 = 4,
  // (undocumented)
  Shade5 = 5,
  // (undocumented)
  Shade6 = 6,
  // (undocumented)
  Shade7 = 7,
  // (undocumented)
  Shade8 = 8,
  // (undocumented)
  Unshaded = 0
}

// @public
export function shallowCompare<TA, TB>(a: TA, b: TB): boolean;

// @public (undocumented)
class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  constructor(props: IShimmerProps);
  // (undocumented)
  componentWillReceiveProps(nextProps: IShimmerProps): void;
  // (undocumented)
  static defaultProps: IShimmerProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class ShimmerCircleBase extends BaseComponent<IShimmerCircleProps, {}> {
  constructor(props: IShimmerCircleProps);
  // (undocumented)
  render(): JSX.Element;
}

// WARNING: The type "IShimmeredDetailsListProps" needs to be exported by the package (e.g. added to index.ts)
// @public (undocumented)
class ShimmeredDetailsListBase extends BaseComponent<IShimmeredDetailsListProps, {}> {
  // WARNING: The type "IShimmeredDetailsListProps" needs to be exported by the package (e.g. added to index.ts)
  constructor(props: IShimmeredDetailsListProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum ShimmerElementsDefaultHeights {
  circle = 24,
  gap = 16,
  line = 16
}

// @public (undocumented)
class ShimmerElementsGroupBase extends BaseComponent<IShimmerElementsGroupProps, {}> {
  constructor(props: IShimmerElementsGroupProps);
  // (undocumented)
  static defaultProps: IShimmerElementsGroupProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum ShimmerElementType {
  circle = 2,
  gap = 3,
  line = 1
}

// @public (undocumented)
class ShimmerGapBase extends BaseComponent<IShimmerGapProps, {}> {
  constructor(props: IShimmerGapProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
  constructor(props: IShimmerLineProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function shouldWrapFocus(element: HTMLElement, noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap'): boolean;

// @public (undocumented)
class SliderBase extends BaseComponent<ISliderProps, ISliderState>, implements ISlider {
  constructor(props: ISliderProps);
  componentWillReceiveProps(newProps: ISliderProps): void;
  // (undocumented)
  static defaultProps: ISliderProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): React.ReactElement<{}>;
  // (undocumented)
  readonly value: number | undefined;
}

// @public (undocumented)
class SpinButton extends BaseComponent<ISpinButtonProps, ISpinButtonState>, implements ISpinButton {
  constructor(props: ISpinButtonProps);
  componentWillReceiveProps(newProps: ISpinButtonProps): void;
  // (undocumented)
  static defaultProps: ISpinButtonProps;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  readonly value: string | undefined;
}

// @public (undocumented)
class SpinnerBase extends BaseComponent<ISpinnerProps, any> {
  // (undocumented)
  static defaultProps: ISpinnerProps;
  // (undocumented)
  render(): JSX.Element;
}

// @public
enum SpinnerSize {
  large = 3,
  medium = 2,
  small = 1,
  xSmall = 0
}

// @public @deprecated
enum SpinnerType {
  // @deprecated
  large = 1,
  // @deprecated
  normal = 0
}

// @public (undocumented)
class Sticky extends BaseComponent<IStickyProps, IStickyState> {
  constructor(props: IStickyProps);
  // (undocumented)
  addSticky(stickyContent: HTMLDivElement): void;
  // (undocumented)
  readonly canStickyBottom: boolean;
  // (undocumented)
  readonly canStickyTop: boolean;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  context: IScrollablePaneContext;
  // (undocumented)
  static contextTypes: IStickyContext;
  // (undocumented)
  static defaultProps: IStickyProps;
  // (undocumented)
  distanceFromTop: number;
  // (undocumented)
  readonly nonStickyContent: HTMLDivElement | null;
  // (undocumented)
  readonly placeholder: HTMLDivElement | null;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  resetSticky(): void;
  // (undocumented)
  readonly root: HTMLDivElement | null;
  // (undocumented)
  setDistanceFromTop(container: HTMLDivElement): void;
  // (undocumented)
  shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean;
  // (undocumented)
  readonly stickyContentBottom: HTMLDivElement | null;
  // (undocumented)
  readonly stickyContentTop: HTMLDivElement | null;
  // (undocumented)
  syncScroll: (container: HTMLElement) => void;
}

// @public (undocumented)
enum StickyPositionType {
  // (undocumented)
  Both = 0,
  // (undocumented)
  Footer = 2,
  // (undocumented)
  Header = 1
}

// @public
export function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>, TStyleProps, TStyleSet extends IStyleSet<TStyleSet>>(Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>, baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>, getProps?: (props: TComponentProps) => Partial<TComponentProps>, customizable?: ICustomizableProps): (props: TComponentProps) => JSX.Element;

// @public
class Stylesheet {
  constructor(config?: IStyleSheetConfig);
  argsFromClassName(className: string): IStyle[] | undefined;
  cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
  classNameFromKey(key: string): string | undefined;
  getClassName(displayName?: string): string;
  static getInstance(): Stylesheet;
  getRules(includePreservedRules?: boolean): string;
  insertedRulesFromClassName(className: string): string[] | undefined;
  insertRule(rule: string, preserve?: boolean): void;
  onReset(callback: () => void): void;
  reset(): void;
  // (undocumented)
  resetKeys(): void;
  setConfig(config?: IStyleSheetConfig): void;
}

// @public
enum SuggestionActionType {
  forceResolve = 1,
  none = 0,
  searchMore = 2
}

// @public (undocumented)
enum SuggestionItemType {
  // (undocumented)
  footer = 2,
  // (undocumented)
  header = 0,
  // (undocumented)
  suggestion = 1
}

// @public (undocumented)
class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, ISuggestionsState> {
  constructor(suggestionsProps: ISuggestionsProps<T>);
  // (undocumented)
  protected _forceResolveButton: React.RefObject<IButton>;
  // (undocumented)
  protected _searchForMoreButton: React.RefObject<IButton>;
  // (undocumented)
  protected _selectedElement: React.RefObject<HTMLDivElement>;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  executeSelectedAction(): void;
  // (undocumented)
  focusAboveSuggestions(): void;
  // (undocumented)
  focusBelowSuggestions(): void;
  // (undocumented)
  focusSearchForMoreButton(): void;
  // (undocumented)
  hasSuggestedAction(): boolean;
  // (undocumented)
  hasSuggestedActionSelected(): boolean;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  scrollSelected(): void;
  tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
}

// @public
class SuggestionsControl<T> extends BaseComponent<ISuggestionsControlProps<T>, ISuggestionsControlState<T>> {
  constructor(suggestionsProps: ISuggestionsControlProps<T>);
  // (undocumented)
  protected _forceResolveButton: IButton;
  // (undocumented)
  protected _renderSuggestions(): JSX.Element;
  // (undocumented)
  protected _searchForMoreButton: IButton;
  // (undocumented)
  protected _selectedElement: HTMLDivElement;
  // (undocumented)
  protected _suggestions: SuggestionsCore<T>;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: ISuggestionsControlProps<T>): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  readonly currentSuggestion: ISuggestionModel<T>;
  // (undocumented)
  readonly currentSuggestionIndex: number;
  // (undocumented)
  executeSelectedAction(): void;
  handleKeyDown(keyCode: number): boolean;
  // (undocumented)
  hasSelection(): boolean;
  // (undocumented)
  hasSuggestionSelected(): boolean;
  // (undocumented)
  removeSuggestion(index?: number): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  protected renderFooterItems(): JSX.Element | null;
  // (undocumented)
  protected renderHeaderItems(): JSX.Element | null;
  protected resetSelectedItem(): void;
  // (undocumented)
  scrollSelected(): void;
  // (undocumented)
  readonly selectedElement: HTMLDivElement | undefined;
  protected selectFirstItem(): void;
  protected selectLastItem(): void;
  protected selectNextItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
  protected selectPreviousItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
}

// @public (undocumented)
class SuggestionsController<T> {
  constructor();
  // (undocumented)
  convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
  // (undocumented)
  createGenericSuggestion(itemToConvert: ISuggestionModel<T> | T): void;
  // (undocumented)
  currentIndex: number;
  // (undocumented)
  currentSuggestion: ISuggestionModel<T> | undefined;
  // (undocumented)
  deselectAllSuggestions(): void;
  // (undocumented)
  getCurrentItem(): ISuggestionModel<T>;
  // (undocumented)
  getSuggestionAtIndex(index: number): ISuggestionModel<T>;
  // (undocumented)
  getSuggestions(): ISuggestionModel<T>[];
  // (undocumented)
  hasSelectedSuggestion(): boolean;
  nextSuggestion(): boolean;
  previousSuggestion(): boolean;
  // (undocumented)
  removeSuggestion(index: number): void;
  // (undocumented)
  setSelectedSuggestion(index: number): void;
  // (undocumented)
  suggestions: ISuggestionModel<T>[];
  // (undocumented)
  updateSuggestions(newSuggestions: T[], selectedIndex?: number): void;
}

// @public
class SuggestionsCore<T> extends BaseComponent<ISuggestionsCoreProps<T>, {}> {
  constructor(suggestionsProps: ISuggestionsCoreProps<T>);
  // (undocumented)
  protected _selectedElement: HTMLDivElement;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  currentIndex: number;
  // (undocumented)
  currentSuggestion: ISuggestionModel<T> | undefined;
  // (undocumented)
  deselectAllSuggestions(): void;
  // (undocumented)
  getCurrentItem(): ISuggestionModel<T>;
  // (undocumented)
  getSuggestionAtIndex(index: number): ISuggestionModel<T>;
  // (undocumented)
  hasSuggestionSelected(): boolean;
  nextSuggestion(): boolean;
  previousSuggestion(): boolean;
  // (undocumented)
  removeSuggestion(index: number): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  scrollSelected(): void;
  // (undocumented)
  readonly selectedElement: HTMLDivElement | undefined;
  // (undocumented)
  setSelectedSuggestion(index: number): void;
}

// @public (undocumented)
class SuggestionsHeaderFooterItem extends BaseComponent<ISuggestionsHeaderFooterItemProps, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
class SuggestionsStore<T> {
  constructor();
  // (undocumented)
  convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
  // (undocumented)
  getSuggestionAtIndex(index: number): ISuggestionModel<T>;
  // (undocumented)
  getSuggestions(): ISuggestionModel<T>[];
  // (undocumented)
  removeSuggestion(index: number): void;
  // (undocumented)
  suggestions: ISuggestionModel<T>[];
  // (undocumented)
  updateSuggestions(newSuggestions: T[]): void;
}

// @public (undocumented)
class SwatchColorPickerBase extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState>, implements ISwatchColorPicker {
  constructor(props: ISwatchColorPickerProps);
  // (undocumented)
  componentWillReceiveProps(newProps: ISwatchColorPickerProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: ISwatchColorPickerProps;
  // (undocumented)
  render(): JSX.Element | null;
}

// @public (undocumented)
class TagPickerBase extends BasePicker<ITag, ITagPickerProps> {
  // (undocumented)
  static defaultProps: {
    onRenderItem: (props: ITagItemProps) => JSX.Element;
    onRenderSuggestionsItem: (props: ITag) => JSX.Element;
  }
}

// @public (undocumented)
class TeachingBubbleBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
  constructor(props: ITeachingBubbleProps);
  // (undocumented)
  static defaultProps: {
    calloutProps: {
      beakWidth: number;
      directionalHint: 12;
      doNotLayer: boolean;
      gapSpace: number;
      setInitialFocus: boolean;
    }
  }
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  rootElement: React.RefObject<HTMLDivElement>;
}

// @public (undocumented)
class TeachingBubbleContentBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
  constructor(props: ITeachingBubbleProps);
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: {
    hasCondensedHeadline: boolean;
    imageProps: {
      height: number;
      imageFit: ImageFit;
      width: number;
    }
  }
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  rootElement: React.RefObject<HTMLDivElement>;
}

// @public (undocumented)
class TextFieldBase extends BaseComponent<ITextFieldProps, ITextFieldState>, implements ITextField {
  constructor(props: ITextFieldProps);
  blur(): void;
  // (undocumented)
  componentDidMount(): void;
  // (undocumented)
  componentDidUpdate(): void;
  // (undocumented)
  componentWillReceiveProps(newProps: ITextFieldProps): void;
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: ITextFieldProps;
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
  select(): void;
  readonly selectionEnd: number | null;
  readonly selectionStart: number | null;
  setSelectionEnd(value: number): void;
  setSelectionRange(start: number, end: number): void;
  setSelectionStart(value: number): void;
  readonly value: string | undefined;
}

// @public (undocumented)
class ThemeGenerator {
  // (undocumented)
  static getThemeAsCode(slotRules: IThemeRules): any;
  // (undocumented)
  static getThemeAsJson(slotRules: IThemeRules): any;
  // (undocumented)
  static getThemeAsSass(slotRules: IThemeRules): any;
  // (undocumented)
  static getThemeForPowerShell(slotRules: IThemeRules): any;
  // (undocumented)
  static insureSlots(slotRules: IThemeRules, isInverted: boolean): void;
  // (undocumented)
  static setSlot(rule: IThemeSlotRule, color: string | IColor, isInverted?: boolean, isCustomization?: boolean, overwriteCustomColor?: boolean): void;
}

// @public (undocumented)
export function themeRulesStandardCreator(): IThemeRules;

// @public (undocumented)
class ToggleBase extends BaseComponent<IToggleProps, IToggleState>, implements IToggle {
  constructor(props: IToggleProps);
  readonly checked: boolean;
  // (undocumented)
  componentWillReceiveProps(newProps: IToggleProps): void;
  // (undocumented)
  focus(): void;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function toMatrix<T>(items: T[], columnCount: number): T[][];

// @public (undocumented)
class TooltipBase extends BaseComponent<ITooltipProps, any> {
  // (undocumented)
  static defaultProps: Partial<ITooltipProps>;
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
enum TooltipDelay {
  // (undocumented)
  long = 2,
  // (undocumented)
  medium = 1,
  // (undocumented)
  zero = 0
}

// @public (undocumented)
class TooltipHostBase extends BaseComponent<ITooltipHostProps, ITooltipHostState>, implements ITooltipHost {
  constructor(props: ITooltipHostProps);
  // (undocumented)
  componentWillUnmount(): void;
  // (undocumented)
  static defaultProps: {
    delay: TooltipDelay;
  }
  // (undocumented)
  dismiss: () => void;
  // (undocumented)
  render(): JSX.Element;
  // (undocumented)
  show: () => void;
}

// @public (undocumented)
enum TooltipOverflowMode {
  Parent = 0,
  Self = 1
}

// @public
export function unhoistMethods(source: any, methodNames: string[]): void;

// @public
export function unregisterIcons(iconNames: string[]): void;

// @public
export function updateA(color: IColor, a: number): IColor;

// @public
export function updateH(color: IColor, h: number): IColor;

// @public
export function updateRGB(color: IColor, component: keyof IRGB, value: number): IColor;

// @public
export function updateSV(color: IColor, s: number, v: number): IColor;

// @public
enum ValidationState {
  invalid = 2,
  valid = 0,
  warning = 1
}

// @public @deprecated (undocumented)
enum ValuePosition {
  // (undocumented)
  Next = 1,
  // (undocumented)
  Previous = 0
}

// @public
export function values<T>(obj: any): T[];

// @public (undocumented)
class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}>, implements IComboBox {
  // (undocumented)
  protected _onRenderList: (props: IComboBoxProps) => JSX.Element;
  // (undocumented)
  protected _onScrollToItem: (itemIndex: number) => void;
  // (undocumented)
  dismissMenu(): void;
  // (undocumented)
  focus(): boolean;
  // (undocumented)
  render(): JSX.Element;
}

// @public
export function warn(message: string): void;

// @public
export function warnConditionallyRequiredProps<P>(componentName: string, props: P, requiredProps: string[], conditionalPropName: string, condition: boolean): void;

// @public
export function warnDeprecations<P>(componentName: string, props: P, deprecationMap: ISettingsMap<P>): void;

// @public
export function warnMutuallyExclusive<P>(componentName: string, props: P, exclusiveMap: ISettingsMap<P>): void;

// @public (undocumented)
module ZIndexes {
  // (undocumented)
  Coachmark: number;

  // (undocumented)
  FocusStyle: number;

  // (undocumented)
  KeytipLayer: number;

  // (undocumented)
  Layer: number;

  // (undocumented)
  Nav: number;

  // (undocumented)
  ScrollablePane: number;

}

// WARNING: Unsupported export: Breadcrumb
// WARNING: Unsupported export: CommandButton
// WARNING: Unsupported export: FocusTrapCallout
// WARNING: Unsupported export: DirectionalHint
// WARNING: Unsupported export: DirectionalHint
// WARNING: Unsupported export: Check
// WARNING: Unsupported export: Checkbox
// WARNING: Unsupported export: ChoiceGroup
// WARNING: Unsupported export: ChoiceGroupOption
// WARNING: Unsupported export: OnFocusCallback
// WARNING: Unsupported export: OnChangeCallback
// WARNING: Unsupported export: Coachmark
// WARNING: Unsupported export: COACHMARK_ATTRIBUTE_NAME
// WARNING: Unsupported export: ICoachmarkTypes
// WARNING: Unsupported export: MAX_COLOR_SATURATION
// WARNING: Unsupported export: MAX_COLOR_HUE
// WARNING: Unsupported export: MAX_COLOR_VALUE
// WARNING: Unsupported export: MAX_COLOR_RGB
// WARNING: Unsupported export: MAX_COLOR_RGBA
// WARNING: Unsupported export: MAX_COLOR_ALPHA
// WARNING: Unsupported export: ColorPicker
// WARNING: Unsupported export: CommandBar
// WARNING: Unsupported export: ContextualMenu
// WARNING: Unsupported export: ContextualMenuItem
// WARNING: Unsupported export: DatePicker
// WARNING: Unsupported export: SELECTION_CHANGE
// WARNING: Unsupported export: IGroupedListStyleProps
// WARNING: Unsupported export: DetailsList
// WARNING: Unsupported export: IDetailsListStyleProps
// WARNING: Unsupported export: DetailsRow
// WARNING: Unsupported export: IDetailsRowStyleProps
// WARNING: Unsupported export: DetailsRowCheck
// WARNING: Unsupported export: IDetailsRowCheckStyleProps
// WARNING: Unsupported export: Dialog
// WARNING: Unsupported export: DialogContent
// WARNING: Unsupported export: DialogFooter
// WARNING: Unsupported export: VerticalDivider
// WARNING: Unsupported export: DocumentCard
// WARNING: Unsupported export: DocumentCardActions
// WARNING: Unsupported export: DocumentCardActivity
// WARNING: Unsupported export: DocumentCardDetails
// WARNING: Unsupported export: DocumentCardLocation
// WARNING: Unsupported export: DocumentCardPreview
// WARNING: Unsupported export: DocumentCardImage
// WARNING: Unsupported export: DocumentCardTitle
// WARNING: Unsupported export: DocumentCardLogo
// WARNING: Unsupported export: DocumentCardStatus
// WARNING: Unsupported export: Dropdown
// WARNING: Unsupported export: IDropdownStyleProps
// WARNING: Unsupported export: people
// WARNING: Unsupported export: mru
// WARNING: Unsupported export: groupOne
// WARNING: Unsupported export: groupTwo
// WARNING: Unsupported export: Fabric
// WARNING: Unsupported export: Facepile
// WARNING: Unsupported export: FocusZoneTabbableElements
// WARNING: Unsupported export: FocusZoneTabbableElements
// WARNING: Unsupported export: Grid
// WARNING: Unsupported export: IGroupHeaderStyleProps
// WARNING: Unsupported export: IGroupFooterStyleProps
// WARNING: Unsupported export: IGroupShowAllStyleProps
// WARNING: Unsupported export: GroupSpacer
// WARNING: Unsupported export: GroupedList
// WARNING: Unsupported export: GroupHeader
// WARNING: Unsupported export: GroupFooter
// WARNING: Unsupported export: GroupShowAll
// WARNING: Unsupported export: IGroupSpacerStyleProps
// WARNING: Unsupported export: HoverCard
// WARNING: Unsupported export: ExpandingCard
// WARNING: Unsupported export: PlainCard
// WARNING: Unsupported export: Icon
// WARNING: Unsupported export: Image
// WARNING: Unsupported export: KeytipLayer
// WARNING: Unsupported export: Label
// WARNING: Unsupported export: Layer
// WARNING: Unsupported export: ILayerBaseState
// WARNING: Unsupported export: Link
// WARNING: Unsupported export: ScrollToMode
// WARNING: Unsupported export: ScrollToMode
// WARNING: Unsupported export: MarqueeSelection
// WARNING: Unsupported export: MessageBar
// WARNING: Unsupported export: Modal
// WARNING: Unsupported export: IModalStyleProps
// WARNING: Unsupported export: Nav
// WARNING: Unsupported export: OverflowSet
// WARNING: Unsupported export: IOverflowSetStyleProps
// WARNING: Unsupported export: Overlay
// WARNING: Unsupported export: Panel
// WARNING: Unsupported export: Persona
// WARNING: Unsupported export: PersonaCoin
// WARNING: Unsupported export: sizeBoolean
// WARNING: Unsupported export: sizeToPixels
// WARNING: Unsupported export: presenceBoolean
// WARNING: Unsupported export: ISuggestionsStyleProps
// WARNING: Unsupported export: ISuggestionsItemStyleProps
// WARNING: Unsupported export: IPickerAriaIds
// WARNING: Unsupported export: IBasePickerStyleProps
// WARNING: Unsupported export: NormalPeoplePicker
// WARNING: Unsupported export: CompactPeoplePicker
// WARNING: Unsupported export: ListPeoplePicker
// WARNING: Unsupported export: IPeoplePickerItemSelectedStyleProps
// WARNING: Unsupported export: IPeoplePickerItemSuggestionStyleProps
// WARNING: Unsupported export: PeoplePickerItemBase
// WARNING: Unsupported export: PeoplePickerItem
// WARNING: Unsupported export: PeoplePickerItemSuggestionBase
// WARNING: Unsupported export: PeoplePickerItemSuggestion
// WARNING: Unsupported export: TagPicker
// WARNING: Unsupported export: ITagItemStyleProps
// WARNING: Unsupported export: ITagItemSuggestionStyleProps
// WARNING: Unsupported export: TagItemBase
// WARNING: Unsupported export: TagItem
// WARNING: Unsupported export: TagItemSuggestionBase
// WARNING: Unsupported export: TagItemSuggestion
// WARNING: Unsupported export: Pivot
// WARNING: Unsupported export: IPivotStyleProps
// WARNING: Unsupported export: IPositioningContainerTypes
// WARNING: Unsupported export: ProgressIndicator
// WARNING: Unsupported export: Rating
// WARNING: Unsupported export: ResizeGroup
// WARNING: Unsupported export: getMeasurementCache
// WARNING: Unsupported export: getNextResizeGroupStateProvider
// WARNING: Unsupported export: ScrollablePane
// WARNING: Unsupported export: ScrollbarVisibility
// WARNING: Unsupported export: ScrollbarVisibility
// WARNING: Unsupported export: SearchBox
// WARNING: Unsupported export: Shimmer
// WARNING: Unsupported export: ShimmerLine
// WARNING: Unsupported export: IShimmerLineStyleProps
// WARNING: Unsupported export: ShimmerCircle
// WARNING: Unsupported export: IShimmerCircleStyleProps
// WARNING: Unsupported export: ShimmerGap
// WARNING: Unsupported export: IShimmerGapStyleProps
// WARNING: Unsupported export: ShimmerElementsGroup
// WARNING: Unsupported export: ShimmeredDetailsList
// WARNING: Unsupported export: Slider
// WARNING: Unsupported export: ISliderStyleProps
// WARNING: Unsupported export: Spinner
// WARNING: Unsupported export: SpinnerLabelPosition
// WARNING: Unsupported export: AnimationClassNames
// WARNING: Unsupported export: FontClassNames
// WARNING: Unsupported export: ColorClassNames
// WARNING: Unsupported export: AnimationStyles
// WARNING: Unsupported export: AnimationVariables
// WARNING: Unsupported export: DefaultPalette
// WARNING: Unsupported export: DefaultFontStyles
// WARNING: Unsupported export: hiddenContentStyle
// WARNING: Unsupported export: PulsingBeaconAnimationStyles
// WARNING: Unsupported export: GlobalClassNames
// WARNING: Unsupported export: ThemeSettingName
// WARNING: Unsupported export: HighContrastSelector
// WARNING: Unsupported export: HighContrastSelectorWhite
// WARNING: Unsupported export: HighContrastSelectorBlack
// WARNING: Unsupported export: ScreenWidthMinSmall
// WARNING: Unsupported export: ScreenWidthMinMedium
// WARNING: Unsupported export: ScreenWidthMinLarge
// WARNING: Unsupported export: ScreenWidthMinXLarge
// WARNING: Unsupported export: ScreenWidthMinXXLarge
// WARNING: Unsupported export: ScreenWidthMinXXXLarge
// WARNING: Unsupported export: ScreenWidthMaxSmall
// WARNING: Unsupported export: ScreenWidthMaxMedium
// WARNING: Unsupported export: ScreenWidthMaxLarge
// WARNING: Unsupported export: ScreenWidthMaxXLarge
// WARNING: Unsupported export: ScreenWidthMaxXXLarge
// WARNING: Unsupported export: ScreenWidthMinUhfMobile
// WARNING: Unsupported export: normalize
// WARNING: Unsupported export: noWrap
// WARNING: Unsupported export: IPartialTheme
// WARNING: Unsupported export: ISchemeNames
// WARNING: Unsupported export: IFontWeight
// WARNING: Unsupported export: IStyle
// WARNING: Unsupported export: IStyleSet
// WARNING: Unsupported export: IProcessedStyleSet
// WARNING: Unsupported export: InjectionMode
// WARNING: Unsupported export: InjectionMode
// WARNING: Unsupported export: SwatchColorPicker
// WARNING: Unsupported export: ColorPickerGridCell
// WARNING: Unsupported export: TeachingBubble
// WARNING: Unsupported export: ITeachingBubbleStyleProps
// WARNING: Unsupported export: TeachingBubbleContent
// WARNING: Unsupported export: TextField
// WARNING: Unsupported export: ITextFieldStyleProps
// WARNING: Unsupported export: DEFAULT_MASK_CHAR
// WARNING: Unsupported export: Toggle
// WARNING: Unsupported export: Tooltip
// WARNING: Unsupported export: TooltipHost
// WARNING: Unsupported export: IStyleFunctionOrObject
// WARNING: Unsupported export: ICancelable
// WARNING: Unsupported export: Settings
// WARNING: Unsupported export: SettingsFunction
// WARNING: Unsupported export: CustomizerContext
// WARNING: Unsupported export: ICustomizerProps
// WARNING: Unsupported export: IClassNames
// WARNING: Unsupported export: IComponentAsProps
// WARNING: Unsupported export: IComponentAs
// WARNING: Unsupported export: IStyleFunction
// WARNING: Unsupported export: KeyCodes
// WARNING: Unsupported export: KeyCodes
// WARNING: Unsupported export: IRefObject
// WARNING: Unsupported export: RefObject
// WARNING: Unsupported export: ICssInput
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
