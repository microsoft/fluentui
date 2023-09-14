import * as React from 'react';

import { getId, classNamesFunction, styled } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { IconButton, IButton } from '../../../../Button';
import { ValidationState } from '../../BasePicker.types';
import { getStyles } from './PeoplePickerItem.styles';
import type { IStyleFunctionOrObject } from '../../../../Utilities';
import type {
  IPersonaStyleProps,
  IPersonaStyles,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles,
} from '../../../../Persona';
import type {
  IPeoplePickerItemSelectedProps,
  IPeoplePickerItemSelectedStyleProps,
  IPeoplePickerItemSelectedStyles,
} from './PeoplePickerItem.types';

const getClassNames = classNamesFunction<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>();

export const PeoplePickerItemBase = (props: IPeoplePickerItemSelectedProps) => {
  const {
    item,
    onRemoveItem,
    index,
    selected,
    removeButtonAriaLabel,
    styles,
    theme,
    className,
    disabled,
    removeButtonIconProps,
  } = props;

  const buttonRef = React.createRef<IButton>();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    buttonRef.current?.focus();
  };

  const itemId = getId();

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected,
    disabled,
    invalid: item.ValidationState === ValidationState.warning,
  });

  const personaStyles = classNames.subComponentStyles
    ? (classNames.subComponentStyles.persona as IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>)
    : undefined;

  const personaCoinStyles = classNames.subComponentStyles
    ? (classNames.subComponentStyles.personaCoin as IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>)
    : undefined;

  return (
    <div data-selection-index={index} className={classNames.root} role={'listitem'} key={index} onClick={handleClick}>
      <div className={classNames.itemContent} id={'selectedItemPersona-' + itemId}>
        <Persona size={PersonaSize.size24} styles={personaStyles} coinProps={{ styles: personaCoinStyles }} {...item} />
      </div>
      <IconButton
        componentRef={buttonRef}
        id={itemId}
        onClick={onRemoveItem}
        disabled={disabled}
        iconProps={removeButtonIconProps ?? { iconName: 'Cancel' }}
        styles={{ icon: { fontSize: '12px' } }}
        className={classNames.removeButton}
        ariaLabel={removeButtonAriaLabel}
        aria-labelledby={`${itemId} selectedItemPersona-${itemId}`}
      />
    </div>
  );
};

export const PeoplePickerItem = styled<
  IPeoplePickerItemSelectedProps,
  IPeoplePickerItemSelectedStyleProps,
  IPeoplePickerItemSelectedStyles
>(PeoplePickerItemBase, getStyles, undefined, { scope: 'PeoplePickerItem' });
