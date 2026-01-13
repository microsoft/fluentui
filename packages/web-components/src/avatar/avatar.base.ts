import { attr, FASTElement, Updates } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-avatar custom element
 * @public
 */
export class BaseAvatar extends FASTElement {
  /**
   * Signal to remove event listeners when the component is disconnected.
   *
   * @internal
   */
  private abortSignal?: AbortController;

  /**
   * Reference to the default slot element.
   * @internal
   */
  public defaultSlot!: HTMLSlotElement;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name?: string | undefined;

  /**
   * Provide custom initials rather than one generated via the name
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public initials?: string | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.slotchangeHandler();
  }

  constructor() {
    super();

    this.elementInternals.role = 'img';
  }

  disconnectedCallback(): void {
    this.abortSignal?.abort();
    this.abortSignal = undefined;

    super.disconnectedCallback();
  }

  /**
   * Removes any empty text nodes from the default slot when the slotted content changes.
   *
   * @param e - The event object
   * @internal
   */
  public slotchangeHandler(): void {
    this.normalize();

    const elements = this.defaultSlot.assignedElements();

    if (!elements.length && !this.innerText.trim()) {
      const nodes = this.defaultSlot.assignedNodes() as Element[];

      nodes
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .forEach(node => {
          this.removeChild(node);
        });
    }

    Updates.enqueue(() => {
      if (!this.abortSignal || this.abortSignal.signal.aborted) {
        this.abortSignal = new AbortController();
      }

      this.defaultSlot.addEventListener('slotchange', () => this.slotchangeHandler(), {
        once: true,
        signal: this.abortSignal.signal,
      });
    });
  }
}
