/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export const baseElementEvents = new Set<string>([
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
export const baseElementAttributes = new Set<string>([
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
  'role', // global
  'style', // global
  'tabIndex', // global
  'title', // global
  'translate', // global
  'spellCheck', // global
  'name', // global
]);

/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export const htmlElementAttributes = new Set<string>([...baseElementAttributes, ...baseElementEvents]);

/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */
export const labelAttributes = new Set<string>([...htmlElementAttributes, 'form']);

/**
 * An array of AUDIO tag properties and events.
 *
 * @public
 */
export const audioAttributes = new Set<string>([
  ...htmlElementAttributes,
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
export const videoAttributes = new Set<string>([
  ...audioAttributes,
  'poster', // video
]);

/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export const olAttributes = new Set<string>([
  ...htmlElementAttributes,
  'start', // ol
]);

/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export const liAttributes = new Set<string>([
  ...htmlElementAttributes,
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * An array of A tag properties and events.
 *
 * @public
 */
export const anchorAttributes = new Set<string>([
  ...htmlElementAttributes,
  'download', // a, area
  'href', // a, area, base, link
  'hrefLang', // a, area, link
  'media', // a, area, link, source, style
  'rel', // a, area, link
  'target', // a, area, base, form
  'type', // a, button, input, link, menu, object, script, source, style
]);

/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export const buttonAttributes = new Set<string>([
  ...htmlElementAttributes,
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
export const inputAttributes = new Set<string>([
  ...buttonAttributes,
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
export const textAreaAttributes = new Set<string>([
  ...buttonAttributes,
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
export const selectAttributes = new Set<string>([
  ...buttonAttributes,
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'multiple', // input, select
  'required', // input, select, textarea
]);

export const optionAttributes = new Set<string>([
  ...htmlElementAttributes,
  'selected', // option
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export const tableAttributes = new Set<string>([
  ...htmlElementAttributes,
  'cellPadding', // table
  'cellSpacing', // table
]);

/**
 * An array of TR tag properties and events.
 *
 * @public
 */
export const trAttributes = htmlElementAttributes;

/**
 * An array of TH tag properties and events.
 *
 * @public
 */
export const thAttributes = new Set([
  ...htmlElementAttributes,
  'rowSpan', // td, th
  'scope', // th
]);

/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export const tdAttributes = new Set([
  ...htmlElementAttributes,
  'colSpan', // td
  'headers', // td
  'rowSpan', // td, th
  'scope', // th
]);

export const colGroupAttributes = new Set([
  ...htmlElementAttributes,
  'span', // col, colgroup
]);

export const colAttributes = new Set([
  ...htmlElementAttributes,
  'span', // col, colgroup
]);

/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export const formAttributes = new Set([
  ...htmlElementAttributes,
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
export const iframeAttributes = new Set([
  ...htmlElementAttributes,
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
export const imgAttributes = new Set([
  ...htmlElementAttributes,
  'alt', // area, img, input
  'crossOrigin', // img
  'height', // canvas, embed, iframe, img, input, object, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'srcSet', // img, source
  'useMap', // img, object,
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export const divAttributes = htmlElementAttributes;
