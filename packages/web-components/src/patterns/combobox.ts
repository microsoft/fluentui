import type { FASTElement } from "@microsoft/fast-element";
import { uniqueId } from '@microsoft/fast-web-utilities';

const SUPPORTS_ANCHOR_POSITIONING = CSS.supports('anchor-name: --a');

interface FluentElement extends FASTElement {
  elementInternals: ElementInternals;
}

interface ComboboxDecoratorOptions {
  anchorId?: string;
  multiSelectable?: boolean;
}

/**
 * A class to decorate a pair of elements to a combobox and a listbox. This
 * class only focus on the interactions between these 2 elements, the components
 * should handle functionalities outside of the core combobox-listbox interactions.
 *
 * @public
 */
export class ComboboxDecorator {
  private combobox!: FluentElement;
  private listbox!: FluentElement;
  private options!: ComboboxDecoratorOptions;

  private anchorPositioningStyleSheet?: CSSStyleSheet;
  private anchorPositioningStyleElement?: HTMLStyleElement;

  private comboboxClickListener?: (event: PointerEvent | MouseEvent) => void;
  private comboboxKeydownListener?: (event: KeyboardEvent) => void;
  // @ts-expect-error Current Typescript doesn't support Popover API
  private listboxToggleListener?: (event: ToggleEvent) => void;

  private _isExpanded = false;
  private get isExpanded(): boolean {
    return this._isExpanded;
  }
  private set isExpanded(next: boolean) {
    this.combobox.elementInternals.ariaExpanded = next.toString();
    this._isExpanded = next;
  }

  /**
   * A unique ID of the anchor.
   */
  public anchorId = '';

  /**
   * The value of the `anchor-name` CSS property.
   */
  public anchorName = '';

  constructor(
    combobox: FluentElement,
    listbox: FluentElement,
    options: ComboboxDecoratorOptions = {}
  ) {
    this.options = options;
    this.combobox = combobox;
    this.listbox = listbox;
    this.anchorId = options.anchorId ?? uniqueId('fluent-dropdown-anchor-');
    this.anchorName = `--${this.anchorId}`;

    this.decorateCombobox();
    this.decorateListbox();
    this.setAnchorPositioningCSS();
    this.bindEvents();
  }

  /**
   * Connects the combobox to the given listbox.
   *
   * @param listbox - The Fluent element to be decorated as the listbox.
   *
   * @public
   */
  public connectListbox(listbox: FluentElement) {
    if (this.listbox) {
      this.unbindListboxEvents();
    }

    this.listbox = listbox;
    this.decorateListbox();
    this.setAnchorPositioningCSS();
    this.bindListboxEvents();
  }

  /**
   * Remove the decoration on both combobox and listbox.
   *
   * @public
   */
  public remove() {
    this.unbindEvents();
  }

  public setMultiSelectable(multiple: boolean) {
    this.listbox.elementInternals.ariaMultiSelectable = multiple.toString();
  }

  private decorateCombobox() {
    if (!this.combobox.elementInternals) {
      throw 'Missing `elementInternals` property on the combobox element';
    }

    this.combobox.elementInternals.role = 'combobox';
    this.combobox.elementInternals.ariaExpanded = 'false';
  }

  private decorateListbox() {
    if (!this.listbox.elementInternals) {
      throw 'Missing `elementInternals` property on the listbox element';
    }

    this.listbox.elementInternals.role = 'listbox';
    this.setMultiSelectable(!!this.options.multiSelectable);

    // @ts-expect-error Current Typescript doesn't support Popover API
    if (!this.popover) {
      // @ts-expect-error Current Typescript doesn't support Popover API
      this.listbox.popover = 'auto';
    }

    this.combobox.setAttribute('aria-controls', this.listbox.id);
  }

  private bindEvents() {
    this.comboboxClickListener = this.handleComboboxClick.bind(this);
    this.combobox.addEventListener('click', this.comboboxClickListener);

    this.comboboxKeydownListener = this.handleComboboxKeydown.bind(this);
    this.combobox.addEventListener('keydown', this.comboboxKeydownListener);

    this.bindListboxEvents();
  }

  private bindListboxEvents() {
    this.listboxToggleListener = this.handleListboxToggle.bind(this);
    this.listbox.addEventListener('toggle', this.listboxToggleListener);
  }

  private unbindEvents() {
    if (this.comboboxClickListener) {
      this.combobox.removeEventListener('click', this.comboboxClickListener);
    }

    if (this.comboboxKeydownListener) {
      this.combobox.removeEventListener('keydown', this.comboboxKeydownListener);
    }

    this.unbindListboxEvents();
  }

  private unbindListboxEvents() {
    if (this.listboxToggleListener) {
      this.listbox.removeEventListener('toggle', this.listboxToggleListener);
    }
  }

  private setAnchorPositioningCSS() {
    this.combobox.dataset.anchorid = this.anchorId;

    const css = `
      [data-anchorid="${this.anchorId}"] {
        anchor-name: ${this.anchorName};
      }
      #${this.listbox.id} {
        left: anchor(${this.anchorName} left);
        top: anchor(${this.anchorName} bottom);
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

  private handleComboboxClick() {
    const nextIsExpanded = !this.isExpanded;
    // @ts-expect-error Current Typescript doesn't support Popover API
    this.listbox.togglePopover(nextIsExpanded);
    this.isExpanded = nextIsExpanded;
  }

  private handleComboboxKeydown(evt: KeyboardEvent) {
    switch (evt.key) {
      case 'Enter':
      case ' ':
        evt.preventDefault();
        this.combobox.click();
        break;
    }
  }

  // @ts-expect-error Current Typescript doesn't support Popover API
  private handleListboxToggle(evt: ToggleEvent) {
    this.isExpanded = evt.newState === 'open';
  }
}
