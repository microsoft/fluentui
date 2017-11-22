import * as React from 'react';
import {
  autobind,
  customizable
} from '../../Utilities';
import {
  IColorCellProps,
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles
} from './ColorPickerGridCell.types';
import { getColorFromString } from '../../utilities/color/colors';
import { GridCell } from '../../utilities/grid/GridCell';
import { IGridCellProps } from '../../utilities/grid/GridCell.types';
import { classNamesFunction, IClassNames } from '../../Styling';

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>();

class ColorCell extends GridCell<IColorCellProps, IGridCellProps<IColorCellProps>> {
}

@customizable('ColorPickerGridCell', ['theme'])
export class ColorPickerGridCellBase extends React.Component<IColorPickerGridCellProps, {}> {

  public static defaultProps = {
    circle: true,
    disabled: false,
    selected: false,
  } as IColorPickerGridCellProps;

  private _classNames: {[key in keyof IColorPickerGridCellStyles]: string };

  public render() {
    let {
      item,
      id,
      selected,
      disabled,
      getStyles,
      theme,
      circle
    } = this.props;

    this._classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled,
        selected,
        circle,
        isWhite: this._isWhiteCell(this.props.color)
      }
    );

    return (
      <ColorCell
        item={ item }
        id={ id }
        key={ item.id }
        disabled={ disabled }
        role={ 'gridcell' }
        onRenderItem={ this._onRenderColorOption }
        selected={ selected }
        onClick={ this.props.onClick }
        onHover={ this.props.onHover }
        onFocus={ this.props.onFocus }
        label={ item.label }
        className={ this._classNames.colorCell }
        classNames={ this._classNames }
      />
    );
  }

  /**
 * Render the core of a color cell
 * @returns {JSX.Element} - Element representing the core of the item
 */
  @autobind
  private _onRenderColorOption(colorOption: IColorCellProps): JSX.Element {
    // Build an SVG for the cell with the given shape and color properties
    return (
      <svg className={ this._classNames.svg } viewBox='0 0 20 20' fill={ getColorFromString(colorOption.color as string)!.str } >
        {
          this.props.circle ?
            <circle cx='50%' cy='50%' r='50%' /> :
            <rect width='100%' height='100%' />
        }
      </svg>
    );
  }

    /**
 * Validate if the cell's color is white or not to apply whiteCell style
 * @param inputColor - The color of the current cell
 * @returns - Whether the cell's color is white or not.
 */
  private _isWhiteCell(inputColor: string | undefined): boolean {
    return inputColor!.toLocaleLowerCase() === '#ffffff';
  }

}