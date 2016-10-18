import * as React from 'react';
import { IDropdownProps, IDropdownOption } from './Dropdown.Props';
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
    root: HTMLElement
  };

  private _optionList: HTMLElement;
  private _dropDown: HTMLDivElement;

  constructor(props?: IDropdownProps) {
    super(props, {
      'isDisabled': 'disabled'
    });

    this.state = {
      id: getId('Dropdown'),
      isOpen: false,
      selectedIndex: this._getSelectedIndex(props.options, props.selectedKey),
      isDisabled: this.props.isDisabled || this.props.disabled
    };
  }

  public componentWillReceiveProps(newProps: IDropdownProps) {
    this.setState({
      selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey),
      isDisabled: newProps.isDisabled
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

  public componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
    if (prevState.isOpen === false && this.state.isOpen === true) {
      this._scrollOnOpen();
    } else if (prevState.selectedIndex !== this.state.selectedIndex) {
      this._scrollSelectedItemIntoView();
    }
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
          role='application'
          aria-activedescendant={ selectedIndex >= 0 ? (id + '-list' + selectedIndex) : (id + '-list') }
          aria-controls={ id + '-list' }
          >
          <span className='ms-Dropdown-title'>{ selectedOption ? selectedOption.text : '' }</span>
          <i className='ms-Dropdown-caretDown ms-Icon ms-Icon--ChevronDown'></i>
          <ul ref={ (c: HTMLElement) => this._optionList = c }
            id={ id + '-list' }
            className='ms-Dropdown-items'
            role='listbox'
            aria-labelledby={ id + '-label' }>
            { options.map((option, index) => (
              <li id={ id + '-list' + index.toString() }
                ref= { Dropdown.Option + index.toString() }
                key={ option.key }
                data-index={ index }
                className={ css('ms-Dropdown-item', { 'is-selected': selectedIndex === index }) }
                onClick={ this.setSelectedIndex.bind(this, index) }
                role='option'
                aria-selected={ selectedIndex === index ? 'true' : 'false' }
                aria-label={ option.text }
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
    return findIndex(options, (option => (option.isSelected || (selectedKey != null) && option.key === selectedKey)));
  }

  @autobind
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

  @autobind
  private _onDropdownClick() {
    let { isDisabled, isOpen } = this.state;

    if (!isDisabled) {
      this.setState({
        isOpen: !isOpen
      });
    }
  }

  @autobind
  private _onFocusChange(ev: React.FocusEvent) {
    if (this.state.isOpen && !elementContains(this.refs.root, ev.target as HTMLElement)) {
      this.setState({
        isOpen: false
      });
    }
  }

  private _scrollSelectedItemIntoView() {
    const { posTop, posBottom } = this._getCurrentItemPositionDetails();

    // if the selected item is too far down
    if (posBottom > this._optionList.offsetHeight + this._optionList.scrollTop) {
      this._optionList.scrollTop = posBottom - this._optionList.offsetHeight;
      // else if it's too far up
    } else if (posTop < this._optionList.scrollTop) {
      this._optionList.scrollTop = posTop;
    }
  }

  private _scrollOnOpen() {
    const { currentItem, posBottom } = this._getCurrentItemPositionDetails();

    // the selected item should be in the center of the dropdown if possible
    if (currentItem) {
      this._optionList.scrollTop = posBottom - (currentItem.offsetHeight + this._optionList.offsetHeight) / 2;
    }
  }

  private _getCurrentItemPositionDetails() {
    const currentItem: HTMLElement = this.refs[Dropdown.Option + this.state.selectedIndex] as HTMLElement;
    const posTop: number = currentItem ? currentItem.offsetTop : 0;
    const posBottom: number = currentItem ? posTop + currentItem.offsetHeight : 0;

    return { currentItem: currentItem,
      posTop: posTop,
      posBottom: posBottom };
  }

}
