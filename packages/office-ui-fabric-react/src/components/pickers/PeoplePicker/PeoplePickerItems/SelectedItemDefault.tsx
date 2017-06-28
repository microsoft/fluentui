/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IPeoplePickerItemProps } from './PeoplePickerItem.Props';
import { IconButton } from '../../../../Button';
import styles from './PickerItemsDefault.scss';
// const styles: any = stylesImport;

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
          size={ PersonaSize.size28 }
        />
      </div>
      <IconButton
        onClick={ () => { if (onRemoveItem) { onRemoveItem(); } } }
        iconProps={ { iconName: 'Cancel' } }
        className={ css('ms-PickerItem-removeButton', styles.removeButton) }
        data-is-focusable={ false }
      />
    </div >
  );
};
