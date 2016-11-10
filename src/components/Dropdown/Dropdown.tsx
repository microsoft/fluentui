import * as React from 'react';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
} from '../../index';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
  elementContains,
  findIndex,
  getId
} from '../../Utilities';
import './Dropdown.scss';

export interface IDropdownState {
  isOpen: boolean;
  selectedIndex: number;
  isDisabled: boolean;
}

export class Dropdown extends BaseComponent<IDropdownProps, any> {

  public static defaultProps = {
    options: []
  };

  private static Option: string = 'option';

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    focusZone: FocusZone
  };

  private _optionList: HTMLElement;
  private _dropDown: HTMLDivElement;
  private _dropdownLabel: HTMLElement;

  constructor(props?: IDropdownProps) {
    super(props, {
      'isDisabled': 'disabled'
    });

    this.state = {
      id: getId('Dropdown'),
      isOpen: false,
      selectedIndex: this._getSelectedIndex(props.options, props.selectedKey),
      isDisabled: props.isDisabled !== undefined ? props.isDisabled : props.disabled
    };
  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    this.setState({
      selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey),
      isDisabled: newProps.isDisabled !== undefined ? newProps.isDisabled : newProps.disabled
    });
  }

  public render() {
    let { label, options, onRenderItem = this._onRenderItem } = this.props;
    let { id, isOpen, selectedIndex, isDisabled } = this.state;
    let selectedOption = options[selectedIndex];

    // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
    return (
      <div role='application' ref='root'>
        <label id={ id + '-label' } className='ms-Label' ref={ (dropdownLabel) => this._dropdownLabel = dropdownLabel } >{ label }</label>
        <div
          data-is-focusable={ true }
          ref={ (c): HTMLElement => this._dropDown = c }
          id={ id }
          className={ css('ms-Dropdown', {
            'is-open': isOpen, 'is-disabled': isDisabled
          }) }
          tabIndex={ isDisabled ? -1 : 0 }
          onKeyDown={ this._onDropdownKeyDown }
          onClick={ this._onDropdownClick }
          aria-expanded={ isOpen ? 'true' : 'false' }
          role='combobox'
          aria-label={ selectedOption ? `${label}, ${selectedOption.text}` : label }
          aria-activedescendant={ selectedIndex >= 0 ? (id + '-list' + selectedIndex) : (id + '-list') }
          aria-controls={ id + '-list' }
          >
          <span className='ms-Dropdown-title'>{ selectedOption ? onRenderItem(selectedOption, this._onRenderItem) : '' }</span>
          <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i>
        </div>
        { isOpen && (
          <Callout
            isBeakVisible={ false }
            className='ms-Dropdown-callout'
            gapSpace={ 0 }
            doNotLayer={ false }
            targetElement={ this._dropDown }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._onDismiss }
            >
            <FocusZone
              ref={ fz => fz && fz.focus() }
              direction={ FocusZoneDirection.vertical }
              defaultActiveElement={ '#' + id + '-list' + selectedIndex }
              >
              <ul ref={ (c: HTMLElement) => this._optionList = c }
                id={ id + '-list' }
                style={ { width: this._dropDown.clientWidth - 2 } }
                className='ms-Dropdown-items'
                role='listbox'
                aria-labelledby={ id + '-label' }>
                { options.map((option, index) => (
                  <li id={ id + '-list' + index.toString() }
                    ref={ Dropdown.Option + index.toString() }
                    key={ option.key }
                    data-index={ index }
                    data-is-focusable={ true }
                    className={ css('ms-Dropdown-item', { 'is-selected': selectedIndex === index }) }
                    onClick={ () => this._onItemClick(index) }
                    onFocus={ () => this.setSelectedIndex(index) }
                    role='option'
                    aria-selected={ selectedIndex === index ? 'true' : 'false' }
                    aria-label={ option.text }
                    >
                    { option.text }
                  </li>
                )) }
              </ul>
            </FocusZone>
          </Callout>
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
  private _onRenderItem(item: IDropdownOption): JSX.Element {
    return <span>{ item.text }</span>;
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
    return findIndex(options, (option => (option.isSelected || (selectedKey != null) && option.key === selectedKey)));
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
    let { isDisabled, isOpen } = this.state;
    if (!isDisabled) {
      this.setState({
        isOpen: !isOpen
      });
    }
  }

}
