import * as React from 'react';

/**
 * A set of events that are allowed on every html element type.
 */
export const baseElementEvents = new Set<keyof React.DOMAttributes<{}>>([
  'onAuxClick',
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

type CommonAttributes = 'ref' | 'name';

/**
 * A set of element attributes which are allowed on every html element type.
 */
export const baseElementProperties = new Set<keyof React.HTMLAttributes<{}> | CommonAttributes>([
  'accessKey', // global
  'children', // global
  'className', // global
  'contentEditable', // global
  'dir', // global
  'draggable', // global
  'hidden', // global
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
 * A set of HTML element properties and events.
 */
export const htmlElementProperties = new Set<keyof React.HTMLAttributes<{}> | CommonAttributes>([
  ...baseElementProperties,
  ...baseElementEvents,
]);

/**
 * A set of LABEL tag properties and events.
 */
export const labelProperties = new Set<keyof React.LabelHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'htmlFor', // label, output
]);

/**
 * A set of AUDIO tag properties and events.
 */
export const audioProperties = new Set<keyof React.AudioHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'loop', // audio, video
  'muted', // audio, video
  'preload', // audio, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
]);

/**
 * A set of VIDEO tag properties and events.
 */
export const videoProperties = new Set<keyof React.VideoHTMLAttributes<{}> | CommonAttributes>([
  ...audioProperties,
  'height', // canvas, embed, iframe, img, input, object, video
  'poster', // video
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * A set of OL tag properties and events.
 */
export const olProperties = new Set<keyof React.OlHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'start', // ol
]);

/**
 * A set of LI tag properties and events.
 */
export const liProperties = new Set<keyof React.LiHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * A set of A tag properties and events.
 */
export const anchorProperties = new Set<keyof React.AnchorHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'download', // a, area
  'href', // a, area, base, link
  'hrefLang', // a, area, link
  'media', // a, area, link, source, style
  'rel', // a, area, link
  'target', // a, area, base, form
  'type', // a, button, input, link, menu, object, script, source, style
]);

/**
 * A set of BUTTON tag properties and events.
 */
export const buttonProperties = new Set<keyof React.ButtonHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
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
 * A set of INPUT tag properties and events.
 */
export const inputProperties = new Set<keyof React.InputHTMLAttributes<{}> | CommonAttributes>([
  ...buttonProperties,
  'accept', // input
  'alt', // area, img, input
  'autoCapitalize', // input, textarea
  'autoComplete', // form, input
  'checked', // input
  'defaultChecked',
  'defaultValue',
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
 * A set of TEXTAREA tag properties and events.
 */
export const textAreaProperties = new Set<keyof React.TextareaHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'autoCapitalize', // input, textarea
  'autoComplete',
  'autoFocus',
  'cols', // textarea
  'dirName', // textarea
  'disabled',
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'maxLength', // input, textarea
  'minLength',
  'placeholder', // input, textarea
  'readOnly', // input, textarea
  'required', // input, select, textarea
  'rows', // textarea
  'value',
  'wrap', // textarea
]);

/**
 * A set of SELECT tag properties and events.
 */
export const selectProperties = new Set<keyof React.SelectHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'autoComplete',
  'autoFocus',
  'defaultValue',
  'disabled',
  'form', // button, fieldset, input, label, meter, object, output, select, textarea
  'multiple', // input, select
  'name',
  'required', // input, select, textarea
  'size',
  'value',
]);

export const optionProperties = new Set<keyof React.OptionHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'selected', // option
  'value', // button, input, li, option, meter, progress, param
]);

/**
 * A set of TABLE tag properties and events.
 */
export const tableProperties = new Set<keyof React.TableHTMLAttributes<{}> | CommonAttributes>([
  ...htmlElementProperties,
  'cellPadding', // table
  'cellSpacing', // table
]);

/**
 * A set of TR tag properties and events.
 */
export const trProperties = htmlElementProperties;

/**
 * A set of TH tag properties and events.
 */
export const thProperties = new Set([
  ...htmlElementProperties,
  'rowSpan', // td, th
  'scope', // th
]);

/**
 * A set of TD tag properties and events.
 */
export const tdProperties = new Set([
  ...htmlElementProperties,
  'colSpan', // td
  'headers', // td
  'rowSpan', // td, th
  'scope', // th
]);

export const colGroupProperties = new Set([
  ...htmlElementProperties,
  'span', // col, colgroup
]);

export const colProperties = new Set([
  ...htmlElementProperties,
  'span', // col, colgroup
]);

/**
 * A set of FORM tag properties and events.
 */
export const formProperties = new Set([
  ...htmlElementProperties,
  'acceptCharset', // form
  'action', // form
  'encType', // form
  'encType', // form
  'method', // form
  'noValidate', // form
  'target', // form
]);

/**
 * A set of IFRAME tag properties and events.
 */
export const iframeProperties = new Set([
  ...htmlElementProperties,
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
 * A set of IMAGE tag properties and events.
 */
export const imgProperties = new Set([
  ...htmlElementProperties,
  'alt', // area, img, input
  'crossOrigin', // img
  'height', // canvas, embed, iframe, img, input, object, video
  'src', // audio, embed, iframe, img, input, script, source, track, video
  'srcSet', // img, source
  'useMap', // img, object,
  'width', // canvas, embed, iframe, img, input, object, video
]);

/**
 * A set of DIV tag properties and events.
 */
export const divProperties = htmlElementProperties;

/**
 * Gets native supported props for an HTML element provided the allowance set. Use one of the property
 * sets defined (`divProperties`, `buttonPropertes`, etc) to filter out supported properties from a given
 * props set. Note that all `data-` and `aria-` prefixed attributes will be allowed.
 *
 * NOTE: `getNativeProps` should always be applied first when adding props to a React component. The
 * non-native props should be applied second. This will prevent `getNativeProps` from overriding your custom props.
 * For example, if props passed to `getNativeProps` has an `onClick` function and `getNativeProps` is added to
 * the component after an `onClick` function is added, then the `getNativeProps` `onClick` will override it.
 * @param props - The unfiltered input props
 * @param allowedPropsNames - The set of allowed prop names.
 * @returns The filtered props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNativeProps<T extends Record<string, any>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  allowedPropNames: Set<string>,
  excludedPropNames?: string[],
  extraPropNames?: string[],
): T {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for
  // JSX attributes, but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then
  // return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  const keys = Object.keys(props);

  for (const key of keys) {
    const isNativeProp =
      allowedPropNames.has(key) || extraPropNames?.includes(key) || key.startsWith('data-') || key.startsWith('aria-');

    if (isNativeProp && !excludedPropNames?.includes(key)) {
      result[key] = props[key];
    }
  }

  return result as T;
}
