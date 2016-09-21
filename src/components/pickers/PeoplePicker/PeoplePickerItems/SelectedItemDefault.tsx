/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { Persona, PersonaSize, PersonaPresence } from '../../../Persona';
import { IPeoplePickerItemProps } from './PeoplePickerItem.Props';
import { Button, ButtonType } from '../../../Button';
import { css } from '../../../../utilities/css';
import './PickerItemsDefault.scss';

export const SelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let {
    item,
    onRemoveItem,
    index,
    isSelected
  } = peoplePickerItemProps;
  return (
    <div
      className={css('ms-PickerPersona-Container', {
        'is-selected': isSelected
      }) }
      data-is-focusable={ true }
      data-selection-index={ index }
      key={ index } >
      <Persona
        { ...item }
        presence = { item.presence ? item.presence : PersonaPresence.online }
        size={ PersonaSize.extraSmall }
        className='ms-base-peoplepicker'
        />
      <Button
        onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }
        icon={ 'Cancel' }
        buttonType={ ButtonType.icon }
        className='ms-base-peoplepicker'
        >
      </Button>
    </div >
  );
};