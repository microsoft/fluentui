import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
import { attr, Observable, observable, Updates, volatile } from '@microsoft/fast-element';
import {
  keyArrowDown,
  keyArrowUp,
  keyEnd,
  keyEnter,
  keyEscape,
  keyHome,
  keySpace,
  keyTab,
  uniqueId,
} from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { FASTListboxOption } from '../listbox-option/listbox-option.js';
import { DelegatesARIAListbox, FASTListbox } from '../listbox/listbox.js';
import { StartEnd } from '../patterns/start-end.js';
import type { StartEndOptions } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { FormAssociatedSelect } from './select.form-associated.js';

/**
 * Select configuration options
 * @public
 */
export type SelectOptions = StartEndOptions<FASTSelect> & {
  indicator?: StaticallyComposableHTML<FASTSelect>;
};

/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot button-container - The element representing the select button
 * @slot selected-value - The selected value
 * @slot indicator - The visual indicator for the expand/collapse state of the button
 * @slot - The default slot for slotted options
 * @csspart control - The element representing the select invoking element
 * @csspart selected-value - The element wrapping the selected value
 * @csspart indicator - The element wrapping the visual indicator
 * @csspart listbox - The listbox element
 * @fires input - Fires a custom 'input' event when the value updates
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export class FASTSelect extends FormAssociatedSelect {
  /**
   * The open attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @attr({ attribute: 'open', mode: 'boolean' })
  public open: boolean = false;

  /**
   * The placeholder attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: placeholder
   */
  @attr
  public placeholder?: string;

  /**
   * The ref to the internal `.control` element.
   *
   * @internal
   */
  @observable
  public placeholderOption: HTMLOptionElement | null = null;
  /**
   * Sets focus and synchronizes ARIA attributes when the open property changes.
   *
   * @param prev - the previous open value
   * @param next - the current open value
   *
   * @internal
   */
  protected openChanged(prev: boolean | undefined, next: boolean): void {
    if (!this.collapsible) {
      return;
    }

    if (this.open) {
      this.ariaControls = this.listboxId;
      this.ariaExpanded = 'true';

      Updates.enqueue(() => this.setPositioning());
      this.focusAndScrollOptionIntoView();
      this.indexWhenOpened = this.selectedIndex;

      // focus is directed to the element when `open` is changed programmatically
      Updates.enqueue(() => this.focus());

      return;
    }

    this.cleanup?.();

    this.ariaControls = '';
    this.ariaExpanded = 'false';
  }

  /**
   * The selectedIndex when the open property is true.
   *
   * @internal
   */
  private indexWhenOpened?: number;

  /**
   * The internal value property.
   *
   * @internal
   */
  private _value: string = '';

  /**
   * The component is collapsible when in single-selection mode with no size attribute.
   *
   * @internal
   */
  @volatile
  public get collapsible(): boolean {
    return !(this.multiple || typeof this.size === 'number');
  }

  /**
   * The ref to the internal `.control` element.
   *
   * @internal
   */
  @observable
  public control?: HTMLElement;

  /**
   * The value property.
   *
   * @public
   */
  public get value() {
    Observable.track(this, 'value');
    return this._value;
  }

  public set value(next: string) {
    const prev = `${this._value}`;

    if (this._options?.length) {
      const selectedIndex = this._options.findIndex(el => el.value === next);
      const prevSelectedValue = this._options[this.selectedIndex]?.value ?? null;
      const nextSelectedValue = this._options[selectedIndex]?.value ?? null;

      if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
        next = '';
        this.selectedIndex = selectedIndex;
      }

      next = this.firstSelectedOption?.value ?? next;
    }

    if (prev !== next) {
      this._value = next;
      super.valueChanged(prev, next);
      Observable.notify(this, 'value');
      this.updateDisplayValue();
    }
  }

  /**
   * Sets the value and display value to match the first selected option.
   *
   * @param shouldEmit - if true, the input and change events will be emitted
   *
   * @internal
   */
  private updateValue(shouldEmit?: boolean) {
    if (this.$fastController.isConnected) {
      this.value = this.firstSelectedOption?.value ?? '';
    }

    if (shouldEmit) {
      this.$emit('input');
      this.$emit('change', this, {
        bubbles: true,
        composed: undefined,
      });
    }
  }

  /**
   * Updates the proxy value when the selected index changes.
   *
   * @param prev - the previous selected index
   * @param next - the next selected index
   *
   * @internal
   */
  public selectedIndexChanged(prev: number | undefined, next: number): void {
    super.selectedIndexChanged(prev, next);
    this.updateValue();
  }

  /**
   * Reference to the internal listbox element.
   *
   * @internal
   */
  public listbox?: HTMLDivElement;

  /**
   * The unique id for the internal listbox element.
   *
   * @internal
   */
  public listboxId: string = uniqueId('listbox-');

  /**
   * Cleanup function for the listbox positioner.
   *
   * @public
   */
  public cleanup?: () => void;

  /**
   * Calculate and apply listbox positioning based on available viewport space.
   *
   * @public
   */
  public setPositioning(): void {
    if (this.$fastController.isConnected && this.listbox && this.control) {
      this.cleanup = autoUpdate(this, this.listbox, async () => {
        const { middlewareData, x, y } = await computePosition(this.control!, this.listbox!, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            flip(),
            size({
              apply: ({ availableHeight, rects }) => {
                Object.assign(this.listbox!.style, {
                  maxHeight: `${availableHeight}px`,
                  width: `${rects.reference.width}px`,
                });
              },
            }),
            hide(),
          ],
        });

        if (middlewareData.hide?.referenceHidden) {
          this.open = false;
          return;
        }

        Object.assign(this.listbox!.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          transform: `translate(${x}px, ${y}px)`,
        });
      });
    }
  }

  /**
   * The value displayed on the button.
   *
   * @public
   */
  public get displayValue(): string {
    Observable.track(this, 'displayValue');
    return this.firstSelectedOption?.text ?? this.placeholderOption?.text ?? '';
  }

  /**
   * Synchronize the `aria-disabled` property when the `disabled` property changes.
   *
   * @param prev - The previous disabled value
   * @param next - The next disabled value
   *
   * @internal
   */
  public disabledChanged(prev: boolean, next: boolean): void {
    if (super.disabledChanged) {
      super.disabledChanged(prev, next);
    }
    this.ariaDisabled = this.disabled ? 'true' : 'false';
  }

  /**
   * Reset the element to its first selectable option when its parent form is reset.
   *
   * @internal
   */
  public formResetCallback(): void {
    this.setProxyOptions();
    // Call the base class's implementation setDefaultSelectedOption instead of the select's
    // override, in order to reset the selectedIndex without using the value property.
    super.setDefaultSelectedOption();
    if (this.selectedIndex === -1) {
      this.selectedIndex = 0;
    }
  }

  /**
   * Handle opening and closing the listbox when the select is clicked.
   *
   * @param e - the mouse event
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    // do nothing if the select is disabled
    if (this.disabled) {
      return;
    }

    if (this.open) {
      const captured = (e.target as HTMLElement).closest(`option,[role=option]`) as FASTListboxOption;

      if (captured && captured.disabled) {
        return;
      }
    }

    super.clickHandler(e);

    this.open = this.collapsible && !this.open;

    if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
      this.updateValue(true);
    }

    return true;
  }

  /**
   * Handles focus state when the element or its children lose focus.
   *
   * @param e - The focus event
   * @internal
   */
  public focusoutHandler(e: FocusEvent): boolean | void {
    super.focusoutHandler(e);

    if (!this.open) {
      return true;
    }

    const focusTarget = e.relatedTarget as HTMLElement;
    if (this.isSameNode(focusTarget)) {
      this.focus();
      return;
    }

    if (!this.options?.includes(focusTarget as FASTListboxOption)) {
      this.open = false;
      if (this.indexWhenOpened !== this.selectedIndex) {
        this.updateValue(true);
      }
    }
  }

  /**
   * Updates the value when an option's value changes.
   *
   * @param source - the source object
   * @param propertyName - the property to evaluate
   *
   * @internal
   * @override
   */
  public handleChange(source: any, propertyName: string) {
    super.handleChange(source, propertyName);
    if (propertyName === 'value') {
      this.updateValue();
    }
  }

  /**
   * Synchronize the form-associated proxy and updates the value property of the element.
   *
   * @param prev - the previous collection of slotted option elements
   * @param next - the next collection of slotted option elements
   *
   * @internal
   */
  public slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void {
    this.options.forEach(o => {
      const notifier = Observable.getNotifier(o);
      notifier.unsubscribe(this, 'value');
    });

    super.slottedOptionsChanged(prev, next);

    this.options.forEach(o => {
      const notifier = Observable.getNotifier(o);
      notifier.subscribe(this, 'value');
    });
    this.setProxyOptions();
    this.updateValue();
  }

  /**
   * Prevents focus when size is set and a scrollbar is clicked.
   *
   * @param e - the mouse event object
   *
   * @override
   * @internal
   */
  public mousedownHandler(e: MouseEvent): boolean | void {
    if (e.offsetX >= 0 && e.offsetX <= this.listbox!.scrollWidth) {
      return super.mousedownHandler(e);
    }

    return this.collapsible;
  }

  /**
   * Sets the multiple property on the proxy element.
   *
   * @param prev - the previous multiple value
   * @param next - the current multiple value
   */
  public multipleChanged(prev: boolean | undefined, next: boolean) {
    super.multipleChanged(prev, next);

    if (this.proxy) {
      this.proxy.multiple = next;
    }
  }

  /**
   * Updates the selectedness of each option when the list of selected options changes.
   *
   * @param prev - the previous list of selected options
   * @param next - the current list of selected options
   *
   * @override
   * @internal
   */
  protected selectedOptionsChanged(prev: FASTListboxOption[] | undefined, next: FASTListboxOption[]): void {
    super.selectedOptionsChanged(prev, next);
    this.options?.forEach((o, i) => {
      const proxyOption = this.proxy?.options.item(i);
      if (proxyOption) {
        proxyOption.selected = o.selected;
      }
    });
  }

  /**
   * Sets the selected index to match the first option with the selected attribute, or
   * the first selectable option.
   *
   * @override
   * @internal
   */
  protected setDefaultSelectedOption(): void {
    const options: FASTListboxOption[] =
      this.options ??
      Array.from(this.children).filter((n: Element) => FASTListbox.slottedOptionFilter(n as HTMLElement));

    const selectedIndex = options?.findIndex(
      el => el.hasAttribute('selected') || el.selected || el.value === this.value,
    );

    if (selectedIndex !== -1 || this.placeholder) {
      this.selectedIndex = selectedIndex;
      return;
    }

    this.selectedIndex = 0;
  }

  /**
   * Resets and fills the proxy to match the component's options.
   *
   * @internal
   */
  private setProxyOptions(): void {
    if (this.proxy instanceof HTMLSelectElement && this.options) {
      this.proxy.options.length = 0;
      this.options.forEach(option => {
        const proxyOption = option.proxy || (option instanceof HTMLOptionElement ? option.cloneNode() : null);

        if (proxyOption) {
          this.proxy.options.add(proxyOption);
        }
      });
    }
  }

  /**
   * Handle keyboard interaction for the select.
   *
   * @param e - the keyboard event
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    super.keydownHandler(e);
    const key = e.key || e.key.charCodeAt(0);

    switch (key) {
      case keySpace: {
        e.preventDefault();
        if (this.collapsible && this.typeAheadExpired) {
          this.open = !this.open;
        }
        break;
      }

      case keyHome:
      case keyEnd: {
        e.preventDefault();
        break;
      }

      case keyEnter: {
        e.preventDefault();
        this.open = !this.open;
        break;
      }

      case keyEscape: {
        if (this.collapsible && this.open) {
          e.preventDefault();
          this.open = false;
        }
        break;
      }

      case keyTab: {
        if (this.collapsible && this.open) {
          e.preventDefault();
          this.open = false;
        }

        return true;
      }
    }

    if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
      this.updateValue(true);
      this.indexWhenOpened = this.selectedIndex;
    }

    return !(key === keyArrowDown || key === keyArrowUp);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.addEventListener('contentchange', this.updateDisplayValue);
  }

  public disconnectedCallback() {
    this.removeEventListener('contentchange', this.updateDisplayValue);
    this.cleanup?.();
    super.disconnectedCallback();
  }

  /**
   * Updates the proxy's size property when the size attribute changes.
   *
   * @param prev - the previous size
   * @param next - the current size
   *
   * @override
   * @internal
   */
  protected sizeChanged(prev: number | undefined, next: number) {
    super.sizeChanged(prev, next);

    if (this.proxy) {
      this.proxy.size = next;
    }
  }

  /**
   *
   * @internal
   */
  private updateDisplayValue(): void {
    if (this.$fastController.isConnected && this.collapsible) {
      Observable.notify(this, 'displayValue');
    }
  }
}

/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export class DelegatesARIASelect {
  /**
   * See {@link https://www.w3.org/TR/wai-aria-1.2/#combobox} for more information
   * @public
   * @remarks
   * HTML Attribute: `aria-controls`
   */
  @observable
  public ariaControls?: string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIASelect extends DelegatesARIAListbox {}
applyMixins(DelegatesARIASelect, DelegatesARIAListbox);

/**
 * @internal
 */
export interface FASTSelect extends StartEnd, DelegatesARIASelect {}
applyMixins(FASTSelect, StartEnd, DelegatesARIASelect);
