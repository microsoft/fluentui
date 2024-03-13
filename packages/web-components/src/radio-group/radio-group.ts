import { attr, FASTElement, observable } from '@microsoft/fast-element';
import {
  ArrowKeys,
  Direction,
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnter,
} from '@microsoft/fast-web-utilities';
import { Radio } from '../radio/radio.js';
import { getDirection } from '../utils/index.js';
import { RadioGroupOrientation } from './radio-group.options.js';

/**
 * The base class used for constructing a fluent-radio-group custom element
 * @public
 */
export class RadioGroup extends FASTElement {
  /**
   * sets radio layout styles
   *
   * @public
   * @remarks
   * HTML Attribute: stacked
   */
  @attr({ mode: 'boolean' })
  public stacked: boolean = false;

  /**
   * When true, the child radios will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly!: boolean;

  /**
   * Disables the radio group and child radios.
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ attribute: 'disabled', mode: 'boolean' })
  public disabled!: boolean;

  /**
   * The name of the radio group. Setting this value will set the name value
   * for all child radio elements.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name!: string;
  protected nameChanged(): void {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach((radio: HTMLElement) => {
        radio.setAttribute('name', this.name);
      });
    }
  }

  /**
   * The value of the checked radio
   *
   * @public
   * @remarks
   * HTML Attribute: value
   */
  @attr
  public value!: string;
  protected valueChanged(): void {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach((radio: HTMLElement) => {
        if (radio instanceof Radio) {
          if (radio.value === this.value) {
            radio.checked = true;
            this.selectedRadio = radio;
          }
        }
      });
    }
    this.$emit('change');
  }

  /**
   * The orientation of the group
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: RadioGroupOrientation = RadioGroupOrientation.horizontal;

  @observable
  public childItems!: HTMLElement[];

  /**
   * @internal
   */
  @observable
  public slottedRadioButtons!: HTMLElement[];
  protected slottedRadioButtonsChanged(oldValue: unknown, newValue: HTMLElement[]): void {
    if (this.slottedRadioButtons && this.slottedRadioButtons.length > 0) {
      this.setupRadioButtons();
    }
  }

  private selectedRadio!: Radio | null;
  private focusedRadio!: Radio | null;
  private direction!: Direction;

  private get parentToolbar(): HTMLElement | null {
    return this.closest('[role="toolbar"]');
  }

  private get isInsideToolbar(): boolean {
    return (this.parentToolbar ?? false) as boolean;
  }

  private get isInsideFoundationToolbar(): boolean {
    return !!this.parentToolbar?.hasOwnProperty('$fastController');
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.direction = getDirection(this);

    this.setupRadioButtons();
  }

  public disconnectedCallback(): void {
    this.slottedRadioButtons.forEach((radio: HTMLElement) => {
      if (radio instanceof Radio) {
        radio.removeEventListener('change', this.radioChangeHandler);
      }
    });
  }

  private setupRadioButtons(): void {
    const checkedRadios: HTMLElement[] = this.slottedRadioButtons.filter((radio: HTMLElement) => {
      return radio.hasAttribute('checked');
    });
    const numberOfCheckedRadios: number = checkedRadios ? checkedRadios.length : 0;
    if (numberOfCheckedRadios > 1) {
      const lastCheckedRadio: Radio = checkedRadios[numberOfCheckedRadios - 1] as Radio;
      lastCheckedRadio.checked = true;
    }
    let foundMatchingVal: boolean = false;

    this.slottedRadioButtons.forEach((radio: HTMLElement) => {
      if (radio instanceof Radio) {
        if (this.name !== undefined) {
          radio.setAttribute('name', this.name);
        }

        if (this.value && this.value === radio.value) {
          this.selectedRadio = radio;
          this.focusedRadio = radio;
          radio.checked = true;
          radio.setAttribute('tabindex', '0');
          foundMatchingVal = true;
        } else {
          if (!this.isInsideFoundationToolbar) {
            radio.setAttribute('tabindex', '-1');
          }
          radio.checked = false;
        }

        radio.addEventListener('change', this.radioChangeHandler);
      }
    });

    if (this.value === undefined && this.slottedRadioButtons.length > 0) {
      const checkedRadios: HTMLElement[] = this.slottedRadioButtons.filter((radio: HTMLElement) => {
        return radio.hasAttribute('checked');
      });
      const numberOfCheckedRadios: number = checkedRadios !== null ? checkedRadios.length : 0;
      if (numberOfCheckedRadios > 0 && !foundMatchingVal) {
        const lastCheckedRadio: Radio = checkedRadios[numberOfCheckedRadios - 1] as Radio;
        lastCheckedRadio.checked = true;
        this.focusedRadio = lastCheckedRadio;
        lastCheckedRadio.setAttribute('tabindex', '0');
      } else {
        this.slottedRadioButtons[0].setAttribute('tabindex', '0');
        this.focusedRadio = this.slottedRadioButtons[0] as Radio;
      }
    }
  }

  private radioChangeHandler = (e: Event): boolean | void => {
    const changedRadio: Radio = e.target as Radio;

    if (changedRadio.checked) {
      this.slottedRadioButtons.forEach((radio: HTMLElement) => {
        if (radio instanceof Radio && radio !== changedRadio) {
          radio.checked = false;
          if (!this.isInsideFoundationToolbar) {
            radio.setAttribute('tabindex', '-1');
          }
        }
      });
      this.selectedRadio = changedRadio;
      this.value = changedRadio.value;
      changedRadio.setAttribute('tabindex', '0');
      this.focusedRadio = changedRadio;
    }
    e.stopPropagation();
  };

  private moveToRadioByIndex = (group: HTMLElement[], index: number) => {
    const radio: Radio = group[index] as Radio;
    if (!this.isInsideToolbar) {
      radio.setAttribute('tabindex', '0');
      radio.checked = true;
      this.selectedRadio = radio;
    }
    this.focusedRadio = radio;
    radio.focus();
  };

  private moveRightOffGroup = () => {
    (this.nextElementSibling as Radio)?.focus();
  };

  private moveLeftOffGroup = () => {
    (this.previousElementSibling as Radio)?.focus();
  };

  /**
   * @internal
   */
  public focusOutHandler = (e: FocusEvent): boolean | void => {
    const group: HTMLElement[] = this.slottedRadioButtons;
    const radio: Radio | null = e.target as Radio;
    const index: number = radio !== null ? group.indexOf(radio) : 0;
    const focusedIndex: number = this.focusedRadio ? group.indexOf(this.focusedRadio) : -1;

    if (
      (focusedIndex === 0 && index === focusedIndex) ||
      (focusedIndex === group.length - 1 && focusedIndex === index)
    ) {
      if (!this.selectedRadio) {
        this.focusedRadio = group[0] as Radio;
        this.focusedRadio.setAttribute('tabindex', '0');
        group.forEach((nextRadio: HTMLElement) => {
          if (radio instanceof Radio && nextRadio !== this.focusedRadio) {
            nextRadio.setAttribute('tabindex', '-1');
          }
        });
      } else {
        this.focusedRadio = this.selectedRadio;

        if (!this.isInsideFoundationToolbar) {
          this.selectedRadio.setAttribute('tabindex', '0');
          group.forEach((nextRadio: HTMLElement) => {
            if (nextRadio !== this.selectedRadio) {
              nextRadio.setAttribute('tabindex', '-1');
            }
          });
        }
      }
    }
    return true;
  };

  /**
   * @internal
   */
  public handleDisabledClick = (e: MouseEvent): void | boolean => {
    // prevent focus events on items from the click handler when disabled
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    return true;
  };

  /**
   * @internal
   */
  public clickHandler = (e: MouseEvent): void | boolean => {
    if (this.disabled) {
      return;
    }

    e.preventDefault();
    const radio: Radio | null = e.target as Radio;

    if (radio && radio instanceof Radio) {
      radio.checked = true;
      radio.setAttribute('tabindex', '0');
      this.selectedRadio = radio;
      this.focusedRadio = radio;
    }
  };

  private shouldMoveOffGroupToTheRight = (index: number, group: HTMLElement[], key: string): boolean => {
    return index === group.length && this.isInsideToolbar && key === keyArrowRight;
  };

  private shouldMoveOffGroupToTheLeft = (group: HTMLElement[], key: string): boolean => {
    const index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
    return index < 0 && this.isInsideToolbar && key === keyArrowLeft;
  };

  private checkFocusedRadio = (): void => {
    if (this.focusedRadio !== null && !this.focusedRadio.checked) {
      this.focusedRadio.checked = true;
      this.focusedRadio.setAttribute('tabindex', '0');
      this.focusedRadio.focus();
      this.selectedRadio = this.focusedRadio;
    }
  };

  private moveRight = (e: KeyboardEvent): void => {
    const group: HTMLElement[] = this.slottedRadioButtons;
    let index: number = 0;

    index = this.focusedRadio ? group.indexOf(this.focusedRadio) + 1 : 1;
    if (this.shouldMoveOffGroupToTheRight(index, group, e.key)) {
      this.moveRightOffGroup();
      return;
    } else if (index === group.length) {
      index = 0;
    }
    /* looping to get to next radio that is not disabled */
    /* matching native radio/radiogroup which does not select an item if there is only 1 in the group */
    while (index < group.length && group.length > 1) {
      if (!(group[index] as Radio).disabled) {
        this.moveToRadioByIndex(group, index);
        break;
      } else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
        break;
      } else if (index + 1 >= group.length) {
        if (this.isInsideToolbar) {
          break;
        } else {
          index = 0;
        }
      } else {
        index += 1;
      }
    }
  };

  private moveLeft = (e: KeyboardEvent): void => {
    const group: HTMLElement[] = this.slottedRadioButtons;
    let index: number = 0;

    index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
    index = index < 0 ? group.length - 1 : index;

    if (this.shouldMoveOffGroupToTheLeft(group, e.key)) {
      this.moveLeftOffGroup();
      return;
    }
    /* looping to get to next radio that is not disabled */
    while (index >= 0 && group.length > 1) {
      if (!(group[index] as Radio).disabled) {
        this.moveToRadioByIndex(group, index);
        break;
      } else if (this.focusedRadio && index === group.indexOf(this.focusedRadio)) {
        break;
      } else if (index - 1 < 0) {
        index = group.length - 1;
      } else {
        index -= 1;
      }
    }
  };

  /**
   * keyboard handling per https://w3c.github.io/aria-practices/#for-radio-groups-not-contained-in-a-toolbar
   * navigation is different when there is an ancestor with role='toolbar'
   *
   * @internal
   */
  public keydownHandler = (e: KeyboardEvent): boolean | void => {
    const key = e.key;

    if (key in ArrowKeys && (this.isInsideFoundationToolbar || this.disabled)) {
      return true;
    }

    switch (key) {
      case keyEnter: {
        this.checkFocusedRadio();
        break;
      }

      case keyArrowRight:
      case keyArrowDown: {
        if (this.direction === Direction.ltr) {
          this.moveRight(e);
        } else {
          this.moveLeft(e);
        }
        break;
      }

      case keyArrowLeft:
      case keyArrowUp: {
        if (this.direction === Direction.ltr) {
          this.moveLeft(e);
        } else {
          this.moveRight(e);
        }
        break;
      }

      default: {
        return true;
      }
    }
  };
}
