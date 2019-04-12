/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { css, getId } from 'office-ui-fabric-react/lib/Utilities';
import { Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ISelectedItemProps } from '../../SelectedItemsList.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as stylesImport from './SelectedPersona.scss';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

type ISelectedPersonaProps<TPersona> = ISelectedItemProps<TPersona> & {
  isValid?: (item: TPersona) => boolean;
  canExpand?: (item: TPersona) => boolean;
  getExpandedItems?: (item: TPersona) => TPersona[];
};

/**
 * A selected persona with support for item removal and expansion.
 *
 * To use the removal / expansion, bind isValid / canExpand /  getExpandedItems
 * when passing the onRenderItem to your SelectedItemsList
 */
export const SelectedPersona = React.memo(<TPersona extends IPersonaProps = IPersonaProps>(props: ISelectedPersonaProps<TPersona>) => {
  const { item, onRemoveItem, onItemChange, removeButtonAriaLabel, index, selected, isValid, canExpand, getExpandedItems } = props;
  const itemId = getId();

  const onExpandClicked = React.useCallback(
    ev => {
      ev.stopPropagation();
      ev.preventDefault();
      if (onItemChange && getExpandedItems) {
        onItemChange(getExpandedItems(item), index);
      }
    },
    [onItemChange, getExpandedItems, item, index]
  );

  const onRemoveClicked = React.useCallback(
    ev => {
      ev.stopPropagation();
      ev.preventDefault();
      onRemoveItem && onRemoveItem(item);
    },
    [onRemoveItem]
  );

  return (
    <div
      onContextMenu={props.onContextMenu}
      onClick={props.onClick}
      className={css(
        'ms-PickerPersona-container',
        styles.personaContainer,
        { ['is-selected ' + styles.personaContainerIsSelected]: selected },
        { ['is-invalid ' + styles.validationError]: isValid && !isValid(item) }
      )}
      data-is-focusable={true}
      data-is-sub-focuszone={true}
      data-selection-index={index}
      role={'listitem'}
      aria-labelledby={'selectedItemPersona-' + itemId}
    >
      <div hidden={!canExpand || !canExpand(item) || !getExpandedItems}>
        <IconButton
          onClick={onExpandClicked}
          iconProps={{ iconName: 'Add', style: { fontSize: '14px' } }}
          className={css('ms-PickerItem-removeButton', styles.expandButton, styles.actionButton)}
          ariaLabel={removeButtonAriaLabel}
        />
      </div>
      <div className={css(styles.personaWrapper)}>
        <div className={css('ms-PickerItem-content', styles.itemContent)} id={'selectedItemPersona-' + itemId}>
          <Persona {...item} size={PersonaSize.size32} />
        </div>
        <IconButton
          onClick={onRemoveClicked}
          iconProps={{ iconName: 'Cancel', style: { fontSize: '14px' } }}
          className={css('ms-PickerItem-removeButton', styles.removeButton, styles.actionButton)}
          ariaLabel={removeButtonAriaLabel}
        />
      </div>
    </div>
  );
});
