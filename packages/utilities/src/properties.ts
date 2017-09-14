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
  'onWheel'
];

/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export const baseElementProperties = [
  'defaultChecked',
  'defaultValue',
  'accept',
  'acceptCharset',
  'accessKey',
  'action',
  'allowFullScreen',
  'allowTransparency',
  'alt',
  'async',
  'autoComplete',
  'autoFocus',
  'autoPlay',
  'capture',
  'cellPadding',
  'cellSpacing',
  'charSet',
  'challenge',
  'checked',
  'children',
  'classID',
  'className',
  'cols',
  'colSpan',
  'content',
  'contentEditable',
  'contextMenu',
  'controls',
  'coords',
  'crossOrigin',
  'data',
  'dateTime',
  'default',
  'defer',
  'dir',
  'download',
  'draggable',
  'encType',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'frameBorder',
  'headers',
  'height',
  'hidden',
  'high',
  'hrefLang',
  'htmlFor',
  'httpEquiv',
  'icon',
  'id',
  'inputMode',
  'integrity',
  'is',
  'keyParams',
  'keyType',
  'kind',
  'lang',
  'list',
  'loop',
  'low',
  'manifest',
  'marginHeight',
  'marginWidth',
  'max',
  'maxLength',
  'media',
  'mediaGroup',
  'method',
  'min',
  'minLength',
  'multiple',
  'muted',
  'name',
  'noValidate',
  'open',
  'optimum',
  'pattern',
  'placeholder',
  'poster',
  'preload',
  'radioGroup',
  'readOnly',
  'rel',
  'required',
  'role',
  'rows',
  'rowSpan',
  'sandbox',
  'scope',
  'scoped',
  'scrolling',
  'seamless',
  'selected',
  'shape',
  'size',
  'sizes',
  'span',
  'spellCheck',
  'src',
  'srcDoc',
  'srcLang',
  'srcSet',
  'start',
  'step',
  'style',
  'summary',
  'tabIndex',
  'title',
  'type',
  'useMap',
  'value',
  'width',
  'wmode',
  'wrap'
];

/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export const htmlElementProperties = baseElementProperties.concat(baseElementEvents);

/**
 * An array of A tag properties and events.
 *
 * @public
 */
export const anchorProperties = htmlElementProperties.concat([
  'href',
  'target'
]);

/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export const buttonProperties = htmlElementProperties.concat([
  'disabled'
]);

/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export const divProperties = htmlElementProperties.concat(['align', 'noWrap']);

/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export const inputProperties = buttonProperties;

/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export const textAreaProperties = buttonProperties;

/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export const imageProperties = divProperties;

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
export function getNativeProps<T>(props: any, allowedPropNames: string[], excludedPropNames?: string[]): T {
  return filteredAssign((propName: string) => {
    return (
      (!excludedPropNames || excludedPropNames.indexOf(propName) < 0) && (
        (propName.indexOf('data-') === 0) ||
        (propName.indexOf('aria-') === 0) ||
        (allowedPropNames.indexOf(propName) >= 0)
      ));
  },
    {},
    props) as T;
}
