import * as React from 'react';

import { classNamesFunction, styled } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { getStyles } from './PeoplePickerItemSuggestion.styles';
import type { IStyleFunctionOrObject } from '../../../../Utilities';
import type { IPersonaStyleProps, IPersonaStyles } from '../../../../Persona';
import type {
  IPeoplePickerItemSuggestionProps,
  IPeoplePickerItemSuggestionStyleProps,
  IPeoplePickerItemSuggestionStyles,
} from './PeoplePickerItem.types';

const getClassNames = classNamesFunction<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>();

export const PeoplePickerItemSuggestionBase = (props: IPeoplePickerItemSuggestionProps) => {
  const { personaProps, suggestionsProps, compact, styles, theme, className } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className: (suggestionsProps && suggestionsProps.suggestionsItemClassName) || className,
  });

  const personaStyles =
    classNames.subComponentStyles && classNames.subComponentStyles.persona
      ? (classNames.subComponentStyles.persona as IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>)
      : undefined;

  return (
    <div className={classNames.root}>
      <Persona
        size={PersonaSize.size24}
        styles={personaStyles}
        className={classNames.personaWrapper}
        showSecondaryText={!compact}
        showOverflowTooltip={false}
        {...personaProps}
      />
    </div>
  );
};

export const PeoplePickerItemSuggestion = styled<
  IPeoplePickerItemSuggestionProps,
  IPeoplePickerItemSuggestionStyleProps,
  IPeoplePickerItemSuggestionStyles
>(PeoplePickerItemSuggestionBase, getStyles, undefined, { scope: 'PeoplePickerItemSuggestion' });
