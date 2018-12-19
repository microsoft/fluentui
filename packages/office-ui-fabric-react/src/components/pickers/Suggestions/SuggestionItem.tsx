import * as React from 'react';

import { styled, classNamesFunction } from '../../../Utilities';
import { CommandButton, IconButton } from '../../../Button';
import { ISuggestionItemProps, ISuggestionItemStyleProps, ISuggestionItemStyles } from './Suggestions.types';
import { getStyles } from './SuggestionItem.styles';

const getClassNames = classNamesFunction<ISuggestionItemStyleProps, ISuggestionItemStyles>();

export const SuggestionItemBase: (props: ISuggestionItemProps<any>) => JSX.Element = (props: ISuggestionItemProps<any>) => {
  const {
    suggestionModel,
    RenderSuggestion,
    onClick,
    className,
    onRemoveItem,
    isSelectedOverride,
    removeButtonAriaLabel,
    showRemoveButton,
    styles,
    theme
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    suggested: suggestionModel.selected || isSelectedOverride
  });

  return (
    <div className={classNames.root}>
      <CommandButton onClick={onClick} className={classNames.itemButton}>
        {RenderSuggestion(suggestionModel.item, props)}
      </CommandButton>
      {showRemoveButton ? (
        <IconButton
          iconProps={{ iconName: 'Cancel', style: { fontSize: '12px' } }}
          title={removeButtonAriaLabel}
          ariaLabel={removeButtonAriaLabel}
          onClick={onRemoveItem}
          className={classNames.closeButton}
        />
      ) : null}
    </div>
  );
};

export const SuggestionItem = styled<ISuggestionItemProps<any>, ISuggestionItemStyleProps, ISuggestionItemStyles>(
  SuggestionItemBase,
  getStyles,
  undefined,
  {
    scope: 'SuggestionsItem'
  }
);
