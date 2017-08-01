import * as React from 'react';
import {
  autobind,
  BaseComponent,
  css,
  findIndex,
  getId
} from '../../Utilities';
import {
  ISwatchColorPicker,
  ISwatchColorPickerProps,
  IColorCellProps
} from './SwatchColorPicker.Props';
import { getColorFromString } from '../../utilities/color/colors';
import { Grid } from '../../utilities/grid/Grid';
import { CommandButton } from '../../Button';
import { FocusZone } from '../../FocusZone';
import * as stylesImport from './SwatchColorPicker.scss';
const styles: any = stylesImport;

interface ISwatchColorPickerOptionProps {

  /**
   * The option that will be made available to the user
   */
  item: IColorCellProps;

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * Optional, if the this option should be diabled
   */
  disabled?: boolean;

  /**
   * Optional, the currently selectedIndex in the set of options
   */
  selectedIndex?: number;

  /**
   * The on click handler
   */
  onClick: (item: IColorCellProps) => void;

  /**
   * Optional, the onHover handler
   */
  onHover?: (id?: string, color?: string) => void;

  /**
   * Optional, the onFocus handler
   */
  onFocus?: (id?: string, color?: string) => void;

  /**
   * The accessible role for this option
   */
  role?: string;

  /**
   * Optional, className(s) to apply
   */
  className?: string;

  /**
   * The shape for the option. Defaults to circle
   */
  cellShape?: 'circle' | 'square';
}

class SwatchColorPickerOption extends React.Component<ISwatchColorPickerOptionProps, null> {

  public static defaultProps = {
    cellShape: 'circle',
    disabled: false
  };

  private _id: string;

  constructor(props: ISwatchColorPickerOptionProps) {
    super(props);

    this._id = props.id || getId('colorCell');
  }

  public render() {
    let {
      item,
      id,
      className,
      role,
      selectedIndex,
      disabled,
      cellShape,
      onClick,
      onHover,
      onFocus
    } = this.props;
    return (
      <CommandButton
        id={ id + '-item' + item.index }
        data-index={ item.index }
        data-is-focusable={ true }
        disabled={ disabled }
        className={ css(className,
          {
            ['is-selected ' + styles.cellIsSelected]: (selectedIndex !== undefined && selectedIndex === item.index),
            ['is-disabled ' + styles.disabled]: disabled
          }
        ) }
        onClick={ this._onClick }
        onMouseEnter={ this._onMouseEnter }
        onMouseLeave={ this._onMouseLeave }
        onFocus={ this._onFocus }
        role={ role }
        aria-selected={ selectedIndex !== undefined && (selectedIndex === item.index).toString() }
        ariaLabel={ item.label && item.label }
        title={ item.label && item.label }
      >
        { this._onRenderOption() }
      </CommandButton>
    );
  }

  @autobind
  private _onClick() {
    let {
        onClick,
      disabled,
      item
      } = this.props;

    if (onClick && !disabled) {
      onClick(item);
    }
  }

  @autobind
  private _onMouseEnter() {
    let {
        onHover,
      disabled,
      item
      } = this.props;

    if (onHover && !disabled) {
      onHover(item.id, item.color);
    }
  }

  @autobind
  private _onMouseLeave() {
    let {
        onHover,
      disabled
      } = this.props;

    if (onHover && !disabled) {
      onHover();
    }
  }

  @autobind
  private _onFocus() {
    let {
        onFocus,
      disabled,
      item
      } = this.props;

    if (onFocus && !disabled) {
      onFocus(item.id, item.color);
    }
  }

  /**
   * Render the core of a color cell
   * @returns {JSX.Element} - Element representing the core of the item
   */
  @autobind
  private _onRenderOption(): JSX.Element {
    let {
        cellShape,
      item
      } = this.props;

    // Build an SVG for the cell with the given shape and color properties
    return (
      <svg className={ css(styles.svg, cellShape, cellShape === 'circle' ? styles.circle : '') } viewBox='0 0 20 20' fill={ getColorFromString(item.color as string).str } >
        {
          cellShape === 'circle' ?
            <circle cx='50%' cy='50%' r='50%' /> :
            <rect width='100%' height='100%' />
        }
      </svg>
    );
  }
}

export interface ISwatchColorPickerState {
  selectedIndex?: number;
}

export class SwatchColorPicker extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState> implements ISwatchColorPicker {

  public static defaultProps = {
    cellShape: 'circle',
    disabled: false,
    shouldFocusCircularNavigate: true
  };

  private _id: string;

  constructor(props: ISwatchColorPickerProps) {
    super(props);

    this._id = props.id || getId('swatchColorPicker');

    let selectedIndex: number | undefined;
    if (props.selectedId) {
      selectedIndex = this._getSelectedIndex(props.colorCells, props.selectedId);
    }

    this.state = {
      selectedIndex
    };
  }

  public componentWillReceiveProps(newProps: ISwatchColorPickerProps) {
    let newSelectedIndex;

    if (newProps.selectedId) {
      newSelectedIndex = this._getSelectedIndex(newProps.colorCells, newProps.selectedId);
    }

    if (newSelectedIndex !== undefined &&
      newSelectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: newSelectedIndex
      });
    }
  }

  public render() {
    let {
      disabled,
      colorCells,
      columnCount,
      positionInSet,
      setSize,
      shouldFocusCircularNavigate,
      className,
      onCellFocused
    } = this.props;

    return (<FocusZone
      isCircularNavigation={ shouldFocusCircularNavigate }
      className={ css('ms-swatchColorPickerBodyContainer', styles.swatchColorPickerContainer, className) }
      onBlur={ this.onSwatchColorPickerBlur }
    >
      <Grid
        key={ this._id + colorCells[0].id + '-grid' }
        items={ colorCells.map((item, index) => { return { ...item, index }; }) }
        columnCount={ this.props.columnCount }
        onRenderItem={ this._renderOption }
        positionInSet={ positionInSet && positionInSet }
        setSize={ setSize && setSize }
      />
    </FocusZone>);
  }

  /**
   * When the whole swatchColorPicker is blurred,
   * make sure to clear the pending focused stated
   */
  @autobind
  private onSwatchColorPickerBlur() {
    if (this.props.onCellFocused) {
      this.props.onCellFocused();
    }
  }

  /**
   * Get the selected item's index
   * @param items - The items to search
   * @param selectedId - The selected item's id to find
   * @returns {number} - The index of the selected item's id, -1 if there was no match
   */
  private _getSelectedIndex(items: IColorCellProps[], selectedId: string): number | undefined {
    let selectedIndex = findIndex(items, (item => (item.id === selectedId)));
    return selectedIndex >= 0 ? selectedIndex : undefined;
  }

  /**
   * Render a color cell
   * @param item - The item to render
   * @returns {JSX.Element} - Element representing the item
   */
  @autobind
  private _renderOption(item: IColorCellProps): JSX.Element {
    let id = this._id;

    return (
      <SwatchColorPickerOption
        item={ item }
        id={ id }
        key={ id + item.id }
        disabled={ this.props.disabled }
        cellShape={ this.props.cellShape }
        className={ styles.cell }
        onClick={ this._onCellClick }
        onHover={ this.props.onCellHovered }
        onFocus={ this.props.onCellFocused }
        role={ 'gridcell' }
        selectedIndex={ this.state.selectedIndex }
      />
    );
  }

  /**
   * Handle the click on a cell
   * @param item - The cell that the click was fired against
   */
  @autobind
  private _onCellClick(item: IColorCellProps) {
    if (this.props.disabled) {
      return;
    }

    let index = item.index as number;

    // If we have a valid index and it is not already
    // selected, select it
    if (index >= 0 && index !== this.state.selectedIndex) {
      if (this.props.onColorChanged) {
        this.props.onColorChanged(item.id, item.color);
      }

      this.setState({
        selectedIndex: index
      });
    }
  }

  /**
   * Clear the colors by calling the given callbacks
   * @param callbacks - The callbacks to handle the clear operation
   */
  private _clearColors(callbacks: ((id?: string, color?: string) => void)[]) {
    callbacks.forEach((callback) => {
      if (callback) {
        callback();
      }
    });
  }
}