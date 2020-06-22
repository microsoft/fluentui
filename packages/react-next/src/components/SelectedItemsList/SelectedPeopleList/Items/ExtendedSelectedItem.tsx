import * as React from 'react';
import { css } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { ISelectedPeopleItemProps } from '../SelectedPeopleList';
import * as stylesImport from './ExtendedSelectedItem.scss';
import { useId } from '@uifabric/react-hooks';
import { IconButton } from '@fluentui/react-next/lib/compat/Button';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export const ExtendedSelectedItem = React.forwardRef(
  (
    {
      item,
      onExpandItem,
      onRemoveItem,
      removeButtonAriaLabel,
      index,
      selected,
      renderPersonaCoin,
      renderPrimaryText,
    }: ISelectedPeopleItemProps,
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => {
    const itemId = useId();

    const onClickIconButton = (
      action: (() => void) | undefined,
    ): ((ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void) => {
      return (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
        ev.stopPropagation();
        ev.preventDefault();
        action?.();
      };
    };

    return (
      <div
        ref={forwardedRef}
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
        <div hidden={!item.canExpand || onExpandItem === undefined}>
          <IconButton
            onClick={onClickIconButton(onExpandItem)}
            iconProps={{ iconName: 'Add', style: { fontSize: '14px' } }}
            className={css('ms-PickerItem-removeButton', styles.expandButton, styles.actionButton)}
            ariaLabel={removeButtonAriaLabel}
          />
        </div>
        <div className={css(styles.personaWrapper)}>
          <div className={css('ms-PickerItem-content', styles.itemContent)} id={'selectedItemPersona-' + itemId}>
            <Persona
              {...item}
              onRenderCoin={renderPersonaCoin}
              onRenderPrimaryText={renderPrimaryText}
              size={PersonaSize.size32}
            />
          </div>
          <IconButton
            onClick={onClickIconButton(onRemoveItem)}
            iconProps={{ iconName: 'Cancel', style: { fontSize: '14px' } }}
            className={css('ms-PickerItem-removeButton', styles.removeButton, styles.actionButton)}
            ariaLabel={removeButtonAriaLabel}
          />
        </div>
      </div>
    );
  },
);
ExtendedSelectedItem.displayName = 'ExtendedSelectedItem';
