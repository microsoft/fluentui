/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../Persona';
import { Button, ButtonType } from '../../../Button';
import { IPickerItemProps } from '../../BasePickerProps';
import { css } from '../../../../utilities/css';
import './PickerItemsDefault.scss';
export const SelectedItemDefault: (props: IPickerItemProps<IPersonaProps>) => JSX.Element = (peoplePickerItemProps: IPickerItemProps<IPersonaProps>) => {
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
        icon={ 'x' }
        buttonType={ ButtonType.icon }
        className='ms-base-peoplepicker'
        >
      </Button>
    </div >
  );
};