import * as React from 'react';
import { css, getId } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IconButton } from '../../../../Button';
import * as stylesImport from './PickerItemsDefault.scss';
import type { IPeoplePickerItemProps } from '../../../../ExtendedPicker';

const styles: any = stylesImport;

export const SelectedItemDefault: (props: IPeoplePickerItemProps) => JSX.Element = (
  peoplePickerItemProps: IPeoplePickerItemProps,
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
        { ['is-invalid ' + styles.validationError]: !item.isValid },
      )}
      data-is-focusable={true}
      data-is-sub-focuszone={true}
      data-selection-index={index}
      role={'listitem'}
      aria-labelledby={'selectedItemPersona-' + itemId}
    >
      <div className={css('ms-PickerItem-content', styles.itemContent)} id={'selectedItemPersona-' + itemId}>
        <Persona
          {...item}
          presence={item.presence !== undefined ? item.presence : PersonaPresence.none}
          // eslint-disable-next-line deprecation/deprecation
          size={PersonaSize.size28}
        />
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
