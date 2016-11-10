import * as React from 'react';
import { ISearchBoxProps } from './SearchBox.Props';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import './SearchBox.scss';

export interface ISearchBoxState {
  value?: string;
  hasFocus?: boolean;
  id?: string;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  public static defaultProps: ISearchBoxProps = {
    labelText: 'Search',
  };

  public refs: {
    [key: string]: React.ReactInstance;
    inputText: HTMLInputElement;
  };

  public constructor(props: ISearchBoxProps) {
    super(props);

    // Handle deprecated prop
    if (this.props.onChanged) {
      this.props.onChange = this.props.onChanged;
    }

    this.state = {
      value: props.value,
      hasFocus: false,
      id: getId('SearchBox')
    };
    this._clearInput = this._clearInput.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
  }

  public componentWillReceiveProps(newProps: ISearchBoxProps) {
    if (newProps.value !== undefined) {
      this.setState({
        value: newProps.value
      });
    }
  }

  public render() {
    let { labelText, className } = this.props;
    let { value, hasFocus, id } = this.state;

    return (
      <div className={ css('ms-SearchBox', className, {
          'is-active': hasFocus
        })}
      >
        { !hasFocus && !value ? <label className='ms-SearchBox-label' htmlFor={id}>
              <i className='ms-SearchBox-icon ms-Icon ms-Icon--Search'></i>
              <span className='ms-SearchBox-text'>{ labelText }</span>
             </label> : null }
        <input
          id={ id }
          className='ms-SearchBox-field'
          onFocus={ this._onInputFocus }
          onBlur={ this._onInputBlur }
          onChange={ this._onInputChange }
          value={value}
          ref='inputText'
          />
        <button
          className='ms-SearchBox-closeButton'
          onMouseDown={ this._clearInput }
          >
          <i className='ms-Icon ms-Icon--Clear' />
        </button>
      </div>
    );
  }

  private _clearInput(ev?: any) {
    this.setState({
      value: ''
    });
    this._onChange('');
    ev.stopPropagation();
    ev.preventDefault();
  }

   private _onInputFocus() {
    this.setState({
      hasFocus: true
    });
  }

  private _onInputBlur() {
    this.setState({
      hasFocus: false
    });
  }

  private _onInputChange(ev: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      value: this.refs.inputText.value
    });
    this._onChange(this.refs.inputText.value);
  }

  private _onChange(newValue: string): void {
    let { onChange } = this.props;

    if (onChange) {
      onChange(newValue);
    }
  }
}
