import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

import type { Option } from '../option/option.js';
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

  private _selectedOptions = new Set<Option>();

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

  public get selectedOptions(): Option[] {
    return Array.from(this._selectedOptions);
  }

  constructor() {
    super();

    this.elementInternals.role = 'combobox';
    this.elementInternals.ariaExpanded = 'false';
  }

  connectedCallback() {
    super.connectedCallback();

    this.bindEvents();
    this.bindListboxEvents();
    this.connectListbox();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.unbindEvents();
    this.unbindListboxEvents();
  }

  formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
  }

  public showPicker() {
    this.toggleListbox(true);
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
        if (!this.multiple && this._selectedOptions.has(this.activeOption)) {
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

    if (this.activeOption.selected) {
      this._selectedOptions.add(this.activeOption);
    } else {
      this._selectedOptions.delete(this.activeOption);
    }

    if (!this.multiple) {
      for (const option of this.selectedOptions) {
        if (option === this.activeOption) {
          continue;
        }
        option.selected = false;
        this._selectedOptions.delete(option);
      }

      this.toggleListbox(false);
    }
  }
}
