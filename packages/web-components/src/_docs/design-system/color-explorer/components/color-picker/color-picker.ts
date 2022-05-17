import { ColorHSV, ColorRGBA64, hsvToRGB, parseColor, rgbToHSV } from '@microsoft/fast-colors';
import { attr, DOM, observable } from '@microsoft/fast-element';
import { isNullOrWhiteSpace } from '@microsoft/fast-web-utilities';
import { FormAssociatedColorPicker } from './color-picker.form-associated';

/**
 * This is currently experimental, any use of the color picker must include the following
 * imports and register with the DesignSystem
 *
 * import { fastTextField } from "@microsoft/fast-components";
 * import { DesignSystem } from "@microsoft/fast-foundation";
 * DesignSystem.getOrCreate().register(fastTextField());
 */

/**
 * Simple class for storing all of the color picker UI observable values.
 */
class ColorPickerUI {
  public RGBColor: ColorRGBA64;
  public HSVColor: ColorHSV;
  public HueCSSColor: string;
  public HuePosition: number;
  public SatValTopPos: number;
  public SatValLeftPos: number;
  public AlphaPos: number;

  constructor(rgbColor: ColorRGBA64, hsvColor: ColorHSV) {
    this.RGBColor = rgbColor;
    this.HSVColor = hsvColor;
    this.HueCSSColor = hsvToRGB(new ColorHSV(this.HSVColor.h, 1, 1)).toStringHexRGB();
    this.HuePosition = (this.HSVColor.h / 360) * 100;
    this.SatValLeftPos = this.HSVColor.s * 100;
    this.SatValTopPos = 100 - this.HSVColor.v * 100;
    this.AlphaPos = this.RGBColor.a * 100;
  }
}

/**
 * A Color Picker Custom HTML Element.
 *
 * @public
 */
export class ColorPicker extends FormAssociatedColorPicker {
  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly: boolean;
  private readOnlyChanged(): void {
    if (this.proxy instanceof HTMLElement) {
      this.proxy.readOnly = this.readOnly;
    }
  }

  /**
   * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: autofocus
   */
  @attr({ mode: 'boolean' })
  public autofocus: boolean;
  private autofocusChanged(): void {
    if (this.proxy instanceof HTMLElement) {
      this.proxy.autofocus = this.autofocus;
    }
  }

  /**
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @public
   * @remarks
   * HTML Attribute: placeholder
   * Using this attribute does is not a valid substitute for a labeling element.
   */
  @attr
  public placeholder: string;
  private placeholderChanged(): void {
    if (this.proxy instanceof HTMLElement) {
      this.proxy.placeholder = this.placeholder;
    }
  }

  /**
   * Flag indicating that the color UI is visible.
   */
  @observable
  public open: boolean;

  /**
   * Flag indicating that the color UI is activily listening for mouse move and up events.
   */
  @observable
  public mouseActive: boolean = false;

  /**
   * Object containing all of the properties displayed in the color picker UI.
   */
  @observable
  public uiValues: ColorPickerUI = new ColorPickerUI(new ColorRGBA64(1, 0, 0), new ColorHSV(0, 1, 1));

  /**
   * A reference to the internal input element
   * @internal
   */
  public control: HTMLInputElement;

  /**
   * A reference to the HTMLElement that is the current target of mouse move events.
   */
  private currentMouseTarget: HTMLElement | null = null;

  /**
   * A string indicating which of the three graphical elements is the current mouse target. ['sv','h','a']
   */
  private currentMouseParam: string | null;

  /**
   * The ColorRGBA64 representation of the current color value.
   */
  private currentRGBColor: ColorRGBA64;

  /**
   * The ColorHSV representation of the current color value.
   */
  private currentHSVColor: ColorHSV;

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    this.open = false;
    this.initColorValues();
    this.proxy.setAttribute('type', 'color');

    if (this.autofocus) {
      DOM.queueUpdate(() => {
        this.focus();
      });
    }
  }

  /**
   * Handles the focus event. When the template has focus the color UI will be visable.
   * @internal
   */
  public handleFocus(): void {
    // Re-init colors in case the value changed externally since the UI was last visible.
    this.initColorValues();
    this.open = true;
  }

  /**
   * Handles the blur event. Hides the color UI when the template loses focus.
   * @internal
   */
  public handleBlur(): void {
    this.open = false;
  }

  /**
   * Handles the internal control's `input` event. This event is fired whenever a user types directly into the primary text field.
   * @internal
   */
  public handleTextInput(): void {
    this.initialValue = this.control.value;
    if (this.isValideCSSColor(this.value)) {
      this.currentRGBColor = parseColor(this.value)!;
      this.currentHSVColor = rgbToHSV(this.currentRGBColor);
      this.updateUIValues(false);
      this.$emit('change');
    }
  }

  /**
   * Handles the mouse down event on the Sat/Val square and Hue and Alpha sliders. Sets the current targeted element and begins listening for mouse move events.
   * @param param ['sv','h','a'] - string specifying which color property is being modified with the mouse.
   * @param e - A reference to the mouse event.
   */
  public handleMouseDown(param: string, e: MouseEvent) {
    this.currentMouseTarget = e.composedPath()[0] as HTMLElement;
    this.currentMouseParam = param;
    this.updateFromMouseEvent(e.pageX, e.pageY);
    this.mouseActive = true;
  }

  /**
   * Handles the mouse move event within the color UI. Is only called once the mouseActive is set to true.
   * @param e - Reference to the Mouse Event
   */
  public handleMouseMove(e: MouseEvent) {
    this.updateFromMouseEvent(e.pageX, e.pageY);
  }

  /**
   * Handles the mouse up event within the color UI. Disables listening for mouse move events.
   * @param e - Reference to the Mouse Event
   */
  public handleMouseUp(e: MouseEvent) {
    this.updateFromMouseEvent(e.pageX, e.pageY);
    this.currentMouseTarget = null;
    this.currentMouseParam = null;
    this.mouseActive = false;
  }

  /**
   * Handles changes to any of the color property text inputs typed by the user.
   * @param param ['r','g','b','a','h','s','v'] - String specifying which color value is being modified.
   * @param e - Reference to the event.
   */
  public handleTextValueInput(param: string, e: Event) {
    const inputVal = (e.composedPath()[0] as HTMLInputElement).value;
    if (isNullOrWhiteSpace(inputVal) || Number.isNaN(inputVal)) {
      return;
    }
    const newVal: number = parseInt(inputVal, 10);

    if (['r', 'g', 'b', 'a'].includes(param)) {
      if ((param !== 'a' && this.isValidRGB(newVal)) || (param === 'a' && this.isValidAlpha(newVal))) {
        this.currentRGBColor = new ColorRGBA64(
          param === 'r' ? newVal / 255 : this.currentRGBColor.r,
          param === 'g' ? newVal / 255 : this.currentRGBColor.g,
          param === 'b' ? newVal / 255 : this.currentRGBColor.b,
          param === 'a' ? newVal / 100 : this.currentRGBColor.a,
        );
        this.currentHSVColor = rgbToHSV(this.currentRGBColor);
        this.updateUIValues(true);
      }
    } else if (['h', 's', 'v'].includes(param)) {
      if ((param !== 'h' && this.isValidSaturationValue(newVal)) || (param === 'h' && this.isValidHue(newVal))) {
        this.updateHSV(
          param === 'h' ? newVal : this.currentHSVColor.h,
          param === 's' ? newVal / 100 : this.currentHSVColor.s,
          param === 'v' ? newVal / 100 : this.currentHSVColor.v,
        );
      }
    }
  }

  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  public handleChange(): void {
    this.$emit('change');
  }

  /**
   * Initialize internal color values based on input value and set the UI elements
   * to the correct positions / values.
   */
  private initColorValues(): void {
    if (!isNullOrWhiteSpace(this.value)) {
      this.currentRGBColor = parseColor(this.value)!;
    } else {
      this.currentRGBColor = new ColorRGBA64(1, 0, 0, 1);
    }
    this.currentHSVColor = rgbToHSV(this.currentRGBColor);
    this.updateUIValues(false);
  }

  /**
   * Determines if a number value is within the valid range for an R, G, or B color channel.
   * @param val - Number to be evaluated.
   */
  private isValidRGB(val: number): boolean {
    return val >= 0 && val <= 255;
  }

  /**
   * Determines if a number value is within the valid range for the alpha channel.
   * @param val - Number to be evaluated.
   */
  private isValidAlpha(val: number): boolean {
    return val >= 0 && val <= 100;
  }

  /**
   * Determines if a number value is within the valid range for the saturation or value color channels.
   * @param val - Number to be evaluated.
   */
  private isValidSaturationValue(val: number): boolean {
    return val >= 0 && val <= 100;
  }

  /**
   * Determines if a number value is within the valid range for the hue color channel.
   * @param val - Number to be evaluated.
   */
  private isValidHue(val: number): boolean {
    return val >= 0 && val <= 359;
  }

  /**
   * Checks if input is a valid CSS color.
   * After placing an invalid css color value into a color style property the value will be an empty string when read back.
   * @internal
   */
  private isValideCSSColor(testValue: string): boolean {
    /* Set the background color of the proxy element since it is not visible in the UI. */
    this.proxy.style.backgroundColor = '';
    this.proxy.style.backgroundColor = testValue;
    /* Read the value back out. If it was not a valid color value then it will be an empty string when read back out. */
    return this.proxy.style.backgroundColor !== '';
  }

  /**
   * Update the current color values to a new HSV color.
   * @param hue The new Hue value.
   * @param sat The new saturation value.
   * @param val The new Value value.
   */
  private updateHSV(hue: number, sat: number, val: number) {
    this.currentHSVColor = new ColorHSV(hue, sat, val);
    this.currentRGBColor = hsvToRGB(this.currentHSVColor, this.currentRGBColor.a);
    this.updateUIValues(true);
  }

  /**
   * Update the current color values based on the mouse position over one of the three UI elements (hue, saturation/value, or alpha).
   * @param pageX The pageX position of the mouse.
   * @param pageY The pageY position of the mouse.
   */
  private updateFromMouseEvent(pageX: number, pageY: number) {
    const pos: DOMRect = this.currentMouseTarget!.getBoundingClientRect();
    let x = pageX - pos.left;
    let y = pageY - pos.top;
    const width = pos.width;
    const height = pos.height;

    if (x > width) x = width;
    if (y > height) y = height;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    if (this.currentMouseParam === 'h') {
      this.updateHSV((359 * x) / width, this.currentHSVColor.s, this.currentHSVColor.v);
    } else if (this.currentMouseParam === 'sv') {
      this.updateHSV(
        this.currentHSVColor.h,
        Math.round((x * 100) / width) / 100,
        Math.round(100 - (y * 100) / height) / 100,
      );
    } else if (this.currentMouseParam === 'a') {
      this.currentRGBColor = new ColorRGBA64(
        this.currentRGBColor.r,
        this.currentRGBColor.g,
        this.currentRGBColor.b,
        Math.round((x * 100) / width) / 100,
      );
      this.updateUIValues(true);
    }
  }

  /**
   * Update the UI values with the current color. This updates the position of the indicators over the Sat/Val, Hue and Alpha elements
   * and the values in all of the text fields at once.
   * @param updateValue - Flag to trigger updating of the main text field value and emitting the change event.
   */
  private updateUIValues(updateValue: boolean) {
    this.uiValues = new ColorPickerUI(this.currentRGBColor, this.currentHSVColor);
    if (updateValue) {
      this.initialValue =
        this.currentRGBColor.a !== 1 ? this.currentRGBColor.toStringWebRGBA() : this.currentRGBColor.toStringHexRGB();
      this.$emit('change');
    }
  }
}
