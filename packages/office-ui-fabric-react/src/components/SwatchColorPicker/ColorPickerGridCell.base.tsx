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
import { IButtonClassNames } from '../Button/BaseButton.classNames';
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles';
import { mergeStyleSets, ITheme } from '../../Styling';
import { classNamesFunction } from '../../Utilities';

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
        getClassNames={ this._getClassNames }
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

  /**
   * Method to override the getClassNames func in a button.
   */
  @autobind
  private _getClassNames(
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined): IButtonClassNames {
    let styles = getActionButtonStyles(theme);
    return mergeStyleSets(this._classNames as {}, {
      root: [
        'ms-Button',
        styles.root,
        variantClassName,
        className,
        checked && [
          'is-checked',
          styles.rootChecked
        ],
        disabled && [
          'is-disabled',
          styles.rootDisabled
        ],
        !disabled && !checked && {
          selectors: {
            ':hover': styles.rootHovered,
            ':focus': styles.rootFocused,
            ':active': styles.rootPressed,
          }
        },
        disabled && checked && [
          styles.rootCheckedDisabled
        ],
        !disabled && checked && {
          selectors: {
            ':hover': styles.rootCheckedHovered,
            ':active': styles.rootCheckedPressed
          }
        }
      ],
      flexContainer: [
        'ms-Button-flexContainer',
        styles.flexContainer
      ]
    });
  }

}