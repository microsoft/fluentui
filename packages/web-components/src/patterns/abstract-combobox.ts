import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

import type { Option } from '../option/option.js';
import { toggleState } from '../utils/element-internals.js';
import { AbstractListbox } from './abstract-listbox.js';

const SUPPORTS_ANCHOR_POSITIONING = CSS.supports('anchor-name: --a');

enum ListboxAction {
  MOVE_TO_NEXT = 0,
  MOVE_TO_PREV = 1,
  MOVE_TO_FIRST = 2,
  MOVE_TO_LAST = 3,
  DISMISS = 4,
  SELECT = 5,
}

export abstract class AbstractCombobox extends FASTElement {
  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  protected anchorId = uniqueId('fluent-anchor-');
  protected anchorPositioningStyleSheet?: CSSStyleSheet;
  protected anchorPositioningStyleElement?: HTMLStyleElement;

  @observable
  protected isExpanded = false;
  protected isExpandedChanged() {
    this.elementInternals.ariaExpanded = this.isExpanded.toString();
  }

  protected get isFocusVisible(): boolean {
    return this.matches(':focus-visible');
  }

  @observable
  protected activeOption?: Option;
  protected activeOptionChanged(prev: Option | undefined, next: Option | undefined) {
    if (prev) {
      prev.active = false;
    }

    if (next && this.isFocusVisible) {
      next.active = true;
      next.scrollIntoView({ block: 'nearest' });
    }

    this.setAttribute('aria-activedescendant', next ? next.id : '');
  }

  private clickListener?: (event: PointerEvent | MouseEvent) => void;
  private keydownListener?: (event: KeyboardEvent) => void;
  // @ts-expect-error Popover API
  private listboxToggleListener?: (event: ToggleEvent) => void;
  private listboxInputListener?: (event: Event) => void;
  private listboxKeydownListener?: (event: KeyboardEvent) => void;

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled = false;
  protected disabledChanged() {
    this.setDisabledSideEffect(this.disabled);
  }

  /**
   * The id of a form to associate the element to.
   *
   * @public
   * @remarks
   * HTML Attribute: `form`
   */
  @attr({ attribute: 'form' })
  public initialForm?: string;

  /**
   * The form element that’s associated to the element, or `null` if no form is associated.
   *
   * @public
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * A `NodeList` of `<label>` element associated with the element.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/labels | `labels`} property
   *
   * @public
   */
  public get labels(): NodeList {
    return this.elementInternals.labels;
  }

  /**
   * The number of Option elements associated with the element.
   *
   * @public
   */
  public get length(): number {
    return this.options?.length || 0;
  }

  /**
   * Associates the component with a DropdownList element. The value references the DropdownList
   * element’s ID.
   *
   * @public
   * @remarks
   * HTML Attribute: `list`
   */
  @attr
  public list?: string;
  protected listChanged(prev: string | undefined) {
    if (prev) {
      const prevListElement = document.getElementById(prev);
      if (prevListElement && prevListElement instanceof AbstractListbox) {
        this.unbindListboxEvents(prevListElement);
      }
    }

    if (this.listElement) {
      this.connectListbox();
    }
  }

  /**
   * The associated DropdownList element.
   *
   * @public
   */
  public get listElement(): null | AbstractListbox {
    if (!this.list || typeof this.list !== 'string') {
      return null;
    }

    const el = document.getElementById(this.list);

    return el instanceof AbstractListbox ? el : null;
  }

  /**
   * Whether multiple options can be selected.
   *
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple = false;
  protected multipleChanged() {
    if (!this.listElement) {
      return;
    }
    this.listElement.multiple = this.multiple;
  }

  /**
   * The name of the element. This element's value will be surfaced during form submission under the provided name.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;
  protected nameChanged() {
    for (const option of this.options) {
      if (option.name) {
        continue;
      }
      option.name = this.name || '';
    }
  }

  /**
   * An array of Option elements. It’s shortcut to the Listbox element’s
   * `.options` property.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/options | `HTMLSelectElement.prototype.options`}
   *
   * @public
   */
  public get options(): Option[] {
    return this.listElement?.options ?? [];
  }

  /**
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/placeholder | `placeholder`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `placeholder`
   * This attribute is not a valid substitute for a label.
   */
  @attr
  public placeholder?: string;
  protected placeholderChanged() {
    this.togglePlaceholderVisibleState();
  }

  /**
   * When true, the control will be immutable by user interaction.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/readonly | `readonly`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `readonly`
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly = false;
  protected readOnlyChanged() {
    this.elementInternals.ariaReadOnly = `${!!this.readOnly}`;
    this.setValidity();
  }

  /**
   * The element's required attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required = false;
  protected requiredChanged() {
    this.elementInternals.ariaRequired = `${!!this.required}`;
    this.setValidity();
  }

  /**
   * The index of the first selected Option element, otherwise returns `-1`.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex | `HTMLSelectElement.prototype.selectedIndex`}
   *
   * @public
   */
  @observable
  public get selectedIndex(): number {
    if (this.selectedOptions?.length) {
      return this.options.indexOf(this.selectedOptions[0]);
    }
    return -1;
  }
  public set selectedIndex(index: number) {
    if (Number.isInteger(index) && index >= 0 && index < this.options.length) {
      this.value = this.options[index].value;
    }
  }

  /**
   * An array of selected Option elements.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions | `HTMLSelectElement.prototype.selectedOptions`}
   *
   * @public
   */
  public get selectedOptions(): Option[] {
    return this.options.filter(option => option.selected);
  }

  @observable
  protected selectedLabels: string[] = [];
  protected selectedLabelsChanged() {
    this.togglePlaceholderVisibleState();
    this.setValidity();
    this.$emit('change');
    this.$emit('input');
  }

  /**
   * The element’s type. It returns `select-multiple` if `multiple` is `true`,
   * otherwise `select-one`.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/type | `HTMLSelectElement.prototype.type`}
   *
   * @public
   */
  public get type(): string {
    return `select-${this.multiple ? 'multiple' : 'one'}`;
  }

  /**
   * The value of the first selected Option element, otherwise returns an empty
   * string.
   *
   * @public
   */
  public get value(): string {
    return this.selectedOptions?.[0]?.value ?? '';
  }
  public set value(next: string) {
    if (!this.$fastController.isConnected || this.disabled || this.readOnly) {
      return;
    }

    const option = this.options.find(option => option.value === next);
    if (option && !option.disabled && !option.selected) {
      option.click();
    }
  }

  /**
   * The element's validity state.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validity | `ElementInternals.validity`} property.
   */
  public get validity(): ValidityState {
    return this.elementInternals.validity;
  }

  /**
   * The validation message.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validationMessage | `ElementInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    return '';
    // TODO
    // return this.elementInternals.validationMessage || this.controlEl.validationMessage;
  }

  /**
   * Determines if the control can be submitted for constraint validation.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/willValidate | `ElementInternals.willValidate`} property.
   */
  public get willValidate(): boolean {
    return this.elementInternals.willValidate;
  }

  constructor() {
    super();

    this.elementInternals.role = 'combobox';
    this.elementInternals.ariaExpanded = 'false';
  }

  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();

    this.bindEvents();
    this.bindListboxEvents();
    this.connectListbox();
    this.togglePlaceholderVisibleState();
    this.setValidity();
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    this.unbindEvents();
    this.unbindListboxEvents();
  }

  /**
   * @internal
   */
  formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
  }

  /**
   * Open the DropdownList.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/showPicker | `HTMLSelectElement.prototype.showPicker`}
   *
   * @public
   */
  public showPicker() {
    this.toggleListbox(true);
  }

  /**
   * Checks the validity of the element and returns the result.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/checkValidity | `HTMLInputElement.checkValidity()`} method.
   */
  public checkValidity(): boolean {
    return this.elementInternals.checkValidity();
  }

  /**
   * Reports the validity of the element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/reportValidity | `HTMLInputElement.reportValidity()`} method.
   */
  public reportValidity(): boolean {
    return this.elementInternals.reportValidity();
  }

  /**
   * Sets the custom validity message.
   * @param message - The message to set
   *
   * @public
   */
  public setCustomValidity(message: string | null): void {
    this.setValidity({ customError: !!message }, message ? message.toString() : undefined);
    this.reportValidity();
  }

  /**
   * Sets the validity of the control.
   *
   * @param flags - Validity flags. If not provided, the control's `validity` will be used.
   * @param message - Optional message to supply. If not provided, the control's `validationMessage` will be used. If the control does not have a `validationMessage`, the message will be empty.
   * @param anchor - Optional anchor to use for the validation message. If not provided, the control will be used.
   *
   * @internal
   */
  public setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabled || this.readOnly) {
      this.elementInternals.setValidity({});
      return;
    }

    // TODO: add validation

    this.elementInternals.setValidity(
      flags ?? this.validity,
      message ?? this.validationMessage,
      anchor,
    );
  }

  protected connectListbox() {
    if (this.activeOption) {
      this.activeOption = undefined;
    }

    if (this.listElement) {
      this.setAttribute('aria-controls', this.listElement.id);
      this.setAnchorPositioningCSS();
      this.bindListboxEvents();
      this.listElement.multiple = this.multiple;
      this.updateSelectedLabels();
    }
  }

  protected bindEvents() {
    this.clickListener = this.handleClick.bind(this);
    this.addEventListener('click', this.clickListener);

    this.keydownListener = this.handleKeydown.bind(this);
    this.addEventListener('keydown', this.keydownListener);
  }

  protected unbindEvents() {
    if (this.clickListener) {
      this.removeEventListener('click', this.clickListener);
    }

    if (this.keydownListener) {
      this.removeEventListener('keydown', this.keydownListener);
    }
  }

  protected bindListboxEvents() {
    if (!this.listElement) {
      return;
    }

    this.listboxToggleListener = this.handleListboxToggle.bind(this);
    this.listElement.addEventListener('toggle', this.listboxToggleListener);

    this.listboxInputListener = this.handleListboxInput.bind(this);
    this.listElement.addEventListener('input', this.listboxInputListener);

    this.listboxKeydownListener = this.handleListboxKeydown.bind(this);
    this.listElement.addEventListener('keydown', this.listboxKeydownListener);
  }

  protected unbindListboxEvents(el?: AbstractListbox) {
    const target = el ?? this.listElement;

    if (!target) {
      return;
    }

    if (this.listboxToggleListener) {
      target.removeEventListener('toggle', this.listboxToggleListener);
    }

    if (this.listboxInputListener) {
      target.removeEventListener('input', this.listboxInputListener);
    }

    if (this.listboxKeydownListener) {
      target.removeEventListener('keydown', this.listboxKeydownListener);
    }
  }

  /**
   * TODO: If `.selectedOptions.size` is not 0 and none of the options is
   * currently in view, scroll the first selected option into view.
   */
  protected toggleListbox(force?: boolean) {
    if (this.disabled || !this.listElement) {
      return;
    }

    const next = force ?? !this.isExpanded;

    // @ts-expect-error Popover API
    this.listElement.togglePopover(next);
    this.isExpanded = next;

    if (!next) {
      return;
    }

    if (!this.activeOption) {
      this.activeOption = this.listElement.options?.[0];
    }

    if (this.activeOption) {
      this.activeOption.active = this.isFocusVisible;
      this.activeOption.scrollIntoView({ block: 'nearest' });
    }
  }

  private setAnchorPositioningCSS() {
    if (!this.listElement) {
      return;
    }

    this.dataset.anchorid = this.anchorId;
    const anchorName = `--${this.anchorId}`;

    const css = `
      [data-anchorid="${this.anchorId}"] {
        anchor-name: ${anchorName};
      }
      #${this.listElement.id} {
        left: anchor(${anchorName} left);
        top: anchor(${anchorName} bottom);
        right: anchor(${anchorName} right);
        position-try-fallbacks: flip-block;
      }
    `;

    if (SUPPORTS_ANCHOR_POSITIONING) {
      if (!this.anchorPositioningStyleSheet) {
        this.anchorPositioningStyleSheet = new CSSStyleSheet();
      }
      if (!document.adoptedStyleSheets.includes(this.anchorPositioningStyleSheet)) {
        document.adoptedStyleSheets.push(this.anchorPositioningStyleSheet);
      }
      this.anchorPositioningStyleSheet.replaceSync(css);
    } else {
      // Adding styles via CSSOM would remove unsupported properties and values,
      // therefore a CSS Anchor Positioning polyfill would not work. Hence we
      // add the Anchor Positioning CSS using a `<style>` element in unsupported
      // browsers.
      if (!this.anchorPositioningStyleElement) {
        this.anchorPositioningStyleElement = document.createElement('style');
        document.head.append(this.anchorPositioningStyleElement);
      }
      this.anchorPositioningStyleElement.textContent = css;
    }
  }

  private handleClick(evt: PointerEvent | MouseEvent) {
    // Avoid toggling the listbox if associated label is clicked.
    if ('pointerType' in evt && evt.pointerType === '') {
      return;
    }

    this.toggleListbox();
  }

  private handleKeydown(evt: KeyboardEvent) {
    if (this.disabled) {
      return true;
    }

    const action = this.getListboxAction(evt);

    switch (action) {
      case ListboxAction.DISMISS:
        this.toggleListbox(false);
        break;
      case ListboxAction.MOVE_TO_FIRST:
      case ListboxAction.MOVE_TO_LAST:
      case ListboxAction.MOVE_TO_PREV:
      case ListboxAction.MOVE_TO_NEXT:
        evt.preventDefault();
        if (!this.isExpanded) {
          this.toggleListbox(true);
        }
        this.moveActiveOption(action);
        break;
      case ListboxAction.SELECT:
        evt.preventDefault();
        if (!this.isExpanded) {
          this.toggleListbox(true);
          return;
        }
        if (!this.activeOption) {
          return;
        }
        if (!this.multiple && this.selectedOptions.includes(this.activeOption)) {
          this.toggleListbox(false);
          return;
        }
        this.activeOption.click();
        break;
    }
  }

  private getListboxAction(evt: KeyboardEvent): ListboxAction | null {
    const { key } = evt;

    switch (key) {
      case ' ':
      case 'Enter':
        return ListboxAction.SELECT;
      case 'Escape':
      case 'Tab':
        if (this.isExpanded) {
          return ListboxAction.DISMISS;
        }
        break;
      case 'ArrowUp':
        return ListboxAction.MOVE_TO_PREV;
      case 'ArrowDown':
        return ListboxAction.MOVE_TO_NEXT;
      case 'Home':
        return ListboxAction.MOVE_TO_FIRST;
      case 'End':
        return ListboxAction.MOVE_TO_LAST;
    }

    return null;
  }

  private moveActiveOption(action: ListboxAction) {
    if (!this.listElement) {
      return;
    }

    let index: number;
    const enabledOptions = this.listElement.options.filter(option => !option.disabled);
    const activeOptionIndex = this.activeOption ? enabledOptions.indexOf(this.activeOption) : -1;

    switch (action) {
      case ListboxAction.MOVE_TO_FIRST:
        index = 0;
        break;
      case ListboxAction.MOVE_TO_LAST:
        index = enabledOptions.length - 1;
        break;
      case ListboxAction.MOVE_TO_NEXT:
        index = activeOptionIndex + 1;
        break;
      case ListboxAction.MOVE_TO_PREV:
        index = activeOptionIndex - 1;
        break;
      default:
        return;
    }

    if (index < 0) {
      this.moveActiveOption(ListboxAction.MOVE_TO_FIRST);
      return;
    }
    if (index >= enabledOptions.length) {
      this.moveActiveOption(ListboxAction.MOVE_TO_LAST);
      return;
    }

    this.activeOption = enabledOptions[index];
  }

  protected setDisabledSideEffect(disabled: boolean) {
    if (!this.$fastController.isConnected) {
      return;
    }

    this.elementInternals.ariaDisabled = `${disabled}`;
    this.tabIndex = disabled ? -1 : 0;

    if (this.isExpanded && this.listElement) {
      this.toggleListbox(false);
    }

    this.setValidity();
  }

  // @ts-expect-error Popover API
  private handleListboxToggle(evt: ToggleEvent) {
    this.isExpanded = evt.newState === 'open';
  }

  private handleListboxKeydown(evt: KeyboardEvent) {
    this.focus();
    this.handleKeydown(evt);
  }

  private handleListboxInput(evt: Event) {
    const target = evt.target as Option;
    this.activeOption = target;

    if (!this.multiple) {
      for (const option of this.selectedOptions) {
        if (option === this.activeOption) {
          continue;
        }
        option.selected = false;
      }

      this.toggleListbox(false);
    }

    this.updateSelectedLabels();
  }

  protected updateSelectedLabels() {
    this.selectedLabels = this.selectedOptions.map(option => option.label);
  }

  protected togglePlaceholderVisibleState() {
    toggleState(this.elementInternals, 'placeholder-visible', this.selectedOptions.length === 0 && !!this.placeholder);
  }
}
