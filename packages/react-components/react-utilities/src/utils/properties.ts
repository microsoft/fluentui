const toObjectMap = (...items: (string[] | Record<string, number>)[]) => {
  const result: Record<string, number> = {};

  for (const item of items) {
    const keys = Array.isArray(item) ? item : Object.keys(item);

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
export const baseElementEvents = toObjectMap([
  'onAuxClick',
  'onAnimationEnd',
  'onAnimationStart',
  'onCopy',
  'onCut',
  'onPaste',
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate',
  'onFocus',
  'onFocusCapture',
  'onBlur',
  'onBlurCapture',
  'onChange',
  'onInput',
  'onSubmit',
  'onLoad',
  'onError',
  'onKeyDown',
  'onKeyDownCapture',
  'onKeyPress',
  'onKeyUp',
  'onAbort',
  'onCanPlay',
  'onCanPlayThrough',
  'onDurationChange',
  'onEmptied',
  'onEncrypted',
  'onEnded',
  'onLoadedData',
  'onLoadedMetadata',
  'onLoadStart',
  'onPause',
  'onPlay',
  'onPlaying',
  'onProgress',
  'onRateChange',
  'onSeeked',
  'onSeeking',
  'onStalled',
  'onSuspend',
  'onTimeUpdate',
  'onVolumeChange',
  'onWaiting',
  'onClick',
  'onClickCapture',
  'onContextMenu',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseDownCapture',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onMouseUpCapture',
  'onSelect',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
  'onScroll',
  'onWheel',
  'onPointerCancel',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerMove',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp',
  'onGotPointerCapture',
  'onLostPointerCapture',
]);

/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export const baseElementProperties = toObjectMap([
  'accessKey', // global
  'children', // global
  'className', // global
  'contentEditable', // global
  'dir', // global
  'draggable', // global
  'hidden', // global
  'htmlFor', // global
  'id', // global
  'lang', // global
  'ref', // global
  'role', // global
  'style', // global
  'tabIndex', // global
  'title', // global
  'translate', // global
  'spellCheck', // global
  'name', // global
]);

/**
 * An array of microdata attributes that are allowed on every html element type.
 *
 * @public
 */
export const microdataProperties = toObjectMap([
  'itemID', // global
  'itemProp', // global
  'itemRef', // global
  'itemScope', // global
  'itemType', // global
]);

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
export const labelProperties = toObjectMap(htmlElementProperties, [
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
]);

/**
 * An array of AUDIO tag properties and events.

 * @public
 */
export const audioProperties = toObjectMap(htmlElementProperties, [
  'height', // canvas, embed, iframe, img, input, object, video
  'loop', // audio, video
  'muted', // audio, video
  'preload', // audio, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */
export const videoProperties = toObjectMap(audioProperties, [
  'poster', // video
]);

/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export const olProperties = toObjectMap(htmlElementProperties, [
  'start', // ol
]);

/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export const liProperties = toObjectMap(htmlElementProperties, [
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * An array of A tag properties and events.
 *
 * @public
 */
export const anchorProperties = toObjectMap(htmlElementProperties, [
  'download', // a, area
  'href', // a, area, base, link
  'hrefLang', // a, area, link
  'media', // a, area, link, source, style
  'rel', // a, area, link
  'target', // a, area, base, form
  'type', // a, button, input, link, menu, object, script, source, style
]);

/**
 * An array of TIME tag properties and events.
 *
 * @public
 */
export const timeProperties = toObjectMap(htmlElementProperties, [
  'dateTime', // time
]);

/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export const buttonProperties = toObjectMap(htmlElementProperties, [
  'autoFocus', // button, input, select, textarea
  'disabled', // button, fieldset, input, optgroup, option, select, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'formAction', // input, button
  'formEncType', // input, button
  'formMethod', // input, button
  'formNoValidate', // input, button
  'formTarget', // input, button
  'type', // a, button, input, link, menu, object, script, source, style
  'value', // button, input, li, option, meter, progress, param,
]);

/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export const inputProperties = toObjectMap(buttonProperties, [
  'accept', // input
  'alt', // area, img, input
  'autoCapitalize', // input, textarea
  'autoComplete', // form, input
  'checked', // input
  'dirname', // input, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'height', // canvas, embed, iframe, img, input, object, video
  'inputMode', // input
  'list', // input
  'max', // input, meter
  'maxLength', // input, textarea
  'min', // input, meter
  'multiple', // input, select
  'pattern', // input
  'placeholder', // input, textarea
  'readOnly', // input, textarea
  'required', // input, select, textarea
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'step', // input
  'size', // input
  'type', // a, button, input, link, menu, object, script, source, style
  'value', // button, input, li, option, meter, progress, param
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export const textAreaProperties = toObjectMap(buttonProperties, [
  'autoCapitalize', // input, textarea
  'cols', // textarea
  'dirname', // input, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'maxLength', // input, textarea
  'placeholder', // input, textarea
  'readOnly', // input, textarea
  'required', // input, select, textarea
  'rows', // textarea
  'wrap', // textarea
]);

/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */
export const selectProperties = toObjectMap(buttonProperties, [
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'multiple', // input, select
  'required', // input, select, textarea
]);

export const optionProperties = toObjectMap(htmlElementProperties, [
  'selected', // option
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export const tableProperties = toObjectMap(htmlElementProperties, [
  'cellPadding', // table
  'cellSpacing', // table
]);

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
export const thProperties = toObjectMap(htmlElementProperties, [
  'colSpan', // td, th
  'rowSpan', // td, th
  'scope', // th
]);

/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export const tdProperties = toObjectMap(htmlElementProperties, [
  'colSpan', // td
  'headers', // td
  'rowSpan', // td, th
  'scope', // th
]);

export const colGroupProperties = toObjectMap(htmlElementProperties, [
  'span', // col, colgroup
]);

export const colProperties = toObjectMap(htmlElementProperties, [
  'span', // col, colgroup
]);

/**
 * An array of FIELDSET tag properties and events.
 *
 * @public
 */
export const fieldsetProperties = toObjectMap(htmlElementProperties, [
  'disabled', // button, fieldset, input, optgroup, option, select, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
]);

/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export const formProperties = toObjectMap(htmlElementProperties, [
  'acceptCharset', // form
  'action', // form
  'encType', // form
  'encType', // form
  'method', // form
  'noValidate', // form
  'target', // form
]);

/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */
export const iframeProperties = toObjectMap(htmlElementProperties, [
  'allow', // iframe
  'allowFullScreen', // iframe
  'allowPaymentRequest', // iframe
  'allowTransparency', // iframe
  'csp', // iframe
  'height', // canvas, embed, iframe, img, input, object, video
  'importance', // iframe
  'referrerPolicy', // iframe
  'sandbox', // iframe
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'srcDoc', // iframe
  'width', // canvas, embed, iframe, img, input, object, video,
]);

/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export const imgProperties = toObjectMap(htmlElementProperties, [
  'alt', // area, img, input
  'crossOrigin', // img
  'height', // canvas, embed, iframe, img, input, object, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'srcSet', // img, source
  'useMap', // img, object,
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of DIALOG tag properties and events.
 *
 * @public
 */
export const dialogProperties = toObjectMap(htmlElementProperties, ['open', 'onCancel', 'onClose']);

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
      (!isArray && (allowedPropNames as Record<string, number>)[key]) ||
      (isArray && (allowedPropNames as string[]).indexOf(key) >= 0) ||
      key.indexOf('data-') === 0 ||
      key.indexOf('aria-') === 0;

    if (isNativeProp && (!excludedPropNames || excludedPropNames?.indexOf(key) === -1)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = props![key] as any;
    }
  }

  return result as T;
}
