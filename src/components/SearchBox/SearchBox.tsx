import * as React from 'react';
import './SearchBox.scss';
import { ISearchBoxProps } from './SearchBox.Props';
import { css } from '../../utilities/css';

export interface ISearchBoxState {
  value?: string;
  hasFocus?: boolean;
}

const DEFAULT_WIDTH: number = 180;

// @TODO - needs auto complete and suggestions
export default class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  public static defaultProps: ISearchBoxProps = {
    labelText: 'Search',
    width: DEFAULT_WIDTH
  };

  public refs: {
    [key: string]: React.ReactInstance;
    inputText: HTMLInputElement;
  };

  public constructor(props: ISearchBoxProps) {
    super(props);

    this.state = {
      value: props.value,
      hasFocus: false
    };
    this._clearInput = this._clearInput.bind(this);
    this._onInputChanged = this._onInputChanged.bind(this);
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
    let { labelText, width } = this.props;
    let { value, hasFocus } = this.state;

    return (
      <div className={ css('ms-SearchBox', {
          'is-active': hasFocus
        }) }
      >
        <input className='ms-SearchBox-field' style={ { width: width + 'px' } } onFocus={ this._onInputFocus } onBlur={ this._onInputBlur } onChange={ this._onInputChanged } value={value} ref='inputText' />
        { !hasFocus && !value ? <label className='ms-SearchBox-label'><i className='ms-SearchBox-icon ms-Icon ms-Icon--search'></i>{ labelText }</label> : null }
        <button className='ms-SearchBox-closeButton' onClick={ this._clearInput }><i className='ms-Icon ms-Icon--x'></i></button>
      </div>
    );
  }

  private _clearInput() {
    console.log('clear input!');
    this.setState({
      value: undefined
    });
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

  private _onInputChanged(ev: React.KeyboardEvent) {
    this.setState({
      value: this.refs.inputText.value
    });
    this._onChanged(this.refs.inputText.value);
  }

  private _onChanged(newValue: string): void {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(newValue);
    }
  }
}
