import * as React from 'react';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout, ICalloutProps } from '../../Callout';
import { BaseButton, IButtonProps } from '../../Button';
import { List, IListProps } from '../../List';
import { Panel, IPanelProps } from '../../Panel';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  findIndex,
  getId
} from '../../Utilities';
import './Dropdown.scss';

export interface IDropdownState {
  isOpen?: boolean;
  selectedIndex?: number;
}

export class Dropdown extends BaseComponent<IDropdownProps, IDropdownState> {

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
  private _optionList: HTMLElement;
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
    if (newProps.selectedKey !== this.props.selectedKey) {
      this.setState({
        selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey)
      });
    }

  }

  public render() {
    let id = this._id;
    let { className, label, options, disabled, isDisabled, ariaLabel,
      onRenderItem = this._onRenderItem,
      onRenderOption = this._onRenderOption,
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
            { selectedOption ? onRenderItem(selectedOption, this._onRenderItem) : '' }
          </span>
          <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i>
        </div>
        { isOpen && (
          { onRenderContainer(props, this._onRenderContainer) }
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

  @autobind
  private _onRenderContainer(props: IDropdownProps): JSX.Element {
    let {
      onRenderItem = this._onRenderItem
    } = this.props;

    let isSmall = true; // fake it for now
    let selectedOption = this.props.options[this.state.selectedIndex];

    let content = (
      <FocusZone>
        <List
          onRenderCell={ (item, index) => onRenderItem(selectedOption, this._onRenderItem) }
        />
      </FocusZone>
    );

    return (isSmall ?
      <Panel{ ...this.props  }>{ content } </Panel> :
      <Callout{ ...this.props }> { content } </Callout>
    );
  }

  @autobind
  private _onRenderItem(item: IDropdownOption): JSX.Element {
    return <span>{ item.text }</span>;
  }

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
