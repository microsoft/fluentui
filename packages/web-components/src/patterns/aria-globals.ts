//Copied from @microsoft/fast-foundation

import { attr } from '@microsoft/fast-element';

/**
 * Some states and properties are applicable to all host language elements regardless of whether a role is applied.
 * The following global states and properties are supported by all roles and by all base markup elements.
 * {@link https://www.w3.org/TR/wai-aria-1.1/#global_states}
 *
 * This is intended to be used as a mixin. Be sure you extend FASTElement.
 *
 * @public
 */
export class ARIAGlobalStatesAndProperties {
  /**
   * Indicates whether assistive technologies will present all, or only parts of,
   * the changed region based on the change notifications defined by the aria-relevant attribute.
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-atomic}
   *
   * @public
   * @remarks
   * HTML Attribute: aria-atomic
   */
  @attr({ attribute: 'aria-atomic' })
  public ariaAtomic!: 'true' | 'false' | string | null;

  /**
   * Indicates an element is being modified and that assistive technologies MAY want to wait
   * until the modifications are complete before exposing them to the user.
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-busy}
   *
   * @public
   * @remarks
   * HTML Attribute: aria-busy
   */
  @attr({ attribute: 'aria-busy' })
  public ariaBusy!: 'true' | 'false' | string | null;

  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-controls}
   * @public
   * @remarks
   * HTML Attribute: aria-controls
   */
  @attr({ attribute: 'aria-controls' })
  public ariaControls!: string | null;

  /**
   * Indicates the element that represents the current item within a container or set of related elements.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-current}
   * @public
   * @remarks
   * HTML Attribute: aria-current
   */
  @attr({ attribute: 'aria-current' })
  public ariaCurrent!: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | string | null;

  /**
   * Identifies the element (or elements) that describes the object.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-describedby}
   * @public
   * @remarks
   * HTML Attribute: aria-describedby
   */
  @attr({ attribute: 'aria-describedby' })
  public ariaDescribedby!: string | null;

  /**
   * Identifies the element that provides a detailed, extended description for the object.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-details}
   * @public
   * @remarks
   * HTML Attribute: aria-details
   */
  @attr({ attribute: 'aria-details' })
  public ariaDetails!: string | null;

  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-disabled}
   * @public
   * @remarks
   * HTML Attribute: aria-disabled
   */
  @attr({ attribute: 'aria-disabled' })
  public ariaDisabled!: 'true' | 'false' | string | null;

  /**
   * Identifies the element that provides an error message for the object.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage}
   * @public
   * @remarks
   * HTML Attribute: aria-errormessage
   */
  @attr({ attribute: 'aria-errormessage' })
  public ariaErrormessage!: string | null;

  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-flowto}
   * @public
   * @remarks
   * HTML Attribute: aria-flowto
   */
  @attr({ attribute: 'aria-flowto' })
  public ariaFlowto!: string | null;

  /**
   * Indicates the availability and type of interactive popup element,
   * such as menu or dialog, that can be triggered by an element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup}
   * @public
   * @remarks
   * HTML Attribute: aria-haspopup
   */
  @attr({ attribute: 'aria-haspopup' })
  public ariaHaspopup!: 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | string | null;

  /**
   * Indicates whether the element is exposed to an accessibility API
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-hidden}
   * @public
   * @remarks
   * HTML Attribute: aria-hidden
   */
  @attr({ attribute: 'aria-hidden' })
  public ariaHidden!: 'false' | 'true' | string | null;

  /**
   * Indicates the entered value does not conform to the format expected by the application.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-invalid}
   * @public
   * @remarks
   * HTML Attribute: aria-invalid
   */
  @attr({ attribute: 'aria-invalid' })
  public ariaInvalid!: 'false' | 'true' | 'grammar' | 'spelling' | string | null;

  /**
   * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts}
   * @public
   * @remarks
   * HTML Attribute: aria-keyshortcuts
   */
  @attr({ attribute: 'aria-keyshortcuts' })
  public ariaKeyshortcuts!: string | null;

  /**
   * Defines a string value that labels the current element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-label}
   * @public
   * @remarks
   * HTML Attribute: aria-label
   */
  @attr({ attribute: 'aria-label' })
  public ariaLabel!: string | null;

  /**
   * Identifies the element (or elements) that labels the current element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby}
   * @public
   * @remarks
   * HTML Attribute: aria-labelledby
   */
  @attr({ attribute: 'aria-labelledby' })
  public ariaLabelledby!: string | null;

  /**
   * Indicates that an element will be updated, and describes the types of updates the user agents,
   * assistive technologies, and user can expect from the live region.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-live}
   * @public
   * @remarks
   * HTML Attribute: aria-live
   */
  @attr({ attribute: 'aria-live' })
  public ariaLive!: 'assertive' | 'off' | 'polite' | string | null;

  /**
   * Identifies an element (or elements) in order to define a visual,
   * functional, or contextual parent/child relationship between DOM elements
   * where the DOM hierarchy cannot be used to represent the relationship.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-owns}
   * @public
   * @remarks
   * HTML Attribute: aria-owns
   */
  @attr({ attribute: 'aria-owns' })
  public ariaOwns!: string | null;

  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-relevant}
   * @public
   * @remarks
   * HTML Attribute: aria-relevant
   */
  @attr({ attribute: 'aria-relevant' })
  public ariaRelevant!: 'additions' | 'additions text' | 'all' | 'removals' | 'text' | string | null;

  /**
   * Defines a human-readable, author-localized description for the role of an element.
   *
   * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription}
   * @public
   * @remarks
   * HTML Attribute: aria-roledescription
   */
  @attr({ attribute: 'aria-roledescription' })
  public ariaRoledescription!: string | null;
}
