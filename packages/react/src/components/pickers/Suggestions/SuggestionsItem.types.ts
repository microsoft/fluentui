import * as React from 'react';
import type { IStyle, ITheme } from '../../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../../Utilities';
import type { ISuggestionModel } from './Suggestions.types';
import { IIconProps } from '../../Icon/Icon.types';
/**
 * SuggestionItem component.
 * {@docCategory Pickers}
 */
export interface ISuggestionsItem {}

/**
 * Suggestion item props. Refers to the each individual suggested items rendered within Suggestions callout.
 * Type T is the type of the item that is displayed.
 * {@docCategory Pickers}
 */
export interface ISuggestionItemProps<T> {
  /**
   * Optional callback to access the ISuggestionItem interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISuggestionsItem>;

  /** Individual suggestion object containing its properties. */
  suggestionModel: ISuggestionModel<T>;

  /** Optional renderer to override the default one for each type of picker. */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RenderSuggestion: (item: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;

  /** Callback for when the user clicks on the suggestion. */
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /** Callback for when the item is removed from the array of suggested items. */
  onRemoveItem: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /** Optional className for the root element of the suggestion item. */
  className?: string;

  /** Unique id of the suggested item. */
  id?: string;

  /** Whether the remove button should be rendered or not. */
  showRemoveButton?: boolean;

  /** An override for the 'selected' property of the SuggestionModel. */
  isSelectedOverride?: boolean;

  /**
   * The ARIA label for the button to remove the suggestion from the list.
   */
  removeButtonAriaLabel?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ISuggestionsItemStyleProps, ISuggestionsItemStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;

  /**
   *  Props for the icon used in the item's remove button.
   *  @defaultvalue `{ iconName:'Cancel' }`
   */
  removeButtonIconProps?: IIconProps;
}

/**
 * The props needed to construct SuggestionItem styles.
 * {@docCategory Pickers}
 */
export type ISuggestionsItemStyleProps = Required<Pick<ISuggestionItemProps<any>, 'theme'>> &
  Pick<ISuggestionItemProps<any>, 'className'> & {
    /** Whether the suggestion item is selected or not. */
    suggested?: boolean;
  };

/**
 * Represents the stylable areas of the SuggestionItem.
 * {@docCategory Pickers}
 */
export interface ISuggestionsItemStyles {
  /** Root element of the suggested item. */
  root: IStyle;

  /** Refers to the CommandButton holding the content of the suggested item. */
  itemButton: IStyle;

  /** Refers to the remove button in case it's rendered. */
  closeButton: IStyle;
}
