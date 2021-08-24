import * as React from 'react';
import { classNamesFunction, css } from '../../../Utilities';
import { getStyles } from './FloatingSuggestionsHeaderFooterItem.styles';
import type {
  IFloatingSuggestionsHeaderFooterItemProps,
  IFloatingSuggestionHeaderFooterItemStylesProps,
  IFloatingSuggestionHeaderFooterItemStyles,
} from './FloatingSuggestionsHeaderFooterItem.types';

const getClassNames = classNamesFunction<
  IFloatingSuggestionHeaderFooterItemStylesProps,
  IFloatingSuggestionHeaderFooterItemStyles
>();

export const FloatingSuggestionsHeaderFooterItem = (props: IFloatingSuggestionsHeaderFooterItemProps): JSX.Element => {
  const { renderItem, onExecute, isSelected, id, className } = props;
  const classNames = getClassNames(getStyles);

  return onExecute ? (
    <div
      id={id}
      onClick={onExecute}
      className={css('ms-Suggestions-sectionButton', className, classNames.actionButton, {
        ['is-selected ' + classNames.buttonSelected]: isSelected,
      })}
    >
      {renderItem()}
    </div>
  ) : (
    <div id={id} className={css('ms-Suggestions-section', className, classNames.actionButton)}>
      {renderItem()}
    </div>
  );
};
