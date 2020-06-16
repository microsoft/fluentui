import * as React from 'react';
import {
  classNamesFunction,
  findIndex,
  getId,
  warnMutuallyExclusive,
  warnConditionallyRequiredProps,
} from '../../Utilities';
import {
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles,
} from './SwatchColorPicker.types';
import { Grid } from 'office-ui-fabric-react/lib/utilities/grid/Grid';
import { IColorCellProps } from './ColorPickerGridCell.types';
import { ColorPickerGridCell } from './ColorPickerGridCell';
import { memoizeFunction, warnDeprecations } from '@uifabric/utilities';

export interface ISwatchColorPickerState {
  selectedIndex?: number;
}

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>();

const COMPONENT_NAME = 'SwatchColorPicker';

export const SwatchColorPickerBase = (props: ISwatchColorPickerProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState();
  const id = props.id || getId('swatchColorPicker');
  let cellFocused: boolean;
  let currentSelectedIndex: number | undefined = undefined;

  const {
    colorCells,
    cellShape = 'circle',
    columnCount,
    // tslint:disable:deprecation
    ariaPosInSet = props.positionInSet,
    ariaSetSize = props.setSize,
    // tslint:enable:deprecation
    shouldFocusCircularNavigate = true,
    className,
    disabled = false,
    doNotContainWithinFocusZone,
    styles,
    cellMargin = 10,
  } = props;

  const classNames = getClassNames(styles!, {
    theme: props.theme!,
    className,
    cellMargin,
  });

  // Add an index to each color cells. Memoizes this so that color cells do not re-render on every update.
  const getItemsWithIndex = memoizeFunction((items: IColorCellProps[]) => {
    return items.map((item, index) => {
      return { ...item, index: index };
    });
  });

  /**
   * When the whole swatchColorPicker is blurred,
   * make sure to clear the pending focused stated
   */
  const onSwatchColorPickerBlur = (): void => {
    if (props.onCellFocused) {
      cellFocused = false;
      props.onCellFocused();
    }
  };

  const getSelectedIndex = (items: IColorCellProps[], selectedId: string): number | undefined => {
    const foundSelectedIndex = findIndex(items, item => item.id === selectedId);
    return foundSelectedIndex >= 0 ? foundSelectedIndex : undefined;
  };

  /**
   * Callback passed to the GridCell that will manage triggering the onCellHovered callback for mouseEnter
   */
  const onMouseEnter = (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
    if (!props.focusOnHover) {
      return !!props.disabled;
    }
    if (!props.disabled) {
      ev.currentTarget.focus();
    }
    return true;
  };

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseMove = (ev: React.MouseEvent<HTMLButtonElement>): boolean => {
    if (!props.focusOnHover) {
      return !!props.disabled;
    }
    const targetElement = ev.currentTarget as HTMLElement;
    // If the targetElement is the focused element bail out
    // if ((document && targetElement === (document.activeElement as HTMLElement))) {
    if (!(document && targetElement === (document.activeElement as HTMLElement))) {
      targetElement.focus();
    }
    return true;
  };

  /**
   * Callback passed to the GridCell that will manage Hover/Focus updates
   */
  const onMouseLeave = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    const parentSelector = props.mouseLeaveParentSelector;

    if (!props.focusOnHover || !parentSelector || props.disabled) {
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
        // tslint:disable-next-line:no-any
        if ((elements[index] as any).setActive) {
          try {
            // tslint:disable-next-line:no-any
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
  };

  /**
   * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
   * NOTE: This will not be triggered if shouldFocusOnHover === true
   */
  const onGridCellHovered = (item?: IColorCellProps): void => {
    const { onCellHovered } = props;
    if (onCellHovered) {
      return item ? onCellHovered(item.id, item.color) : onCellHovered();
    }
  };

  // Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
  const onGridCellFocused = (item?: IColorCellProps): void => {
    const { onCellFocused } = props;
    if (onCellFocused) {
      if (item) {
        cellFocused = true;
        return onCellFocused(item.id, item.color);
      } else {
        cellFocused = false;
        return onCellFocused();
      }
    }
  };

  // Handle the click on a cell
  const onCellClick = (item: IColorCellProps): void => {
    if (props.disabled) {
      return;
    }

    const index = item.index as number;

    // If we have a valid index and it is not already selected, select it.
    if (index >= 0 && index !== selectedIndex) {
      if (props.onCellFocused && cellFocused) {
        cellFocused = false;
        props.onCellFocused();
      }

      if (props.onColorChanged) {
        props.onColorChanged(item.id, item.color);
      }

      // Update internal state only if the component is uncontrolled
      if (props.isControlled !== true) {
        setSelectedIndex(index);
      }
    }
  };

  // Render a color cell
  const renderOption = (item: IColorCellProps): JSX.Element => {
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
        selected={selectedIndex !== undefined && selectedIndex === item.index}
        circle={cellShape === 'circle'}
        label={item.label}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        height={props.cellHeight}
        width={props.cellWidth}
        borderWidth={props.cellBorderWidth}
      />
    );
  };

  if (colorCells.length < 1 || columnCount < 1) {
    return null;
  }

  if (props.selectedId) {
    currentSelectedIndex = getSelectedIndex(props.colorCells, props.selectedId);
    setSelectedIndex(currentSelectedIndex);
  }

  if (props.selectedId !== undefined) {
    setSelectedIndex(getSelectedIndex(props.colorCells, props.selectedId));
  }

  if (process.env.NODE_ENV !== 'production') {
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      focusOnHover: 'onHover',
    });

    warnConditionallyRequiredProps(
      COMPONENT_NAME,
      props,
      ['focusOnHover'],
      'mouseLeaveParentSelector',
      !!props.mouseLeaveParentSelector,
    );

    warnDeprecations(COMPONENT_NAME, props, {
      positionInSet: 'ariaPosInSet',
      setSize: 'ariaSetSize',
    });
  }

  return (
    <Grid
      {...props}
      id={id}
      items={getItemsWithIndex(colorCells)}
      columnCount={columnCount}
      onRenderItem={renderOption}
      ariaPosInSet={ariaPosInSet}
      ariaSetSize={ariaSetSize}
      shouldFocusCircularNavigate={shouldFocusCircularNavigate}
      doNotContainWithinFocusZone={doNotContainWithinFocusZone}
      onBlur={onSwatchColorPickerBlur}
      theme={props.theme!}
      styles={{
        root: classNames.root,
        tableCell: classNames.tableCell,
        focusedContainer: classNames.focusedContainer,
      }}
    />
  );
};
SwatchColorPickerBase.displayName = COMPONENT_NAME;
