import * as React from 'react';
import { IDropdownProps, IDropdownOption, DropdownMenuItemType } from './Dropdown.Props';
import { Checkbox } from '../../Checkbox';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout, CalloutLinkType } from '../../Callout';
import { Label } from '../../Label';
import { CommandButton } from '../../Button';
import { Panel } from '../../Panel';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  findIndex,
  getId,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.Props';
import * as stylesImport from './Dropdown.scss';
const styles: any = stylesImport;

// Internal only props interface to support mixing in responsive mode
export interface IDropdownInternalProps extends IDropdownProps, IWithResponsiveModeState {

}

export interface IDropdownState {
  isOpen?: boolean;
  selectedIndex?: number;
  selectedIndexes?: number[];
}

@withResponsiveMode
export class Dropdown extends BaseComponent<IDropdownInternalProps, IDropdownState> {

  public static defaultProps = {
    options: [] as any[]
  };

  private static Option: string = 'option';

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    focusZone: FocusZone
  };

  private _focusZone: FocusZone;
  private _dropDown: HTMLDivElement;
  private _dropdownLabel: HTMLElement;
  private _id: string;

  constructor(props: IDropdownProps) {
    props.options.forEach((option: any) => {
      if (!option.itemType) {
        option.itemType = DropdownMenuItemType.Normal;
      }
    });
    super(props);

    this._warnDeprecations({
      'isDisabled': 'disabled'
    });

    this._warnMutuallyExclusive({
      'defaultSelectedKey': 'selectedKey',
      'defaultSelectedKeys': 'selectedKeys',
      'selectedKeys': 'selectedKey',
      'multiSelect': 'defaultSelectedKey',
      'selectedKey': 'multiSelect'
    });

    this._id = props.id || getId('Dropdown');

    this.state = {
      isOpen: false
    };
    if (this.props.multiSelect) {
      let selectedKeys = props.defaultSelectedKeys !== undefined ? props.defaultSelectedKeys : props.selectedKeys;
      this.state = {
        selectedIndexes: this._getSelectedIndexes(props.options, selectedKeys!)
      };
    } else {
      let selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;
      this.state = {
        selectedIndex: this._getSelectedIndex(props.options, selectedKey!)
      };
    }

  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    // In controlled component usage where selectedKey is provided, update the selectedIndex
    // state if the key or options change.
    if (newProps.selectedKey !== undefined &&
      (newProps.selectedKey !== this.props.selectedKey || newProps.options !== this.props.options)) {
      if (this.props.multiSelect) {
        this.setState({
          selectedIndexes: this._getSelectedIndexes(newProps.options, newProps.selectedKeys)
        });
      } else {
        this.setState({
          selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey)
        });
      }
    }
  }

  public componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
    if (prevState.isOpen === true && this.state.isOpen === false) {
      this._dropDown.focus();
    }
  }

  // Primary Render
  public render() {
    let id = this._id;
    let {
      className,
      label,
      options,
      disabled,
      isDisabled,
      ariaLabel,
      required,
      errorMessage,
      onRenderTitle = this._onRenderTitle,
      onRenderContainer = this._onRenderContainer,
      onRenderPlaceHolder = this._onRenderPlaceHolder
    } = this.props;
    let { isOpen, selectedIndex, selectedIndexes } = this.state;
    let selectedOption = this.props.multiSelect ? selectedIndexes && this._getAllSelectedOptions(options, selectedIndexes)
      : options[selectedIndex as number];
    let divProps = getNativeProps(this.props, divProperties);

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }

    return (
      <div ref='root' className={ css('ms-Dropdown-container') }>
        { label && (
          <Label className={ css('ms-Dropdown-label') } id={ id + '-label' } ref={ this._resolveRef('_dropdownLabel') } required={ required }>{ label }</Label>
        ) }
        <div
          data-is-focusable={ !disabled }
          ref={ this._resolveRef('_dropDown') }
          id={ id }
          tabIndex={ disabled ? -1 : 0 }
          aria-expanded={ isOpen ? 'true' : 'false' }
          role='menu'
          aria-live={ disabled || isOpen ? 'off' : 'assertive' }
          aria-label={ ariaLabel || label }
          aria-describedby={ id + '-option' }
          aria-activedescendant={ isOpen && selectedIndex! >= 0 ? (this._id + '-list' + selectedIndex) : null }
          aria-disabled={ disabled }
          aria-owns={ isOpen ? id + '-list' : null }
          { ...divProps }
          className={ css('ms-Dropdown', styles.root, className, {
            'is-open': isOpen!,
            ['is-disabled ' + styles.rootIsDisabled]: disabled!,
            'is-required ': required!,
          }) }
          onBlur={ this._onDropdownBlur }
          onKeyDown={ this._onDropdownKeyDown }
          onKeyUp={ this._onDropdownKeyUp }
          onClick={ this._onDropdownClick }
        >
          <span
            id={ id + '-option' }
            className={ css(
              'ms-Dropdown-title', styles.title,
              !selectedOption && styles.titleIsPlaceHolder,
              (errorMessage && errorMessage.length > 0 ? styles.titleIsError : null))
            }
            key={ selectedIndex }
            aria-atomic={ true }
            role='textbox'
            aria-readonly='true'
          >
            { // If option is selected render title, otherwise render the placeholder text
              selectedOption ? (
                onRenderTitle(selectedOption, this._onRenderTitle)
              ) :
                onRenderPlaceHolder(this.props, this._onRenderPlaceHolder)
            }
          </span>
          <Icon className={ css('ms-Dropdown-caretDown', styles.caretDown) } iconName='ChevronDown' />
        </div>
        { isOpen && (
          onRenderContainer(this.props, this._onRenderContainer)
        ) }
        {
          errorMessage &&
          <div
            className={ css(styles.errorMessage) }>
            { errorMessage }
          </div>
        }
      </div>
    );
  }

  public focus() {
    if (this._dropDown && this._dropDown.tabIndex !== -1) {
      this._dropDown.focus();
    }
  }

  public setSelectedIndex(index: number) {
    let { onChanged, options, selectedKey, selectedKeys } = this.props;
    let { selectedIndex, selectedIndexes } = this.state;
    let checked: boolean = selectedIndexes ? selectedIndexes.indexOf(index) > -1 : false;

    index = Math.max(0, Math.min(options.length - 1, index));

    if (index !== selectedIndex) {
      if (selectedKey === undefined) {
        // Set the selected option if this is an uncontrolled component
        if (this.props.multiSelect) {
          let newIndexes = selectedIndexes ? this._copyArray(selectedIndexes) : [];
          if (checked) {
            let position = newIndexes.indexOf(index);
            if (position > -1) {
              // unchecked the current one
              newIndexes.splice(position, 1);
            }
          } else {
            // add the new selected index into the existing one
            newIndexes.push(index);
          }
          this.setState({
            selectedIndexes: newIndexes
          });
        } else {
          this.setState({
            selectedIndex: index
          });
        }
      }
      if (onChanged) {
        // for single-select, option passed in will always be selected.
        // for multi-select, flip the checked value
        let changedOpt = options[index];
        changedOpt.selected = this.props.multiSelect ? !checked : true;
        onChanged(changedOpt, index);
      }
    }
  }

  private _copyArray(array: any[]): any[] {
    let newArray = [];
    for (let element of array) {
      newArray.push(element);
    }
    return newArray;
  }

  /**
   * Finds the next valid Dropdown option and sets the selected index to it.
   * @param stepValue Value of how many items the function should traverse.  Should be -1 or 1.
   * @param index Index of where the search should start
   * @param selectedIndex The selectedIndex Dropdown's state
   * @returns The next valid dropdown option's index
   */
  private _moveIndex(stepValue: number, index: number, selectedIndex: number): number {
    const { options } = this.props;
    // Return selectedIndex if nothing has changed or options is empty
    if (selectedIndex === index || options.length === 0) {
      return selectedIndex;
    }

    // Set starting index to 0 if index is < 0
    if (index < 0) {
      index = 0;
    }
    // Set starting index to last option index if greater than options.length
    if (index >= options.length) {
      index = options.length - 1;
    }
    let stepCounter = 0;
    // If current index is a header or divider, increment by step
    while (options[index].itemType === DropdownMenuItemType.Header || options[index].itemType === DropdownMenuItemType.Divider) {
      // If stepCounter exceeds length of options, then return selectedIndex (-1)
      if (stepCounter >= options.length) {
        return selectedIndex;
      }
      // If index + stepValue is out of bounds, reverse step direction
      if (index + stepValue < 0 || index + stepValue >= options.length) {
        stepValue *= -1;
      }
      index = index + stepValue;
      stepCounter++;
    }

    this.setSelectedIndex(index);
    return index;
  }

  // Render text in dropdown input
  @autobind
  private _onRenderTitle(item: IDropdownOption | IDropdownOption[]): JSX.Element {
    let displayTxt: string = '';
    if (this.props.multiSelect && Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        displayTxt += item[i].text;
        displayTxt += (i === item.length - 1) ? '' : ',';
      }
    } else {
      displayTxt = (item as IDropdownOption).text;
    }
    return <span>{ displayTxt }</span>;
  }

  // Render placeHolder text in dropdown input
  @autobind
  private _onRenderPlaceHolder(props: IDropdownProps): JSX.Element | null {
    if (!props.placeHolder) {
      return null;
    }
    return <span>{ props.placeHolder }</span>;
  }

  // Render Callout or Panel container and pass in list
  @autobind
  private _onRenderContainer(props: IDropdownProps): JSX.Element {
    let {
      onRenderList = this._onRenderList,
      responsiveMode,
      calloutProps
    } = this.props;

    let isSmall = responsiveMode! <= ResponsiveMode.medium;

    return (
      isSmall ?
        <Panel
          className={ css('ms-Dropdown-panel', styles.panel) }
          isOpen={ true }
          isLightDismiss={ true }
          onDismissed={ this._onDismiss }
          hasCloseButton={ false }
        >
          { onRenderList(props, this._onRenderList) }
        </Panel>
        :
        <Callout
          isBeakVisible={ false }
          gapSpace={ 0 }
          doNotLayer={ false }
          directionalHint={ DirectionalHint.bottomLeftEdge }
          { ...calloutProps }
          className={ css('ms-Dropdown-callout', styles.callout, calloutProps ? calloutProps.className : undefined) }
          targetElement={ this._dropDown }
          onDismiss={ this._onDismiss }
          onPositioned={ this._onPositioned }
          linkType={ CalloutLinkType.attached }
        >
          <div style={ { width: this._dropDown.clientWidth - 2 } }>
            { onRenderList(props, this._onRenderList) }
          </div>
        </Callout>
    );
  }

  // Render List of items
  @autobind
  private _onRenderList(props: IDropdownProps): JSX.Element {
    let {
      onRenderItem = this._onRenderItem
    } = this.props;

    let id = this._id;
    let { selectedIndex } = this.state;

    return (
      <FocusZone
        ref={ this._resolveRef('_focusZone') }
        direction={ FocusZoneDirection.vertical }
        defaultActiveElement={ '#' + id + '-list' + selectedIndex }
        id={ id + '-list' }
        className={ css('ms-Dropdown-items', styles.items) }
        aria-labelledby={ id + '-label' }
        onKeyDown={ this._onZoneKeyDown }
        role='listbox'
      >
        { this.props.options.map((item: any, index: number) => onRenderItem({ ...item, index }, this._onRenderItem)) }
      </FocusZone>
    );
  }

  // Render items
  @autobind
  private _onRenderItem(item: IDropdownOption): JSX.Element | null {
    switch (item.itemType) {
      case SelectableOptionMenuItemType.Divider:
        return this._renderSeparator(item);
      case SelectableOptionMenuItemType.Header:
        return this._renderHeader(item);
      default:
        return this._renderOption(item);
    }
  }

  // Render separator
  private _renderSeparator(item: IDropdownOption): JSX.Element | null {
    let { index, key } = item;
    if (index! > 0) {
      return <div
        role='separator'
        key={ key }
        className={ css('ms-Dropdown-divider', styles.divider) } />;
    }
    return null;
  }

  private _renderHeader(item: IDropdownOption): JSX.Element {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { key } = item;
    return (
      <div key={ key }
        className={ css('ms-Dropdown-header', styles.header) }>
        { onRenderOption(item, this._onRenderOption) }
      </div>);
  }

  // Render menu item
  @autobind
  private _renderOption(item: IDropdownOption): JSX.Element {
    let { onRenderOption = this._onRenderOption } = this.props;
    let { selectedIndexes } = this.state;
    let id = this._id;
    let isItemSelected;
    if (this.props.multiSelect) {
      isItemSelected = item.index && selectedIndexes ? selectedIndexes.indexOf(item.index) > -1 : false;
    }
    return (
      !this.props.multiSelect ?
        <CommandButton
          id={ id + '-list' + item.index }
          ref={ Dropdown.Option + item.index }
          key={ item.key }
          data-index={ item.index }
          data-is-focusable={ true }
          className={ css(
            'ms-Dropdown-item', styles.item, {
              ['is-selected ' + styles.itemIsSelected]: this.state.selectedIndex === item.index,
              ['is-disabled ' + styles.itemIsDisabled]: this.props.disabled === true
            }
          ) }
          onClick={ () => this._onItemClick(item.index!) }
          role='option'
          aria-selected={ this.state.selectedIndex === item.index ? 'true' : 'false' }
          ariaLabel={ item.ariaLabel || item.text }
          title={ item.text }
        > { onRenderOption(item, this._onRenderOption) }</CommandButton>
        :
        <Checkbox
          id={ id + '-list' + item.index }
          ref={ Dropdown.Option + item.index }
          key={ item.key }
          data-index={ item.index }
          data-is-focusable={ true }
          onChange={ () => this._onItemClick(item.index!) }
          label={ item.text }
          className={ css(
            'ms-ColumnManagementPanel-checkbox',
            'ms-Dropdown-item', styles.item, {
              ['is-selected ' + styles.itemIsSelected]: isItemSelected,
              ['is-disabled ' + styles.itemIsDisabled]: isItemSelected
            }
          ) }
          role='option'
          aria-selected={ isItemSelected ? 'true' : 'false' }
          checked={ isItemSelected }
        >{ onRenderOption(item, this._onRenderOption) } </Checkbox>
    );
  }

  // Render content of item (i.e. text/icon inside of button)
  @autobind
  private _onRenderOption(item: IDropdownOption): JSX.Element {
    return <span className={ css('ms-Dropdown-optionText', styles.optionText) }>{ item.text }</span>;
  }

  @autobind
  private _onPositioned() {
    this._focusZone.focus();
  }

  private _onItemClick(index: number) {
    this.setSelectedIndex(index);
    if (!this.props.multiSelect) {
      // only close the callout when it's in single-select mode
      this.setState({
        isOpen: false
      });
    }
  }

  @autobind
  private _onDismiss() {
    this.setState({ isOpen: false });
    this._dropDown.focus();
  }

  // Get all selected indexes for multi-select mode
  private _getSelectedIndexes(options: IDropdownOption[], selectedKey: any): number[] {
    let selectedIndex: number[] = [];
    if (!selectedKey) {
      return selectedIndex;
    }
    for (let key of selectedKey) {
      selectedIndex.push(this._getSelectedIndex(options, key));
    }
    return selectedIndex;
  }

  // Get all selected options for multi-select mode
  private _getAllSelectedOptions(options: IDropdownOption[], selectedIndex: number[]) {
    let selectedOptions: IDropdownOption[] = [];
    for (let index of selectedIndex) {
      selectedOptions.push(options[index]);
    }
    if (selectedOptions.length < 1) {
      return undefined;
    }
    return selectedOptions;
  }

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number): number {
    return findIndex(options, (option => (option.isSelected || option.selected || (selectedKey != null) && option.key === selectedKey)));
  }

  @autobind
  private _onDropdownBlur(ev: React.FocusEvent<HTMLDivElement>) {
    if (this.state.isOpen) {
      // Do not onBlur when the callout is opened
      return;
    }
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }

  @autobind
  private _onDropdownKeyDown(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
      if (ev.preventDefault) {
        return;
      }
    }
    let newIndex: number | undefined;
    const selectedIndex = this.props.multiSelect ? (this.state.selectedIndexes ? this.state.selectedIndexes[0] : -1) : this.state.selectedIndex!;

    switch (ev.which) {
      case KeyCodes.enter:
        this.setState({
          isOpen: !this.state.isOpen
        });
        break;

      case KeyCodes.escape:
        if (!this.state.isOpen) {
          return;
        }

        this.setState({
          isOpen: false
        });
        break;

      case KeyCodes.up:
        if (this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else {
          newIndex = this._moveIndex(-1, selectedIndex - 1, selectedIndex);
        }
        break;

      case KeyCodes.down:
        if (ev.altKey || ev.metaKey || this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else {
          newIndex = this._moveIndex(1, selectedIndex + 1, selectedIndex);
        }
        break;

      case KeyCodes.home:
        newIndex = this._moveIndex(1, 0, selectedIndex);
        break;

      case KeyCodes.end:
        newIndex = this._moveIndex(-1, this.props.options.length - 1, selectedIndex);
        break;

      case KeyCodes.space:
        // event handled in _onDropdownKeyUp
        break;

      default:
        return;
    }

    if (newIndex !== selectedIndex) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  @autobind
  private _onDropdownKeyUp(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(ev);
      if (ev.preventDefault) {
        return;
      }
    }
    switch (ev.which) {
      case KeyCodes.space:
        this.setState({
          isOpen: !this.state.isOpen
        });
        break;

      default:
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  @autobind
  private _onZoneKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {

      case KeyCodes.up:
        if (ev.altKey || ev.metaKey) {
          this.setState({ isOpen: false });
          break;
        }

        return;

      case KeyCodes.escape:
        this.setState({ isOpen: false });
        break;

      case KeyCodes.tab:
        this.setState({ isOpen: false });
        return;

      default:
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  @autobind
  private _onDropdownClick(ev: React.MouseEvent<HTMLDivElement>) {
    if (this.props.onClick) {
      this.props.onClick(ev);
      if (ev.preventDefault) {
        return;
      }
    }
    let { disabled, isDisabled } = this.props;
    let { isOpen } = this.state;

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }

    if (!disabled) {
      this.setState({
        isOpen: !isOpen
      });
    }
  }

}
