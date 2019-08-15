import { filteredAssign } from './object';

/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export const baseElementEvents = [
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
  'onLostPointerCapture'
];

/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export const baseElementProperties = [
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
  'name' // global
];

/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export const htmlElementProperties = baseElementProperties.concat(baseElementEvents);

/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */
export const labelProperties = htmlElementProperties.concat([
  'form' // button, fieldset, input, label, meter, object, output, select, textarea
]);

/**
 * An array of AUDIO tag properties and events.
 *
 * @public
 */
export const audioProperties = htmlElementProperties.concat([
  'height', // canvas, embed, iframe, img, input, object, video
  'loop', // audio, video
  'muted', // audio, video
  'preload', // audio, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'width' // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */
export const videoProperties = audioProperties.concat([
  'poster' // video
]);

/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export const olProperties = htmlElementProperties.concat([
  'start' // ol
]);

/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export const liProperties = htmlElementProperties.concat([
  'value' // button, input, li, option, meter, progress, param
]);

/**
 * An array of A tag properties and events.
 *
 * @public
 */
export const anchorProperties = htmlElementProperties.concat([
  'download', // a, area
  'href', // a, area, base, link
  'hrefLang', // a, area, link
  'media', // a, area, link, source, style
  'rel', // a, area, link
  'target', // a, area, base, form
  'type' // a, button, input, link, menu, object, script, source, style
]);

/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export const buttonProperties = htmlElementProperties.concat([
  'autoFocus', // button, input, select, textarea
  'disabled', // button, fieldset, input, optgroup, option, select, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'formAction', // input, button
  'formEncType', // input, button
  'formMethod', // input, button
  'formNoValidate', // input, button
  'formTarget', // input, button
  'type', // a, button, input, link, menu, object, script, source, style
  'value' // button, input, li, option, meter, progress, param,
]);

/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export const inputProperties = buttonProperties.concat([
  'accept', // input
  'alt', // area, img, input
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
  'width' // canvas, embed, iframe, img, input, object, video
]);

/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export const textAreaProperties = buttonProperties.concat([
  'cols', // textarea
  'dirname', // input, textarea
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'maxLength', // input, textarea
  'placeholder', // input, textarea
  'readOnly', // input, textarea
  'required', // input, select, textarea
  'rows', // textarea
  'wrap' // textarea
]);

/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */
export const selectProperties = buttonProperties.concat([
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'multiple', // input, select
  'required' // input, select, textarea
]);

export const optionProperties = htmlElementProperties.concat([
  'selected', // option
  'value' // button, input, li, option, meter, progress, param
]);

/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export const tableProperties = htmlElementProperties.concat([
  'cellPadding', // table
  'cellSpacing' // table
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
export const thProperties = htmlElementProperties.concat([
  'rowSpan', // td, th
  'scope' // th
]);

/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export const tdProperties = htmlElementProperties.concat([
  'colSpan', // td
  'headers', // td
  'rowSpan', // td, th
  'scope' // th
]);

export const colGroupProperties = htmlElementProperties.concat([
  'span' // col, colgroup
]);

export const colProperties = htmlElementProperties.concat([
  'span' // col, colgroup
]);

/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export const formProperties = htmlElementProperties.concat([
  'acceptCharset', // form
  'action', // form
  'encType', // form
  'encType', // form
  'method', // form
  'noValidate', // form
  'target' // form
]);

/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */
export const iframeProperties = htmlElementProperties.concat([
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
  'width' // canvas, embed, iframe, img, input, object, video,
]);

/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export const imgProperties = htmlElementProperties.concat([
  'alt', // area, img, input
  'crossOrigin', // img
  'height', // canvas, embed, iframe, img, input, object, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'srcSet', // img, source
  'useMap', // img, object,
  'width' // canvas, embed, iframe, img, input, object, video
]);

/**
 * @deprecated Use imgProperties for img elements.
 */
export const imageProperties = imgProperties;

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
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
export function getNativeProps<T>(props: {}, allowedPropNames: string[], excludedPropNames?: string[]): T {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for JSX attributes,
  // but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797
  return filteredAssign(
    (propName: string) => {
      return (
        (!excludedPropNames || excludedPropNames.indexOf(propName) < 0) &&
        (propName.indexOf('data-') === 0 || propName.indexOf('aria-') === 0 || allowedPropNames.indexOf(propName) >= 0)
      );
    },
    {},
    props
  ) as T;
}
