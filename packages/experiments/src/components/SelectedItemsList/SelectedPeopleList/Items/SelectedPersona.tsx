import * as React from 'react';
import { getId, styled, classNamesFunction, IStyleFunctionOrObject, css } from 'office-ui-fabric-react/lib/Utilities';
import { Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ISelectedItemProps } from '../../SelectedItemsList.types';
import { getStyles } from './SelectedPersona.styles';
import { ISelectedPersonaStyles, ISelectedPersonaStyleProps } from './SelectedPersona.types';
import { ITheme, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

const getClassNames = classNamesFunction<ISelectedPersonaStyleProps, ISelectedPersonaStyles>();

type ISelectedPersonaProps<TPersona> = ISelectedItemProps<TPersona> & {
  isValid?: (item: TPersona) => boolean;
  canExpand?: (item: TPersona) => boolean;
  getExpandedItems?: (item: TPersona) => TPersona[];

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISelectedPersonaStyleProps, ISelectedPersonaStyles>;

  /**
   * Theme for the component.
   */
  theme?: ITheme;
};

/**
 * A selected persona with support for item removal and expansion.
 *
 * To use the removal / expansion, bind isValid / canExpand /  getExpandedItems
 * when passing the onRenderItem to your SelectedItemsList
 */
const SelectedPersonaInner = React.memo(<TPersona extends IPersonaProps = IPersonaProps>(props: ISelectedPersonaProps<TPersona>) => {
  const {
    item,
    onRemoveItem,
    onItemChange,
    removeButtonAriaLabel,
    index,
    selected,
    isValid,
    canExpand,
    getExpandedItems,
    styles,
    theme
  } = props;
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
      onRemoveItem && onRemoveItem();
    },
    [onRemoveItem]
  );

  const classNames: IProcessedStyleSet<ISelectedPersonaStyles> = React.useMemo(
    () =>
      getClassNames(styles, {
        isSelected: selected || false,
        isValid: isValid ? isValid(item) : true,
        theme: theme!
      }),
    [selected, isValid, theme]
  );

  const coinProps = {};

  return (
    <div
      onContextMenu={props.onContextMenu}
      onClick={props.onClick}
      className={css('ms-PickerPersona-container', classNames.personaContainer)}
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
          className={css('ms-PickerItem-removeButton', classNames.expandButton)}
          styles={classNames.subComponentStyles.actionButtonStyles()}
          ariaLabel={removeButtonAriaLabel}
        />
      </div>
      <div className={css(classNames.personaWrapper)}>
        <div className={css('ms-PickerItem-content', classNames.itemContentWrapper)} id={'selectedItemPersona-' + itemId}>
          <Persona {...item} size={PersonaSize.size32} styles={classNames.subComponentStyles.personaStyles} coinProps={coinProps} />
        </div>
        <IconButton
          onClick={onRemoveClicked}
          iconProps={{ iconName: 'Cancel', style: { fontSize: '14px' } }}
          className={css('ms-PickerItem-removeButton', classNames.removeButton)}
          styles={classNames.subComponentStyles.actionButtonStyles()}
          ariaLabel={removeButtonAriaLabel}
        />
      </div>
    </div>
  );
});

// export casting back to typeof inner to preserve generics.
export const SelectedPersona = styled<ISelectedPersonaProps<any>, ISelectedPersonaStyleProps, ISelectedPersonaStyles>(
  SelectedPersonaInner,
  getStyles,
  undefined,
  {
    scope: 'SelectedPersona'
  }
) as typeof SelectedPersonaInner;
