import type { FASTElement } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

const SUPPORTS_ANCHOR_POSITIONING = CSS.supports('anchor-name: --a');

interface FluentElement extends FASTElement {
  elementInternals: ElementInternals;
}

interface FluentOptionElement extends FluentElement {
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface FluentListboxElement extends FluentElement {
  multiple: boolean;
  options: FluentOptionElement[];
}

export interface ComboboxDecoratorConfig {
  disabled: boolean;
  multiSelectable: boolean;
  comboboxEditable: boolean;
  anchorId?: string;
}

const defaultComboboxDecoratorConfig: ComboboxDecoratorConfig = {
  multiSelectable: false,
  disabled: false,
  comboboxEditable: false,
};

enum ListboxAction {
  MOVE_TO_NEXT,
  MOVE_TO_PREV,
  MOVE_TO_FIRST,
  MOVE_TO_LAST,
  DISMISS,
  SELECT,
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
  private listbox!: FluentListboxElement;
  private config!: ComboboxDecoratorConfig;
  private selectedOptions: Set<FluentOptionElement> = new Set();

  // Anchor Positioning
  private anchorPositioningStyleSheet?: CSSStyleSheet;
  private anchorPositioningStyleElement?: HTMLStyleElement;

  // Even listeners
  private comboboxClickListener?: (event: PointerEvent | MouseEvent) => void;
  private comboboxKeydownListener?: (event: KeyboardEvent) => void;
  // @ts-expect-error Popover API
  private listboxToggleListener?: (event: ToggleEvent) => void;
  private listboxInputListener?: (event: Event) => void;
  private listboxKeydownListener?: (event: KeyboardEvent) => void;

  // Combobox states
  private _isExpanded = false;
  private get isExpanded(): boolean {
    return this._isExpanded;
  }
  private set isExpanded(next: boolean) {
    this.combobox.elementInternals.ariaExpanded = next.toString();
    this._isExpanded = next;
  }
  private isDisabled = false;
  private isMultiSelectable = false;

  private get isFocusVisible(): boolean {
    return this.combobox.matches(':focus-visible');
  }

  private _activeOption?: FluentOptionElement;
  private get activeOption(): FluentOptionElement | undefined {
    return this._activeOption;
  }
  private set activeOption(option: FluentOptionElement | undefined) {
    if (this._activeOption) {
      this._activeOption.active = false;
    }

    this._activeOption = option;

    if (option && this.isFocusVisible) {
      option.active = true;
      option.scrollIntoView({ block: 'nearest' });
    }

    this.combobox.setAttribute('aria-activedescendant', option ? option.id : '');
  }

  constructor(
    combobox: FluentElement,
    listbox: FluentListboxElement,
    config: ComboboxDecoratorConfig = defaultComboboxDecoratorConfig,
  ) {
    this.config = config;
    this.config.anchorId = this.config.anchorId ?? uniqueId('fluent-dropdown-anchor-');

    this.combobox = combobox;
    this.decorateCombobox();
    this.bindComboboxEvents();

    this.connectListbox(listbox);
  }

  /**
   * Connects the combobox to the given listbox.
   *
   * @param listbox - The Fluent element to be decorated as the listbox.
   *
   * @public
   */
  public connectListbox(listbox: FluentListboxElement) {
    if (this.activeOption) {
      this.activeOption = undefined;
    }

    if (this.listbox) {
      this.unbindListboxEvents();
    }

    this.listbox = listbox;

    this.decorateListbox();
    this.setAnchorPositioningCSS();
    this.bindListboxEvents();
  }

  /**
   * Removes the decoration on both combobox and listbox.
   *
   * @public
   */
  public remove() {
    this.unbindComboboxEvents();
    this.unbindListboxEvents();
  }

  /**
   * Sets the listbox to allow multiple selected options.
   *
   * @param multiple - Whether to allow multiple selected options.
   *
   * @public
   */
  public setMultiSelectable(multiple: boolean) {
    this.isMultiSelectable = multiple;
    this.listbox.multiple = multiple;
    // Ensure `aria-multiselectable` is indeed set on the listbox.
    this.listbox.elementInternals.ariaMultiSelectable = multiple.toString();
  }

  /**
   * Sets the combobox to be disabled or enabled.
   *
   * @param disabled - Whenther to disabled the combobox, set to `true` to disable.
   *
   * @public
   */
  public setDisabled(disabled: boolean) {
    if (this.isExpanded) {
      this.toggleListbox(false);
    }

    this.isDisabled = disabled;
    this.combobox.tabIndex = disabled ? -1 : 0;
  }

  /**
   * Toggles the listbox.
   *
   * TODO: If `.selectedOptions.size` is not 0 and none of the options is
   * currently in view, scroll the first selected option into view.
   *
   * @param force - If `true`, show the listbox; if `false`, hide the listbox.
   *
   */
  public toggleListbox(force?: boolean) {
    if (this.isDisabled) {
      return;
    }

    const next = force ?? !this.isExpanded;
    // @ts-expect-error Popover API
    this.listbox.togglePopover(next);
    this.isExpanded = next;

    if (!next) {
      return;
    }

    if (!this.activeOption) {
      this.activeOption = this.listbox.options?.[0];
    }

    if (this.activeOption) {
      if (this.isFocusVisible) {
        this.activeOption.active = true;
      }
      this.activeOption.scrollIntoView({ block: 'nearest' });
    }
  }

  private decorateCombobox() {
    if (!this.combobox.elementInternals) {
      throw 'Missing `elementInternals` property on the combobox element';
    }

    this.combobox.elementInternals.role = 'combobox';
    this.combobox.elementInternals.ariaExpanded = 'false';

    this.setDisabled(this.config.disabled);
  }

  private decorateListbox() {
    if (!this.listbox.elementInternals) {
      throw 'Missing `elementInternals` property on the listbox element';
    }

    this.listbox.elementInternals.role = 'listbox';
    this.setMultiSelectable(!!this.config.multiSelectable);

    // @ts-expect-error Popover API
    if (!this.popover) {
      // @ts-expect-error Popover API
      this.listbox.popover = 'auto';
    }

    this.combobox.setAttribute('aria-controls', this.listbox.id);
  }

  private bindComboboxEvents() {
    this.comboboxClickListener = this.handleComboboxClick.bind(this);
    this.combobox.addEventListener('click', this.comboboxClickListener);

    this.comboboxKeydownListener = this.handleComboboxKeydown.bind(this);
    this.combobox.addEventListener('keydown', this.comboboxKeydownListener);
  }

  private bindListboxEvents() {
    this.listboxToggleListener = this.handleListboxToggle.bind(this);
    this.listbox.addEventListener('toggle', this.listboxToggleListener);

    this.listboxInputListener = this.handleListboxInput.bind(this);
    this.listbox.addEventListener('input', this.listboxInputListener);

    this.listboxKeydownListener = this.handleListboxKeydown.bind(this);
    this.listbox.addEventListener('keydown', this.listboxKeydownListener);
  }

  private unbindComboboxEvents() {
    if (this.comboboxClickListener) {
      this.combobox.removeEventListener('click', this.comboboxClickListener);
    }

    if (this.comboboxKeydownListener) {
      this.combobox.removeEventListener('keydown', this.comboboxKeydownListener);
    }
  }

  private unbindListboxEvents() {
    if (this.listboxToggleListener) {
      this.listbox.removeEventListener('toggle', this.listboxToggleListener);
    }

    if (this.listboxInputListener) {
      this.listbox.removeEventListener('input', this.listboxInputListener);
    }

    if (this.listboxKeydownListener) {
      this.listbox.removeEventListener('keydown', this.listboxKeydownListener);
    }
  }

  private setAnchorPositioningCSS() {
    this.combobox.dataset.anchorid = this.config.anchorId;
    const anchorName = `--${this.config.anchorId}`;

    const css = `
      [data-anchorid="${this.config.anchorId}"] {
        anchor-name: ${anchorName};
      }
      #${this.listbox.id} {
        left: anchor(${anchorName} left);
        top: anchor(${anchorName} bottom);
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
    this.toggleListbox();
  }

  private handleComboboxKeydown(evt: KeyboardEvent) {
    if (this.isDisabled) {
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
        if (!this.isMultiSelectable && this.selectedOptions.has(this.activeOption)) {
          this.toggleListbox(false);
          return;
        }
        this.activeOption.click();
        break;
    }
  }

  // @ts-expect-error Popover API
  private handleListboxToggle(evt: ToggleEvent) {
    this.isExpanded = evt.newState === 'open';
  }

  private handleListboxKeydown(evt: KeyboardEvent) {
    this.combobox.focus();
    this.handleComboboxKeydown(evt);
  }

  private handleListboxInput(evt: Event) {
    const target = evt.target as FluentOptionElement;
    this.activeOption = target;

    if (this.activeOption.selected) {
      this.selectedOptions.add(this.activeOption);
    } else {
      this.selectedOptions.delete(this.activeOption);
    }

    if (!this.isMultiSelectable) {
      for (const option of this.selectedOptions) {
        if (option === this.activeOption) {
          continue;
        }
        option.selected = false;
        this.selectedOptions.delete(option);
      }

      this.toggleListbox(false);
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
    let index: number;
    const enabledOptions = this.listbox.options.filter(option => !option.disabled);
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
    if (index >= this.listbox.options.length) {
      this.moveActiveOption(ListboxAction.MOVE_TO_LAST);
      return;
    }

    this.activeOption = enabledOptions[index];
  }
}
