import * as React from 'react';
import {
  autobind,
  BaseComponent,
  css,
  findIndex,
  getId
} from '../../../Utilities';
import { IPredefinedColorPickerProps, IColorPickerItemProps, ColorPickerItemType, CellShape } from './PredefinedColorPicker.Props';
import { DirectionalHint } from '../../../ContextualMenu';
import { getColorFromString } from '../../../utilities/color/colors';
import { DefaultButton, CommandButton } from '../../../Button';
import { Callout } from '../../../Callout';
import { Icon } from '../../../Icon';
import { FocusZone } from '../../../FocusZone';
import * as stylesImport from './PredefinedColorPicker.scss';
const styles: any = stylesImport;

export interface IPredefinedColorPickerState {
  selectedIndex?: number;
  isOpen?: boolean;
}

export class PredefinedColorPicker extends BaseComponent<IPredefinedColorPickerProps, IPredefinedColorPickerState> {

  public static defaultProps = {
    cellShape: CellShape.circle,
    updateButtonIconWithColor: false
  };

  private _id: string;

  private _buttonWrapper: HTMLDivElement;

  constructor(props: IPredefinedColorPickerProps) {
    super(props);

    this._id = props.id || getId('Dropdown');

    this.state = {
      selectedIndex: props.selectedKey && this._getSelectedIndex(props.colorPickerItems, props.selectedKey),
      isOpen: false
    };
  }

  public componentWillReceiveProps(newProps: IPredefinedColorPickerProps) {
    let newSelectedIndex = newProps.selectedKey && this._getSelectedIndex(newProps.colorPickerItems, newProps.selectedKey);

    if (newSelectedIndex !== undefined &&
      (newSelectedIndex !== this.state.selectedIndex || newProps.colorPickerItems !== this.props.colorPickerItems)) {
      this.setState({
        selectedIndex: newSelectedIndex
      });
    }
  }

  public render() {
    let { selectedIndex } = this.state;
    let { colorPickerButtonIconProps, colorPickerItems, width } = this.props;

    let renderElement = colorPickerButtonIconProps !== undefined ? this._buttonToRender() : this._fullColorPickerToRender();

    return (renderElement);
  }

  private _getSelectedIndex(options: IColorPickerItemProps[], selectedKey: string | number) {
    return findIndex(options, (option => (option.isSelected || option.selected || (selectedKey != null) && option.key === selectedKey)));
  }

  private _buttonToRender() {
    let { selectedIndex } = this.state;
    let {
      colorPickerButtonIconProps,
      colorPickerItems,
      updateButtonIconWithColor,
      width
    } = this.props;

    let colorToSet = null;
    if (updateButtonIconWithColor &&
      selectedIndex &&
      selectedIndex >= 0 &&
      selectedIndex < colorPickerItems.length) {
      let colorPickerItem = colorPickerItems[selectedIndex];
      if (colorPickerItem.type === ColorPickerItemType.Cell &&
        colorPickerItem.color !== null &&
        colorPickerItem.color.length > 0) {
        colorToSet = colorPickerItem.color;
      }
    }

    return (
      <div ref={ this._resolveRef('_buttonWrapper') }>
        <DefaultButton
          iconProps={ colorPickerButtonIconProps }
          style={ { color: colorToSet && colorToSet } }
          onClick={ this._onClickButton }
        >
          <Icon iconName={ 'chevronDown' } />
        </DefaultButton>
        { this.state.isOpen && this._onRenderContainer() }
      </div>
    );
  }

  @autobind
  private _fullColorPickerToRender() {
    let { colorPickerItems, width } = this.props;
    return (
      <FocusZone
        isCircularNavigation={ true }
        className={ styles.colorPickerContainer }
        style={ { width: width && ((width * 32) + 'px') } }>
        { this._onRenderItems(colorPickerItems) }
      </FocusZone>
    );
  }

  @autobind
  private _onRenderItems(items: IColorPickerItemProps[]) {
    let {
      width
    } = this.props;

    let optionsContainsCells = findIndex(items, (item => (item.type !== null && item.type === ColorPickerItemType.Cell)));


    for (let index = 0; index < items.length; index++) {
      let item = items[index];
      switch (item.type) {
        case ColorPickerItemType.Divider:
          return this._renderSeparator(item);
        case ColorPickerItemType.Header:
          return this._renderHeader(item);
        default:
          return this._renderOption(item);
      }

      // need to loop across items, creating the separators, headers, menuItems as needed
      // and when you encounter a cell type, call a method to stuff the options into a table
      // with rows and columnWidth being equal to width
      // until you either reach the end or a non-cell. Will need to pass back the updated index to start with
      // for being able to continue building the menu
    }
  }

  // @autobind
  // private _onRenderMenuItem(item: any) {
  //   return this._onRenderItem(item.data);
  // }

  // Render separator
  private _renderSeparator(item: IColorPickerItemProps): JSX.Element {
    let { index, key } = item;
    if (index > 0) {
      return <div
        role='separator'
        key={ key }
        className={ css('ms-Dropdown-divider', styles.divider) } />;
    }
    return null;
  }

  private _renderHeader(item: IColorPickerItemProps): JSX.Element {
    return (
      <div className={ css('ms-Dropdown-header', styles.header) } key={ item.key }>
        { this._onRenderOption(item) }
      </div>);
  }

  // Render menu item
  @autobind
  private _renderOption(item: IColorPickerItemProps): JSX.Element {
    let id = this._id;
    return (
      <CommandButton
        id={ id + '-list' + item.index }
        ref={ 'option' + item.index }
        key={ item.key }
        data-index={ item.index }
        data-is-focusable={ true }
        className={ css(
          'ms-Dropdown-item', styles.item, {
            ['is-selected ' + styles.itemIsSelected]: this.state.selectedIndex === item.index
          }
        ) }
        onClick={ () => this._onItemClick(item.index) }
        role='option'
        aria-selected={ this.state.selectedIndex === item.index ? 'true' : 'false' }
        ariaLabel={ item.label && item.label }
        title={ item.label && item.label }
      > { this._onRenderOption(item) }</CommandButton>
    );
  }

  @autobind
  private _onItemClick(index: number) {
    if (index >= 0 && index < this.props.colorPickerItems.length && index !== this.state.selectedIndex) {
      if (this.props.onColorChanged) {
        this.props.onColorChanged(this.props.colorPickerItems[index].color);
      }

      this.setState({
        selectedIndex: index,
        isOpen: false
      });
    } else if (index === this.state.selectedIndex) {
      this.setState({
        selectedIndex: -1,
        isOpen: false
      });
    }
  }

  @autobind
  private _onClickButton() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  @autobind
  private _onRenderOption(item: IColorPickerItemProps): JSX.Element {
    if (item.type !== ColorPickerItemType.Cell) {
      return <span className={ css('ms-colorPicker-header', styles.optionText) }>{ item.label }</span>;
    }

    return (
      <svg className={ css(styles.svg, this.props.cellShape === CellShape.circle ? styles.circle : '') } viewBox='0 0 20 20' fill={ getColorFromString(item.color).str } >
        {
          (this.props.cellShape === CellShape.circle) ?
            <circle cx='50%' cy='50%' r='50%' /> :
            <rect width='100%' height='100%' />
        }
      </svg>
    );
  }

  @autobind
  private _onRenderContainer() {
    return (
      <Callout
        isBeakVisible={ false }
        gapSpace={ 0 }
        doNotLayer={ false }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        className={ styles.colorPickerContianer }
        targetElement={ this._buttonWrapper }
        onDismiss={ this._onDismiss }
        setInitialFocus={ true }>
        { this._fullColorPickerToRender() }
      </Callout>
    );
  }

  @autobind
  private _onDismiss() {
    this.setState({
      isOpen: false
    });
  }
}
