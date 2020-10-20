import * as React from 'react';
import { IRefObject } from '@uifabric/utilities';
import { IBaseFloatingSuggestionsProps } from '../FloatingSuggestionsComposite/FloatingSuggestions.types';
import { ISelectedItemsListProps } from '../SelectedItemsList/SelectedItemsList.types';
import { IFocusZoneProps, IInputProps, Autofill, IDragDropEvents } from '@fluentui/react';

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
}
