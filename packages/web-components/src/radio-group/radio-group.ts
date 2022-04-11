import { attr, FASTElement, observable } from '@microsoft/fast-element';
import {
  ArrowKeys,
  Direction,
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnter,
  Orientation,
} from '@microsoft/fast-web-utilities';

export const getDirection = (rootNode: HTMLElement): Direction => {
  const dirNode: HTMLElement | null = rootNode.closest('[dir]');
  return dirNode !== null && dirNode.dir === 'rtl' ? Direction.rtl : Direction.ltr;
};

/**
 * An Radio Group Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radiogroup | ARIA radiogroup }.
 *
 * @public
 */
export class RadioGroup extends FASTElement {
  /**
   * When true, the child radios will be immutable by user interaction.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly: boolean;
  private readOnlyChanged(): void {
    if (this.slottedRadioButtons !== undefined) {
      this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
        if (this.readOnly) {
          radio.readOnly = true;
        } else {
          radio.readOnly = false;
        }
      });
    }
  }

  /**
   * Disables the radio group and child radios.
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ attribute: 'disabled', mode: 'boolean' })
  public disabled: boolean;
  private disabledChanged(): void {
    if (this.slottedRadioButtons !== undefined) {
      this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
        if (this.disabled) {
          radio.disabled = true;
        } else {
          radio.disabled = false;
        }
      });
    }
  }

  /**
   * The name of the radio group. Setting this value will set the name value
   * for all child radio elements.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name: string;
  protected nameChanged(): void {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
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
  public value: string;
  protected valueChanged(): void {
    if (this.slottedRadioButtons) {
      this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
        if (radio.getAttribute('value') === this.value) {
          radio.checked = true;
          this.selectedRadio = radio;
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
  public orientation: Orientation = Orientation.horizontal;

  /**
   * The radio labels are stacked
   *
   * @public
   * @remarks
   * HTML Attribute: stacked
   */
  @attr({ mode: 'boolean' })
  public stacked: boolean = false;

  @observable
  public childItems: HTMLElement[];

  /**
   * @internal
   */
  @observable
  public slottedRadioButtons: HTMLElement[];
  private slottedRadioButtonsChanged(oldValue: unknown, newValue: HTMLElement[]): void {
    if (this.slottedRadioButtons && this.slottedRadioButtons.length > 0) {
      this.setupRadioButtons();
    }
  }

  private selectedRadio: HTMLInputElement | null;
  private focusedRadio: HTMLInputElement | null;
  private direction: Direction;

  private get parentToolbar(): HTMLElement | null {
    return this.closest('[role="toolbar"]');
  }

  private get isInsideToolbar(): boolean {
    return (this.parentToolbar ?? false) as boolean;
  }

  private get isInsideFoundationToolbar(): boolean {
    return !!this.parentToolbar?.['$fastController'];
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
    this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
      radio.removeEventListener('change', this.radioChangeHandler);
    });
  }

  private setupRadioButtons(): void {
    const checkedRadios: HTMLElement[] = this.slottedRadioButtons.filter((radio: HTMLInputElement) => {
      return radio.hasAttribute('checked');
    });
    const numberOfCheckedRadios: number = checkedRadios ? checkedRadios.length : 0;
    if (numberOfCheckedRadios > 1) {
      const lastCheckedRadio: HTMLInputElement = checkedRadios[numberOfCheckedRadios - 1] as HTMLInputElement;
      lastCheckedRadio.checked = true;
    }
    let foundMatchingVal: boolean = false;

    this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
      if (this.name !== undefined) {
        radio.setAttribute('name', this.name);
      }

      if (this.disabled) {
        radio.disabled = true;
      }

      if (this.readOnly) {
        radio.readOnly = true;
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
    });

    if (this.value === undefined && this.slottedRadioButtons.length > 0) {
      const checkedRadios: HTMLElement[] = this.slottedRadioButtons.filter((radio: HTMLInputElement) => {
        return radio.hasAttribute('checked');
      });
      const numberOfCheckedRadios: number = checkedRadios !== null ? checkedRadios.length : 0;
      if (numberOfCheckedRadios > 0 && !foundMatchingVal) {
        const lastCheckedRadio: HTMLInputElement = checkedRadios[numberOfCheckedRadios - 1] as HTMLInputElement;
        lastCheckedRadio.checked = true;
        this.focusedRadio = lastCheckedRadio;
        lastCheckedRadio.setAttribute('tabindex', '0');
      } else {
        this.slottedRadioButtons[0].setAttribute('tabindex', '0');
        this.focusedRadio = this.slottedRadioButtons[0] as HTMLInputElement;
      }
    }
  }

  private radioChangeHandler = (e: CustomEvent): boolean | void => {
    const changedRadio: HTMLInputElement = e.target as HTMLInputElement;

    if (changedRadio.checked) {
      this.slottedRadioButtons.forEach((radio: HTMLInputElement) => {
        if (radio !== changedRadio) {
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
    const radio: HTMLInputElement = group[index] as HTMLInputElement;
    if (!this.isInsideToolbar) {
      radio.setAttribute('tabindex', '0');
      if (radio.readOnly) {
        this.slottedRadioButtons.forEach((nextRadio: HTMLInputElement) => {
          if (nextRadio !== radio) {
            nextRadio.setAttribute('tabindex', '-1');
          }
        });
      } else {
        radio.checked = true;
        this.selectedRadio = radio;
      }
    }
    this.focusedRadio = radio;
    radio.focus();
  };

  private moveRightOffGroup = () => {
    (this.nextElementSibling as HTMLInputElement)?.focus();
  };

  private moveLeftOffGroup = () => {
    (this.previousElementSibling as HTMLInputElement)?.focus();
  };

  /**
   * @internal
   */
  public focusOutHandler = (e: FocusEvent): boolean | void => {
    const group: HTMLElement[] = this.slottedRadioButtons;
    const radio: HTMLInputElement | null = e.target as HTMLInputElement;
    const index: number = radio !== null ? group.indexOf(radio) : 0;
    const focusedIndex: number = this.focusedRadio ? group.indexOf(this.focusedRadio) : -1;

    if (
      (focusedIndex === 0 && index === focusedIndex) ||
      (focusedIndex === group.length - 1 && focusedIndex === index)
    ) {
      if (!this.selectedRadio) {
        this.focusedRadio = group[0] as HTMLInputElement;
        this.focusedRadio.setAttribute('tabindex', '0');
        group.forEach((nextRadio: HTMLInputElement) => {
          if (nextRadio !== this.focusedRadio) {
            nextRadio.setAttribute('tabindex', '-1');
          }
        });
      } else {
        this.focusedRadio = this.selectedRadio;

        if (!this.isInsideFoundationToolbar) {
          this.selectedRadio.setAttribute('tabindex', '0');
          group.forEach((nextRadio: HTMLInputElement) => {
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
  public clickHandler = (e: MouseEvent): void => {
    const radio: HTMLInputElement | null = e.target as HTMLInputElement;
    if (radio) {
      const group: HTMLElement[] = this.slottedRadioButtons;
      if (radio.checked || group.indexOf(radio) === 0) {
        radio.setAttribute('tabindex', '0');
        this.selectedRadio = radio;
      } else {
        radio.setAttribute('tabindex', '-1');
        this.selectedRadio = null;
      }
      this.focusedRadio = radio;
    }
    e.preventDefault();
  };

  private shouldMoveOffGroupToTheRight = (index: number, group: HTMLElement[], key: string): boolean => {
    return index === group.length && this.isInsideToolbar && key === keyArrowRight;
  };

  private shouldMoveOffGroupToTheLeft = (group: HTMLElement[], key: string): boolean => {
    const index = this.focusedRadio ? group.indexOf(this.focusedRadio) - 1 : 0;
    return index < 0 && this.isInsideToolbar && key === keyArrowLeft;
  };

  private checkFocusedRadio = (): void => {
    if (this.focusedRadio !== null && !this.focusedRadio.readOnly && !this.focusedRadio.checked) {
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
      if (!(group[index] as HTMLInputElement).disabled) {
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
      if (!(group[index] as HTMLInputElement).disabled) {
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

    if (key in ArrowKeys && this.isInsideFoundationToolbar) {
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
