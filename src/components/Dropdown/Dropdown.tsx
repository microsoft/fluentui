import * as React from 'react';
import './Dropdown.scss';
import { css } from '../../utilities/css';
import { findIndex } from '../../utilities/array';
import KeyCodes from '../../utilities/KeyCodes';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';

export interface IDropdownState {
  isOpen: boolean;
  selectedIndex: number;
  isDisabled: boolean;
}

let _instance: number = 0;

export default class Dropdown extends React.Component<IDropdownProps, any> {
  public static defaultProps = {
    options: [],
    isDisabled: false
  };

  constructor(props?: IDropdownProps) {
    super(props);

    this.state = {
      id: `Dropdown-${_instance++}`,
      isOpen: false,
      selectedIndex: this._getSelectedIndex(props.options, props.selectedKey),
      isDisabled: this.props.isDisabled
    };

    this._onDropdownKeyDown = this._onDropdownKeyDown.bind(this);
    this._onDropdownClick = this._onDropdownClick.bind(this);
    this._onDropdownBlur = this._onDropdownBlur.bind(this);
  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    this.setState({
      selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey)
    });
  }

  public render() {
    let { label, options } = this.props;
    let { id, isOpen, selectedIndex, isDisabled } = this.state;
    let selectedOption = options[selectedIndex];

    // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
    return (
      <div>
        <label id={ id + '-label' } className='ms-Label'>{ label }</label>
        <div
          id={ id }
          className={ css('ms-Dropdown', {
            'is-open': isOpen, 'is-disabled': isDisabled
          }) }
          tabIndex={ 0 }
          onKeyDown={ this._onDropdownKeyDown }
          onClick={ this._onDropdownClick }
          onBlur={ this._onDropdownBlur }
          aria-expanded={ isOpen ? 'true' : 'false' }
          role='application'
          aria-activedescendant={ selectedIndex }
          >
          <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown'></i>
          <span className='ms-Dropdown-title'>{ selectedOption ? selectedOption.text : '' }</span>
          <ul id={ id + '-list' } className='ms-Dropdown-items' role='listbox' aria-labelledby={ id + '-label' }>
            { options.map((option, index) => (
              <li id={ index.toString() }
                key={ option.key }
                data-index={ index }
                className={ css('ms-Dropdown-item', { 'is-selected': selectedIndex === index }) }
                onClick={ this.setSelectedIndex.bind(this, index) }
                role='option'
                aria-selected={ selectedIndex === index ? 'true' : 'false' }
                >
                { option.text }
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
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

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string) {
    return findIndex(options, (option => (option.isSelected || selectedKey && option.key === selectedKey)));
  }

  private _onDropdownKeyDown(ev: React.KeyboardEvent) {
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

  private _onDropdownClick() {
    let { isDisabled, isOpen } = this.state;

    if (!isDisabled) {
      this.setState({
        isOpen: !isOpen
      });
    }
  }

  private _onDropdownBlur() {
    if (this.state.isOpen) {
      let context: Dropdown = this;

      // Below is a temporary fix for IE needed 4/27; a better fix may be needed.
      //
      // per David:
      // This can also cause edge case bugs when the component is unmounted and setstate is called after.
      // Maybe the handler needs to be hooked on focus of the menu content and unhooked on dismiss.

      // pause the removal of the dropdown list otherwise the selection will not trigger in IE
      setTimeout((): void => {
        context.setState({
          isOpen: false
        });
      }, 200);
    }
  }
}
