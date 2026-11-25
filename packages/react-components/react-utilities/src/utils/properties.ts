/**
 * Builds a lookup map from other maps and from space separated lists of names.
 * Names are stored in single strings, rather than arrays, as this keeps the bundled code significantly smaller.
 */
const toObjectMap = (...items: (string | Record<string, number>)[]) => {
  const result: Record<string, number> = {};

  for (const item of items) {
    const keys = typeof item === 'string' ? item.split(' ') : Object.keys(item);

    for (const key of keys) {
      result[key] = 1;
    }
  }

  return result;
};

/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export const baseElementEvents = toObjectMap(
  // The "on" prefix is added at runtime to keep the list short.
  'AuxClick AnimationEnd AnimationStart Copy Cut Paste CompositionEnd CompositionStart CompositionUpdate Focus FocusCapture Blur BlurCapture Change Input Submit Load Error KeyDown KeyDownCapture KeyPress KeyUp Abort CanPlay CanPlayThrough DurationChange Emptied Encrypted Ended LoadedData LoadedMetadata LoadStart Pause Play Playing Progress RateChange Seeked Seeking Stalled Suspend TimeUpdate VolumeChange Waiting Click ClickCapture ContextMenu DoubleClick Drag DragEnd DragEnter DragExit DragLeave DragOver DragStart Drop MouseDown MouseDownCapture MouseEnter MouseLeave MouseMove MouseOut MouseOver MouseUp MouseUpCapture Select TouchCancel TouchEnd TouchMove TouchStart Scroll Wheel PointerCancel PointerDown PointerEnter PointerLeave PointerMove PointerOut PointerOver PointerUp GotPointerCapture LostPointerCapture'.replace(
    /\S+/g,
    'on$&',
  ),
);

/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export const baseElementProperties = toObjectMap(
  'accessKey children className contentEditable dir draggable hidden htmlFor id lang popover focusgroup focusgroupstart ref role style tabIndex title translate spellCheck name',
);

/**
 * An array of microdata attributes that are allowed on every html element type.
 *
 * @public
 */
export const microdataProperties = toObjectMap('itemID itemProp itemRef itemScope itemType');

/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export const htmlElementProperties = toObjectMap(baseElementProperties, baseElementEvents, microdataProperties);

/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */
export const labelProperties = toObjectMap(htmlElementProperties, 'form');

/**
 * An array of AUDIO tag properties and events.

 * @public
 */
export const audioProperties = toObjectMap(htmlElementProperties, 'height loop muted preload src width');

/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */
export const videoProperties = toObjectMap(audioProperties, 'poster');

/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export const olProperties = toObjectMap(htmlElementProperties, 'start');

/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export const liProperties = toObjectMap(htmlElementProperties, 'value');

/**
 * An array of A tag properties and events.
 *
 * @public
 */
export const anchorProperties = toObjectMap(
  htmlElementProperties,
  'download href hrefLang media referrerPolicy rel target type',
);

/**
 * An array of TIME tag properties and events.
 *
 * @public
 */
export const timeProperties = toObjectMap(htmlElementProperties, 'dateTime');

/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export const buttonProperties = toObjectMap(
  htmlElementProperties,
  'autoFocus disabled form formAction formEncType formMethod formNoValidate formTarget popoverTarget popoverTargetAction type value',
);

/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export const inputProperties = toObjectMap(
  buttonProperties,
  'accept alt autoCorrect autoCapitalize autoComplete checked dirname form height inputMode list max maxLength min minLength multiple pattern placeholder readOnly required src step size type value width',
);

/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export const textAreaProperties = toObjectMap(
  buttonProperties,
  'autoCapitalize cols dirname form maxLength placeholder readOnly required rows wrap',
);

/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */
export const selectProperties = toObjectMap(buttonProperties, 'form multiple required');

export const optionProperties = toObjectMap(htmlElementProperties, 'selected value');

/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export const tableProperties = toObjectMap(htmlElementProperties, 'cellPadding cellSpacing');

/**
 * An array of TR tag properties and events.
 *
 * @public
 */
export const trProperties = htmlElementProperties;

/**
 * An array of TH tag properties and events.
 *
 * @public
 */
export const thProperties = toObjectMap(htmlElementProperties, 'colSpan rowSpan scope');

/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export const tdProperties = toObjectMap(htmlElementProperties, 'colSpan headers rowSpan scope');

export const colGroupProperties = toObjectMap(htmlElementProperties, 'span');

export const colProperties = toObjectMap(htmlElementProperties, 'span');

/**
 * An array of FIELDSET tag properties and events.
 *
 * @public
 */
export const fieldsetProperties = toObjectMap(htmlElementProperties, 'disabled form');

/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export const formProperties = toObjectMap(
  htmlElementProperties,
  'acceptCharset action encType method noValidate target',
);

/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */
export const iframeProperties = toObjectMap(
  htmlElementProperties,
  'allow allowFullScreen allowPaymentRequest allowTransparency csp height importance referrerPolicy sandbox src srcDoc width',
);

/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export const imgProperties = toObjectMap(
  htmlElementProperties,
  'alt crossOrigin height loading src srcSet useMap width',
);

/**
 * An array of DIALOG tag properties and events.
 *
 * @public
 */
export const dialogProperties = toObjectMap(htmlElementProperties, 'open onCancel onClose');

/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export const divProperties = htmlElementProperties;

/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropNames - The array or record of allowed prop names.
 * @param excludedPropNames
 * @returns The filtered props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNativeProps<T extends Record<string, any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  allowedPropNames: string[] | Record<string, number>,
  excludedPropNames?: string[],
): T {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for
  // JSX attributes, but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then
  // return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797

  const isArray = Array.isArray(allowedPropNames);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  const keys = Object.keys(props);

  for (const key of keys) {
    const isNativeProp =
      (!isArray && Object.prototype.hasOwnProperty.call(allowedPropNames, key)) ||
      (isArray && (allowedPropNames as string[]).indexOf(key) >= 0) ||
      key.indexOf('data-') === 0 ||
      key.indexOf('aria-') === 0;

    if (key !== '__proto__' && isNativeProp && (!excludedPropNames || excludedPropNames?.indexOf(key) === -1)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = props[key] as any;
    }
  }

  return result as T;
}
