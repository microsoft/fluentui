import * as React from 'react';
import { IDropdownProps, IDropdownOption, DropdownMenuItemType } from './Dropdown.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
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
}

@withResponsiveMode
export class Dropdown extends BaseComponent<IDropdownInternalProps, IDropdownState> {

  public static defaultProps = {
    options: []
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

  constructor(props?: IDropdownProps) {
    props.options.forEach((option) => {
      if (!option.itemType) {
        option.itemType = DropdownMenuItemType.Normal;
      }
    });
    super(props);

    this._warnDeprecations({
      'isDisabled': 'disabled'
    });

    this._warnMutuallyExclusive({
      'defaultSelectedKey': 'selectedKey'
    });

    this._id = props.id || getId('Dropdown');

    let selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;

    this.state = {
      isOpen: false,
      selectedIndex: this._getSelectedIndex(props.options, selectedKey)
    };
  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    // In controlled component usage where selectedKey is provided, update the selectedIndex
    // state if the key or options change.
    if (newProps.selectedKey !== undefined &&
      (newProps.selectedKey !== this.props.selectedKey || newProps.options !== this.props.options)) {
      this.setState({
        selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey)
      });
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
    let { isOpen, selectedIndex } = this.state;
    let selectedOption = options[selectedIndex];
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
          className={ css('ms-Dropdown', styles.root, className, {
            'is-open': isOpen,
            ['is-disabled ' + styles.rootIsDisabled]: disabled,
            'is-required ': required,
          }) }
          tabIndex={ disabled ? -1 : 0 }
          aria-expanded={ isOpen ? 'true' : 'false' }
          role='combobox'
          aria-live={ disabled || isOpen ? 'off' : 'assertive' }
          aria-label={ ariaLabel || label }
          aria-describedby={ id + '-option' }
          aria-activedescendant={ isOpen && selectedIndex >= 0 ? (this._id + '-list' + selectedIndex) : null }
          aria-disabled={ disabled }
          aria-owns={ isOpen ? id + '-list' : null }
          { ...divProps }
          onBlur={ this._onBlur }
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
    let { onChanged, options, selectedKey } = this.props;
    let { selectedIndex } = this.state;

    index = Math.max(0, Math.min(options.length - 1, index));

    if (index !== selectedIndex) {
      if (selectedKey === undefined) {
        // Set the selected option if this is an uncontrolled component
        this.setState({
          selectedIndex: index
        });
      }

      if (onChanged) {
        onChanged(options[index], index);
      }
    }
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
    while (options[index].itemType !== DropdownMenuItemType.Normal) {
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
  private _onRenderTitle(item: IDropdownOption): JSX.Element {
    return <span>{ item.text }</span>;
  }

  // Render placeHolder text in dropdown input
  @autobind
  private _onRenderPlaceHolder(props): JSX.Element {
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

    let isSmall = responsiveMode <= ResponsiveMode.medium;

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
        { this.props.options.map((item, index) => onRenderItem({ ...item, index }, this._onRenderItem)) }
      </FocusZone>
    );
  }

  // Render items
  @autobind
  private _onRenderItem(item: IDropdownOption): JSX.Element {
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
  private _renderSeparator(item: IDropdownOption): JSX.Element {
    let { index, key } = item;
    if (index > 0) {
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
    let id = this._id;
    return (
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
        onClick={ () => this._onItemClick(item.index) }
        role='option'
        aria-selected={ this.state.selectedIndex === item.index ? 'true' : 'false' }
        ariaLabel={ item.ariaLabel || item.text }
        title={ item.text }
      > { onRenderOption(item, this._onRenderOption) }</CommandButton>
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

  private _onItemClick(index) {
    this.setSelectedIndex(index);
    this.setState({
      isOpen: false
    });
  }

  @autobind
  private _onDismiss() {
    this.setState({ isOpen: false });
    this._dropDown.focus();
  }

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number) {
    return findIndex(options, (option => (option.isSelected || option.selected || (selectedKey != null) && option.key === selectedKey)));
  }

  @autobind
  private _onBlur(ev: React.FocusEvent<HTMLDivElement>) {
    if (this.state.isOpen) {
      // Do not onBlur when the callout is opened
      return;
    }
    if (this.props.onBlur) {
      this.props.onBlur(ev);
      if (ev.preventDefault) {
        return;
      }
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
    let newIndex: number;
    const { selectedIndex } = this.state;

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
        newIndex = this._moveIndex(-1, selectedIndex - 1, selectedIndex);
        break;

      case KeyCodes.down:
        if (ev.altKey || ev.metaKey) {
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
      this.props.onKeyDown(ev);
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
