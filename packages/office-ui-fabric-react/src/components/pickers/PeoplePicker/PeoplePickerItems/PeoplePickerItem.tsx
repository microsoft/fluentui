import * as React from 'react';

import { getId, classNamesFunction, styled, IStyleFunctionOrObject } from '../../../../Utilities';
import { Persona, PersonaSize, IPersonaStyleProps, IPersonaStyles, IPersonaCoinStyleProps, IPersonaCoinStyles } from '../../../../Persona';
import { IconButton } from '../../../../Button';
import { ValidationState } from '../../BasePicker.types';
import {
  IPeoplePickerItemSelectedProps,
  IPeoplePickerItemSelectedStyleProps,
  IPeoplePickerItemSelectedStyles
} from './PeoplePickerItem.types';
import { getStyles } from './PeoplePickerItem.styles';

const getClassNames = classNamesFunction<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>();

export const PeoplePickerItemBase = (props: IPeoplePickerItemSelectedProps) => {
  const { item, onRemoveItem, index, selected, removeButtonAriaLabel, styles, theme, className } = props;

  const itemId = getId();

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected,
    invalid: item.ValidationState === ValidationState.warning
  });

  const personaStyles = classNames.subComponentStyles
    ? (classNames.subComponentStyles.persona as IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>)
    : undefined;

  const personaCoinStyles = classNames.subComponentStyles
    ? (classNames.subComponentStyles.personaCoin as IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>)
    : undefined;

  return (
    <div
      className={classNames.root}
      data-is-focusable={true}
      data-is-sub-focuszone={true}
      data-selection-index={index}
      role={'listitem'}
      aria-labelledby={'selectedItemPersona-' + itemId}
    >
      <div className={classNames.itemContent} id={'selectedItemPersona-' + itemId}>
        <Persona size={PersonaSize.size28} styles={personaStyles} coinProps={{ styles: personaCoinStyles }} {...item} />
      </div>
      <IconButton
        onClick={onRemoveItem}
        iconProps={{ iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }}
        className={classNames.removeButton}
        ariaLabel={removeButtonAriaLabel}
      />
    </div>
  );
};

export const PeoplePickerItem = styled<
  IPeoplePickerItemSelectedProps,
  IPeoplePickerItemSelectedStyleProps,
  IPeoplePickerItemSelectedStyles
>(PeoplePickerItemBase, getStyles, undefined, { scope: 'PeoplePickerItem' });
