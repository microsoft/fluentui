import * as React from 'react';
import type { IStyle, ITheme } from '../../../Styling';
import type { IStyleFunctionOrObject } from '../../../Utilities';
import type { IPickerItemProps } from '../PickerItem.types';
import type { IBasePickerProps } from '../BasePicker.types';

/**
 * TagPickerItem item interface.
 * {@docCategory TagPicker}
 */
export interface ITag {
  /** Name of the item. */
  name: string;

  /** Unique key for the item. */
  key: string | number;
}

/**
 * TagPicker component props
 * {@docCategory TagPicker}
 */
export interface ITagPickerProps extends IBasePickerProps<ITag> {}

/**
 * TagItem component props
 * {@docCategory TagPicker}
 */
export interface ITagItemProps extends IPickerItemProps<ITag> {
  /** Additional CSS class(es) to apply to the TagItem root element. */
  className?: string;

  /**
   * Enable or not focus on TagItem when TagPicker is disabled.
   * @defaultvalue false
   */
  enableTagFocusInDisabledPicker?: boolean;

  /**
   * The title (and aria-label) attribute used by the TagItem text element.
   * @defaultvalue children if of type string or item.name
   */
  title?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

/**
 * The props needed to construct TagItem styles.
 * {@docCategory TagPicker}
 */
export type ITagItemStyleProps = Required<Pick<ITagItemProps, 'theme'>> &
  Pick<ITagItemProps, 'className' | 'selected' | 'disabled'> & {};

/**
 * Represents the stylable areas of the TagItem.
 * {@docCategory TagPicker}
 */
export interface ITagItemStyles {
  /** Root element of picked TagItem */
  root: IStyle;

  /** Refers to the text element of the TagItem already picked. */
  text: IStyle;

  /** Refers to the cancel action button on a picked TagItem. */
  close: IStyle;
}

/**
 * TagItemSuggestion component props
 * {@docCategory TagPicker}
 */
export interface ITagItemSuggestionProps extends React.AllHTMLAttributes<HTMLElement> {
  /** Additional CSS class(es) to apply to the TagItemSuggestion div element */
  className?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

/**
 * The props needed to construct TagItemSuggestion styles.
 * {@docCategory TagPicker}
 */
export type ITagItemSuggestionStyleProps = Required<Pick<ITagItemSuggestionProps, 'theme'>> &
  Pick<ITagItemSuggestionProps, 'className'> & {};

/**
 * Represents the stylable areas of the TagItemSuggestion
 * {@docCategory TagPicker}
 */
export interface ITagItemSuggestionStyles {
  /** Refers to the text element of the TagItemSuggestion */
  suggestionTextOverflow?: IStyle;
}
