import { attr, FASTElement, Observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import type { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';

/**
 * The base class used for constructing a fluent-text custom element
 * @public
 */
export class Text extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The text will not wrap
   * NOTE: In Fluent UI React v9 this is "wrap"
   * Boolean attributes which default to true in HTML can't be switched off in the DOM
   *
   * @public
   * @remarks
   * HTML Attribute: nowrap
   */
  @attr({ mode: 'boolean' })
  nowrap: boolean = false;

  /**
   * The text truncates
   *
   * @public
   * @remarks
   * HTML Attribute: truncate
   */
  @attr({ mode: 'boolean' })
  truncate: boolean = false;

  /**
   * The text style is italic
   *
   * @public
   * @remarks
   * HTML Attribute: italic
   */
  @attr({ mode: 'boolean' })
  italic: boolean = false;

  /**
   * The text style is underline
   *
   * @public
   * @remarks
   * HTML Attribute: underline
   */
  @attr({ mode: 'boolean' })
  underline: boolean = false;

  /**
   * The text style is strikethrough
   *
   * @public
   * @remarks
   * HTML Attribute: strikethrough
   */
  @attr({ mode: 'boolean' })
  strikethrough: boolean = false;

  /**
   * An text can take up the width of its container.
   *
   * @public
   * @remarks
   * HTML Attribute: block
   */
  @attr({ mode: 'boolean' })
  block: boolean = false;

  /**
   * THe Text size
   *
   * @public
   * @remarks
   * HTML Attribute: size
   *
   */
  @attr
  size?: TextSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: TextSize | undefined, next: TextSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `size-${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `size-${next}`, true);
    }
  }

  /**
   * THe Text font
   *
   * @public
   * @remarks
   * HTML Attribute: font
   */
  @attr
  font?: TextFont;

  /**
   * Handles changes to font attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public fontChanged(prev: TextFont | undefined, next: TextFont | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * The Text weight
   *
   * @public
   * @remarks
   * HTML Attribute: weight
   */
  @attr
  weight?: TextWeight;

  /**
   * Handles changes to weight attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public weightChanged(prev: TextWeight | undefined, next: TextWeight | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * THe Text align
   *
   * @public
   * @remarks
   * HTML Attribute: align
   */
  @attr
  align?: TextAlign;

  /**
   * Handles changes to align attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public alignChanged(prev: TextAlign | undefined, next: TextAlign | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    Observable.getNotifier(this).subscribe(this);

    Object.keys(this.$fastController.definition.attributeLookup).forEach(key => {
      this.handleChange(this, key);
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this);
  }

  /**
   * Handles changes to observable properties
   * @internal
   * @param source - the source of the change
   * @param propertyName - the property name being changed
   */
  public handleChange(source: any, propertyName: string) {
    switch (propertyName) {
      case 'nowrap':
      case 'truncate':
      case 'italic':
      case 'underline':
      case 'strikethrough':
      case 'block':
        toggleState(this.elementInternals, propertyName, !!this[propertyName]);
        break;
      default:
        break;
    }
  }
}
