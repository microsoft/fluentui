import * as React from 'react';
import { Persona, PersonaSize, IPersonaProps, PersonaPresence } from '../../../Persona';
import { Button } from '../../../Button';
import { IPickerItemProps } from '../../BasePicker';
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
      <Button className='ms-base-peoplepicker' onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }>
        <i className='ms-Icon ms-Icon--x'></i>
      </Button>
    </div>
  );
};