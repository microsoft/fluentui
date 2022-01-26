import * as React from 'react';

import { classNamesFunction, styled } from '../../../Utilities';
import { getStyles } from './TagItemSuggestion.styles';
import type {
  ITagItemSuggestionProps,
  ITagItemSuggestionStyleProps,
  ITagItemSuggestionStyles,
} from './TagPicker.types';

const getClassNames = classNamesFunction<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>();

/**
 * {@docCategory TagPicker}
 */
export const TagItemSuggestionBase = (props: ITagItemSuggestionProps) => {
  const { styles, theme, children } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
  });

  return <div className={classNames.suggestionTextOverflow}> {children} </div>;
};

export const TagItemSuggestion = styled<
  ITagItemSuggestionProps,
  ITagItemSuggestionStyleProps,
  ITagItemSuggestionStyles
>(TagItemSuggestionBase, getStyles, undefined, { scope: 'TagItemSuggestion' });
