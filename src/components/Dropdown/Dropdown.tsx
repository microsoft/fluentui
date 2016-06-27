import * as React from 'react';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';
import { css } from '../../utilities/css';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { findIndex } from '../../utilities/array';
import { KeyCodes } from '../../utilities/KeyCodes';
import './Dropdown.scss';

export interface IDropdownState {
  isOpen: boolean;
  selectedIndex: number;
  isDisabled: boolean;
}

let _instance: number = 0;

export class Dropdown extends React.Component<IDropdownProps, any> {
  public static defaultProps = {
    options: [],
    isDisabled: false
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  private _events: EventGroup;
  private _dropDown: HTMLDivElement;

  constructor(props?: IDropdownProps) {
    super(props);

    this._events = new EventGroup(this);

    this.state = {
      id: `Dropdown-${_instance++}`,
      isOpen: false,
      selectedIndex: this._getSelectedIndex(props.options, props.selectedKey),
      isDisabled: this.props.isDisabled
    };

    this._onDropdownKeyDown = this._onDropdownKeyDown.bind(this);
    this._onDropdownClick = this._onDropdownClick.bind(this);
    this._onFocusChange = this._onFocusChange.bind(this);
  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    this.setState({
      selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey)
    });
  }

  public componentWillUpdate(nextProps: IDropdownProps, nextState: IDropdownState) {
    if (this.state.isOpen !== nextState.isOpen) {
      if (nextState.isOpen) {
        this._events.on(window, 'focus', this._onFocusChange, true);
      } else {
        this._events.off();
      }
    }
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { label, options } = this.props;
    let { id, isOpen, selectedIndex, isDisabled } = this.state;
    let selectedOption = options[selectedIndex];

    // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
    return (
      <div ref='root'>
        <label id={ id + '-label' } className='ms-Label'>{ label }</label>
        <div
          ref={ (c): HTMLElement => this._dropDown = c }
          id={ id }
          className={ css('ms-Dropdown', {
            'is-open': isOpen, 'is-disabled': isDisabled
          }) }
          tabIndex={ isDisabled ? -1 : 0 }
          onKeyDown={ this._onDropdownKeyDown }
          onClick={ this._onDropdownClick }
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

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number) {
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

  private _onFocusChange(ev: React.FocusEvent) {
    if (this.state.isOpen && !this.refs.root.contains(ev.target as HTMLElement)) {
      let context: Dropdown = this;

      context.setState({
        isOpen: false
      });
    }
  }
}
