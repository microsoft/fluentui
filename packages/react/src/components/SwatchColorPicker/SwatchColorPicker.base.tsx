import * as React from 'react';
import { classNamesFunction, KeyCodes } from '../../Utilities';
import { ButtonGrid } from '../../utilities/ButtonGrid/ButtonGrid';
import { ColorPickerGridCell } from './ColorPickerGridCell';
import { useId, useConst, useSetTimeout, useControllableValue, useWarnings } from '@fluentui/react-hooks';
import type {
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles,
} from './SwatchColorPicker.types';
import type { IColorCellProps } from './ColorPickerGridCell.types';
import type { IButtonGridProps } from '../../utilities/ButtonGrid/ButtonGrid.types';
import { useDocumentEx } from '../../utilities/dom';

interface ISwatchColorPickerInternalState {
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
      mutuallyExclusive: { focusOnHover: 'onHover', selectedId: 'defaultSelectedId' },
      deprecations: { isControlled: "selectedId' or 'defaultSelectedId", onColorChanged: 'onChange' },
    });
  }
}

export const SwatchColorPickerBase: React.FunctionComponent<ISwatchColorPickerProps> = React.forwardRef<
  HTMLElement,
  ISwatchColorPickerProps
>((props, ref) => {
  const defaultId = useId('swatchColorPicker');
  const id = props.id || defaultId;
  const doc = useDocumentEx();

  const internalState = useConst<ISwatchColorPickerInternalState>({
    isNavigationIdle: true,
    cellFocused: false,
    navigationIdleTimeoutId: undefined,
    navigationIdleDelay: 250,
  });

  const { setTimeout, clearTimeout } = useSetTimeout();

  useDebugWarnings(props);

  const {
    colorCells,
    cellShape = 'circle',
    columnCount,
    shouldFocusCircularNavigate = true,
    className,
    disabled = false,
    doNotContainWithinFocusZone,
    styles,
    cellMargin = 10,
    defaultSelectedId,
    focusOnHover,
    mouseLeaveParentSelector,
    onChange,
    // eslint-disable-next-line deprecation/deprecation
    onColorChanged,
    onCellHovered,
    onCellFocused,
    getColorGridCellStyles,
    cellHeight,
    cellWidth,
    cellBorderWidth,
    onRenderColorCellContent,
  } = props;

  /**
   *  Add an index to each color cells. Memoizes this so that color cells do not re-render on every update.
   */
  const itemsWithIndex = React.useMemo(() => {
    return colorCells.map((item, index) => {
      return { ...item, index };
    });
  }, [colorCells]);

  const mergedOnChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>, newSelectedId: string | undefined) => {
      // Call both new and old change handlers, and add the extra `color` parameter
      const newColor = colorCells.filter(c => c.id === newSelectedId)[0]?.color;
      onChange?.(ev, newSelectedId, newColor);
      onColorChanged?.(newSelectedId, newColor);
    },
    [onChange, onColorChanged, colorCells],
  );

  const [selectedId, setSelectedId] = useControllableValue(props.selectedId, defaultSelectedId, mergedOnChange);

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
   * If there is only one row of cells, they should use radio semantics,
   * multi-row swatch cells should use grid semantics.
   * There are two reasons for this:
   *   1. Radios are a more simple and understandable control, and a better fit for a single-dimensional picker.
   *   2. Multiple browsers use heuristics to strip table and grid roles from single-row tables with no column headers.
   */
  const isSemanticRadio = colorCells.length <= columnCount;

  /**
   * When the whole swatchColorPicker is blurred,
   * make sure to clear the pending focused stated
   */
  const onSwatchColorPickerBlur = React.useCallback(
    (event?: React.FocusEvent<HTMLButtonElement>): void => {
      if (onCellFocused) {
        internalState.cellFocused = false;
        onCellFocused(undefined, undefined, event);
      }
    },
    [internalState, onCellFocused],
  );

  /**
   * Callback passed to the GridCell that will manage triggering the onCellHovered callback for mouseEnter
   */
  const onMouseEnter = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
      if (!focusOnHover) {
        return !internalState.isNavigationIdle || !!disabled;
      }
      if (internalState.isNavigationIdle && !disabled) {
        ev.currentTarget.focus();
      }
      return true;
    },
    [focusOnHover, internalState, disabled],
  );

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
      if (!focusOnHover) {
        return !internalState.isNavigationIdle || !!disabled;
      }

      const targetElement = ev.currentTarget as HTMLElement;

      // If navigation is idle and the targetElement is the focused element bail out
      if (internalState.isNavigationIdle && !(doc && targetElement === (doc.activeElement as HTMLElement))) {
        targetElement.focus();
      }

      return true;
    },
    [focusOnHover, internalState, disabled, doc],
  );

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseLeave = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const parentSelector = mouseLeaveParentSelector;

      if (!focusOnHover || !parentSelector || !internalState.isNavigationIdle || disabled) {
        return;
      }

      // Get the elements that math the given selector
      const elements = doc?.querySelectorAll(parentSelector) ?? [];

      // iterate over the elements return to make sure it is a parent of the target and focus it
      for (let index = 0; index < elements.length; index += 1) {
        if (elements[index].contains(ev.currentTarget)) {
          /**
           * IE11 focus() method forces parents to scroll to top of element.
           * Edge and IE expose a setActive() function for focusable divs that
           * sets the page focus but does not scroll the parent element.
           */
          if ((elements[index] as any).setActive) {
            try {
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
    [disabled, focusOnHover, internalState, mouseLeaveParentSelector, doc],
  );

  /**
   * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
   * NOTE: This will not be triggered if shouldFocusOnHover === true
   */
  const onGridCellHovered = React.useCallback(
    (item?: IColorCellProps, event?: React.MouseEvent<HTMLButtonElement>): void => {
      if (onCellHovered) {
        item ? onCellHovered(item.id, item.color, event) : onCellHovered(undefined, undefined, event);
      }
    },
    [onCellHovered],
  );

  /**
   * Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
   */
  const onGridCellFocused = React.useCallback(
    (item?: IColorCellProps, event?: React.FormEvent<HTMLButtonElement>): void => {
      if (onCellFocused) {
        if (item) {
          internalState.cellFocused = true;
          return onCellFocused(item.id, item.color, event);
        } else {
          internalState.cellFocused = false;
          return onCellFocused(undefined, undefined, event);
        }
      }
    },
    [internalState, onCellFocused],
  );

  /**
   * Handle the click on a cell
   */
  const onCellClick = React.useCallback(
    (item: IColorCellProps, event?: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled || item.disabled) {
        return;
      }

      if (item.id !== selectedId) {
        if (onCellFocused && internalState.cellFocused) {
          internalState.cellFocused = false;
          onCellFocused(undefined, undefined, event);
        }
        setSelectedId(item.id, event);
      }
    },
    [disabled, internalState, onCellFocused, selectedId, setSelectedId],
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
  }, [clearTimeout, internalState, setTimeout]);

  /**
   * Callback used to handle KeyCode events
   */
  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (
        // eslint-disable-next-line deprecation/deprecation
        ev.which === KeyCodes.up ||
        // eslint-disable-next-line deprecation/deprecation
        ev.which === KeyCodes.down ||
        // eslint-disable-next-line deprecation/deprecation
        ev.which === KeyCodes.left ||
        // eslint-disable-next-line deprecation/deprecation
        ev.which === KeyCodes.right
      ) {
        setNavigationTimeout();
      }
    },
    [setNavigationTimeout],
  );

  /**
   * Render a color cell
   * @param item - The item to render
   * @returns - Element representing the item
   */
  const renderOption = (item: IColorCellProps): JSX.Element => {
    return (
      <ColorPickerGridCell
        item={item}
        idPrefix={id}
        color={item.color}
        styles={getColorGridCellStyles}
        disabled={disabled || item.disabled}
        onClick={onCellClick}
        onHover={onGridCellHovered}
        onFocus={onGridCellFocused}
        selected={selectedId === item.id}
        circle={cellShape === 'circle'}
        label={item.label}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onWheel={setNavigationTimeout}
        onKeyDown={onKeyDown}
        onRenderColorCellContent={onRenderColorCellContent}
        height={cellHeight}
        width={cellWidth}
        borderWidth={cellBorderWidth}
        isRadio={isSemanticRadio}
      />
    );
  };

  if (colorCells.length < 1 || columnCount < 1) {
    return null;
  }

  const onRenderItem = (item: IColorCellProps, index: number): JSX.Element => {
    const { onRenderColorCell = renderOption } = props;
    return onRenderColorCell(item, renderOption) as JSX.Element;
  };
  return (
    <ButtonGrid
      {...(props as unknown as IButtonGridProps)}
      ref={ref}
      id={id}
      items={itemsWithIndex}
      columnCount={columnCount}
      isSemanticRadio={isSemanticRadio}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderItem={onRenderItem}
      shouldFocusCircularNavigate={shouldFocusCircularNavigate}
      doNotContainWithinFocusZone={doNotContainWithinFocusZone}
      onBlur={onSwatchColorPickerBlur}
      theme={props.theme!}
      styles={gridStyles}
    />
  );
});

SwatchColorPickerBase.displayName = COMPONENT_NAME;
