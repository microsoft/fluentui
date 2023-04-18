import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { ARIAGlobalStatesAndProperties } from '@microsoft/fast-foundation';

/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export class Select extends FASTElement {
  constructor() {
    super();
    Object.assign(this, new ARIAGlobalStatesAndProperties()); // Assigns ARIA global states and properties to the element
  }

  // Attributes
  /**
   * The optional label of the select
   *
   * @public
   * @remarks
   * HTML Attribute: label
   */
  @attr
  public label?: string;

  /**
   * The autofocus attribute of the select
   *
   * @public
   * @remarks
   * HTML Attribute: autofocus
   */
  @attr({ attribute: 'autofocus', mode: 'boolean' })
  public autofocusAttr?: boolean;

  /**
   * The autocomplete attribute of the select
   *
   * @public
   * @remarks
   * HTML Attribute: autocomplete
   */
  @attr
  public autocomplete?: string;

  /**
   * The disabled state of the select
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  // Observables
  /**
   * The options of the select
   *
   * @public
   */
  @observable
  public options: HTMLOptionElement[] = [];

  /**
   * A boolean value that triggers an input event
   *
   * @public
   */
  @observable
  public inputEventTrigger: boolean = false;

  /**
   * A boolean value that triggers a change event
   *
   * @public
   */
  @observable
  public changeEventTrigger: boolean = false;

  // Events
  private changeEvent: Event = new Event('change');
  private inputEvent: Event = new Event('input');

  // Getters and setters
  // Returns the select element
  public get selectElement(): HTMLSelectElement | null {
    return this.shadowRoot?.querySelector('select') ?? null;
  }

  // Returns the index of the selected option
  public get selectedIndex(): number {
    return this.selectElement ? this.selectElement.selectedIndex : 0;
  }

  // Sets the index of the selected option
  public set selectedIndex(value: number) {
    if (this.selectElement) {
      this.selectElement.selectedIndex = value;
    }
  }

  // Returns the value of the selected option
  public get value(): string {
    return this.selectElement ? this.selectElement.value : '';
  }

  // Sets the value of the selected option
  public set value(value: string) {
    if (this.selectElement) {
      this.selectElement.value = value;
    }
  }

  // Returns the number of options in the select element
  public get length(): number {
    return this.selectElement ? this.selectElement.length : 0;
  }

  // Methods
  public handleChange(): void {
    this.dispatchEvent(this.changeEvent);
  }

  public handleInput(): void {
    this.dispatchEvent(this.inputEvent);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.selectElement) {
      this.selectElement.addEventListener('change', this.handleChange.bind(this)); // Adds a change event listener to the select element
      this.selectElement.addEventListener('input', this.handleInput.bind(this)); // Adds an input event listener to the select element
      this.setOptions();
    }
  }

  // Sets the options of the select element
  private setOptions(): void {
    this.options = [...this.querySelectorAll('option')] as HTMLOptionElement[];
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Remove events from Select element
    if (this.selectElement) {
      this.selectElement.removeEventListener('change', this.handleChange.bind(this));
      this.selectElement.removeEventListener('input', this.handleInput.bind(this));
    }
  }

  // Adds an option to the select element
  public add(option: HTMLOptionElement, index?: number | null): void {
    if (this.selectElement) {
      this.selectElement.add(option, index);
    }
  }

  // Removes an option from the select element
  public removeOption(index: number): void {
    if (this.selectElement) {
      this.selectElement.remove(index);
    }
  }

  public handleSlotChange() {
    // Sets the options of the select element
    this.setOptions();
  }

  // Dispatches an input event when the inputEventTrigger property changes
  inputEventTriggerChanged(): void {
    this.dispatchEvent(new Event('input'));
  }

  // Dispatches a change event when the changeEventTrigger property changes
  changeEventTriggerChanged(): void {
    this.dispatchEvent(new Event('change'));
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Select extends ARIAGlobalStatesAndProperties {}
// applyMixins(Select, [ARIAGlobalStatesAndProperties]);
