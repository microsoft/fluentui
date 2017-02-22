/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IPeoplePickerItemProps } from './PeoplePickerItem.Props';
import { Button, ButtonType } from '../../../../Button';
import styles from './PickerItemsDefault.scss';

export const SelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (peoplePickerItemProps: IPeoplePickerItemProps) => {
  let {
    item,
    onRemoveItem,
    index,
    selected
  } = peoplePickerItemProps;
  return (
    <div
      className={ css('ms-PickerPersona-container', styles.pickerPersonaContainer, {
        ['is-selected ' + styles.isSelected]: selected
      }) }
      data-is-focusable={ true }
      data-selection-index={ index } >
      <div className={ css('ms-PickerItem-content', styles.pickerItemContent) } >
        <Persona
          { ...item }
          presence={ item.presence !== undefined ? item.presence : PersonaPresence.none }
          size={ PersonaSize.extraSmall }
        />
      </div>
      <Button
        onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }
        icon={ 'Cancel' }
        buttonType={ ButtonType.icon }
        className={ css('ms-PickerItem-content', styles.pickerItemContent) }
        data-is-focusable={ false }
      >
      </Button>
    </div >
  );
};