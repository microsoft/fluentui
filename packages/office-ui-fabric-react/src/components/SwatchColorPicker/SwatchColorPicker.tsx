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
  ISwatchColorPickerItemProps,
  SwatchColorPickerItemType
} from './SwatchColorPicker.Props';
import { DirectionalHint } from '../../ContextualMenu';
import { getColorFromString } from '../../utilities/color/colors';
import { Grid } from '../../utilities/grid/Grid';
import { DefaultButton, CommandButton, IButtonProps } from '../../Button';
import { Callout } from '../../Callout';
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
   * Optional, the position in the parent set for this item
   */
  posInSet?: number;

  /**
   * Optional, the size of the total parent set
   */
  setSize?: number;

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
   * The shape for the option (only used for item type.Cell)
   */
  cellShape?: 'circle' | 'square';
}

const SwatchColorPickerOption: React.StatelessComponent<ISwatchColorPickerOptionProps> =
  (props: ISwatchColorPickerOptionProps) => {
    let {
      item,
      id,
      posInSet,
      setSize,
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
        { ...item.menuItemButtonProps }
        id={ id + '-item' + item.index }
        data-index={ item.index }
        data-is-focusable={ true }
        aria-posinset={ posInSet && posInSet }
        aria-setsize={ setSize && setSize }
        disabled={ disabled }
        className={ css(className,
          {
            ['is-selected ' + styles.cellIsSelected]: (selectedIndex && selectedIndex === item.index),
            ['is-disabled ' + styles.disabled]: disabled
          }
        ) }
        onClick={ _onClick }
        onMouseEnter={ _onMouseEnter }
        onMouseLeave={ _onMouseLeave }
        onFocus={ _onFocus }
        role={ role }
        aria-selected={ selectedIndex && (selectedIndex === item.index).toString() }
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

      // Menu items just need their label text
      if (item.type !== SwatchColorPickerItemType.Cell) {
        return <span className={ styles.menuItem } >{ item.label }</span>;
      }

      // Build an SVG for the cell with the given shape and color properties
      return (
        <svg className={ css(styles.svg, cellShape, cellShape === 'circle' ? styles.circle : '') } viewBox='0 0 20 20' fill={ getColorFromString(item.color).str } >
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
  expanded?: boolean;
}

export class SwatchColorPicker extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState> implements ISwatchColorPicker {

  public static defaultProps = {
    cellShape: 'circle',
    updateButtonIconWithColor: false,
    disabled: false
  };

  private _id: string;

  private _buttonWrapper: HTMLDivElement;

  constructor(props: ISwatchColorPickerProps) {
    super(props);

    this._id = props.id || getId('swatchColorPicker');

    let selectedIndex: number | undefined;
    if (props.selectedId) {
      selectedIndex = this._getSelectedIndex(props.swatchColorPickerItems, props.selectedId);
    }

    this.state = {
      selectedIndex,
      expanded: false
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
    let { expanded } = this.state;
    let { menuButtonProps,
      disabled,
      swatchColorPickerItems,
      columnCount } = this.props;

    // If we got button props, put the swatch color picker behind a button, otherwise
    // render all of the items
    let colorToSet = this._getSelectedColorToSet();
    let renderElement = menuButtonProps !== undefined ?
      <SwatchColorPickerMenuButton
        { ...this.props }
        color={ colorToSet }
        onClick={ this._onButtonClick }
        expanded={ !!this.state.expanded }
        onRenderContainer={ this._onRenderContainer }
        menuIconProps={ menuButtonProps.menuIconProps ?
          menuButtonProps.menuIconProps :
          { iconName: 'chevronDown' } }
      /> :
      <SwatchColorPickerBody
        { ...this.props }
        onRenderItems={ this._onRenderItems }
      />;

    return (
      <div
        ref={ this._resolveRef('_buttonWrapper') }
        className={ css('ms-swatchColorPickerWrapper', styles.wrapper) }>
        { renderElement }
      </div>);
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
    let {
      swatchColorPickerItems,
      setSelectedColorForIcon
    } = this.props;

    // Do we need to update the button with the selected
    // item's color? If so, attempt to grab the color
    if (setSelectedColorForIcon && selectedIndex !== undefined) {
      let swatchColorPickerItem = swatchColorPickerItems[selectedIndex];
      if (swatchColorPickerItem.type === SwatchColorPickerItemType.Cell) {
        return swatchColorPickerItem.color;
      }
    }

    return undefined;
  }

  /**
   * Render all the items
   * @param items - The swatch color picker items
   * @returns {JSX.Element[]} - An array of all the items in the swatch color picker
   */
  @autobind
  private _onRenderItems(items: ISwatchColorPickerItemProps[]): JSX.Element[] {

    // This holds all of the element for the items
    let elements: JSX.Element[] = [];

    // The number of cells that were processed in the previous iteration of loop.
    // This will be used to increase the index to the item after the last processed
    // item
    let numOfItemsInChunk = -1;

    // If we have cell items and we are in a menu, get all the
    // first executable items per chunk. Note, in this
    // context each menuItem is in its own "chunk", only grouped
    // cells are processed as a chunk. This helps with being able
    // to determine the correct aria-posinset and aria-setsize values
    let firstExecutableItemsPerChunk = (this.props.menuButtonProps ?
      this._getFirstExecutableItemsPerChunk() : undefined) as ISwatchColorPickerItemProps[];

    // Did we find any executable items? (e.g. should be calculate the set information)
    let shouldGetSetInfo = (firstExecutableItemsPerChunk && firstExecutableItemsPerChunk.length > 0);

    let setSize = shouldGetSetInfo ? firstExecutableItemsPerChunk.length : undefined;

    // If any menuItem has an icon, all menu items need to be positined correctly so they align
    let shouldAccountForIcon = (firstExecutableItemsPerChunk && findIndex(firstExecutableItemsPerChunk, (executableItem) => (executableItem.type === SwatchColorPickerItemType.MenuItem && executableItem.menuItemButtonProps)));

    // Loop across the items processing them depending on their item type
    let index = 0;
    while (index < items.length) {
      let item = items[index];
      let posInSet = shouldGetSetInfo ? this._getPositionInSet(firstExecutableItemsPerChunk, item.id) : undefined;
      switch (item.type) {
        case SwatchColorPickerItemType.Divider:
          elements.push(this._renderSeparator(item));
          break;
        case SwatchColorPickerItemType.Header:
          elements.push(this._renderHeader(item));
          break;
        case SwatchColorPickerItemType.Cell:

          // build all the cells in the chunk this cell
          // exists within (this will process all of the
          // consecutive cells until the next non-cell type
          // is incountered (or if we reach the end of the items))
          let chunkItems = this._getNextChunkOfCellItems(items.slice(index));

          // Update the number of items in chunk
          numOfItemsInChunk = chunkItems.length > 0 ? chunkItems.length : -1;

          // Add the result to the array
          elements.push(this._renderNextChunkOfCellItems(
            chunkItems,
            posInSet,
            setSize));
          break;
        default:

          // Does at least one of the menu items have an icon?
          if (shouldAccountForIcon) {

            // Make sure the width styling is the same by applying a consistent className
            if (item.menuItemButtonProps) {
              item.menuItemButtonProps = {
                ...item.menuItemButtonProps,
                iconProps: { ...item.menuItemButtonProps.iconProps, className: styles.icon }
              };
            } else {

              // This menu item didn't have an icon so add a "spacer" icon to make the text
              // content align. This aligns with how ContextualMenu achieves this alignmet
              item.menuItemButtonProps = { ...item.menuItemButtonProps, iconProps: { iconName: 'customIcon', className: styles.icon } };
            }
          }
          elements.push(this._renderOption(item, posInSet, setSize));
      }

      // Increase the index by the number of items in the just processed chunk,
      // otherwise just increment the index
      index += numOfItemsInChunk > 0 ? numOfItemsInChunk : 1;
      numOfItemsInChunk = -1;
    }

    return elements;
  }

  /**
   * Renders the next consecutive chunk of cells
   * @param items - The items to process
   * @param posInSet - Optional, the position in the set for this chunk
   * @param setSize - Optional, the size of the total set
   * @returns {JSX.Element} - The grid that represents the chunk
   */
  private _renderNextChunkOfCellItems(items: ISwatchColorPickerItemProps[], posInSet?: number, setSize?: number): JSX.Element {
    return (
      <Grid
        key={ this._id + items[0].id + '-grid' }
        items={ items }
        columnCount={ this.props.columnCount }
        onRenderItem={ this._renderOption }
        positionInSet={ posInSet }
        setSize={ setSize }
      />
    );
  }

  /**
   * Get the position in set for the given id
   * @param firstExecutableItemsPerChunk - The list of fist executable items per chunk
   * @param itemId - The id of item to find the index of
   * @returns {number} - The position in the set
   */
  private _getPositionInSet(firstExecutableItemsPerChunk: ISwatchColorPickerItemProps[], itemId: string): number | undefined {

    // Find the index of the given id in the list of first executable items per chunk
    let index = findIndex(firstExecutableItemsPerChunk, (executableItem) => (executableItem.id === itemId));

    return index < 0 ? undefined : index + 1;
  }

  /**
   * Gets the next chunk of consecutive cells starting a index zero.
   * Note, index zero should be of type cell
   * @param items - The list of items to process where index zero is the start of the chunk
   * @returns {ISwatchColorPickerItemProps[]} - the array of consecutive cells starting at index zero
   *   (and continuing to the first non-cell type or the end of the items)
   */
  private _getNextChunkOfCellItems(items: ISwatchColorPickerItemProps[]): ISwatchColorPickerItemProps[] {
    let nextIndextAfterChunk = findIndex(items, (item => item.type !== SwatchColorPickerItemType.Cell));

    // If we didn't find a non-cell item, we need to handle everything that is left
    if (nextIndextAfterChunk < 0) {
      return items;
    }

    // If we get here we found our chunk boundry
    return items.slice(0 /* start */, nextIndextAfterChunk);
  }

  /**
   * Get only the executable items (cells and menuItems)
   * @returns {ISwatchColorPickerItemProps[]} - an array of the executable items
   */
  private _getFirstExecutableItemsPerChunk(): ISwatchColorPickerItemProps[] {

    // Make sure every item has an index, then filter
    // the results so that you only get the executable items,
    // finally filter those items down to just the items that are
    // either the start of a chunk or an menu item
    return (
      this.props.swatchColorPickerItems.map((item, index) => { return { ...item, index }; })
        .filter(item => (item.type === SwatchColorPickerItemType.Cell || item.type === SwatchColorPickerItemType.MenuItem))
        .filter((item, filteredIndex, items) => {
          return (
            filteredIndex === 0 ||
            item.type === SwatchColorPickerItemType.MenuItem ||
            (item.index - items[filteredIndex - 1].index !== 1)
          );
        }));
  }

  /**
   * Render the separator
   * @param item - The divider item to get the data to render from
   * @returns {JSX.Element} - Element that represents the separator
   */
  private _renderSeparator(item: ISwatchColorPickerItemProps): JSX.Element {
    return this._renderHeaderOrDivider(item, 'separator', styles.divider);
  }

  /**
   * Render the header
   * @param item - The header item to get the data to render from
   * @returns {JSX.Element} - Element that represents the header
   */
  private _renderHeader(item: ISwatchColorPickerItemProps): JSX.Element {
    return this._renderHeaderOrDivider(item, 'heading', styles.header);
  }

  /**
   * Handle the rendering of the header/divider
   * @param item - The item to get the data to render from
   * @param role - The role of the element
   * @param className - the className to use
   * @returns {JSX.Element} - Element that represents the header
   */
  private _renderHeaderOrDivider(item: ISwatchColorPickerItemProps, role: string, className: string): JSX.Element {
    return <div
      role={ role }
      key={ item.id }
      className={ className }
    >
      { item.label && item.label }
    </div>;
  }

  /**
   * Render a cell or menu item
   * @param item - The item to render
   * @param posInSet - Optional, the position in the set of the item
   * @param setSize - Optional, the total set size this item is in
   * @returns {JSX.Element} - Element representing the item
   */
  @autobind
  private _renderOption(item: ISwatchColorPickerItemProps, posInSet?: number, setSize?: number): JSX.Element {
    let id = this._id;
    let isCell = item.type === SwatchColorPickerItemType.Cell;
    let optionProps;

    if (isCell) {
      optionProps = {
        className: styles.cell,
        onClick: this._onCellClick,
        onHover: this.props.onCellHovered,
        onFocus: this.props.onCellFocused,
        role: 'gridcell',
        selectedIndex: this.state.selectedIndex
      };
    } else {
      optionProps = {
        posInSet: posInSet && posInSet,
        setSize: setSize && setSize,
        className: styles.item,
        onClick: this._onMenuItemClick,
        onFocus: this._clearFocusColorOnMenuItem,
        role: this.props.menuButtonProps ? 'menuitem' : 'button'
      };
    }

    return (
      <SwatchColorPickerOption
        item={ item }
        id={ this._id }
        key={ id + item.id }
        disabled={ this.props.disabled || item.disabled }
        cellShape={ this.props.cellShape }
        { ...optionProps }
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
        selectedIndex: index,
        expanded: false
      });
    } else if (index === this.state.selectedIndex) {

      // The index that got the click was already selected,
      // clear the selection
      this._clearColors([this.props.onColorChanged!, this.props.onCellHovered!, this.props.onCellFocused!]);

      this.setState({
        selectedIndex: undefined,
        expanded: false
      });
    }
  }

  /**
   * Handle the click on a menu item
   * @param item - The menu item that the click was fired against
   */
  @autobind
  private _onMenuItemClick(item: ISwatchColorPickerItemProps) {
    if (this.props.disabled || item.disabled) {
      return;
    }

    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(item);
    }

    // Make sure to clear any hover/focus colors
    this._clearColors([this.props.onCellHovered!, this.props.onCellFocused!]);

    this.setState({
      expanded: false
    });
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

  /**
   * Clear the focus color
   * @param id - The id of the item
   * @param color - The color for the item
   */
  @autobind
  private _clearFocusColorOnMenuItem(id?: string, color?: string) {
    this._clearColors([this.props.onCellFocused!]);
  }

  /**
   * onClick Handler for the button
   */
  @autobind
  private _onButtonClick() {
    if (this.props.disabled) {
      return;
    }

    if (this.state.expanded) {
      this._onDismiss();
    }

    this.setState({
      expanded: this.props.disabled ? false : !this.state.expanded
    });
  }

  /**
   * Render the menu (callout) for when the swatch color picker
   * is behind a button and is expanded
   */
  @autobind
  private _onRenderContainer() {
    return (
      <Callout
        isBeakVisible={ false }
        gapSpace={ 0 }
        doNotLayer={ false }
        role={ 'menu' }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        className={ css('ms-swatchColorPickerMenu', styles.swatchColorPickerContainer) }
        targetElement={ this._buttonWrapper }
        onDismiss={ this._onDismiss }
        setInitialFocus={ true }>
        <SwatchColorPickerBody
          { ...this.props }
          onRenderItems={ this._onRenderItems }
        />
      </Callout>
    );
  }

  /**
   * Handle dismissing the menu
   */
  @autobind
  private _onDismiss() {
    this._clearColors([this.props.onCellHovered!, this.props.onCellFocused!]);

    this.setState({
      expanded: false
    });
  }
}

interface IMenuButtonProps extends IButtonProps {
  /**
   * The CSS-compatible string to describe the color to set
   * for the button
   */
  color?: string;

  /**
   * Is the menuButton expanded?
   */
  expanded: boolean;

  /**
   * Is the menuButton disabled>
   */
  disabled?: boolean;

  /**
   * OnClick handler
   */
  onClick: () => void;

  /**
   * Callback for rendering the expanded container
   */
  onRenderContainer: () => JSX.Element;

  /**
   * Optional, ButtonProps for the menuButton
   */
  menuButtonProps?: IButtonProps;
}

class SwatchColorPickerMenuButton extends BaseComponent<IMenuButtonProps, {}> {
  public static defaultProps = {
    expanded: false,
    disabled: false
  };

  public render() {
    let {
      color,
      expanded,
      disabled,
      onClick,
      onRenderContainer,
      menuIconProps,
      menuButtonProps
    } = this.props;
    return (
      <div>
        <DefaultButton
          { ...menuButtonProps }
          style={ { color: color && color } }
          className={
            css('ms-swatchColorPickerButton',
              {
                'is-expanded': expanded
              }
            )
          }
          onClick={ onClick }
          aria-haspopup={ true }
          aria-expanded={ !disabled && expanded }
          disabled={ disabled }
          menuIconProps={ menuIconProps ?
            menuIconProps :
            { iconName: 'chevronDown' } }
        />
        { (!disabled && expanded) &&
          onRenderContainer()
        }
      </div>
    );
  }
}

interface ISwatchColorPickerBodyProps {
  componentRef?: () => void;
  swatchColorPickerItems: ISwatchColorPickerItemProps[];
  columnCount: number;
  onRenderItems: (items: ISwatchColorPickerItemProps[]) => JSX.Element[];
}

class SwatchColorPickerBody extends BaseComponent<ISwatchColorPickerBodyProps, {}> {
  public render() {
    let {
      swatchColorPickerItems,
      columnCount,
      onRenderItems
    } = this.props;
    return (
      <FocusZone
        isCircularNavigation={ true }
        className={ css('ms-swatchColorPickerBodyContainer', styles.swatchColorPickerContainer) }
      >
        { onRenderItems(swatchColorPickerItems.map((item, index) => { return { ...item, index }; })) }
      </FocusZone>
    );
  }
}