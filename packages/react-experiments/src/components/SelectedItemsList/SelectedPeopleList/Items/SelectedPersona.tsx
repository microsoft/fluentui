import * as React from 'react';
import { styled, classNamesFunction, css, EventGroup } from '@fluentui/react/lib/Utilities';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { getStyles } from './SelectedPersona.styles';
import { IconButton } from '@fluentui/react/lib/Button';
import { useId } from '@fluentui/react-hooks';
import type { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { ISelectedItemProps } from '../../SelectedItemsList.types';
import type { ISelectedPersonaStyles, ISelectedPersonaStyleProps } from './SelectedPersona.types';
import type { ITheme, IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import type { IDragDropOptions } from '@fluentui/react/lib/DragDrop';

const getClassNames = classNamesFunction<ISelectedPersonaStyleProps, ISelectedPersonaStyles>();

type ISelectedPersonaProps<TPersona> = ISelectedItemProps<TPersona> & {
  isValid?: (item: TPersona) => boolean;
  canExpand?: (item: TPersona) => boolean;
  getExpandedItems?: (item: TPersona) => Promise<TPersona[]>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISelectedPersonaStyleProps, ISelectedPersonaStyles>;

  /**
   * Theme for the component.
   */
  theme?: ITheme;
};

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
const DEFAULT_PERSONA_SIZE = PersonaSize.size32;

/**
 * A selected persona with support for item removal and expansion.
 *
 * To use the removal / expansion, bind isValid / canExpand /  getExpandedItems
 * when passing the onRenderItem to your SelectedItemsList
 */
const SelectedPersonaInner = React.memo(
  <TPersona extends IPersonaProps = IPersonaProps>(props: ISelectedPersonaProps<TPersona>) => {
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
      theme,
      dragDropHelper,
      dragDropEvents,
      eventsToRegister,
    } = props;
    const itemId = useId();
    const [isDropping, setIsDropping] = React.useState(false);
    const [droppingClassNames, setDroppingClassNames] = React.useState('');

    const rootRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(
      () => {
        const _updateDroppingState = (newValue: boolean, event: DragEvent) => {
          if (!newValue) {
            if (dragDropEvents!.onDragLeave) {
              dragDropEvents!.onDragLeave(item, event);
            }
          } else if (dragDropEvents!.onDragEnter) {
            setDroppingClassNames(dragDropEvents!.onDragEnter(item, event));
          }

          if (isDropping !== newValue) {
            setIsDropping(newValue);
          }
        };

        const dragDropOptions: IDragDropOptions = {
          eventMap: eventsToRegister,
          selectionIndex: index,
          context: { data: item, index: index },
          ...dragDropEvents,
          updateDropState: _updateDroppingState,
        };

        const events = new EventGroup(this);

        const subscription = dragDropHelper?.subscribe(rootRef.current as HTMLElement, events, dragDropOptions);

        return () => {
          subscription?.dispose();
          events.dispose();
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps -- this is the only dependency which matters
      [dragDropHelper],
    );

    const isDraggable = React.useMemo(
      () => (dragDropEvents && dragDropEvents.canDrag ? !!dragDropEvents.canDrag!() : undefined),
      [dragDropEvents],
    );

    const droppingClassName = React.useMemo(
      () => (isDropping ? droppingClassNames || DEFAULT_DROPPING_CSS_CLASS : ''),
      [isDropping, droppingClassNames],
    );

    const onExpandClicked = React.useCallback(
      ev => {
        ev.stopPropagation();
        ev.preventDefault();
        if (onItemChange && getExpandedItems) {
          getExpandedItems(item)
            .then(value => {
              onItemChange(value, index);
            })
            .catch(error => {
              // No op
            });
        }
      },
      [onItemChange, getExpandedItems, item, index],
    );

    const onRemoveClicked = React.useCallback(
      ev => {
        ev.stopPropagation();
        ev.preventDefault();
        onRemoveItem && onRemoveItem();
      },
      [onRemoveItem],
    );

    const itemSize = React.useMemo(() => item?.size || DEFAULT_PERSONA_SIZE, [item]);

    const buttonSize = React.useMemo(
      () => (itemSize === PersonaSize.size8 ? 8 : itemSize === PersonaSize.size24 ? 24 : 32),
      [itemSize],
    );

    const classNames: IProcessedStyleSet<ISelectedPersonaStyles> = React.useMemo(
      () =>
        getClassNames(styles, {
          isSelected: selected || false,
          isValid: isValid ? isValid(item) : true,
          theme: theme!,
          droppingClassName,
          buttonSize,
        }),
      [selected, isValid, theme, buttonSize, item, styles, droppingClassName],
    );

    return (
      <div
        ref={rootRef}
        {...(typeof isDraggable === 'boolean'
          ? {
              'data-is-draggable': isDraggable, // This data attribute is used by some host applications.
              draggable: isDraggable,
            }
          : {})}
        onContextMenu={props.onContextMenu}
        onClick={props.onClick}
        className={css('ms-PickerPersona-container', classNames.personaContainer)}
        data-is-focusable={true}
        data-is-sub-focuszone={true}
        data-selection-index={index}
        role={'option'}
        aria-selected={selected}
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
          <div
            className={css('ms-PickerItem-content', classNames.itemContentWrapper)}
            id={'selectedItemPersona-' + itemId}
          >
            <Persona {...item} size={itemSize} styles={classNames.subComponentStyles.personaStyles} />
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
  },
);

// export casting back to typeof inner to preserve generics.
export const SelectedPersona = styled<ISelectedPersonaProps<any>, ISelectedPersonaStyleProps, ISelectedPersonaStyles>(
  SelectedPersonaInner,
  getStyles,
  undefined,
  {
    scope: 'SelectedPersona',
  },
) as typeof SelectedPersonaInner;
