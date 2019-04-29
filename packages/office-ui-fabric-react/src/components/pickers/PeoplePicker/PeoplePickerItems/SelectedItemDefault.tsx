import * as React from 'react';

import { css, getId } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IPeoplePickerItemSelectedProps } from './PeoplePickerItem.types';
import { ValidationState } from '../../BasePicker.types';
import { IconButton } from '../../../../Button';

import * as stylesImport from './PickerItemsDefault.scss';
const styles: any = stylesImport;

/**
 * @deprecated Use the exported from the package level 'PeoplePickerItem'. Will be removed in Fabric 7.
 */
export const SelectedItemDefault: (props: IPeoplePickerItemSelectedProps) => JSX.Element = (
  peoplePickerItemProps: IPeoplePickerItemSelectedProps
) => {
  const { item, onRemoveItem, index, selected, removeButtonAriaLabel } = peoplePickerItemProps;

  const itemId = getId();
  const onClickIconButton = (removeItem: (() => void) | undefined): (() => void) => {
    return (): void => {
      if (removeItem) {
        removeItem();
      }
    };
  };

  return (
    <div
      className={css(
        'ms-PickerPersona-container',
        styles.personaContainer,
        { ['is-selected ' + styles.personaContainerIsSelected]: selected },
        { ['is-invalid ' + styles.validationError]: item.ValidationState === ValidationState.warning }
      )}
      data-is-focusable={true}
      data-is-sub-focuszone={true}
      data-selection-index={index}
      role={'listitem'}
      aria-labelledby={'selectedItemPersona-' + itemId}
    >
      <div className={css('ms-PickerItem-content', styles.itemContent)} id={'selectedItemPersona-' + itemId}>
        <Persona {...item} presence={item.presence !== undefined ? item.presence : PersonaPresence.none} size={PersonaSize.size28} />
      </div>
      <IconButton
        onClick={onClickIconButton(onRemoveItem)}
        iconProps={{ iconName: 'Cancel', style: { fontSize: '12px' } }}
        className={css('ms-PickerItem-removeButton', styles.removeButton)}
        ariaLabel={removeButtonAriaLabel}
      />
    </div>
  );
};
