import * as React from 'react';
import { Autofill } from '@fluentui/react';
import type { IRefObject } from '@fluentui/utilities';
import type { IBaseFloatingSuggestionsProps } from '../FloatingSuggestionsComposite/FloatingSuggestions.types';
import type { ISelectedItemsListProps } from '../SelectedItemsList/SelectedItemsList.types';
import type { IFocusZoneProps, IInputProps, IDragDropEvents } from '@fluentui/react';

export interface IUnifiedPickerProps<T> {
  /**
   * Ref of the component
   */
  componentRef?: IRefObject<any>;

  /**
   * ClassName for the picker
   */
  className?: string;

  /**
   * Component to render selected items
   * selectedItemsListProps will be passed as props to this component
   */
  onRenderSelectedItems: (props: ISelectedItemsListProps<T>) => JSX.Element;

  /**
   * Props to pass to SelectedItems component
   */
  selectedItemsListProps: ISelectedItemsListProps<T>;

  /**
   * Component to render floating suggestions
   * floatingSuggestionProps will be passed as props to this component
   */
  onRenderFloatingSuggestions: (props: IBaseFloatingSuggestionsProps<T>) => JSX.Element;

  /**
   * Props to pass to floating suggestions component
   */
  floatingSuggestionProps: IBaseFloatingSuggestionsProps<T>;

  /**
   * Current query string to show in input component
   */
  currentRenderedQuerystring?: string;

  /**
   * Callback when input query string changes
   */
  onQueryStringChange?: (query: string) => void;

  /**
   * A callback for when the user put focus on the picker
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * Focus zone props
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * Autofill input native props
   * @defaultvalue undefined
   */
  inputProps?: IInputProps;

  /**
   * Header component
   */
  headerComponent?: JSX.Element;

  /**
   * On paste to input
   */
  onPaste?: (pastedValue: string, selectedItemsList: T[]) => void;

  /**
   * On input value change
   */
  onInputChange?: (filter: string, composing?: boolean, resultItemsList?: T[]) => void;

  /**
   * Callback for when a key is pressed
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLDivElement>) => void;

  /**
   * Drag drop events callback interface
   */
  dragDropEvents?: IDragDropEvents;

  /**
   * String used in drag drop to identify information for this specific control
   * Is only used when dragDropEvents is not specified (default)
   * getSerializedItems and getDeserializedItems on the selectedItemsListProps should be specified as well
   * if this is used
   */
  customClipboardType?: string;

  /**
   * If dragDropEvents is set, this property will be ignored
   * @defaultvalue true
   */
  defaultDragDropEnabled?: boolean;

  /**
   * If this property is not specified, defaultDragDropEnabled will be used
   * @defaultvalue true
   */
  autofillDragDropEnabled?: boolean;

  /**
   * Function to customize drop behavior over the autofill portion
   * If this is not set, but autofillDragDropEnabled is, the built
   * in drop behavior will be used.
   */
  onDropAutoFill?: (event?: React.DragEvent<HTMLDivElement>) => void;

  /**
   * A function used to validate if raw text entered into the well can be added
   */
  onValidateInput?: (input: string) => boolean;

  /**
   * An ARIA label for the div that is the parent of the items.
   */
  itemListAriaLabel?: string;

  /**
   * Callback when item(s) are deleted, to get the proper text to
   * notify screen readers about the delete operation.
   */
  getAccessibleTextForDelete?: (items: T[]) => string;
}
