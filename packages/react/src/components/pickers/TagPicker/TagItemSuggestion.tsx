import * as React from 'react';

import { classNamesFunction, styled } from '../../../Utilities';
import { getStyles } from './TagItemSuggestion.styles';
import type {
  ITagItemSuggestionProps,
  ITagItemSuggestionStyleProps,
  ITagItemSuggestionStyles,
} from './TagPicker.types';

import type { JSXElement } from '@fluentui/utilities';

const getClassNames = classNamesFunction<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>();

/**
 * {@docCategory TagPicker}
 */

export const TagItemSuggestionBase = (props: ITagItemSuggestionProps): JSXElement => {
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
