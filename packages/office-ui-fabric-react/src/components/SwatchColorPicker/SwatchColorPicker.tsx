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
  ISwatchColorPickerItemProps
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
  item: ISwatchColorPickerItemProps;

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
  onClick: (item: ISwatchColorPickerItemProps) => void;

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

const SwatchColorPickerOption: React.StatelessComponent<ISwatchColorPickerOptionProps> =
  (props: ISwatchColorPickerOptionProps) => {
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
    } = props;
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
        onClick={ _onClick }
        onMouseEnter={ _onMouseEnter }
        onMouseLeave={ _onMouseLeave }
        onFocus={ _onFocus }
        role={ role }
        aria-selected={ selectedIndex !== undefined && (selectedIndex === item.index).toString() }
        ariaLabel={ item.label && item.label }
        title={ item.label && item.label }
      >
        { _onRenderOption() }
      </CommandButton>
    );

    function _onClick() {
      if (onClick && !disabled) {
        onClick(item);
      }
    }

    function _onMouseEnter() {
      if (onHover && !disabled) {
        onHover(item.id, item.color);
      }
    }

    function _onMouseLeave() {
      if (onHover && !disabled) {
        onHover();
      }
    }

    function _onFocus() {
      if (onFocus && !disabled) {
        onFocus(item.id, item.color);
      }
    }

    /**
     * Render the core of an cell or menu item
     * @returns {JSX.Element} - Element representing the core of the item
     */
    function _onRenderOption(): JSX.Element {

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
  };

export interface ISwatchColorPickerState {
  selectedIndex?: number;
}

export class SwatchColorPicker extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState> implements ISwatchColorPicker {

  public static defaultProps = {
    cellShape: 'circle',
    updateButtonIconWithColor: false,
    disabled: false,
    shouldFocusCircularNavigate: true
  };

  private _id: string;

  constructor(props: ISwatchColorPickerProps) {
    super(props);

    this._id = props.id || getId('swatchColorPicker');

    let selectedIndex: number | undefined;
    if (props.selectedId) {
      selectedIndex = this._getSelectedIndex(props.swatchColorPickerItems, props.selectedId);
    }

    this.state = {
      selectedIndex
    };
  }

  public componentWillReceiveProps(newProps: ISwatchColorPickerProps) {
    let newSelectedIndex;

    if (newProps.selectedId) {
      newSelectedIndex = this._getSelectedIndex(newProps.swatchColorPickerItems, newProps.selectedId);
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
      swatchColorPickerItems,
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
        key={ this._id + swatchColorPickerItems[0].id + '-grid' }
        items={ swatchColorPickerItems.map((item, index) => { return { ...item, index }; }) }
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
  private _getSelectedIndex(items: ISwatchColorPickerItemProps[], selectedId: string): number | undefined {
    let selectedIndex = findIndex(items, (item => (item.id === selectedId)));
    return selectedIndex >= 0 ? selectedIndex : undefined;
  }

  /**
   * Gets the color for the selected index
   * @returns {string} - The color for the selected index,
   *   or undefined if: we are not updating the button icon with color,
   *   there is not a valid selected index, or if we do not have a valid color
   */
  private _getSelectedColorToSet(): string | undefined {
    let { selectedIndex } = this.state;

    // Do we need to update the button with the selected
    // item's color? If so, attempt to grab the color
    if (selectedIndex !== undefined) {
      return this.props.swatchColorPickerItems[selectedIndex].color;
    }
  }

  /**
   * Render a cell or menu item
   * @param item - The item to render
   * @returns {JSX.Element} - Element representing the item
   */
  @autobind
  private _renderOption(item: ISwatchColorPickerItemProps): JSX.Element {
    let id = this._id;

    return (
      <SwatchColorPickerOption
        item={ item }
        id={ id }
        key={ id + item.id }
        disabled={ this.props.disabled || item.disabled }
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
  private _onCellClick(item: ISwatchColorPickerItemProps) {
    if (this.props.disabled || item.disabled) {
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
    } else if (index === this.state.selectedIndex) {

      // The index that got the click was already selected,
      // clear the selection
      this._clearColors([this.props.onColorChanged!, this.props.onCellHovered!, this.props.onCellFocused!]);

      this.setState({
        selectedIndex: undefined
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