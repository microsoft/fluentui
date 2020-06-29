import * as React from 'react';
import { IPickerItemProps } from './PickerItem.types';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { ISuggestionModel, ISuggestionsProps } from './Suggestions/Suggestions.types';
import { Autofill } from '../../Autofill';
import { ICalloutProps } from '../../Callout';
import { ITheme, IStyle } from '../../Styling';
import { ISuggestionItemProps } from '../pickers/Suggestions/SuggestionsItem.types';

/**
 * BasePicker component.
 * {@docCategory Pickers}
 */
export interface IBasePicker<T> {
  /** Gets the current value of the input. */
  items: T[] | undefined;

  /** Sets focus to the focus zone. */
  focus: () => void;

  /** Set focus to the input */
  focusInput: () => void;

  /**
   * When called, will take the currently selected suggestion and complete it.
   * If called with forceComplete true, it will attempt to force the current suggestion
   * to complete, must provide both createGenericSuggestion, so the text can be turned into
   * an object in the right shape, and onValidateInput, so the object knows if it's correct or not.
   */
  completeSuggestion: (forceComplete?: boolean) => void;
}

/**
 * Type T is the type of the item that is displayed
 * and searched for by the picker. For example, if the picker is
 * displaying persona's then type T could either be of Persona or IPersona props
 * {@docCategory Pickers}
 */
// tslint:disable-next-line:deprecation
export interface IBasePickerProps<T> extends React.Props<any> {
  /**
   * Optional callback to access the IBasePicker interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IBasePicker<T>>;

  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;

  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  onRenderSuggestionsItem?: (props: T, itemProps: ISuggestionItemProps<T>) => JSX.Element;

  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
   */
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
   * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
   * Only until after the timer completes will onResolveSuggestions be called.
   */
  resolveDelay?: number;

  /**
   * A callback for what should happen when a user clicks within the input area.
   * @deprecated Please use onEmptyResolveSuggestions instead, as the suggestions aren't about
   * setting focus as they are about resolving suggestions when there is no input.
   */
  onEmptyInputFocus?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * A callback for what should happen when suggestions are shown without
   * input provided.
   * Returns the already selected items so the resolver can filter them out.
   * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
   */
  onEmptyResolveSuggestions?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];

  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;

  /**
   * A callback for when the user put focus on the picker
   * @deprecated Use `inputProps.onFocus` instead
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | Autofill>;

  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T, currentValue?: string) => string;

  /**
   * A callback that gets the rest of the results when a user clicks get more results.
   */
  onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * ClassName for the picker.
   */
  className?: string;

  /**
   * The properties that will get passed to the Suggestions component.
   */
  pickerSuggestionsProps?: IBasePickerSuggestionsProps;

  /**
   * The properties that will get passed to the Callout component.
   */
  pickerCalloutProps?: ICalloutProps;

  /**
   * AutoFill input native props
   * @defaultvalue undefined
   */
  inputProps?: IInputProps;

  /**
   * A callback for when an item is removed from the suggestion list
   */
  onRemoveSuggestion?: (item: T) => void;

  /**
   * A function used to validate if raw text entered into the well can be added into the selected items list
   */
  onValidateInput?: (input: string) => ValidationState;

  /**
   * The text to display while searching for more results in a limited suggestions list
   */
  searchingText?: ((props: { input: string }) => string) | string;

  /**
   * Flag for disabling the picker.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Restrict the amount of selectable items.
   * @defaultvalue undefined
   */
  itemLimit?: number;

  /**
   * Function that specifies how arbitrary text entered into the well is handled.
   */
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T> | T;

  /**
   * Aria label for the "X" button in the selected item component.
   * @defaultvalue ''
   */
  removeButtonAriaLabel?: string;

  /**
   * A callback to process a selection after the user selects something from the picker. If the callback returns null,
   * the item will not be added to the picker.
   */
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;

  /**
   * The items that the base picker should currently display as selected.
   * If this is provided then the picker will act as a controlled component.
   */
  selectedItems?: T[];

  /**
   * A callback used to modify the input string.
   */
  onInputChange?: (input: string) => string;

  /**
   * A callback to override the default behavior of adding the selected suggestion on dismiss.
   */
  onDismiss?: (ev?: any, selectedItem?: T) => void;

  /**
   * Adds an additional alert for the currently selected suggestion. This prop should be set to true for IE11 and below,
   * as it enables proper screen reader behavior for each suggestion (since aria-activedescendant does not work
   * with IE11). It should not be set for modern browsers (Edge, Chrome).
   * @defaultvalue false
   */
  enableSelectedSuggestionAlert?: boolean;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles>;

  /**
   * Theme provided by styled() function.
   */
  theme?: ITheme;
}

/**
 * Subset of picker options that may be legally passed through a picker to its
 * internal Suggestions component.
 * {@docCategory Pickers}
 */
export interface IBasePickerSuggestionsProps<T = any>
  extends Pick<
    ISuggestionsProps<T>,
    | 'onRenderNoResultFound'
    | 'suggestionsHeaderText'
    | 'mostRecentlyUsedHeaderText'
    | 'noResultsFoundText'
    | 'className'
    | 'suggestionsClassName'
    | 'suggestionsItemClassName'
    | 'searchForMoreText'
    | 'forceResolveText'
    | 'loadingText'
    | 'searchingText'
    | 'resultsFooterFull'
    | 'resultsFooter'
    | 'resultsMaximumNumber'
    | 'showRemoveButtons'
    | 'suggestionsAvailableAlertText'
    | 'suggestionsContainerAriaLabel'
    | 'showForceResolve'
  > {}

/**
 * Validation state of the user's input.
 * {@docCategory Pickers}
 */
export enum ValidationState {
  /** User input is valid. */
  valid,

  /** User input could be valid or invalid, its state is not known yet. */
  warning,

  /** User input is invalid. */
  invalid,
}

/**
 * Pickers' input props interface
 * {@docCategory Pickers}
 */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Screen reader label to apply to an input element.
   */
  'aria-label'?: string;

  /**
   * The default value to be visible when the autofill first created.
   * This is different than placeholder text because the placeholder text will disappear and re-appear. This
   * text persists until deleted or changed.
   */
  defaultVisibleValue?: string;
}

/**
 * The props needed to construct styles.
 * {@docCategory Pickers}
 */
export type IBasePickerStyleProps = Pick<IBasePickerProps<any>, 'theme' | 'className' | 'disabled'> & {
  /** Whether text style area is focused */
  isFocused?: boolean;

  /** Optional pickerInput className */
  inputClassName?: string;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Pickers}
 */
export interface IBasePickerStyles {
  /** Root element of any picker extending from BasePicker (wraps all the elements). */
  root: IStyle;

  /**
   * Refers to the elements already selected (picked) wrapped by `itemsWrapper` along with the input to type
   * a new selection.
   */
  text: IStyle;

  /** Refers to the items already selected (picked). */
  itemsWrapper: IStyle;

  /** Refers to the input were to type new selections (picks). */
  input: IStyle;

  /** Refers to helper element used for accessibility tools (hidden from view on screen). */
  screenReaderText: IStyle;
}
