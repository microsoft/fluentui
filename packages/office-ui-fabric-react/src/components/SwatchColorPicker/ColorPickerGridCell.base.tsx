import * as React from 'react';
import { ITheme, mergeStyleSets } from '../../Styling';
import { classNamesFunction, memoizeFunction } from '../../Utilities';
import { getColorFromString } from '../../utilities/color/getColorFromString';
import { GridCell } from '../../utilities/grid/GridCell';
import { IGridCellProps } from '../../utilities/grid/GridCell.types';
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles';
import { IButtonClassNames } from '../Button/BaseButton.classNames';
import {
  IColorCellProps,
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles
} from './ColorPickerGridCell.types';

const getColorPickerGridCellButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined
  ): IButtonClassNames => {
    const styles = getActionButtonStyles(theme);
    return mergeStyleSets({
      root: [
        'ms-Button',
        styles.root,
        variantClassName,
        className,
        checked && ['is-checked', styles.rootChecked],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !checked && {
            selectors: {
              ':hover': styles.rootHovered,
              ':focus': styles.rootFocused,
              ':active': styles.rootPressed
            }
          },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled &&
          checked && {
            selectors: {
              ':hover': styles.rootCheckedHovered,
              ':active': styles.rootCheckedPressed
            }
          }
      ],
      flexContainer: ['ms-Button-flexContainer', styles.flexContainer]
    });
  }
);

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>();

class ColorCell extends GridCell<IColorCellProps, IGridCellProps<IColorCellProps>> {}

export class ColorPickerGridCellBase extends React.PureComponent<IColorPickerGridCellProps, {}> {
  public static defaultProps = {
    circle: true,
    disabled: false,
    selected: false
  } as IColorPickerGridCellProps;

  private _classNames: { [key in keyof IColorPickerGridCellStyles]: string };

  public render(): JSX.Element {
    const {
      item,
      id,
      selected,
      disabled,
      styles,
      theme,
      circle,
      color,
      onClick,
      onHover,
      onFocus,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      onWheel,
      onKeyDown,
      height,
      width,
      borderWidth
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      disabled,
      selected,
      circle,
      isWhite: this._isWhiteCell(color),
      height,
      width,
      borderWidth
    });

    return (
      <ColorCell
        item={item}
        id={`${id}-${item.id}-${item.index}`}
        key={item.id}
        disabled={disabled}
        role={'gridcell'}
        onRenderItem={this._onRenderColorOption}
        selected={selected}
        onClick={onClick}
        onHover={onHover}
        onFocus={onFocus}
        label={item.label}
        className={this._classNames.colorCell}
        getClassNames={getColorPickerGridCellButtonClassNames}
        index={item.index}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      />
    );
  }

  /**
   * Render the core of a color cell
   * @returns - Element representing the core of the item
   */
  private _onRenderColorOption = (colorOption: IColorCellProps): JSX.Element => {
    // Build an SVG for the cell with the given shape and color properties
    return (
      <svg className={this._classNames.svg} viewBox="0 0 20 20" fill={getColorFromString(colorOption.color as string)!.str}>
        {this.props.circle ? <circle cx="50%" cy="50%" r="50%" /> : <rect width="100%" height="100%" />}
      </svg>
    );
  };

  /**
   * Validate if the cell's color is white or not to apply whiteCell style
   * @param inputColor - The color of the current cell
   * @returns - Whether the cell's color is white or not.
   */
  private _isWhiteCell(inputColor: string | undefined): boolean {
    const color = getColorFromString(inputColor!);
    return color!.hex === 'ffffff';
  }
}
