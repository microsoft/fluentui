import { attr, FASTElement, observable, Observable } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { ARIAGlobalStatesAndProperties, StartEnd } from '../patterns/index.js';
import type { StartEndOptions } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';

/**
 * Listbox option configuration options
 * @public
 */
export type ListboxOptionOptions = StartEndOptions<FASTListboxOption>;

/**
 * Determines if the element is a {@link (FASTListboxOption:class)}
 *
 * @param element - the element to test.
 * @public
 */
export function isListboxOption(el: Element): el is FASTListboxOption {
  return isHTMLElement(el) && ((el.getAttribute('role') as string) === 'option' || el instanceof HTMLOptionElement);
}

/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA option }.
 *
 * @slot start - Content which can be provided before the listbox option content
 * @slot end - Content which can be provided after the listbox option content
 * @slot - The default slot for listbox option content
 * @csspart content - Wraps the listbox option content
 *
 * @public
 */
export class FASTListboxOption extends FASTElement {
  /**
   * @internal
   */
  private _value: string;

  /**
   * @internal
   */
  public proxy: HTMLOptionElement;

  /**
   * The checked state is used when the parent listbox is in multiple selection mode.
   * To avoid accessibility conflicts, the checked state should not be present in
   * single selection mode.
   *
   * @public
   */
  @observable
  public checked?: boolean;

  /**
   * Updates the ariaChecked property when the checked property changes.
   *
   * @param prev - the previous checked value
   * @param next - the current checked value
   *
   * @public
   */
  protected checkedChanged(prev: boolean | unknown, next?: boolean): void {
    if (typeof next === 'boolean') {
      this.ariaChecked = next ? 'true' : 'false';
      return;
    }

    this.ariaChecked = null;
  }

  /**
   * The default slotted content.
   *
   * @public
   */
  @observable
  public content: Node[];

  /**
   * Updates the proxy's text content when the default slot changes.
   * @param prev - the previous content value
   * @param next - the current content value
   *
   * @internal
   */
  protected contentChanged(prev: undefined | Node[], next: Node[]): void {
    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.textContent = this.textContent;
    }

    this.$emit('contentchange', null, { bubbles: true });
  }

  /**
   * The defaultSelected state of the option.
   * @public
   */
  @observable
  public defaultSelected: boolean = false;
  protected defaultSelectedChanged(): void {
    if (!this.dirtySelected) {
      this.selected = this.defaultSelected;

      if (this.proxy instanceof HTMLOptionElement) {
        this.proxy.selected = this.defaultSelected;
      }
    }
  }

  /**
   * Tracks whether the "selected" property has been changed.
   * @internal
   */
  private dirtySelected: boolean = false;

  /**
   * The disabled state of the option.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean;
  protected disabledChanged(prev: boolean, next: boolean): void {
    this.ariaDisabled = this.disabled ? 'true' : 'false';

    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.disabled = this.disabled;
    }
  }

  /**
   * The selected attribute value. This sets the initial selected value.
   *
   * @public
   * @remarks
   * HTML Attribute: selected
   */
  @attr({ attribute: 'selected', mode: 'boolean' })
  public selectedAttribute: boolean;
  protected selectedAttributeChanged(): void {
    this.defaultSelected = this.selectedAttribute;

    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.defaultSelected = this.defaultSelected;
    }
  }

  /**
   * The checked state of the control.
   *
   * @public
   */
  @observable
  public selected: boolean = this.defaultSelected;
  protected selectedChanged(): void {
    this.ariaSelected = this.selected ? 'true' : 'false';

    if (!this.dirtySelected) {
      this.dirtySelected = true;
    }

    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.selected = this.selected;
    }
  }

  /**
   * Track whether the value has been changed from the initial value
   */
  public dirtyValue: boolean = false;

  /**
   * The initial value of the option. This value sets the `value` property
   * only when the `value` property has not been explicitly set.
   *
   * @remarks
   * HTML Attribute: value
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  protected initialValue: string;
  public initialValueChanged(previous: string, next: string): void {
    // If the value is clean and the component is connected to the DOM
    // then set value equal to the attribute value.
    if (!this.dirtyValue) {
      this.value = this.initialValue;
      this.dirtyValue = false;
    }
  }

  public get label() {
    return this.value ?? this.text;
  }

  public get text(): string {
    return this.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  }

  public set value(next: string) {
    const newValue = `${next ?? ''}`;
    this._value = newValue;

    this.dirtyValue = true;

    if (this.proxy instanceof HTMLOptionElement) {
      this.proxy.value = newValue;
    }

    Observable.notify(this, 'value');
  }

  public get value(): string {
    Observable.track(this, 'value');
    return this._value ?? this.text;
  }

  public get form(): HTMLFormElement | null {
    return this.proxy ? this.proxy.form : null;
  }

  public constructor(text?: string, value?: string, defaultSelected?: boolean, selected?: boolean) {
    super();

    if (text) {
      this.textContent = text;
    }

    if (value) {
      this.initialValue = value;
    }

    if (defaultSelected) {
      this.defaultSelected = defaultSelected;
    }

    if (selected) {
      this.selected = selected;
    }

    this.proxy = new Option(`${this.textContent}`, this.initialValue, this.defaultSelected, this.selected);
    this.proxy.disabled = this.disabled;
  }
}

/**
 * States and properties relating to the ARIA `option` role.
 *
 * @public
 */
export class DelegatesARIAListboxOption {
  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
   * @public
   * @remarks
   * HTML Attribute: `aria-checked`
   */
  @observable
  public ariaChecked: 'true' | 'false' | string | null;

  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
   * @public
   * @remarks
   * HTML Attribute: `aria-posinset`
   */
  @observable
  public ariaPosInSet: string | null;

  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
   * @public
   * @remarks
   * HTML Attribute: `aria-selected`
   */
  @observable
  public ariaSelected: 'true' | 'false' | string | null;

  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
   * @public
   * @remarks
   * HTML Attribute: `aria-setsize`
   */
  @observable
  public ariaSetSize: string | null;
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export interface DelegatesARIAListboxOption extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIAListboxOption, ARIAGlobalStatesAndProperties);

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export interface FASTListboxOption extends StartEnd, DelegatesARIAListboxOption {}
applyMixins(FASTListboxOption, StartEnd, DelegatesARIAListboxOption);
