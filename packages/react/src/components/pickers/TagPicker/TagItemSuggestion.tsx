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
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const TagItemSuggestionBase = (props: ITagItemSuggestionProps): JSX.Element => {
  const { styles, theme, children, ...rest } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
  });

  return (
    <div className={classNames.suggestionTextOverflow} {...rest}>
      {' '}
      {children}{' '}
    </div>
  );
};

export const TagItemSuggestion = styled<
  ITagItemSuggestionProps,
  ITagItemSuggestionStyleProps,
  ITagItemSuggestionStyles
>(TagItemSuggestionBase, getStyles, undefined, { scope: 'TagItemSuggestion' });
