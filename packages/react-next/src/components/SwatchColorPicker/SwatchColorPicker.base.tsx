import * as React from 'react';
import { classNamesFunction, KeyCodes } from '../../Utilities';
import {
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles,
} from './SwatchColorPicker.types';
import { Grid } from '../../utilities/grid/Grid';
import { IColorCellProps } from './ColorPickerGridCell.types';
import { ColorPickerGridCell } from './ColorPickerGridCell';
import { useId, useConst, useSetTimeout, useControllableValue, useWarnings } from '@uifabric/react-hooks';
import { IGridProps } from '../../utilities/grid/Grid.types';

export interface ISwatchColorPickerState {
  isNavigationIdle: boolean;
  cellFocused: boolean;
  navigationIdleTimeoutId: number | undefined;
  navigationIdleDelay: number;
}

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>();

const COMPONENT_NAME = 'SwatchColorPicker';

function useDebugWarnings(props: ISwatchColorPickerProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      mutuallyExclusive: { focusOnHover: 'onHover' },
      deprecations: { positionInSet: 'ariaPosInSet', setSize: 'ariaSetSize' },
    });
  }
}

export const SwatchColorPickerBase = React.forwardRef<HTMLElement, ISwatchColorPickerProps>((props, ref) => {
  const defaultId = useId('swatchColorPicker');
  const id = props.id || defaultId;

  const internalState = useConst<ISwatchColorPickerState>(() => ({
    isNavigationIdle: true,
    cellFocused: false,
    navigationIdleTimeoutId: undefined,
    navigationIdleDelay: 250,
  }));

  const { setTimeout, clearTimeout } = useSetTimeout();

  useDebugWarnings(props);

  const {
    colorCells,
    cellShape = 'circle',
    columnCount,
    // eslint-disable-next-line deprecation/deprecation
    ariaPosInSet = props.positionInSet,
    // eslint-disable-next-line deprecation/deprecation
    ariaSetSize = props.setSize,
    shouldFocusCircularNavigate = true,
    className,
    disabled = false,
    doNotContainWithinFocusZone,
    styles,
    cellMargin = 10,
    defaultSelectedId,
    onChange,
    onCellHovered,
  } = props;

  /**
   *  Add an index to each color cells. Memoizes this so that color cells do not re-render on every update.
   */
  const getItemsWithIndex = React.useMemo(() => {
    return colorCells.map((item, index) => {
      return { ...item, index: index };
    });
  }, [colorCells]);

  const [selectedId, setSelectedId] = useControllableValue(props.selectedId, defaultSelectedId, onChange);

  const classNames = getClassNames(styles!, {
    theme: props.theme!,
    className,
    cellMargin,
  });

  const gridStyles = {
    root: classNames.root,
    tableCell: classNames.tableCell,
    focusedContainer: classNames.focusedContainer,
  };

  /**
   * When the whole swatchColorPicker is blurred,
   * make sure to clear the pending focused stated
   */
  const onSwatchColorPickerBlur = React.useCallback((): void => {
    if (props.onCellFocused) {
      internalState.cellFocused = false;
      props.onCellFocused();
    }
  }, [props, internalState]);

  /**
   * Callback passed to the GridCell that will manage triggering the onCellHovered callback for mouseEnter
   */
  const onMouseEnter = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
      if (!props.focusOnHover) {
        return !internalState.isNavigationIdle || !!props.disabled;
      }
      if (internalState.isNavigationIdle && !props.disabled) {
        ev.currentTarget.focus();
      }
      return true;
    },
    [props.focusOnHover, internalState.isNavigationIdle, props.disabled],
  );

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
      if (!props.focusOnHover) {
        return !internalState.isNavigationIdle || !!props.disabled;
      }

      const targetElement = ev.currentTarget as HTMLElement;

      // If navigation is idle and the targetElement is the focused element bail out
      // if (!this.isNavigationIdle || (document && targetElement === (document.activeElement as HTMLElement))) {
      if (internalState.isNavigationIdle && !(document && targetElement === (document.activeElement as HTMLElement))) {
        targetElement.focus();
      }

      return true;
    },
    [props.focusOnHover, internalState.isNavigationIdle, props.disabled],
  );

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseLeave = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const parentSelector = props.mouseLeaveParentSelector;

      if (!props.focusOnHover || !parentSelector || !internalState.isNavigationIdle || props.disabled) {
        return;
      }

      // Get the elements that math the given selector
      const elements = document.querySelectorAll(parentSelector);

      // iterate over the elements return to make sure it is a parent of the target and focus it
      for (let index = 0; index < elements.length; index += 1) {
        if (elements[index].contains(ev.currentTarget)) {
          /**
           * IE11 focus() method forces parents to scroll to top of element.
           * Edge and IE expose a setActive() function for focusable divs that
           * sets the page focus but does not scroll the parent element.
           */
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((elements[index] as any).setActive) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (elements[index] as any).setActive();
            } catch (e) {
              /* no-op */
            }
          } else {
            (elements[index] as HTMLElement).focus();
          }

          break;
        }
      }
    },
    [internalState.isNavigationIdle, props.disabled, props.focusOnHover, props.mouseLeaveParentSelector],
  );

  /**
   * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
   * NOTE: This will not be triggered if shouldFocusOnHover === true
   */
  const onGridCellHovered = React.useCallback(
    (item?: IColorCellProps): void => {
      if (onCellHovered) {
        return item ? onCellHovered(item.id, item.color) : onCellHovered();
      }
    },
    [onCellHovered],
  );

  /**
   * Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
   */
  const onGridCellFocused = React.useCallback(
    (item?: IColorCellProps): void => {
      const { onCellFocused } = props;
      if (onCellFocused) {
        if (item) {
          internalState.cellFocused = true;
          return onCellFocused(item.id, item.color);
        } else {
          internalState.cellFocused = false;
          return onCellFocused();
        }
      }
    },
    [internalState, props],
  );

  /**
   * Handle the click on a cell
   */
  const onCellClick = React.useCallback(
    (item: IColorCellProps): void => {
      if (props.disabled) {
        return;
      }

      if (item.id !== selectedId) {
        if (props.onCellFocused && internalState.cellFocused) {
          internalState.cellFocused = false;
          props.onCellFocused();
        }
        setSelectedId(item.id);
      }
    },
    [internalState, props, selectedId, setSelectedId],
  );

  /**
   * Sets a timeout so we won't process any mouse "hover" events
   * while navigating (via mouseWheel or arrowKeys)
   */
  const setNavigationTimeout = React.useCallback(() => {
    if (!internalState.isNavigationIdle && internalState.navigationIdleTimeoutId !== undefined) {
      clearTimeout(internalState.navigationIdleTimeoutId);
      internalState.navigationIdleTimeoutId = undefined;
    } else {
      internalState.isNavigationIdle = false;
    }

    internalState.navigationIdleTimeoutId = setTimeout(() => {
      internalState.isNavigationIdle = true;
    }, internalState.navigationIdleDelay);
  }, [internalState, clearTimeout, setTimeout]);

  /**
   * Callback to make sure we don't update the hovered element during mouse wheel
   */
  const onWheel = React.useCallback((): void => {
    setNavigationTimeout();
  }, [setNavigationTimeout]);

  /**
   * Callback that
   */
  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (
        ev.which === KeyCodes.up ||
        ev.which === KeyCodes.down ||
        ev.which === KeyCodes.left ||
        ev.which === KeyCodes.right
      ) {
        setNavigationTimeout();
      }
    },
    [setNavigationTimeout],
  );

  /**
   * Render a color cell
   */
  const renderOption = React.useCallback(
    (item: IColorCellProps): JSX.Element => {
      return (
        <ColorPickerGridCell
          item={item}
          idPrefix={id}
          color={item.color}
          styles={props.getColorGridCellStyles}
          disabled={disabled}
          onClick={onCellClick}
          onHover={onGridCellHovered}
          onFocus={onGridCellFocused}
          selected={selectedId === item.id}
          circle={cellShape === 'circle'}
          label={item.label}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          height={props.cellHeight}
          width={props.cellWidth}
          borderWidth={props.cellBorderWidth}
        />
      );
    },
    [
      selectedId,
      props,
      cellShape,
      disabled,
      id,
      onCellClick,
      onGridCellFocused,
      onGridCellHovered,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onWheel,
    ],
  );

  if (colorCells.length < 1 || columnCount < 1) {
    return null;
  }

  return (
    <Grid
      {...((props as unknown) as IGridProps)}
      ref={ref}
      id={id}
      items={getItemsWithIndex}
      columnCount={columnCount}
      onRenderItem={renderOption}
      ariaPosInSet={ariaPosInSet}
      ariaSetSize={ariaSetSize}
      shouldFocusCircularNavigate={shouldFocusCircularNavigate}
      doNotContainWithinFocusZone={doNotContainWithinFocusZone}
      onBlur={onSwatchColorPickerBlur}
      theme={props.theme!}
      styles={gridStyles}
    />
  );
});
SwatchColorPickerBase.displayName = COMPONENT_NAME;
