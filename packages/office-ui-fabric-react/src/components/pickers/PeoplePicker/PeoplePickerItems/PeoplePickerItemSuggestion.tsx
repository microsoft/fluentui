import * as React from 'react';

import { classNamesFunction, styled } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import {
  IPeoplePickerItemSuggestionProps,
  IPeoplePickerItemSuggestionStyleProps,
  IPeoplePickerItemSuggestionStyles
} from './PeoplePickerItem.types';
import { getStyles } from './PeoplePickerItemSuggestion.styles';

const getClassNames = classNamesFunction<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>();

export const PeoplePickerItemSuggestionBase = (props: IPeoplePickerItemSuggestionProps) => {
  const { personaProps, suggestionsProps, compact, styles, theme, className } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className: (suggestionsProps && suggestionsProps.suggestionsItemClassName) || className
  });

  return (
    <div className={classNames.root}>
      <Persona size={PersonaSize.size24} className={classNames.personaWrapper} showSecondaryText={!compact} {...personaProps} />
    </div>
  );
};

export const PeoplePickerItemSuggestion = styled<
  IPeoplePickerItemSuggestionProps,
  IPeoplePickerItemSuggestionStyleProps,
  IPeoplePickerItemSuggestionStyles
>(PeoplePickerItemSuggestionBase, getStyles, undefined, { scope: 'PeoplePickerItemSuggestion' });
