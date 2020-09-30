import * as React from 'react';
import {
  styled,
  classNamesFunction,
  IStyleFunctionOrObject,
  css,
  EventGroup,
} from 'office-ui-fabric-react/lib/Utilities';
import { Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ISelectedItemProps } from '../../SelectedItemsList.types';
import { getStyles } from './SelectedPersona.styles';
import { ISelectedPersonaStyles, ISelectedPersonaStyleProps } from './SelectedPersona.types';
import { ITheme, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IDragDropOptions } from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import { useId } from '@uifabric/react-hooks';

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
      () => (dragDropEvents ? !!(dragDropEvents.canDrag && dragDropEvents.canDrop) : undefined),
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
              console.error('getExpandedItems call failed');
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

    const classNames: IProcessedStyleSet<ISelectedPersonaStyles> = React.useMemo(
      () =>
        getClassNames(styles, {
          isSelected: selected || false,
          isValid: isValid ? isValid(item) : true,
          theme: theme!,
          droppingClassName,
        }),
      // TODO: evaluate whether to add deps on `item` and `styles`
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [selected, isValid, theme],
    );

    const coinProps = {};

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
          <div
            className={css('ms-PickerItem-content', classNames.itemContentWrapper)}
            id={'selectedItemPersona-' + itemId}
          >
            <Persona
              {...item}
              size={PersonaSize.size32}
              styles={classNames.subComponentStyles.personaStyles}
              coinProps={coinProps}
            />
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
