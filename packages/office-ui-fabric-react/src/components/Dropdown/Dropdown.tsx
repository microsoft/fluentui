import * as React from 'react';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
import { BaseButton } from '../../Button';
import { List } from '../../List';
import { Panel } from '../../Panel';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  findIndex,
  getId
} from '../../Utilities';
import './Dropdown.scss';

// Internal only props iterface to support mixing in responsive mode
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
    super(props, {
      'isDisabled': 'disabled'
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

  // Primary Render
  public render() {
    let id = this._id;
    let { className, label, options, disabled, isDisabled, ariaLabel,
      onRenderTitle = this._onRenderTitle,
      onRenderContainer = this._onRenderContainer
    } = this.props;
    let { isOpen, selectedIndex } = this.state;
    let selectedOption = options[selectedIndex];

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }

    return (
      <div ref='root'>
        { label && (
          <label id={ id + '-label' } className='ms-Label' ref={ (dropdownLabel) => this._dropdownLabel = dropdownLabel } >{ label }</label>
        ) }
        <div
          data-is-focusable={ !disabled }
          ref={ (c): HTMLElement => this._dropDown = c }
          id={ id }
          className={ css('ms-Dropdown', className, {
            'is-open': isOpen, 'is-disabled': disabled
          }) }
          tabIndex={ disabled ? -1 : 0 }
          onKeyDown={ this._onDropdownKeyDown }
          onClick={ this._onDropdownClick }
          aria-expanded={ isOpen ? 'true' : 'false' }
          role='combobox'
          aria-live={ disabled || isOpen ? 'off' : 'assertive' }
          aria-label={ ariaLabel || label }
          aria-describedby={ id + '-option' }
          aria-activedescendant={ selectedIndex >= 0 ? (this._id + '-list' + selectedIndex) : (this._id + '-list') }
        >
          <span
            id={ id + '-option' }
            className='ms-Dropdown-title'
            key={ selectedIndex }
            aria-atomic={ true }
          >
            { selectedOption && (
              onRenderTitle(selectedOption, this._onRenderTitle)
            ) }
          </span>
          <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i>
        </div>
        { isOpen && (
          onRenderContainer(this.props, this._onRenderContainer)
        ) }
      </div>
    );
  }

  public focus() {
    if (this._dropDown && this._dropDown.tabIndex !== -1) {
      this._dropDown.focus();
    }
  }

  public setSelectedIndex(index: number) {
    let { onChanged, options } = this.props;
    let { selectedIndex } = this.state;

    index = Math.max(0, Math.min(options.length - 1, index));

    if (index !== selectedIndex) {
      // Set the selected option.
      this.setState({
        selectedIndex: index
      });

      if (onChanged) {
        onChanged(options[index], index);
      }
    }
  }

  // Render text in dropdown input
  @autobind
  private _onRenderTitle(item: IDropdownOption): JSX.Element {
    return <span>{ item.text }</span>;
  }

  // Render Callout or Panel container and pass in list
  @autobind
  private _onRenderContainer(props: IDropdownProps): JSX.Element {
    let {
      onRenderList = this._onRenderList,
      responsiveMode
    } = this.props;

    let isSmall = responsiveMode <= ResponsiveMode.medium;

    return (
      isSmall ?
        <Panel
          className='ms-Dropdown-panel'
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
          className='ms-Dropdown-callout'
          gapSpace={ 0 }
          doNotLayer={ false }
          targetElement={ this._dropDown }
          directionalHint={ DirectionalHint.bottomLeftEdge }
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
      onRenderOptionContainer = this._onRenderOptionContainer
    } = this.props;

    let id = this._id;
    let { selectedIndex } = this.state;

    return (
      <FocusZone
        ref={ this._resolveRef('_focusZone') }
        direction={ FocusZoneDirection.vertical }
        defaultActiveElement={ '#' + id + '-list' + selectedIndex }
      >
        <List
          id={ id + '-list' }
          className='ms-Dropdown-items'
          aria-labelledby={ id + '-label' }
          items={ props.options }
          onRenderCell={
            (item: IDropdownOption, index: number) => {
              item.index = index;
              return onRenderOptionContainer(item, this._onRenderOptionContainer);
            }
          }
        />
      </FocusZone>
    );
  }

  // Render Items
  @autobind
  private _onRenderOptionContainer(item: IDropdownOption): JSX.Element {
    let { onRenderOption = this._onRenderOption } = this.props;
    let id = this._id;
    return (
      <BaseButton
        id={ id + '-list' + item.index }
        ref={ Dropdown.Option + item.index }
        key={ item.key }
        data-index={ item.index }
        data-is-focusable={ true }
        className={ css('ms-Dropdown-item', { 'is-selected': this.state.selectedIndex === item.index }) }
        onClick={ () => this._onItemClick(item.index) }
        onFocus={ () => this.setSelectedIndex(item.index) }
        role='option'
        aria-selected={ this.state.selectedIndex === item.index ? 'true' : 'false' }
        aria-label={ item.text }
      > { onRenderOption(item, this._onRenderOption) }</BaseButton>
    );
  }

  // Render content of item (i.e. text/icon inside of button)
  @autobind
  private _onRenderOption(item: IDropdownOption): JSX.Element {
    return <span>{ item.text }</span>;
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
  }

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number) {
    return findIndex(options, (option => (option.isSelected || option.selected || (selectedKey != null) && option.key === selectedKey)));
  }

  @autobind
  private _onDropdownKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
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
        this.setSelectedIndex(this.state.selectedIndex - 1);
        break;

      case KeyCodes.down:
        this.setSelectedIndex(this.state.selectedIndex + 1);
        break;

      case KeyCodes.home:
        this.setSelectedIndex(0);
        break;

      case KeyCodes.end:
        this.setSelectedIndex(this.props.options.length - 1);
        break;

      default:
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  @autobind
  private _onDropdownClick() {
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
