/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IPeoplePickerItemProps } from './PeoplePickerItem.Props';
import { IconButton } from '../../../../Button';
import styles = require('./PickerItemsDefault.scss');

export const SelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let {
    item,
    onRemoveItem,
    index,
    selected
  } = peoplePickerItemProps;
  return (
    <div
      className={ css('ms-PickerPersona-container', styles.personaContainer, {
        ['is-selected ' + styles.personaContainerIsSelected]: selected
      }) }
      data-is-focusable={ true }
      data-selection-index={ index } >
      <div className={ css('ms-PickerItem-content', styles.itemContent) } >
        <Persona
          { ...item }
          presence={ item.presence !== undefined ? item.presence : PersonaPresence.none }
          size={ PersonaSize.extraSmall }
        />
      </div>
      <IconButton
        onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }
        icon={ 'Cancel' }
        className={ css('ms-PickerItem-content', styles.removeButton, styles.itemContent) }
        data-is-focusable={ false }
      >
      </IconButton>
    </div >
  );
};
