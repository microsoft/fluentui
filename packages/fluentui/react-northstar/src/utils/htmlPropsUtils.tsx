import * as _ from 'lodash';

export const htmlImageProps = ['alt', 'height', 'src', 'srcSet', 'width'];

export type HtmlInputEvents =
  // keyboard
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onFocus'
  | 'onBlur'

  // form
  | 'onChange'
  | 'onInput'

  // mouse
  | 'onClick'
  | 'onContextMenu'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onMouseDown'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseOut'
  | 'onMouseOver'
  | 'onMouseUp'

  // selection
  | 'onSelect'

  // touch
  | 'onTouchCancel'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchStart';

export type HtmlInputAttrs =
  // REACT |
  | 'selected'
  | 'defaultValue'
  | 'defaultChecked'

  // LIMITED HTML PROPS
  | 'accept'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'autoFocus'
  | 'checked'
  | 'disabled'
  | 'form'
  | 'id'
  | 'list'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'multiple'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'step'
  | 'type'
  | 'value';

export type SupportedIntrinsicInputProps = {
  [K in HtmlInputProps]?: K extends keyof JSX.IntrinsicElements['input'] ? JSX.IntrinsicElements['input'][K] : any;
};

export const htmlInputAttrs: HtmlInputAttrs[] = [
  // REACT
  'selected',
  'defaultValue',
  'defaultChecked',

  // LIMITED HTML PROPS
  'accept',
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'autoFocus',
  'checked',
  'disabled',
  'form',
  'id',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'step',
  'type',
  'value',
];

export type HtmlInputProps = HtmlInputAttrs | HtmlInputEvents;

export const htmlInputEvents: HtmlInputEvents[] = [
  // EVENTS
  // keyboard
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // focus
  'onFocus',
  'onBlur',

  // form
  'onChange',
  'onInput',

  // mouse
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',

  // selection
  'onSelect',

  // touch
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
];

export const htmlInputProps: HtmlInputProps[] = [...htmlInputAttrs, ...htmlInputEvents];

export interface PartitionHTMLPropsOptions {
  /** An array of html input props */
  htmlProps?: HtmlInputProps[];
  /** Includes all input props that starts with "aria-" */
  includeAria?: boolean;
}

/**
 * Returns props of html input element and restProps.
 * @param props - A ReactElement props object
 * @param options - Options for
 * @returns - 2-element array. First element is props of HTML input element and second element is the other props.
 */
export const partitionHTMLProps = (
  props: { [key: string]: any },
  options: PartitionHTMLPropsOptions = {},
): [{ [key: string]: any }, { [key: string]: any }] => {
  const { htmlProps = htmlInputProps, includeAria = true } = options;
  const inputProps = {};
  const restProps = {};

  _.forEach(props, (val, prop) => {
    const possibleAria = includeAria && (/^aria-.*$/.test(prop) || prop === 'role');
    const target = _.includes(htmlProps, prop) || possibleAria ? inputProps : restProps;
    target[prop] = val;
  });

  return [inputProps, restProps];
};
