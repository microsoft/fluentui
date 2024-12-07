import { attr, FASTElement, Notifier, Observable, observable } from '@microsoft/fast-element';
import type { BaseDropdown } from '../dropdown/dropdown.js';
import { isDropdown } from '../dropdown/dropdown.options.js';
import type { Option } from '../option/option.js';
import { isOption } from '../option/option.options.js';
import { AnchorPositioningCSSSupported, AnchorPositioningHTMLSupported } from '../utils/support.js';
import { toggleState } from '../utils/element-internals.js';
import { uniqueId } from '../utils/unique-id.js';

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#listbox | ARIA listbox } role.
 *
 * @slot default - The default slot for the options
 *
 * @remarks
 * The listbox component represents a list of options that can be selected.
 * It is intended to be used in conjunction with the {@link BaseDropdown | Dropdown} component.
 *
 * @public
 */
export class Listbox extends FASTElement {
  /**
   * Sets the listbox ID to a unique value if one is not provided.
   *
   * @override
   * @public
   * @remarks
   * HTML Attribute: `id`
   */
  @attr({ attribute: 'id', mode: 'fromView' })
  public override id: string = uniqueId('listbox-');

  /**
   * Indicates whether the listbox allows multiple selection.
   *
   * @public
   */
  @observable
  public multiple?: boolean;

  /**
   * The collection of all child options.
   *
   * @public
   */
  @observable
  public options!: Option[];

  /**
   * Updates the enabled options collection when properties on the child options change.
   *
   * @param prev - the previous options
   * @param next - the current options
   *
   * @internal
   */
  public optionsChanged(prev: Option[] | undefined, next: Option[] | undefined): void {
    next?.forEach((option, index) => {
      option.elementInternals.ariaPosInSet = `${index + 1}`;
      option.elementInternals.ariaSetSize = `${next.length}`;
    });
  }

  /**
   * The index of the first selected option, scoped to the enabled options.
   *
   * @internal
   */
  @observable
  public selectedIndex!: number;

  /**
   * Fallback style element for anchor positioning.
   * @internal
   */
  protected anchorPositioningStyleElement: HTMLStyleElement | null = null;

  /**
   * Reference to the parent dropdown element.
   * @internal
   */
  protected dropdown?: BaseDropdown;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * A collection of child options that are not disabled.
   *
   * @internal
   */
  public get enabledOptions(): Option[] {
    return this.options?.filter(x => !x.disabled) ?? [];
  }

  /**
   * Notifier for the listbox.
   * @internal
   */
  private notifier!: Notifier;

  /**
   * Notifier for the parent dropdown.
   * @internal
   */
  private parentNotifier!: Notifier;

  /**
   * The collection of child options that are selected.
   *
   * @public
   */
  public get selectedOptions(): Option[] {
    return this.options?.filter(x => x.selected) ?? [];
  }

  /**
   * Sets the `selected` state on a target option when clicked.
   *
   * @param e - The pointer event
   * @public
   */
  public clickHandler(e: PointerEvent): boolean | void {
    const target = e.target as HTMLElement;

    if (isOption(target)) {
      this.selectOption(this.enabledOptions.indexOf(target));
    }

    return true;
  }

  constructor() {
    super();

    this.elementInternals.role = 'listbox';

    this.notifier = Observable.getNotifier(this);
    this.notifier.subscribe(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (isDropdown(this.parentElement)) {
      this.dropdown = this.parentElement;
      this.parentNotifier = Observable.getNotifier(this.dropdown);
      this.parentNotifier.subscribe(this);

      this.popover = 'auto';
      this.addEventListener('beforetoggle', this.dropdown.beforetoggleListboxHandler as EventListener);

      for (const key of ['multiple', 'listboxSlot', 'listboxChildren']) {
        this.parentNotifier.notify(key);
      }
    }
  }

  disconnectedCallback(): void {
    this.parentNotifier?.unsubscribe(this);
    Observable.getNotifier(this).unsubscribe(this);

    this.popover = null;
    this.removeEventListener('beforetoggle', this.dropdown?.beforetoggleListboxHandler as EventListener);

    this.anchorPositioningStyleElement?.remove();

    super.disconnectedCallback();
  }

  /**
   * Handles observable subscriptions for the listbox.
   *
   * @param source - The source of the observed change
   * @param propertyName - The name of the property that changed
   *
   * @internal
   */
  handleChange(source: any, propertyName?: string): void {
    switch (propertyName) {
      case 'multiple': {
        this.multiple = source.multiple;
        this.elementInternals.ariaMultiSelectable = this.multiple ? 'true' : 'false';
        toggleState(this.elementInternals, 'multiple', this.multiple);
        this.options?.forEach(x => toggleState(x.elementInternals, 'multiple', this.multiple));

        break;
      }

      case 'listboxSlot': {
        if (this.dropdown) {
          this.dropdown.listbox = this;
          this.dropdown.listboxSlot.assign(this);
        }
        this.setAnchorPositioningFallbackStyles();
        break;
      }
    }
  }

  /**
   * Selects an option by index.
   *
   * @param index - The index of the option to select.
   * @public
   */
  public selectOption(index: number = this.selectedIndex): void {
    let selectedIndex = this.selectedIndex;

    if (!this.multiple) {
      this.enabledOptions.forEach((item, i) => {
        const shouldCheck = i === index;
        item.selected = shouldCheck;
        if (shouldCheck) {
          selectedIndex = i;
        }
      });
    } else {
      const option = this.enabledOptions[index];
      if (option) {
        option.selected = !option.selected;
      }
      selectedIndex = index;
    }

    this.selectedIndex = selectedIndex;
  }

  /**
   * Applies anchor positioning fallback styles.
   *
   * @internal
   */
  private setAnchorPositioningFallbackStyles(): void {
    if (this.dropdown) {
      // @ts-expect-error - Anchor positioning
      const anchorName = this.dropdown.style.anchorName || `--${this.id}`;

      if (AnchorPositioningCSSSupported) {
        if (!AnchorPositioningHTMLSupported) {
          this.dropdown.style.setProperty('anchor-name', anchorName);
          this.style.setProperty('position-anchor', anchorName);
        }
        return;
      }

      if ((window as any).CSS_ANCHOR_POLYFILL) {
        this.anchorPositioningStyleElement = this.anchorPositioningStyleElement ?? document.createElement('style');
        document.head.append(this.anchorPositioningStyleElement);

        this.anchorPositioningStyleElement.textContent = /* css */ `
          #${this.dropdown.id} {
            anchor-name: ${anchorName};
          }

          #${this.id} {
            position: absolute;
            position-anchor: ${anchorName};
            top: anchor(bottom);
            position-area: block-end span-inline-end;
            position-try-fallbacks: flip-inline, flip-block, block-start;
          }
        `;
        (window as any).CSS_ANCHOR_POLYFILL.call({ element: this.anchorPositioningStyleElement });
      }
    }
  }
}
