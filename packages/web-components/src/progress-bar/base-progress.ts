import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';

/**
 * A base class for progress components.
 * @public
 */
export class BaseProgress extends FASTElement {
  /**
   * The value of the progress
   * @public
   * @remarks
   * HTML Attribute: value
   */
  @attr({ converter: nullableNumberConverter })
  public value!: number | null;
  protected valueChanged(): void {
    this.updatePercentComplete();
  }

  /**
   * The minimum value
   * @public
   * @remarks
   * HTML Attribute: min
   */
  @attr({ converter: nullableNumberConverter })
  public min!: number;
  protected minChanged(): void {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }

  /**
   * The maximum value
   * @public
   * @remarks
   * HTML Attribute: max
   */
  @attr({ converter: nullableNumberConverter })
  public max!: number;
  protected maxChanged(): void {
    if (this.$fastController.isConnected) {
      this.updatePercentComplete();
    }
  }

  /**
   * Indicates progress in %
   * @internal
   */
  @observable
  public percentComplete: number = 0;

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.updatePercentComplete();
  }

  private updatePercentComplete(): void {
    const min: number = typeof this.min === 'number' ? this.min : 0;
    const max: number = typeof this.max === 'number' ? this.max : 100;
    const value: number = typeof this.value === 'number' ? this.value : 0;
    const range: number = max - min;

    this.percentComplete = range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
  }
}
